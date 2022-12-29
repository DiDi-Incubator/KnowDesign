/* eslint-disable react/display-name */
import React, { memo, useState, useEffect } from 'react';
import { Menu } from 'knowdesign';
export interface IMenuItem {
  name?: string;
  key: string;
  show?: boolean;
  type?: number;
  label?: string;
  content?: (data: any) => JSX.Element;
  visible?: any;
  renderCustomElement?: (data?: any) => JSX.Element;
}

interface propsType {
  TAB_LIST: IMenuItem[];
  MENU_MAP: Map<string, IMenuItem>;
  theme?: boolean; // 不传则原生antd，传则灰低主题
  defaultHash?: string;
  data?: any;
  prefix?: string;
}

const HashMenu: React.FC<propsType> = memo(({ TAB_LIST, MENU_MAP, theme, defaultHash, data, prefix  }) => {
  const [menu, setMenu] = useState<string>("");
  const changeMenu = (e: any) => {
    setMenu(e.key);
    window.location.hash = e.key;
  };
  const updateMenu = () => {
    const hashValue = window.location.hash.replace("#", "") || defaultHash || TAB_LIST[0]?.key;
    setMenu(hashValue);
  };
  useEffect(() => {
    updateMenu();
  }, []);

  const renderContent = () => {
    return (MENU_MAP as any).get(menu)?.content(data);
  };

  return (
    <div className="hash-menu">
      <div className={`${prefix || "hash"}-table-content`}>
        <div className="hash-menu-border">
          <Menu className="hash-menu-head" selectedKeys={[menu]} mode="horizontal" onClick={changeMenu}>
            {TAB_LIST.map((d) => (
              <Menu.Item key={d.key}>{d.name}</Menu.Item>
            ))}
          </Menu>
          {(MENU_MAP as any).get(menu) && (MENU_MAP as any).get(menu).renderCustomElement
            ? (MENU_MAP as any).get(menu).renderCustomElement(menu)
            : null}
        </div>
      </div>
      <div className={`${prefix || "hash"}-detail-wrapper`}>{renderContent()}</div>
    </div>
  );
});
export default HashMenu;
