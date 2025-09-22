'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  Criteria,
} from '@elastic/eui';
import { Divider, Menu, Button, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { apiarea } from '../../../library/axios';
import { API_ROUTE } from '../../../const/apiRouter';
import CreateView from './CreateView';
import EditView from './EditView';
import View from './View';
import AppAction from '../../../common/AppAction';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';

type Role = {
  id: string;
  building_name: string;
  bedroom: number;
  zone_name: string;
  building_type: string;
  status: string;
  port: string;
  price: number | string;
  direction: string;
  description: string;
  
};

const RoleTable = () => {
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [displayRoles, setDisplayRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  // Filter options
  const [zoneOptions, setZoneOptions] = useState<string[]>([]);
  const [buildingTypeOptions, setBuildingTypeOptions] = useState<string[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [directionOptions, setDirectionOptions] = useState<string[]>([]);

  // Selected filter values
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);

  // Fetch data
  const fetchAllRoles = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError(
        language === 'vi'
          ? '⚠️ Không tìm thấy token. Vui lòng đăng nhập.'
          : '⚠️ Token not found. Please login.'
      );
      setLoading(false);
      return;
    }

    try {
      const endpoint = API_ROUTE.GET_LIST_DETAIL_ECOPARK; // Đường dẫn API
      const res = await apiarea.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lang: language },
      });

      if (Array.isArray(res.data.items)) {
        setAllRoles(res.data.items);
      } else {
        setAllRoles([]);
      }

      // Set filter options
    setZoneOptions(
  Array.from(
    new Set(
      res.data.items
        .map((r: Role) => (r.zone_name?.split('.')[0] || '') as string) // ép kiểu string
        .filter(Boolean) as string[] // ép kiểu sau filter
    )
  ).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numA - numB;
  })
);


      setBuildingTypeOptions(
        Array.from(new Set(res.data.items.map((r: Role) => r.building_type).filter(Boolean)))
      );
      setStatusOptions(
        Array.from(new Set(res.data.items.map((r: Role) => r.status).filter(Boolean)))
      );
      setDirectionOptions(
        Array.from(new Set(res.data.items.map((r: Role) => r.direction).filter(Boolean)))
      );

      setPagination((prev) => ({ ...prev, totalItemCount: res.data.items.length }));
      setError(null);
    } catch (err: unknown) {
      console.error('❌ Lỗi fetchAllRoles:', err);
      if (err instanceof Error) setError(err.message);
      else
        setError(
          language === 'vi' ? 'Đã xảy ra lỗi khi tải dữ liệu.' : 'An error occurred while loading data.'
        );
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchAllRoles();
  }, [fetchAllRoles]);

  // Apply filter & pagination
  useEffect(() => {
    const filtered = allRoles.filter((role) => {
      const matchZone =
        selectedZones.length === 0 || selectedZones.includes(role.zone_name);
      const matchBuildingType =
        selectedBuildingTypes.length === 0 || selectedBuildingTypes.includes(role.building_type);
      const matchStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(role.status);
      const matchDirection =
        selectedDirections.length === 0 || selectedDirections.includes(role.direction);
      return matchZone && matchBuildingType && matchStatus && matchDirection;
    });

    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    setDisplayRoles(filtered.slice(start, end));

    setPagination((prev) => ({ ...prev, totalItemCount: filtered.length }));
  }, [
    allRoles,
    selectedZones,
    selectedBuildingTypes,
    selectedStatuses,
    selectedDirections,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  // Columns
  const columns: Array<EuiBasicTableColumn<Role>> = [
    { field: 'zone_name', name: language === 'vi' ? 'Tên Khu' : 'Zone Name', truncateText: true, width: '20%' },
    { field: 'building_type', name: language === 'vi' ? 'Loại nhà' : 'Building Type', truncateText: true, width: '25%' },
    { field: 'building_name', name: language === 'vi' ? 'Tên nhà' : 'Building Name', truncateText: true, width: '25%' },
    { field: 'bedroom', name: language === 'vi' ? 'Số phòng' : 'Bedroom', truncateText: true, width: '15%' },
    { field: 'direction', name: language === 'vi' ? 'Hướng nhà' : 'Direction', truncateText: true, width: '20%' },
    {
      field: 'status',
      name: language === 'vi' ? 'Trạng thái' : 'Status',
      truncateText: true,
      width: '20%',
      render: (status: string) => {
        let color: 'success' | 'orange' | 'danger' | 'subdued' = 'subdued';
        switch (status) {
          case 'Đang bán':
          case 'Available':
            color = 'success';
            break;
          case 'Đã đặt cọc':
          case 'Deposit Paid':
            color = 'orange';
            break;
          case 'Đã bán':
          case 'Sold':
            color = 'danger';
            break;
        }
        return <EuiHealth color={color}>{status}</EuiHealth>;
      },
    },
    {
      name: language === 'vi' ? 'Thao Tác' : 'Actions',
      width: '15%',
      render: (role: Role) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label="Edit"
              color="success"
              onClick={() => openEditUserModal(role)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="image"
              aria-label="View"
              color="success"
              onClick={() => openDetaileUserModal(role)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // Modal handlers
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Thêm dự án mới' : 'Add New Project'}</div>,
      children: <CreateView onSearch={fetchAllRoles} language={language} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Chỉnh sửa chi tiết từng phòng' : 'Edit detail'}</div>,
      children: <EditView role={role} onSearch={fetchAllRoles} language={language} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

 const openDetaileUserModal = (role: Role) => {
  modals.openConfirmModal({
    title: (
      <div style={{ fontWeight: 600, fontSize: 18 }}>
        {language === 'vi' ? 'Hình ảnh' : 'Image'}
      </div>
    ),
    children: (
      <View
        idItem={role.id}
        port={Number(role.port)}
        language={language}
        onSearch={() => {
          // Chỉ refresh dữ liệu bên trong component View, modal vẫn giữ mở
          console.log("refresh data only");
        }}
      />
    ),
    confirmProps: { display: 'none' }, // ẩn nút xác nhận
    cancelProps: { display: 'none' },  // ẩn nút hủy
    size: '50%',
  });
};

  // Table selection
  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => {
      console.log('Selected items:', items);
    },
  };

  // Table pagination
  const onTableChange = ({ page }: Criteria<Role>) => {
    if (page) setPagination((prev) => ({ ...prev, pageIndex: page.index ?? 0, pageSize: page.size ?? prev.pageSize }));
  };

  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedBuildingTypes([]);
    setSelectedStatuses([]);
    setSelectedDirections([]);
  };

  // ✅ Component FilterItem
  const FilterItem = ({
    label,
    options,
    selected,
    setSelected,
  }: {
    label: string;
    options: string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const [opened, setOpened] = useState(false);

    return (
      <Menu shadow="md" width={200} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
        <Menu.Target>
          <Text
            size="sm"
            fw={500}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: selected.length > 0 ? '#1E88E5' : '#555',
            }}
          >
            {selected.length > 0 ? selected.join(', ') : label}
            {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          {options.map((opt) => (
            <Menu.Item
              key={opt}
              onClick={() => {
                setSelected((prev) =>
                  prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
                );
              }}
            >
              <Text
                size="sm"
                fw={selected.includes(opt) ? 600 : 400}
                c={selected.includes(opt) ? 'blue' : 'black'}
              >
                {opt}
              </Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  };

  return (
    <>
      {/* Language */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="language-select" style={{ marginRight: 8 }}>
          {language === 'vi' ? 'Chọn ngôn ngữ:' : 'Select Language:'}
        </label>
        <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}>
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <AppAction openModal={openModal} language={language} />

      <Divider my="sm"  labelPosition="center" />

      {/* Filters */}
      <EuiFlexGroup style={{ marginBottom: '12px' }} alignItems="flexEnd" gutterSize="m">
        <EuiFlexItem grow={false}>
          <FilterItem
            label={language === 'vi' ? 'Chọn khu vực' : 'Select Zone'}
            options={zoneOptions}
            selected={selectedZones}
            setSelected={setSelectedZones}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label={language === 'vi' ? 'Chọn loại nhà' : 'Select Building Type'}
            options={buildingTypeOptions}
            selected={selectedBuildingTypes}
            setSelected={setSelectedBuildingTypes}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label={language === 'vi' ? 'Chọn trạng thái' : 'Select Status'}
            options={statusOptions}
            selected={selectedStatuses}
            setSelected={setSelectedStatuses}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label={language === 'vi' ? 'Chọn hướng nhà' : 'Select Direction'}
            options={directionOptions}
            selected={selectedDirections}
            setSelected={setSelectedDirections}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <Button
            leftSection={<span>🗑️</span>}
            style={{ backgroundColor: '#406c88', color: '#fff' }}
            loading={loading}
            onClick={clearFilters}
          >
            {language === 'vi' ? 'Xóa' : 'Clear'}
          </Button>
        </EuiFlexItem>
      </EuiFlexGroup>

      <Divider my="sm" />

      <EuiBasicTable
        tableCaption={language === 'vi' ? 'Danh sách dự án hệ thống' : 'System Project List'}
        responsiveBreakpoint={false}
        items={displayRoles}
        columns={columns}
        loading={loading}
        itemId="id"
        selection={selection}
        rowHeader="description"
        noItemsMessage={
          error
            ? error
            : loading
            ? language === 'vi'
              ? 'Đang tải dữ liệu...'
              : 'Loading data...'
            : language === 'vi'
            ? 'Không có dự án nào.'
            : 'No projects found.'
        }
        pagination={{
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          totalItemCount: pagination.totalItemCount ?? 0,
          pageSizeOptions: pagination.pageSizeOptions ?? [10, 20, 50, 150, 200],
        }}
        onChange={onTableChange}
      />
    </>
  );
};

export default RoleTable;