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
import { IconChevronDown, IconChevronUp, IconFilterFilled } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

import { getListRoles } from '../../../api/getlistrole';
import CreateView from './CreateView';
import DeleteView from './DeleteView';
import EditView from './EditView';
import AppAction from '../../../common/AppAction';
import AppSearch from '../../../common/AppSearch';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';

type Role = {
  id: string;
  name: string;
  description?: string;
  rank: number;
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
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [nameOptions, setNameOptions] = useState<string[]>([]);
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

      const list: Role[] = data || [];
      setRoles(list);
      setAllRoles(list);

      // Set filter options
      setNameOptions(Array.from(new Set(list.map(r => r.name))).sort());
      setRankOptions(
        Array.from(new Set(list.map(r => String(r.rank)))).sort(
          (a, b) => parseInt(a) - parseInt(b)
        )
      );

      setPagination((prev) => ({
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

  // Search & Filter
  useEffect(() => {
    let filtered = allRoles;

    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerSearch) ||
          r.description?.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedNames.length > 0) {
      filtered = filtered.filter((r) => selectedNames.includes(r.name));
    }

    if (selectedRanks.length > 0) {
      filtered = filtered.filter((r) => selectedRanks.includes(String(r.rank)));
    }

    setRoles(filtered);
  }, [allRoles, searchValue, selectedNames, selectedRanks]);

  // Clear filters / selections
  const clearFilters = () => {
    setSelectedNames([]);
    setSelectedRanks([]);
    setSelectedItems([]);
    setRoles(allRoles);
  };

  const handleRemoveSelected = (value: string) => {
    setSelectedNames((prev) => prev.filter((v) => v !== value));
    setSelectedRanks((prev) => prev.filter((v) => v !== value));
  };

  // FilterItem component
const FilterItem = ({
    label,
    options,
    selected,
    setSelected,
    iconType, // Không cần đặt giá trị mặc định
}: {
    label: string;
    options: string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    iconType?: string;  // Đặt là optional
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
                {options.map((opt) => (
                    <Menu.Item
                        key={opt}
                        onClick={() =>
                            setSelected((prev) =>
                                prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]
                            )
                        }
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

  // Table columns
  const columns: Array<EuiBasicTableColumn<Role>> = [
    { field: 'name', name: 'Tên', truncateText: true, width: '30%' },
    {
      field: 'rank',
      name: 'Cấp bậc',
      width: '20%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    { field: 'description', name: 'Mô tả', truncateText: true, width: '30%' },
    {
      name: 'Thao tác',
      width: '25%',
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
              iconType="trash"
              aria-label="Delete"
              color="danger"
              onClick={() => openDeleteUserModal(role)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // Modal handlers
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Thêm vai trò mới</div>,
      children: <CreateView onSearch={fetchRoles} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };
  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Chỉnh sửa vai trò: {role.description}</div>,
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
    if (page) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: page.index ?? 0,
        pageSize: page.size ?? 50,
      }));
    }
  };

  // Selected filters for pill
  const selectedFilters = [...selectedNames, ...selectedRanks];
  const hasSelectedItems =
    selectedNames.length > 0 || selectedRanks.length > 0 || selectedItems.length > 0;

  return (
    <>
      <AppAction openModal={openModal} />
      <Divider my="sm" labelPosition="center" />

     <AppSearch
  value={searchTerm}
  onChange={(e) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (val === "") {
      // Khi xóa hết input -> reset searchValue để hiển thị tất cả
      setSearchValue("");
    }
  }}
  onSearch={(val) => setSearchValue(val)}
/>
      {/* 🔹 Hiển thị Lọc theo tiêu chí */}
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
              <span style={{ marginRight: 4 }}>     <IconFilterFilled size={12} /></span>
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
           
             <Pill  onClick={clearFilters} variant="outline" color="red" style={{ marginLeft: '8px' }}>
                  Xóa tất cả
                </Pill>
          )}
        </h2>
      </div>

      {/* Filters */}
      <EuiFlexGroup alignItems="center" gutterSize="m" style={{ margin: '12px 0' }}>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Tên"
            options={nameOptions}
            selected={selectedNames}
            setSelected={setSelectedNames}
            // iconType="filter"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <FilterItem
            label="Chọn Cấp bậc"
            options={rankOptions}
            selected={selectedRanks}
            setSelected={setSelectedRanks}
            // iconType="filter"
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
        itemId="id"
        selection={selection}
        rowHeader="description"
        noItemsMessage={error ? error : loading ? 'Đang tải dữ liệu...' : 'Không có vai trò nào.'}
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

