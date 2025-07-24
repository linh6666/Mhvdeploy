// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Button } from '@mantine/core';
// import { IconChevronsLeft } from '@tabler/icons-react';
// import styles from './HouseType.module.css';
// import { apiarea } from '../../../library/axios';
// import { API_ROUTE } from '../../../const/apiRouter';
// import Image from 'next/image';

// interface BuildingDetail {
//   id?: string;
//   building_name?: string;
//   building_type?: string;
//   zone?: string;
//   zone_name?: string;
//   amenity?: string;
//   amenity_type?: string;
//   [key: string]: unknown;
// }

// interface HouseTypePageProps {
//   zoneParam: string;
//   onSelectType?: (type: string) => void;
//   className?: string;
// }

// const HouseTypePage: React.FC<HouseTypePageProps> = ({
//   zoneParam,
//   onSelectType,
//   className,
// }) => {
//   const params = useParams();
//   const router = useRouter();

//   const typeRaw = params?.type ?? '';
//   const typeFromURL = decodeURIComponent(Array.isArray(typeRaw) ? typeRaw[0] : typeRaw);

//   const [buildingDetails, setBuildingDetails] = useState<BuildingDetail[]>([]);
//   const [detailLoading, setDetailLoading] = useState<boolean>(false);
//   const [detailError, setDetailError] = useState<string>('');
//   const [selectedType, setSelectedType] = useState<string>(typeFromURL);

//   const handleGoBack = () => {
//     router.push(`/en/House-style/${encodeURIComponent(zoneParam)}`);
//   };

//   const fetchHouseDetail = async (detail: BuildingDetail): Promise<void> => {
//     const url = API_ROUTE.GET_HOUSE_DETAIL(
//       detail.zone || '',
//       detail.zone_name || '',
//       detail.building_type || '',
//       detail.building_name || ''
//     );

//     try {
//       const res = await apiarea.get(url);
//       console.log('Chi tiết nhà:', res.data);
//     } catch (err) {
//       console.error('Lỗi chi tiết nhà:', err);
//     }
//   };

//   const handleSelectType = (selected: string): void => {
//     setSelectedType(selected);
//     onSelectType?.(selected);

//     const detail = buildingDetails.find(
//       (d) => (d.building_name?.trim() || 'Không rõ loại nhà') === selected
//     );
//     if (detail) {
//       fetchHouseDetail(detail);
//     }
//   };

//   const groupByBuildingName = (details: BuildingDetail[]): BuildingDetail[] => {
//     const uniqueMap = new Map<string, BuildingDetail>();

//     for (const detail of details) {
//       const key = detail.building_name?.trim() || 'Không rõ loại nhà';
//       if (!uniqueMap.has(key)) {
//         uniqueMap.set(key, detail);
//       }
//     }

//     return Array.from(uniqueMap.values());
//   };

//   useEffect(() => {
//     const fetchDetail = async (zone: string, typeName: string) => {
//       if (!zone || !typeName) {
//         setDetailError('Thiếu tham số phân khu hoặc loại nhà');
//         setBuildingDetails([]);
//         return;
//       }

//       try {
//         setDetailLoading(true);
//         setDetailError('');
//         setBuildingDetails([]);

//         const apiUrl = API_ROUTE.GET_AREA_DETAIL_BY_TYPE(zone, typeName);
//         const res = await apiarea.get(apiUrl);

//         if (res.data.records && res.data.records.length > 0) {
//           const groupedDetails = groupByBuildingName(res.data.records);
//           setBuildingDetails(groupedDetails);
//         } else {
//           setDetailError('Không tìm thấy dữ liệu cho loại nhà này');
//         }
//       } catch (err) {
//         console.error('Lỗi khi tải chi tiết:', err);
//         setDetailError('Lỗi tải chi tiết');
//       } finally {
//         setDetailLoading(false);
//       }
//     };

//     if (typeFromURL) {
//       fetchDetail(zoneParam, typeFromURL);
//     } else {
//       setBuildingDetails([]);
//       setDetailError('');
//     }
//   }, [zoneParam, typeFromURL]);

//   return (
//     <div className={`${styles.container} ${className || ''}`}>
//       <div className={styles.logoWrapper}>
//         <Image src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} width={120} height={50} />
//       </div>

//       {detailLoading ? (
//         <p>Đang tải chi tiết...</p>
//       ) : detailError ? (
//         <p style={{ color: 'red' }}>{detailError}</p>
//       ) : buildingDetails.length === 0 && typeFromURL ? (
//         <p>Không có loại nhà nào</p>
//       ) : (
//         <>
//           <h2 className={styles.mainHeading}>{typeFromURL || 'Chọn loại nhà'}</h2>
//           <div className={styles.scrollContainer}>
//             <div className={styles.buttonGroup}>
//               {buildingDetails.map((detail) => {
//                 const buildingType = detail.building_name?.trim() || 'Không rõ loại nhà';
//                 const isActive = selectedType === buildingType;

//                 return (
//                   <Button
//                     key={detail.id || buildingType}
//                     className={`${styles.button} ${isActive ? styles.active : ''}`}
//                     title={detail.building_name}
//                     onClick={() => handleSelectType(buildingType)}
//                   >
//                     {buildingType}
//                   </Button>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}

//       <div className={styles.bottomButtons}>
//         <Button variant="filled" className={styles.bottomButton} onClick={handleGoBack}>
//           <IconChevronsLeft size={20} />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default HouseTypePage;



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
  const lang = 'en';

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
    router.push(`/en/House-style/${encodeURIComponent(zoneParam)}`);
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
