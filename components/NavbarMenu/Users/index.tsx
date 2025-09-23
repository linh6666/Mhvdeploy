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
import { Divider, Text, Menu, Pill, Badge } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconChevronDown, IconChevronUp, IconFilterFilled } from '@tabler/icons-react';

import { getListRoles } from '../../../api/apigetlistuse';
import CreateView from './CreateView';
import DeleteView from './DeleteView';
import EditView from './EditView';
import AppAction from '../../../common/AppAction';
import AppSearch from '../../../common/AppSearch';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';

type Role = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  is_active: boolean;
  is_superuser: boolean;
  system_rank: number | null;
};

const RoleTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);

  // Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  // Filter states
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedPhones, setSelectedPhones] = useState<string[]>([]);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);

  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [emailOptions, setEmailOptions] = useState<string[]>([]);
  const [phoneOptions, setPhoneOptions] = useState<string[]>([]);
  const [rankOptions, setRankOptions] = useState<string[]>([]);

  // Fetch roles
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
      const res = await getListRoles({ token, skip, limit });
      const { data, total } = res;
      const list = data || [];
      setRoles(list);
      setAllRoles(list);

      // Set filter options
      setNameOptions(
        Array.from(new Set(list.map((r: Role) => r.full_name || ''))).filter(n => n) as string[]
      );
      setEmailOptions(
        Array.from(new Set(list.map((r: Role) => r.email))).filter(n => n) as string[]
      );
      setPhoneOptions(
        Array.from(new Set(list.map((r: Role) => r.phone || ''))).filter(n => n) as string[]
      );
      setRankOptions(
        Array.from(new Set(list.map((r: Role) => r.system_rank !== null ? String(r.system_rank) : ''))).filter(n => n) as string[]
      );

      setPagination(prev => ({
        ...prev,
        totalItemCount: total ?? list.length,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Đã xảy ra lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // Filter + search effect
  useEffect(() => {
    let filtered = allRoles;

    if (searchValue) {
      const lower = searchValue.toLowerCase();
      filtered = filtered.filter(r =>
        (r.full_name?.toLowerCase().includes(lower)) ||
        r.email.toLowerCase().includes(lower) ||
        (r.phone?.toLowerCase().includes(lower)) ||
        (r.system_rank !== null && String(r.system_rank).includes(lower))
      );
    }

    if (selectedNames.length > 0) filtered = filtered.filter(r => r.full_name && selectedNames.includes(r.full_name));
    if (selectedEmails.length > 0) filtered = filtered.filter(r => selectedEmails.includes(r.email));
    if (selectedPhones.length > 0) filtered = filtered.filter(r => r.phone && selectedPhones.includes(r.phone));
    if (selectedRanks.length > 0) filtered = filtered.filter(r => r.system_rank !== null && selectedRanks.includes(String(r.system_rank)));

    setRoles(filtered);
  }, [allRoles, searchValue, selectedNames, selectedEmails, selectedPhones, selectedRanks]);

  const clearFilters = () => {
    setSelectedNames([]);
    setSelectedEmails([]);
    setSelectedPhones([]);
    setSelectedRanks([]);
    setSelectedItems([]);
    setRoles(allRoles);
  };

  // FilterItem component
 const FilterItem = ({
  label,
  options,
  selected,
  setSelected,
  iconType, // iconType có thể là undefined
}: {
  label: string;
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  iconType?: string; // Để iconType là optional
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
          {iconType && (
            <EuiButtonIcon
              iconType={iconType}
              aria-label={label}
              color={selected.length > 0 ? 'primary' : 'text'}
              size="s"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
            />
          )}
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

  // Table columns
  const columns: Array<EuiBasicTableColumn<Role>> = [
    { field: 'full_name', name: 'Họ tên', truncateText: true, width: '20%' },
    { field: 'email', name: 'Email', truncateText: true, width: '25%' },
    { field: 'phone', name: 'SĐT', truncateText: true, width: '15%' },
    {
      field: 'system_rank',
      name: 'Cấp bậc',
      width: '15%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    {
      field: 'is_superuser',
      name: 'Quyền hệ thống',
      width: '15%',
      render: (isSuperuser: boolean) =>
        isSuperuser ? <Badge color="yellow">Quản trị</Badge> : <Badge variant="outline">Người dùng</Badge>,
    },
    {
      name: 'Hành động',
      width: '10%',
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

  // Modal handlers
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm người dùng mới</div>,
      children: <CreateView onSearch={fetchRoles} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };
  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa người dùng</div>,
      children: <EditView id={role.id} onSearch={fetchRoles} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };
  const openDeleteUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa vai trò</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchRoles} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => setSelectedItems(items),
    selected: selectedItems,
  };

  const onTableChange = ({ page }: Criteria<Role>) => {
    if (page) setPagination(prev => ({ ...prev, pageIndex: page.index ?? 0, pageSize: page.size ?? 50 }));
  };

  // tổng hợp filter đang chọn
  const selectedFilters = [
    ...selectedNames,
    ...selectedEmails,
    ...selectedPhones,
    ...selectedRanks,
  ];

  const hasSelectedItems = selectedFilters.length > 0;

  const handleRemoveSelected = (item: string) => {
    setSelectedNames(prev => prev.filter(v => v !== item));
    setSelectedEmails(prev => prev.filter(v => v !== item));
    setSelectedPhones(prev => prev.filter(v => v !== item));
    setSelectedRanks(prev => prev.filter(v => v !== item));
  };

  return (
    <>
      <AppAction openModal={openModal} />

      <Divider my="sm" labelPosition="center" />

      <AppSearch value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onSearch={val => setSearchValue(val)} />

      {/* Lọc theo tiêu chí */}
      <div style={{ marginBottom: 12 }}>
        <h2>
          Lọc theo tiêu chí:
          {selectedFilters.map((item) => (
            <Pill
              key={item}
              withRemoveButton
              onRemove={() => handleRemoveSelected(item)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <IconFilterFilled size={12} />
                <span>{item}</span>
              </div>
            </Pill>
          ))}
          {hasSelectedItems && (
            <Pill
              onClick={clearFilters}
              variant="outline"
              color="red"
              style={{ marginLeft: "8px" }}
            >
              Xóa tất cả
            </Pill>
          )}
        </h2>
      </div>

      {/* Filter dropdowns */}
      <EuiFlexGroup alignItems="center" gutterSize="m" style={{ margin: '12px 0' }}>
        <EuiFlexItem grow={false}>
          <FilterItem label="Chọn Họ tên" options={nameOptions} selected={selectedNames} setSelected={setSelectedNames}  />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem label="Chọn Email" options={emailOptions} selected={selectedEmails} setSelected={setSelectedEmails}  />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem label="Chọn SĐT" options={phoneOptions} selected={selectedPhones} setSelected={setSelectedPhones}  />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem label="Chọn Cấp bậc" options={rankOptions} selected={selectedRanks} setSelected={setSelectedRanks}  />
        </EuiFlexItem>
      </EuiFlexGroup>

      <Divider my="sm" />

      <EuiBasicTable
        tableCaption="Danh sách người dùng hệ thống"
        responsiveBreakpoint={false}
        items={roles}
        columns={columns}
        loading={loading}
        itemId="id"
        selection={selection}
        rowHeader="full_name"
        noItemsMessage={error ? error : loading ? 'Đang tải dữ liệu...' : 'Không có người dùng nào.'}
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
