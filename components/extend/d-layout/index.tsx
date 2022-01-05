import {Layout} from "antd";
import type { LayoutProps } from 'antd';
import DHeader from "./Header";
import MenuNav, { IMenuNavProps } from "./MenuNav";
import DSider from "./Sider";
import DContent from "./Content";
import SkoteLayout from "./SkoteLayout";
import SidebarContent from "./SkoteLayout/SidebarContent";
interface LayoutType extends React.FC<LayoutProps> {
  Header: typeof DHeader;
  Footer: typeof Layout.Footer;
  Content: typeof DContent;
  Sider: typeof DSider;
  MenuNav?: typeof MenuNav;
  SkoteLayout?: typeof SkoteLayout;
  SidebarContent?: typeof SidebarContent;
}

const DLayout = Layout as LayoutType;

DLayout.Header = DHeader;
DLayout.Footer = Layout.Footer;
DLayout.Content = DContent;
DLayout.Sider = DSider;
DLayout.MenuNav = MenuNav;
DLayout.SkoteLayout = SkoteLayout;
DLayout.SidebarContent = SidebarContent;
export default DLayout;
