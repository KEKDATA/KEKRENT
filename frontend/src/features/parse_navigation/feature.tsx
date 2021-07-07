import { Menu } from 'antd';
import { scrolledToLastViewPostCleared } from 'models/scroll_to_last_viewed_post/model';
import { paths } from 'pages/paths';
import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

export const ParseNavigation = () => {
  const [location] = useLocation();
  const [currentTab, setCurrentTab] = useState(location);

  return (
    <Menu
      onClick={(e) => {
        setCurrentTab(e.key);
        scrolledToLastViewPostCleared();
      }}
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
