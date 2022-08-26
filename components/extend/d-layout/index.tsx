import React from 'react';
import { Layout, LayoutProps } from '../../index';
import DHeader from './Header';
import MenuNav from './MenuNav';
import DSider from './Sider';
import DContent from './Content';
import SkoteLayout from './SkoteLayout';
interface LayoutType extends React.FC<LayoutProps> {
  DHeader: typeof DHeader;
  DFooter: typeof Layout.Footer;
  DContent: typeof DContent;
  DSider: typeof DSider;
  DMenuNav?: typeof MenuNav;
  DSkoteLayout?: typeof SkoteLayout;
}

const DLayout = Layout as unknown as LayoutType;

DLayout.DHeader = DHeader;
DLayout.DFooter = Layout.Footer;
DLayout.DContent = DContent;
DLayout.DSider = DSider;
DLayout.DMenuNav = MenuNav;
DLayout.DSkoteLayout = SkoteLayout;

export default DLayout;
