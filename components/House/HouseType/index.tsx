'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import { IconChevronsLeft } from '@tabler/icons-react';
import styles from './HouseType.module.css';
import { apiarea } from '../../../library/axios';
import { API_ROUTE } from '../../../const/apiRouter';
import Image from 'next/image';

interface BuildingDetail {
  id?: string;
  building_name?: string;
  building_type?: string;
  zone?: string;
  zone_name?: string;
  amenity?: string;
  amenity_type?: string;
  [key: string]: unknown;
}

interface HouseTypePageProps {
  projectId?: string;
  zoneParam: string;
  onSelectType?: (type: string) => void;
  className?: string;
  bearerToken?: string;
}

const HouseTypePage: React.FC<HouseTypePageProps> = ({
  projectId: propProjectId,
  zoneParam,
  onSelectType,
  className,
  bearerToken: propBearerToken,
}) => {
  const params = useParams();
  const router = useRouter();
  const typeRaw = params?.type ?? '';
  const typeFromURL = decodeURIComponent(Array.isArray(typeRaw) ? typeRaw[0] : typeRaw);

  const [projectId, setProjectId] = useState<string | undefined>(propProjectId);
  const [bearerToken, setBearerToken] = useState<string | undefined>(propBearerToken);
  const [buildingDetails, setBuildingDetails] = useState<BuildingDetail[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [selectedType, setSelectedType] = useState(typeFromURL);
  const lang = 'vi';

  useEffect(() => {
    if (!projectId) {
      const storedId = localStorage.getItem('project_id');
      if (storedId) setProjectId(storedId);
    }
    if (!bearerToken) {
      const token = localStorage.getItem('access_token');
      if (token) setBearerToken(token);
    }
  }, [projectId, bearerToken]);

  const handleGoBack = () => {
    router.push(`/building-type/${encodeURIComponent(zoneParam)}`);
  };

  const fetchDetail = useCallback(
    async (zoneName: string, buildingType: string) => {
      if (!projectId || !bearerToken) {
        setDetailError('Thiếu thông tin xác thực');
        return;
      }

      const endpoint = API_ROUTE.GET_AREA_DETAIL_BY_TYPE
        .replace('{project_id}', projectId)
        .replace('{zone_param}', 'pk')
        .replace('{zone_name_path}', encodeURIComponent(zoneName))
        .replace('{building_type_path}', encodeURIComponent(buildingType));

      try {
        setDetailLoading(true);
        setDetailError('');
        setBuildingDetails([]);

        const res = await apiarea.get(`${endpoint}?lang=${lang}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        const records: BuildingDetail[] = res.data || [];

        if (!records.length) {
          setDetailError('Không có dữ liệu cho loại nhà này');
          return;
        }

        setBuildingDetails(records);
      } catch {
        setDetailError('Lỗi tải chi tiết');
      } finally {
        setDetailLoading(false);
      }
    },
    [projectId, bearerToken]
  );

  const fetchHouseDetail = async (detail: BuildingDetail) => {
    if (!projectId || !bearerToken) return;

    const endpoint = API_ROUTE.GET_HOUSE_DETAIL
      .replace('{project_id}', projectId)
      .replace('{zone_param}', 'pk')
      .replace('{zone_name_path}', encodeURIComponent(detail.zone_name || ''))
      .replace('{building_type_path}', encodeURIComponent(detail.building_type || ''))
      .replace('{building_name_param}', encodeURIComponent(detail.building_name || ''));

    try {
      const res = await apiarea.get(`${endpoint}?lang=${lang}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setBuildingDetails(res.data);
    } catch {
      setDetailError('Lỗi khi tải chi tiết nhà.');
    }
  };

  const handleSelectType = (selected: string) => {
    setSelectedType(selected);
    onSelectType?.(selected);

    const detail = buildingDetails.find(
      (d) => (d.building_name?.trim() || 'Không rõ loại nhà') === selected
    );
    if (detail) {
      fetchHouseDetail(detail);
    }
  };

  useEffect(() => {
    if (typeFromURL && zoneParam && projectId && bearerToken) {
      fetchDetail(zoneParam, typeFromURL);
    } else {
      setBuildingDetails([]);
      setDetailError('');
    }
  }, [zoneParam, typeFromURL, projectId, bearerToken, fetchDetail]);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.png"
          alt="Eco Retreat Logo"
          width={120}
          height={40}
          className={styles.logoImage}
          priority
        />
      </div>

      {detailLoading ? (
        <p>Đang tải chi tiết...</p>
      ) : detailError ? (
        <p style={{ color: 'red' }}>{detailError}</p>
      ) : buildingDetails.length === 0 && typeFromURL ? (
        <p>Không có loại nhà nào</p>
      ) : (
        <>
          <h2 className={styles.mainHeading}>{typeFromURL || 'Chọn loại nhà'}</h2>
          <div className={styles.scrollContainer}>
            <div className={styles.buttonGroup}>
              {buildingDetails.map((detail) => {
                const buildingType = detail.building_name?.trim() || 'Không rõ loại nhà';
                const isActive = selectedType === buildingType;

                return (
                  <Button
                    key={detail.id || buildingType}
                    className={`${styles.button} ${isActive ? styles.active : ''}`}
                    title={detail.building_name}
                    onClick={() => handleSelectType(buildingType)}
                  >
                    {buildingType}
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className={styles.bottomButtons}>
        <Button variant="filled" className={styles.bottomButton} onClick={handleGoBack}>
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
};

export default HouseTypePage;






