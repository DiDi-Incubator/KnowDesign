import Layout, { LayoutProps } from '../../basic/layout';
import DHeader from './Header';
import MenuNav, { IMenuNavProps } from './MenuNav';
import DSider from './Sider';

interface LayoutType extends React.FC<LayoutProps> {
  Header: typeof DHeader;
  Footer: typeof Layout.Footer;
  Content: typeof Layout.Content;
  Sider: typeof DSider;
  MenuNav?: typeof MenuNav;
}

const DLayout = Layout as LayoutType;

DLayout.Header = DHeader;
DLayout.Footer = Layout.Footer;
DLayout.Content = Layout.Content;
DLayout.Sider = DSider;
DLayout.MenuNav = MenuNav;
export default DLayout;