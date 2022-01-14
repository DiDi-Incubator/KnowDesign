import React from 'react';
import { Layout, LayoutProps } from "../../index";
import DHeader from "./Header";
import MenuNav, { IMenuNavProps } from "./MenuNav";
import DSider from "./Sider";
import DContent from "./Content";
import SkoteLayout from "./SkoteLayout";
interface LayoutType extends React.FC<LayoutProps> {
  Header: typeof DHeader;
  Footer: typeof Layout.Footer;
  Content: typeof DContent;
  Sider: typeof DSider;
  MenuNav?: typeof MenuNav;
  SkoteLayout?: typeof SkoteLayout;
}

const DLayout = Layout as LayoutType;

DLayout.Header = DHeader;
DLayout.Footer = Layout.Footer;
DLayout.Content = DContent;
DLayout.Sider = DSider;
DLayout.MenuNav = MenuNav;
DLayout.SkoteLayout = SkoteLayout;

export default DLayout;
