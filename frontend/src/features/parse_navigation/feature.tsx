import { Link, useLocation } from 'wouter';
import React, { useState } from 'react';
import { Menu } from 'antd';
import { paths } from 'pages/paths';

export const ParseNavigation = () => {
  const [location] = useLocation();
  const [currentTab, setCurrentTab] = useState(location);

  return (
    <Menu
      onClick={(e) => setCurrentTab(e.key)}
      selectedKeys={[currentTab]}
      mode="horizontal"
    >
      <Menu.Item key={paths.facebook()}>
        <Link href={paths.facebook()}>Facebook</Link>
      </Menu.Item>
      <Menu.Item key={paths.fazwaz()}>
        <Link href={paths.fazwaz()}>Fazwaz</Link>
      </Menu.Item>
    </Menu>
  );
};
