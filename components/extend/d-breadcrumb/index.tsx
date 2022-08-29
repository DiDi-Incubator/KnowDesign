import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Breadcrumb } from 'knowdesign';

export interface IBtn {
  label: string | JSX.Element;
  aHref?: string;
}

const DBreadcrumb = (props: {
  breadcrumbs?: IBtn[];
  prefixCls?: string;
  separator?: React.ReactNode;
}) => {
  const intl = useIntl();

  const { prefixCls = 'dcd-ks', separator = '>' } = props;
  const { breadcrumbs } = props;
  let targetBreadcrumbs = [];

  // 如果breadcrumbs非数组则解析路径
  if (!Array.isArray(breadcrumbs)) {
    targetBreadcrumbs = [];
    let { pathname } = window.location;

    if (pathname[pathname.length - 1] === '/') {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    const pathnames = pathname.split('/').splice(1);

    if (pathnames.length >= 2) {
      let str = `menu.${pathnames[0]}`;
      let path = ``;

      for (let i = 1; i < pathnames.length; i++) {
        str += pathnames[i] ? `.${pathnames[i]}` : '';
        path += pathnames[i] ? `/${pathnames[i]}` : '';

        targetBreadcrumbs.push({
          label: intl.formatMessage({ id: str }),
          aHref: i === pathnames.length - 1 ? '' : path,
        });
      }
    }
  } else {
    targetBreadcrumbs = breadcrumbs;
  }

  return (
    <>
      <Breadcrumb className={`${prefixCls || ''}-breadcrumb`} separator={separator}>
        {targetBreadcrumbs?.map((v, index) => (
          <Breadcrumb.Item key={index}>
            {v.aHref ? <Link to={v.aHref}>{v.label}</Link> : v.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </>
  );
};

export default DBreadcrumb;
