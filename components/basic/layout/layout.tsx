import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export interface GeneratorProps {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  displayName: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
}

export interface LayoutContextProps {
  siderHook: {
    addSider: (id: string) => void;
    removeSider: (id: string) => void;
  };
}
export const LayoutContext = React.createContext<LayoutContextProps>({
  siderHook: {
    addSider: () => null,
    removeSider: () => null,
  },
});

interface BasicPropsWithTagName extends BasicProps {
  tagName: 'header' | 'footer' | 'main' | 'section';
}

function generator({ suffixCls, tagName, displayName }: GeneratorProps) {
  return (BasicComponent: any) => {
    const Adapter: React.FC<BasicProps> = props => {
      const { getPrefixCls } = React.useContext(ConfigContext);
      const { prefixCls: customizePrefixCls } = props;
      const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);

      return <BasicComponent prefixCls={prefixCls} tagName={tagName} {...props} />;
    };
    Adapter.displayName = displayName;
    return Adapter;
  };
}

const Basic = (props: BasicPropsWithTagName) => {
  const { prefixCls, className, children, tagName, ...others } = props;
  const classString = classNames(prefixCls, className);
  return React.createElement(tagName, { className: classString, ...others }, children);
};

const BasicLayout: React.FC<BasicPropsWithTagName> = props => {
  const { direction } = React.useContext(ConfigContext);

  const [siders, setSiders] = React.useState<string[]>([]);

  const { prefixCls, className, children, hasSider, tagName: Tag, ...others } = props;
  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : siders.length > 0,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const contextValue = React.useMemo(
    () => ({
      siderHook: {
        addSider: (id: string) => {
          setSiders(prev => [...prev, id]);
        },
        removeSider: (id: string) => {
          setSiders(prev => prev.filter(currentId => currentId !== id));
        },
      },
    }),
    [],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <Tag className={classString} {...others}>
        {children}
      </Tag>
    </LayoutContext.Provider>
  );
};

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  displayName: 'Layout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  displayName: 'Header',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  displayName: 'Footer',
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  displayName: 'Content',
})(Basic);

export { Header, Footer, Content };

export default Layout;
