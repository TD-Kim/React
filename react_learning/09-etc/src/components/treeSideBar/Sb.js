import React from 'react';
import SbItem from './SbItem';
import menuData from './menus.json';
import { SbContainer } from './Sb.style';

const Sb = ({ items }) => {
  // const nest = (menuData, menuId = 'ROOT', link = 'pmenuId') =>
  //   menuData
  //     .filter((item) => item[link] === menuId)
  //     .map((item) => ({ ...item, childrens: nest(menuData, item.menuId) }));
  // const tree = nest(menuData);
  const tree = menuData;

  return (
    <SbContainer>
      {menuData.map((subItem, index) => (
        <SbItem item={subItem} key={index} />
      ))}
    </SbContainer>
  );
};

export default Sb;
