import React, { useState } from 'react';
import { SbTitle, SbSub, SbLink } from './Sb.style';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

const SbItem = ({ item, depth = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);
  //   const icon = <HiChevronUp />;
  const icon = collapsed ? <HiChevronUp /> : <HiChevronDown />;

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }

  if (item.childrens) {
    return (
      <div>
        <SbTitle depth={depth} onClick={toggleCollapse}>
          [{depth}]{item.menuNm}
          {icon}
        </SbTitle>
        <SbSub isOpen={collapsed}>
          {item.childrens?.map((child, index) => (
            <SbItem item={child} depth={depth + 1} key={index} />
          ))}
        </SbSub>
      </div>
    );
  } else {
    return (
      <SbTitle depth={depth}>
        [{depth}]{item.menuNm}
      </SbTitle>
    );
  }
};

export default SbItem;
