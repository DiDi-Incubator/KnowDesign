import _ from 'lodash';
import { MenuConfItem } from './Sider';

export function isAbsolutePath(url: string) {
  return /^https?:\/\//.test(url);
}

export function hasRealChildren(children: { visible?: boolean }[]) {
  if (_.isArray(children)) {
    return !_.every(children, (item) => item.visible === false);
  }
  return false;
}

export function normalizeMenuConf(children: MenuConfItem[], parentNav?: MenuConfItem) {
  const navs: MenuConfItem[] = [];

  _.each(children, (nav) => {
    if (nav.visible === undefined || nav.visible === true) {
      const navCopy = _.cloneDeep(nav);

      if (isAbsolutePath(nav.path) || _.indexOf(nav.path, '/') === 0) {
        navCopy.to = nav.path;
      } else if (parentNav) {
        if (parentNav.path) {
          const parentPath = parentNav.to ? parentNav.to : `/${parentNav.path}`;
          if (nav.path) {
            navCopy.to = `${parentPath}/${nav.path}`;
          } else {
            navCopy.to = parentPath;
          }
        } else if (nav.path) {
          navCopy.to = `/${nav.path}`;
        }
      } else if (nav.path) {
        navCopy.to = `/${nav.path}`;
      }

      if (_.isArray(nav.children) && nav.children.length && hasRealChildren(nav.children)) {
        navCopy.children = normalizeMenuConf(nav.children, navCopy);
      } else {
        delete navCopy.children;
      }

      navs.push(navCopy);
    }
  });
  return navs;
}



