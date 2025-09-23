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
import { Divider, Text, Menu, Pill } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconChevronDown, IconChevronUp, IconFilterFilled } from '@tabler/icons-react';

import { getListRoles } from '../../../api/apiUserProjectRole';
import CreateView from './CreateView';
import DeleteView from './DeleteView';
import EditView from './EditView';
import AppAction from '../../../common/AppAction';
import AppSearch from '../../../common/AppSearch';
import { NotificationExtension } from '../../../common/extension/NotificationExtension';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';

export type Role = {
  id: string;
  user_id: string;
  user_email: string;
  project_id: string;
  project_name: string;
  role_id: string;
  role_name: string;
  role_rank: number;
  user_project_role_id: string;
};

export interface RoleApiResponse {
  assignments: Role[];
  total: number;
}

const RoleTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);

  // Search
  const [tempSearchTerm, setTempSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter states
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  const [emailOptions, setEmailOptions] = useState<string[]>([]);
  const [projectOptions, setProjectOptions] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<string[]>([]);
  const [rankOptions, setRankOptions] = useState<string[]>([]);

  // Fetch API
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('⚠️ Không tìm thấy token. Vui lòng đăng nhập.');
      setLoading(false);
      return;
    }

    try {
      const skip = pagination.pageIndex * pagination.pageSize;
      const limit = pagination.pageSize;

      const res: RoleApiResponse = await getListRoles({ token, skip, limit });

      const rolesWithId = res.assignments.map((r) => ({
        ...r,
        user_project_role_id: r.user_project_role_id || r.id,
      }));

      setRoles(rolesWithId);
      setAllRoles(rolesWithId);

      // Set filter options
      setEmailOptions([...new Set(rolesWithId.map(r => r.user_email))].filter(Boolean) as string[]);
      setProjectOptions([...new Set(rolesWithId.map(r => r.project_name))].filter(Boolean) as string[]);
      setRoleOptions([...new Set(rolesWithId.map(r => r.role_name))].filter(Boolean) as string[]);
      setRankOptions([...new Set(rolesWithId.map(r => r.role_rank.toString()))].filter(Boolean) as string[]);

      setPagination((prev) => ({
        ...prev,
        totalItemCount: res.total ?? rolesWithId.length,
      }));
    } catch (err: unknown) {
      console.error('❌ Lỗi gọi API:', err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Filter + Search effect
  useEffect(() => {
    let filtered = allRoles;

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          (r.user_email ?? '').toLowerCase().includes(lower) ||
          (r.project_name ?? '').toLowerCase().includes(lower) ||
          (r.role_name ?? '').toLowerCase().includes(lower) ||
          (r.role_rank ?? '').toString().toLowerCase().includes(lower)
      );
    }

    // Filters
    if (selectedEmails.length > 0) filtered = filtered.filter(r => selectedEmails.includes(r.user_email));
    if (selectedProjects.length > 0) filtered = filtered.filter(r => selectedProjects.includes(r.project_name));
    if (selectedRoles.length > 0) filtered = filtered.filter(r => selectedRoles.includes(r.role_name));
    if (selectedRanks.length > 0) filtered = filtered.filter(r => selectedRanks.includes(r.role_rank.toString()));

    setRoles(filtered);
  }, [allRoles, searchTerm, selectedEmails, selectedProjects, selectedRoles, selectedRanks]);

  const clearFilters = () => {
    setSelectedEmails([]);
    setSelectedProjects([]);
    setSelectedRoles([]);
    setSelectedRanks([]);
    setSelectedItems([]);
    setRoles(allRoles);
  };

  const handleSearch = () => {
    setSearchTerm(tempSearchTerm); // Cập nhật giá trị tìm kiếm chính thức khi nhấn nút
  };

  // Filter dropdown component
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
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: selected.length > 0 ? '#1E88E5' : '#555' }}
        >
          {/* <EuiButtonIcon iconType="filter" aria-label={label} color={selected.length > 0 ? 'primary' : 'text'} size="s" onClick={(e) => e.stopPropagation()} /> */}
          {label}
          {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </Text>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map(opt => (
          <Menu.Item
            key={opt}
            onClick={() => setSelected(prev => prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt])}
          >
            <Text size="sm" fw={selected.includes(opt) ? 600 : 400} c={selected.includes(opt) ? 'blue' : 'black'}>
              {opt}
            </Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

  // Modal handlers
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm dự án cho người dùng</div>,
      children: <CreateView onSearch={fetchRoles} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Sửa người dùng dự án</div>,
      children: (
        <EditView
          user_id={role.user_id}
          project_id={role.project_id}
          old_role_id={role.role_id}
          user_project_role_id={role.user_project_role_id}
          onSearch={fetchRoles}
        />
      ),
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  const openDeleteUserModal = (role: Role) => {
    if (!role.user_project_role_id) {
      NotificationExtension.Warn('ID vai trò không hợp lệ.');
      return;
    }

    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa người dùng dự án</div>,
      children: <DeleteView idItem={[role.user_project_role_id]} onSearch={fetchRoles} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Table columns
  const columns: Array<EuiBasicTableColumn<Role>> = [
    { field: 'user_email', name: 'Email', truncateText: true, width: '25%' },
    { field: 'project_name', name: 'Tên Dự Án', truncateText: true, width: '25%' },
    { field: 'role_name', name: 'Tên Vai Trò', truncateText: true, width: '20%' },
    {
      field: 'role_rank',
      name: 'Cấp bậc vai trò',
      width: '10%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    {
      name: 'Thao Tác',
      width: '20%',
      render: (role: Role) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon iconType="documentEdit" aria-label="Edit" color="success" onClick={() => openEditUserModal(role)} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon iconType="trash" aria-label="Delete" color="danger" onClick={() => openDeleteUserModal(role)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // Selection & pagination
  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => setSelectedItems(items),
    selected: selectedItems,
  };

  const onTableChange = ({ page }: Criteria<Role>) => {
    if (page) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page.index ?? 0,
        pageSize: page.size ?? 50,
      }));
    }
  };
    const handleRemoveSelected = (value: string) => {
    setSelectedEmails((prev) => prev.filter((v) => v !== value));
                  setSelectedProjects((prev) => prev.filter((v) => v !== value));
                  setSelectedRoles((prev) => prev.filter((v) => v !== value));
                  setSelectedRanks((prev) => prev.filter((v) => v !== value));
  };

  // Selected filters for pill
  const selectedFilters = [...selectedEmails, ...selectedProjects, ...selectedRoles, ...selectedRanks];
  const hasSelectedItems =
    selectedEmails.length > 0 || selectedProjects.length > 0 || selectedRoles.length > 0 || selectedRanks.length > 0 || selectedItems.length > 0;

  return (
    <>
      <AppAction openModal={openModal} />

      <Divider my="sm" labelPosition="center" />
      <AppSearch 
        value={tempSearchTerm} 
        onChange={(e) => setTempSearchTerm(e.target.value)} 
        onSearch={handleSearch} 
      />

      {/* Hiển thị Lọc theo tiêu chí */}
      <div style={{ marginBottom: 12 }}>
        <h2>
          Lọc theo tiêu chí:
          {selectedFilters.map((item) => (
            <span
              key={item}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: 8,
                padding: '2px 6px',
                borderRadius: 12,
                background: '#f0f0f0',
                fontSize: 13,
              }}
            >
              <span style={{ marginRight: 4 }}>
                <IconFilterFilled size={12} />
              </span>
              {item}
              <span
                onClick={() => handleRemoveSelected(item)}
                style={{
                  marginLeft: 6,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ×
              </span>
            </span>
          ))}
          {hasSelectedItems && (
            <Pill onClick={clearFilters} variant="outline" color="red" style={{ marginLeft: '8px' }}>
              Xóa tất cả
            </Pill>
          )}
        </h2>
      </div>

      {/* Filters */}
      <EuiFlexGroup alignItems="center" gutterSize="m" style={{ margin: '12px 0' }}>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Email"
            options={emailOptions}
            selected={selectedEmails}
            setSelected={setSelectedEmails}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Dự Án"
            options={projectOptions}
            selected={selectedProjects}
            setSelected={setSelectedProjects}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Vai Trò"
            options={roleOptions}
            selected={selectedRoles}
            setSelected={setSelectedRoles}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Cấp bậc"
            options={rankOptions}
            selected={selectedRanks}
            setSelected={setSelectedRanks}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      <Divider my="sm" />

      <EuiBasicTable
        tableCaption="Danh sách vai trò hệ thống"
        responsiveBreakpoint={false}
        items={roles}
        columns={columns}
        loading={loading}
        itemId="role_id"
        selection={selection}
        rowHeader="role_name"
        noItemsMessage={
          error
            ? error
            : loading
            ? 'Đang tải dữ liệu...'
            : 'Không có vai trò nào.'
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