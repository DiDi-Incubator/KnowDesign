/**
 * MarkdownData : {
 *  meta: {
 *    category,
 *    type,
 *    title,
 *    subtitle,
 *    filename,
 *  }
 * }
 */
/**
 * 生成侧边菜单
 * @param {Array<MarkdownData>} moduleData - 组件数据
 * @param {string} locale - zh-CN | en-US
 * @param {Object} categoryOrder - 分类及顺序，即 bisheng.config.js 中的 categoryOrder
 * @param {Object} typeOrder - 组件分类及顺序，即 bisheng.config.js 中的 typeOrder
 * @return {Array<MenuConfig>}
 */
import flattenDeep from 'lodash/flattenDeep';
import flatten from 'lodash/flatten';
import themeConfig from '../../themeConfig';

export function getMenuItems(moduleData, locale, categoryOrder, typeOrder) {
 
  const menuMeta = moduleData.map(item => ({
    ...item.meta,
    filename: item.meta.menuFilename || item.meta.filename,
  }));
  const menuItems = [];
  const sortFn = (a, b) => (a.order || 0) - (b.order || 0);
  // console.info('util:getMenuItems', menuMeta, moduleData, locale, categoryOrder, typeOrder)
  menuMeta.sort(sortFn).forEach((meta) => {
    if (!meta.category) {
      menuItems.push(meta);
    } else {
      const category = meta.category[locale] || meta.category;
      let group = menuItems.filter(i => {
        return i.title === category
      })[0];
      
      if (!group) {
        group = {
          type: 'category',
          title: category,
          children: [],
          order: categoryOrder[category],
        };
        menuItems.push(group);
      }
      if (meta.type) {
        let type = group.children.filter(i => i.title === meta.type)[0];
        if (!type) {
          type = {
            type: 'type',
            title: meta.type,
            children: [],
            order: typeOrder[meta.type],
          };
          group.children.push(type);
        }
        type.children.push(meta);
      } else {
        group.children.push(meta);
      }
    }
  });
  return menuItems
    .map((i) => {
      const res = { ...i };
      if (i.children) {
        res.children = i.children.sort(sortFn);
      }
      return res;
    })
    .sort(sortFn);
}

export function isZhCN(pathname) {
  return /-cn\/?$/.test(pathname);
}

export function isEnUS(pathname) {
  return /-en\/?$/.test(pathname);
}

/**
 * 将传入的路径增加语言后缀比如 button 变成 button-cn
 * @param {Url} path - 路径
 * @param {boolean} zhCN - 是否为中文
 * @return {string}
 */
export function getLocalizedPathname(path, zhCN) {
  return path;
  // const pathname = path.startsWith('/') ? path : `/${path}`;
  // if (!zhCN) {
  //   // to enUS
  //   return /\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
  // }
  // if (pathname === '/') {
  //   return '/index-cn';
  // }
  // if (pathname.endsWith('/')) {
  //   return pathname.replace(/\/$/, '-cn/');
  // }
  // return `${pathname}-cn`;
}

export function ping(callback: (status: string) => void) {
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';
  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getMetaDescription(jml?: any[] | null) {
  const COMMON_TAGS = ['h1', 'h2', 'h3', 'p', 'img', 'a', 'code', 'strong'];
  if (!Array.isArray(jml)) {
    return '';
  }
  const paragraph = flattenDeep(
    jml
      .filter(item => {
        if (Array.isArray(item)) {
          const [tag] = item;
          return tag === 'p';
        }
        return false;
      })
      // ['p', ['code', 'aa'], 'bb'] => ['p', 'aabb']
      .map(item => {
        const [tag, ...others] = flatten(item);
        const content = others
          .filter(other => typeof other === 'string' && !COMMON_TAGS.includes(other))
          .join('');
        return [tag, content];
      }),
  ).find(p => p && typeof p === 'string' && !COMMON_TAGS.includes(p));
  return paragraph;
}

export const getThemeConfig = () => themeConfig;