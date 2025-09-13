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
import Image from 'next/image';

import { getListRoles } from '../../../api/apigetlistprojects';
import CreateView from './CreateView';
import DeleteView from './DeleteView';
import EditView from './EditView';
import Announcement from './announcement';


import AppAction from '../../../common/AppAction';
import AppSearch from '../../../common/AppSearch';
import { paginationBase, PaginationOptions } from '../../../_base/model/BaseTable';

type Project = {
  picture: string;
  id: string;
  name: string;
  type: string;
  address: string;
  investor: string;
  image_url: string;
  rank: number;
};

const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
   const [allRoles, setAllRoles] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationOptions>(paginationBase);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
/// tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>(''); // text input
  const [searchValue, setSearchValue] = useState<string>(''); // text đã xác nhận



   useEffect(() => {
    console.log("🔍 Confirmed Search Value:", searchValue);
  }, [searchValue]);

  // Fetch API
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

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
      const skip = pagination.pageIndex * pagination.pageSize;
      const limit = pagination.pageSize;

      const res = await getListRoles({
        token,
        skip,
        limit,
        lang: language,
      });

      const { data, total } = res;
      setProjects(data || []);
         setAllRoles(data || []);
      setPagination((prev) => ({
        ...prev,
        totalItemCount: total ?? data.length ?? 0,
      }));
    } catch (err: unknown) {
      console.error('❌ API error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          language === 'vi'
            ? 'Đã xảy ra lỗi khi tải dữ liệu.'
            : 'An error occurred while loading data.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, language]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
/// Tìm kiếm
  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (!value.trim()) {
      setProjects(allRoles); // nếu trống thì reset
      return;
    }

    const filtered = allRoles.filter(
      (role) =>
        role.name.toLowerCase().includes(value.toLowerCase()) ||
        role.type.toLowerCase().includes(value.toLowerCase()) ||
         role.investor.toLowerCase().includes(value.toLowerCase()) ||
        role.address?.toLowerCase().includes(value.toLowerCase())||
        role.rank.toString().toLowerCase().includes(value.toLowerCase())
    );
    setProjects(filtered);
  };
  // Cột hiển thị
  const columns: Array<EuiBasicTableColumn<Project>> = [
    {
      field: 'name',
      name: language === 'vi' ? 'Tên dự án' : 'Project Name',
      truncateText: true,
      width: '25%',
    },
    {
      field: 'type',
      name: language === 'vi' ? 'Kiểu' : 'Type',
      truncateText: true,
      width: '15%',
    },
    {
      field: 'address',
      name: language === 'vi' ? 'Địa chỉ' : 'Address',
      truncateText: true,
      width: '20%',
    },
    {
      field: 'investor',
      name: language === 'vi' ? 'Nhà Đầu Tư' : 'Investor',
      truncateText: true,
      width: '15%',
    },
    {
      field: 'image_url',
      name: language === 'vi' ? 'Hình ảnh' : 'Image',
      truncateText: true,
      width: '15%',
      render: (value: string) => (
        <Image
          src={value}
          width={120}
          height={80}
          alt={language === 'vi' ? 'Hình ảnh' : 'Image'}
          style={{
            width: '100px',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      ),
    },
    {
      field: 'rank',
      name: language === 'vi' ? 'Cấp bậc' : 'Rank',
      width: '10%',
      render: (rank: number) => <EuiHealth color="success">{rank}</EuiHealth>,
      truncateText: true,
    },
    {
      name: language === 'vi' ? 'Thao Tác' : 'Actions',
      width: '15%',
      render: (project: Project) => (
        <EuiFlexGroup wrap={false} gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="documentEdit"
              aria-label={language === 'vi' ? 'Chỉnh sửa' : 'Edit'}
              color="success"
              onClick={() => openEditProjectModal(project)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconType="trash"
              aria-label={language === 'vi' ? 'Xóa' : 'Delete'}
              color="danger"
              onClick={() => openDeleteProjectModal(project)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
  <EuiButtonIcon
    iconType="bell"
    aria-label={language === 'vi' ? 'Thông báo' : 'Notification'}
    color="primary"
    onClick={() => openNotification(project)}
  />
</EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ];

  // Modal thêm
  const openModal = () => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          {language === 'vi' ? 'Thêm dự án mới' : 'Add New Project'}
        </div>
      ),
      children: <CreateView onSearch={fetchProjects} language={language} />,
      size: 'lg',
      radius: 'md',
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Modal sửa
  const openEditProjectModal = (project: Project) => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          {language === 'vi' ? 'Chỉnh sửa dự án' : 'Edit Project'}
        </div>
      ),
      children: <EditView id={project.id} onSearch={fetchProjects} language={language} />,
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

  // Modal xóa
  const openDeleteProjectModal = (project: Project) => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          {language === 'vi' ? 'Xóa dự án' : 'Delete Project'}
        </div>
      ),
      children: (
        <DeleteView idItem={[project.id]} onSearch={fetchProjects} language={language} />
      ),
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
    });
  };

   const openNotification = (project: Project) => {
    modals.openConfirmModal({
      title: (
        <div style={{ fontWeight: 600, fontSize: 18 }}>
          {language === 'vi' ? 'Danh sách yêu cầu' : 'Delete Project'}
        </div>
      ),
      children: (
        <Announcement idItem={[project.id]}  language={language} />
      ),
      confirmProps: { display: 'none' },
      cancelProps: { display: 'none' },
      size: '50%',
    });
  };

  // Phân trang
  const onTableChange = ({ page }: Criteria<Project>) => {
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
      {/* Chọn ngôn ngữ */}
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

      {/* Action bar chỉ có nút thêm */}
      <AppAction openModal={openModal} language={language} />

      <Divider
        my="sm"
        labelPosition="center"
      />
    <AppSearch
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
      />
      <Divider my="sm" />

      <EuiBasicTable
        tableCaption={
          language === 'vi' ? 'Danh sách dự án hệ thống' : 'System Project List'
        }
        responsiveBreakpoint={false}
        items={projects}
        columns={columns}
        loading={loading}
        itemId="id"
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

export default ProjectTable;
