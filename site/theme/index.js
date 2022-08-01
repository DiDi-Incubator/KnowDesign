const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';

function pickerGenerator() {
  const tester = new RegExp('^docs');
  return markdownData => {
    const { filename } = markdownData.meta;
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) { 
      return {
        meta: markdownData.meta,
      };
    }
    return null;
  };
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    components(markdownData) {
      const { filename } = markdownData.meta;
      // console.log("3. filename---", filename)
      if (!/^components\/basic/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    extendComponents(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components\/extend/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    commonPages(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components\/common-pages/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    utils(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components\/utils/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    hook(markdownData) {
      const { filename } = markdownData.meta;
      if (!/^components\/hook/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null;
      }
      return {
        meta: markdownData.meta,
      };
    },
    docs: pickerGenerator(),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: [
    {
      path: '/',
      component: './template/Layout/index',
      indexRoute: { component: homeTmpl },
      childRoutes: [
        {
          path: 'changelog',
          component: contentTmpl,
        },
        {
          path: 'components/:children/',
          component: contentTmpl,
        },
        {
          path: 'components/:origin/:children/',
          component: contentTmpl,
        },
        {
          path: 'docs/:children',
          component: contentTmpl,
        },
        {
          path: 'index-cn',
          component: homeTmpl,
        },
      ],
    },
  ],
};
