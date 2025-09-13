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
import { Divider } from '@mantine/core';
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
  const [allRoles, setAllRoles] = useState<Role[]>([]); // ✅ lưu dữ liệu gốc
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);

  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>(''); // nhập trong input
  const [searchValue, setSearchValue] = useState<string>(''); // khi bấm nút Search mới set

 useEffect(() => {
    console.log("🔍 Confirmed Search Value:", searchValue);
  }, [searchValue]);

  
  // Gọi API lấy danh sách vai trò
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

      setRoles(data || []);
      setAllRoles(data || []); // ✅ lưu toàn bộ để search
      setPagination((prev) => ({
        ...prev,
        totalItemCount: total ?? data.length ?? 0,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('❌ Lỗi gọi API:', err);
        setError(err.message);
      } else {
        console.error('❌ Lỗi không xác định:', err);
        setError('Đã xảy ra lỗi khi tải dữ liệu.');
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // ✅ Khi click tìm kiếm
  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      // Nếu ô tìm kiếm rỗng → reset về allRoles
      setRoles(allRoles);
      return;
    }

    const filtered = allRoles.filter(
      (role) =>
        role.name.toLowerCase().includes(value.toLowerCase()) ||
        role.description?.toLowerCase().includes(value.toLowerCase())
    );
    setRoles(filtered);
  };

  // Các cột hiển thị
  const columns: Array<EuiBasicTableColumn<Role>> = [
    {
      field: 'name',
      name: 'Tên',
      truncateText: true,
      width: '30%',
    },
    {
      field: 'rank',
      name: 'Cấp bậc',
      width: '20%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    {
      field: 'description',
      name: 'Mô tả',
      truncateText: true,
      width: '30%',
    },
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

  // Modal thêm mới
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

  // Modal chỉnh sửa
  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          Chỉnh sửa vai trò: {role.description}
        </div>
      ),
      children: <EditView id={role.id} onSearch={fetchRoles} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Modal xóa
  const openDeleteUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>Xóa vai trò</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchRoles} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Lựa chọn trong bảng
  const selection = {
    selectable: () => true,
    onSelectionChange: (items: Role[]) => setSelectedItems(items),
    selected: selectedItems,
  };

  // Xử lý phân trang
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

      {/* ✅ Tích hợp AppSearch */}
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

