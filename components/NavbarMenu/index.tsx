'use client';
import { useState } from 'react';
import {

  IconUsers,
  IconNotes,

} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import  User from './Users/index';
import  Project from './Project/index';
import  System from './System/index';
import  ListProject from './ListProject/index';
import  UserProject from './UserPoject/index';



import classes from './NavbarSimple.module.css';

const data = [
  { link: 'users', label: 'Phân quyền người dùng', icon: IconUsers },
  { link: 'Project', label: 'Phân quyền dự án', icon: IconNotes },
  { link: 'System', label: 'Phân quyền hiển thị', icon: IconNotes },
  { link: 'ListProject', label: 'Danh sách dự án', icon: IconNotes },
  { link: 'UserProject', label: 'Vai trò người dùng dự án', icon: IconNotes },
  // { link: 'auth', label: 'Authentication', icon: Icon2fa },
  // { link: 'other', label: 'Other Settings', icon: IconSettings },
];

export function NavbarSimple() {
  const [active, setActive] = useState('billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
data-active={item.link === active ? 'true' : undefined}  // ← sửa ở đây
      href="#"
      key={item.label}
      onClick={(event) => {
        event.preventDefault(); // ngăn không redirect
        setActive(item.link);   // lưu giá trị link thay vì label
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  // nội dung tương ứng theo link
  const renderContent = () => {
    switch (active) {
      case 'users':
        return <div><User/></div>;
      case 'Project':
        return <div><Project/></div>;
      case 'System':
        return <div><System/> </div>;
      case 'ListProject':
        return <div><ListProject/></div>;
      case 'UserProject':
        return <div><UserProject/></div>;
      // case 'auth':
      //   return <div>🔐 Authentication settings</div>;
      // case 'other':
      //   return <div>⚙️ Other settings</div>;
      default:
        return <div>chào mừng bạn đã đến trang  quản trị hệ thống,chọn menu để xem nội dung !</div>;
    }
  };

  return (
   <div
  style={{
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',

    margin: '100px auto 10px auto',
     border: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
  }}
>
      {/* Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Code className={classes.title}>Quản trị hệ thống</Code>
          </Group>
          {links}
        </div>
      </nav>

      {/* Content area */}
<div
  style={{
    flex: 1,
    padding: 20,
    height: "750px",
    overflowY: "scroll",     // vẫn cuộn được
    scrollbarWidth: "none",  // ẩn scrollbar trên Firefox
    msOverflowStyle: "none", // ẩn scrollbar trên IE, Edge cũ
  }}
>
  <style jsx>{`
    div::-webkit-scrollbar {
      display: none; /* ẩn scrollbar trên Chrome, Safari */
    }
  `}</style>

  {renderContent()}
</div>

    </div>
  );
}
