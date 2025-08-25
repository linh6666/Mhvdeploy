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

import { getListRoles } from '../../../api/apigetlistdetailproject';
import CreateView from './CreateView';
import DeleteView from './DeleteView';
import EditView from './EditView';
import AppAction from '../../../common/AppAction';
import AppSearch from '../../../common/AppSearch';
import { NotificationExtension } from '../../../common/extension/NotificationExtension';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';
import Image from 'next/image';

type Role = {

  id: string;
  building_name: string;
  bedroom: number;
  zone_name: string;
  building_type: string;
  status: string;
  direction: string;
  description: string;

};

const RoleTable = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Role[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError(language === 'vi' ? '⚠️ Không tìm thấy token. Vui lòng đăng nhập.' : '⚠️ Token not found. Please login.');
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
        lang: language, // truyền ngôn ngữ
      });

      const { data, total } = res;
      setRoles(data || []);
      setPagination((prev) => ({
        ...prev,
        totalItemCount: total ?? data.length ?? 0,
      }));
    } catch (err: unknown) {
      console.error('❌ Lỗi gọi API:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(language === 'vi' ? 'Đã xảy ra lỗi khi tải dữ liệu.' : 'An error occurred while loading data.');
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, language]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const columns: Array<EuiBasicTableColumn<Role>> = [
     {
      field: 'zone_name',
      name: language === 'vi' ? 'Tên Khu' : 'Zone Name',
      truncateText: true,
      width: '20%',
    },

    {
      field: 'building_name',
      name: language === 'vi' ? 'Tên nhà' : 'Building Name',
      truncateText: true,
      width: '25%',
    },
    {
      field: 'bedroom',
      name: language === 'vi' ? 'Số phòng' : 'Bedroom',
      truncateText: true,
      width: '15%',
    },
    {
      field: 'building_type',
      name: language === 'vi' ? 'Loại nhà' : 'Building Type',
      truncateText: true,
      width: '25%',
    },
    {
      field: 'direction',
      name: language === 'vi' ? 'Hướng nhà' : 'Direction',
      truncateText: true,
      width: '20%',
     
    },
    {
    field: 'status',
    name: language === 'vi' ? 'Trạng thái' : 'Status',
    truncateText: true,
    width: '20%',
    render: (status: string) => {
      let color = 'subdued';

      switch (status) {
        case 'Đang bán':
          color = 'danger'; // đỏ
          break;
        case 'Đã đặt cọc':
          color = 'yellow'; // vàng
          break;
        case 'Đã bán':
          color = 'success'; // xanh lá
          break;
        default:
          color = 'subdued'; // mặc định xám
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
              aria-label={language === 'vi' ? 'Chỉnh sửa' : 'Edit'}
              color="success"
              onClick={() => openEditUserModal(role)}
            />
          </EuiFlexItem>
          {/* <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label={language === 'vi' ? 'Xóa' : 'Delete'}
              color="danger"
              onClick={() => openDeleteUserModal(role)}
            />
          </EuiFlexItem> */}
        </EuiFlexGroup>
      ),
    },
  ];

  // Modal thêm
  const openModal = () => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Thêm dự án mới' : 'Add New Project'}</div>,
      children: <CreateView onSearch={fetchRoles} language={language} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Modal sửa
  const openEditUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Chỉnh sửa chi tiết từng phòng' : 'Edit detail '}</div>,
      children:  <EditView role={role} onSearch={fetchRoles} language={language} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Modal xóa
  const openDeleteUserModal = (role: Role) => {
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Xóa dự án' : 'Delete Project'}</div>,
      children: <DeleteView idItem={[role.id]} onSearch={fetchRoles} language={language} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  const openModalEdit = () => {
    if (selectedItems.length !== 1) {
      NotificationExtension.Warn(language === 'vi' ? 'Vui lòng chọn 1 dự án để chỉnh sửa' : 'Please select exactly 1 project to edit');
      return;
    }
    openEditUserModal(selectedItems[0]);
  };

  const openModalDelete = () => {
    if (selectedItems.length < 1) {
      NotificationExtension.Warn(language === 'vi' ? 'Vui lòng chọn ít nhất 1 dự án để xóa' : 'Please select at least 1 project to delete');
      return;
    }
    const ids = selectedItems.map((role) => role.id);
    modals.openConfirmModal({
      title: <div style={{ fontWeight: 600, fontSize: 18 }}>{language === 'vi' ? 'Xóa dự án' : 'Delete Project'}</div>,
      children: <DeleteView idItem={ids} onSearch={fetchRoles} language={language} />,
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
      {/* Dropdown chọn ngôn ngữ */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="language-select" style={{ marginRight: 8 }}>
          {language === 'vi' ? 'Chọn ngôn ngữ:' : 'Select Language:'}
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>

      <AppAction
        openModal={openModal}
        // openModalDelete={openModalDelete}
        // openModalEdit={openModalEdit}
        language={language}
      />

      <Divider my="sm" label={language === 'vi' ? 'Danh sách dự án' : 'Project List'} labelPosition="center" />
   <AppSearch language={language} />
      <Divider my="sm" />

      <EuiBasicTable
        tableCaption={language === 'vi' ? 'Danh sách dự án hệ thống' : 'System Project List'}
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