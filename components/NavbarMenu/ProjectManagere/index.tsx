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
  EuiFormRow,
  EuiComboBox,
  EuiButton,
} from '@elastic/eui';
import { Divider } from '@mantine/core';
import { modals } from '@mantine/modals';

import { getListRoles } from '../../../api/apigetlistdetailproject';
import CreateView from './CreateView';
// import DeleteView from './DeleteView';
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
  const [allRoles, setAllRoles] = useState<Role[]>([]); // toàn bộ dữ liệu từ server
  const [displayRoles, setDisplayRoles] = useState<Role[]>([]); // dữ liệu sau filter + pagination
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Xóa selectedItems vì chưa dùng
  // const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  // --- Filter options ---
  const [zoneOptions, setZoneOptions] = useState<{ label: string }[]>([]);
  const [buildingTypeOptions, setBuildingTypeOptions] = useState<{ label: string }[]>([]);
  const [statusOptions, setStatusOptions] = useState<{ label: string }[]>([]);
  const [directionOptions, setDirectionOptions] = useState<{ label: string }[]>([]);

  // --- Selected filter values ---
  const [selectedZones, setSelectedZones] = useState<{ label: string }[]>([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState<{ label: string }[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<{ label: string }[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<{ label: string }[]>([]);

  // --- Fetch all data from server ---
  const fetchAllRoles = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError(language === 'vi' ? '⚠️ Không tìm thấy token. Vui lòng đăng nhập.' : '⚠️ Token not found. Please login.');
      setLoading(false);
      return;
    }

    try {
      let allData: Role[] = [];
      let skip = 0;
      const limit = 50;
      let total = 0;

      do {
        const res = await getListRoles({ token, lang: language, skip, limit });
        allData = [...allData, ...(res.items
 || [])];
        total = res.total;
        skip += limit;
      } while (skip < total);

      setAllRoles(allData);

      // --- set options filter ---
      setZoneOptions(Array.from(new Set(allData.map(r => r.zone_name || '').filter(v => v !== ''))).map(v => ({ label: v })));
      setBuildingTypeOptions(Array.from(new Set(allData.map(r => r.building_type || '').filter(v => v !== ''))).map(v => ({ label: v })));
      setStatusOptions(Array.from(new Set(allData.map(r => r.status || '').filter(v => v !== ''))).map(v => ({ label: v })));
      setDirectionOptions(Array.from(new Set(allData.map(r => r.direction || '').filter(v => v !== ''))).map(v => ({ label: v })));

      setPagination(prev => ({ ...prev, totalItemCount: allData.length }));
      setError(null);
    } catch (err: unknown) {
      console.error('❌ Lỗi fetchAllRoles:', err);
      if (err instanceof Error) setError(err.message);
      else setError(language === 'vi' ? 'Đã xảy ra lỗi khi tải dữ liệu.' : 'An error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchAllRoles();
  }, [fetchAllRoles]);

  // --- Apply filter & pagination ---
  useEffect(() => {
    const filtered = allRoles.filter(role => {
      const matchZone = selectedZones.length === 0 || selectedZones.some(z => z.label === role.zone_name);
      const matchBuildingType = selectedBuildingTypes.length === 0 || selectedBuildingTypes.some(bt => bt.label === role.building_type);
      const matchStatus = selectedStatuses.length === 0 || selectedStatuses.some(s => s.label === role.status);
      const matchDirection = selectedDirections.length === 0 || selectedDirections.some(d => d.label === role.direction);
      return matchZone && matchBuildingType && matchStatus && matchDirection;
    });

    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    setDisplayRoles(filtered.slice(start, end));

    setPagination(prev => ({ ...prev, totalItemCount: filtered.length }));
  }, [allRoles, selectedZones, selectedBuildingTypes, selectedStatuses, selectedDirections, pagination.pageIndex, pagination.pageSize]);

  // --- Columns ---
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
            <EuiButtonIcon iconType="documentEdit" aria-label="Edit" color="success" onClick={() => openEditUserModal(role)} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon iconType="eye" aria-label="View" color="success" onClick={() => openDetaileUserModal(role)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // --- Modal handlers ---
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
        {language === "vi" ? "Hình ảnh" : "Image"}
      </div>
    ),
    children: (
      <View
        idItem={role.id}                  // 👈 thêm idItem
        port={Number(role.port)}              // giữ nguyên
        language={language}                   // giữ nguyên
        onSearch={() => console.log("Search")} // 👈 thêm onSearch
      />
    ),
    confirmProps: { display: "none" },
    cancelProps: { display: "none" },
    size: "50%",
  });
};

  // --- Table selection ---
  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => {
      // Chỉ log ra console, không cần state
      console.log('Selected items:', items);
    },
  };

  // --- Table pagination ---
  const onTableChange = ({ page }: Criteria<Role>) => {
    if (page) setPagination(prev => ({ ...prev, pageIndex: page.index ?? 0, pageSize: page.size ?? prev.pageSize }));
  };

  const clearFilters = () => {
    setSelectedZones([]);
    setSelectedBuildingTypes([]);
    setSelectedStatuses([]);
    setSelectedDirections([]);
  };

  return (
    <>
      {/* Language */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="language-select" style={{ marginRight: 8 }}>{language === 'vi' ? 'Chọn ngôn ngữ:' : 'Select Language:'}</label>
        <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}>
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <AppAction openModal={openModal} language={language} />

      <Divider my="sm" label={language === 'vi' ? 'Danh sách dự án' : 'Project List'} labelPosition="center" />

      {/* Filters */}
      <EuiFlexGroup style={{ marginBottom: '12px' }} alignItems="flexEnd" gutterSize="m">
        {/* Zone Filter */}
        <EuiFlexItem grow={3}>
          <EuiFormRow label={language === 'vi' ? 'Chọn khu vực:' : 'Select Zone:'} fullWidth>
            <EuiComboBox
              placeholder={language === 'vi' ? 'Chọn khu vực:' : 'Select Zone:'}
              options={Array.from(
                new Map(
                  zoneOptions.map(option => [
                    option.label.split('.')[0],
                    { label: option.label.split('.')[0], value: option.label.split('.')[0] },
                  ])
                ).values()
              )}
              selectedOptions={selectedZones}
              onChange={(options) => setSelectedZones(options as { label: string; value?: string }[])}
              isClearable
              fullWidth
              isDisabled={loading}
            />
          </EuiFormRow>
        </EuiFlexItem>

        {/* Building Type Filter */}
        <EuiFlexItem grow={3}>
          <EuiFormRow label={language === 'vi' ? 'Chọn loại nhà:' : 'Select Building Type:'} fullWidth>
            <EuiComboBox
              placeholder={language === 'vi' ? 'Chọn loại nhà:' : 'Select Building Type:'}
              options={buildingTypeOptions}
              selectedOptions={selectedBuildingTypes}
              onChange={(options) => setSelectedBuildingTypes(options as { label: string }[])}
              isClearable
              fullWidth
              isDisabled={loading}
            />
          </EuiFormRow>
        </EuiFlexItem>

        {/* Status Filter */}
        <EuiFlexItem grow={3}>
          <EuiFormRow label={language === 'vi' ? 'Chọn trạng thái:' : 'Select Status:'} fullWidth>
            <EuiComboBox
              placeholder={language === 'vi' ? 'Chọn trạng thái:' : 'Select Status:'}
              options={statusOptions}
              selectedOptions={selectedStatuses}
              onChange={(options) => setSelectedStatuses(options as { label: string }[])}
              isClearable
              fullWidth
              isDisabled={loading}
            />
          </EuiFormRow>
        </EuiFlexItem>

        {/* Direction Filter */}
        <EuiFlexItem grow={3}>
          <EuiFormRow label={language === 'vi' ? 'Chọn hướng nhà:' : 'Select Direction:'} fullWidth>
            <EuiComboBox
              placeholder={language === 'vi' ? 'Chọn hướng nhà:' : 'Select Direction:'}
              options={directionOptions}
              selectedOptions={selectedDirections}
              onChange={(options) => setSelectedDirections(options as { label: string }[])}
              isClearable
              fullWidth
              isDisabled={loading}
            />
          </EuiFormRow>
        </EuiFlexItem>

        {/* Clear Filters Button */}
        <EuiFlexItem grow={1}>
          <EuiButton
            iconType="trash"
            style={{ backgroundColor: "#406c88", color: "#fff" }}
            isLoading={loading}
            onClick={clearFilters}
          >
            {language === 'vi' ? 'Xóa' : 'Clear'}
          </EuiButton>
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
            ? language === 'vi' ? 'Đang tải dữ liệu...' : 'Loading data...'
            : language === 'vi' ? 'Không có dự án nào.' : 'No projects found.'
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


