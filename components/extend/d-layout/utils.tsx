import _ from 'lodash';
import { MenuConfItem } from './MenuNav';

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

export function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
}

export function toggleFullscreen() {
  const docu = document as any;
  if (!docu.fullscreenElement && /* alternative standard method */ !docu.mozFullScreenElement && !docu.webkitFullscreenElement) {
    // current working methods
    if (docu.documentElement.requestFullscreen) {
      docu.documentElement.requestFullscreen();
    } else if (docu.documentElement.mozRequestFullScreen) {
      docu.documentElement.mozRequestFullScreen();
    } else if (docu.documentElement.webkitRequestFullscreen) {
      docu.documentElement.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (docu.cancelFullScreen) {
      docu.cancelFullScreen();
    } else if (docu.mozCancelFullScreen) {
      docu.mozCancelFullScreen();
    } else if (docu.webkitCancelFullScreen) {
      docu.webkitCancelFullScreen();
    }
  }
}

export const changeTopbarTheme = (theme) => {
  changeBodyAttribute('data-topbar', theme);
};
