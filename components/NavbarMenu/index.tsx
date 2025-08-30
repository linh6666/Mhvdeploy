'use client';
import { useState } from 'react';
import {
  IconGauge,
  IconNotes,
  IconUser,
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import classes from './NavbarSimple.module.css';
import Project from './Project'; 
import System from './System'; 
import Users from './Users'; 
import ListProject from './ListProject'; 
import UserProject from './UserPoject'; 
import ProjectManagere from './ProjectManagere'; 

const mockdata = [
  { label: 'Trang chủ', icon: IconGauge, link: 'home' },
  {
    label: 'Cấu hình',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Vai trò người dùng', link: 'user-role-project' },
      { label: 'Vai trò người dùng trong dự án', link: 'project' },
    ],
  },
  {
    label: 'Phân quyền',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Phân quyền người dùng', link: 'permission' }],
  },
];

const footerData = [
  {
    label: 'Quản lý dự án',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Danh sách dự án', link: 'project-list' },
      { label: 'Dự án Eco Retreat', link: 'project-1' },
    ],
  },
  {
    label: 'Phân quyền người dùng trong dự án',
    icon: IconUser,
    initiallyOpened: true,
    links: [{ label: 'Danh sách người dùng', link: 'user-list' }],
  },
];

export function NavbarSimple() {
  const [active, setActive] = useState<string>(''); // <-- thêm state để xử lý active

  const combinedData = [...mockdata, ...footerData];

  // Hàm render nội dung tương ứng với menu
  const renderContent = () => {
    switch (active) {
      case 'project':
        return <Project />;
      case 'user-role-project':
        return <System />;
      case 'permission':
        return <Users />;
      case 'project-list':
        return <ListProject />;
      case 'project-1':
        return <ProjectManagere />;
      case 'user-list':
        return <UserProject />;
      default:
        return <h2>Chào mừng bạn đến với trang quản trị !!!</h2>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        margin: '100px auto 10px auto',
        border:
          '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
      }}
    >
      {/* Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.header}>
          <h1>QUẢN TRỊ HỆ THỐNG</h1>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>
            {combinedData.slice(0, mockdata.length).map((item) => (
              <LinksGroup
                {...item}
                key={item.label}
                active={active}
                onActiveChange={setActive} // truyền hàm để đổi nội dung khi click
              />
            ))}
          </div>

          <div className={classes.footer}>
            <h1>QUẢN TRỊ DỰ ÁN</h1>
          </div>

          <div style={{ width: '100%' }}>
            {combinedData.slice(mockdata.length).map((item) => (
              <LinksGroup
                {...item}
                key={item.label}
                active={active}
                onActiveChange={setActive}
              />
            ))}
          </div>
        </ScrollArea>
      </nav>

      {/* Phần nội dung hiển thị bên phải */}
      <div
        style={{ 
          flex: 1, 
          padding: 20, 
          overflowY: 'auto', 
          height: '800px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className={classes.hidescrollbar}
      >
        {renderContent()}
      </div>
    </div>
  );
}
