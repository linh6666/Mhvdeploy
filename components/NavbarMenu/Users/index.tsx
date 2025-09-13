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
import { Badge, Divider } from '@mantine/core';
import { modals } from '@mantine/modals';

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
  const [allRoles, setAllRoles] = useState<Role[]>([]); // ✅ lưu danh sách gốc để search
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);

  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>(''); // text input
  const [searchValue, setSearchValue] = useState<string>(''); // text đã xác nhận

  // 👉 log state để tránh warning ESLint
  useEffect(() => {
    console.log("📌 Selected Items:", selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    console.log("🔍 Confirmed Search Value:", searchValue);
  }, [searchValue]);

  // Lấy danh sách từ API
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

      const res = await getListRoles({
        token,
        skip,
        limit,
      });

      const { data, total } = res;
      setRoles(data || []);
      setAllRoles(data || []); // ✅ lưu lại để search
      setPagination((prev) => ({
        ...prev,
        totalItemCount: total ?? data.length ?? 0,
      }));
    } catch (err: unknown) {
      console.error('❌ Lỗi gọi API:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi khi tải dữ liệu.');
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // 👉 dùng search
  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log("🔍 Search Value:", value); // log ngay khi search

    if (!value.trim()) {
      setRoles(allRoles); // nếu trống thì reset
      return;
    }

    const filtered = allRoles.filter(
      (role) =>
        role.full_name?.toLowerCase().includes(value.toLowerCase()) ||
        role.email.toLowerCase().includes(value.toLowerCase()) ||
        role.phone?.toLowerCase().includes(value.toLowerCase())
    );
    setRoles(filtered);
  };

  // Cột bảng
  const columns: Array<EuiBasicTableColumn<Role>> = [
    {
      field: 'full_name',
      name: 'Họ tên',
      truncateText: true,
      width: '25%',
    },
    {
      field: 'email',
      name: 'Email',
      truncateText: true,
      width: '30%',
    },
    {
      field: 'phone',
      name: 'SĐT',
      truncateText: true,
      width: '20%',
    },
    {
      field: 'system_rank',
      name: 'Cấp bậc',
      width: '20%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    {
      field: 'is_superuser',
      name: 'Quyền hệ thống ',
      width: '20%',
      render: (isSuperuser: boolean) =>
        isSuperuser ? (
          <Badge color="yellow">Quản trị</Badge>
        ) : (
          <Badge variant="outline">Người dùng</Badge>
        ),
      truncateText: true,
    },
    {
      name: 'Hành động',
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

  // Modal thêm
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

  return (
    <>
      <AppAction openModal={openModal} />

      <Divider my="sm" labelPosition="center" />

      {/* ✅ thanh tìm kiếm */}
      <AppSearch
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />

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

