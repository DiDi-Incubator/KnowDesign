import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'bisheng/router';
import { injectIntl } from 'react-intl';
import { Popover, Button, Row, Col } from '../../../../components';
import landing from './bg.png';
import quncode from './group.png';
function getStyle() {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      width: 100%;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
  `;
}

const HomePage = (props) => {
  const addSeparater = (str) => {
    const arr = str.split('|');
    // arr.splice(1, 0 <span>|</span>)
    return [arr[0], <span key="divider" className="divider" />, arr[1]];
  };

  return (
    <DocumentTitle title={`DCloud-Design - ${props.intl.formatMessage({ id: 'app.home.slogan' })}`}>
      <div className="main-wrapper">
        <section className="home-s1" style={{ background: `url(${landing}) no-repeat center / cover` }}>
          <div
            className="banner-wrapper"
          >
            <div className="banner-text-wrapper">
              <h2 key="h2">Know Design</h2>
              <p>
                企业级(ToB)中后台系统开发解决方案
              </p>
              <div key="button1" className="start-button">
                <Link to={'/docs/introduce'}>
                  <Button type="primary" size="large">
                    开始使用
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='home-s2'>
          <h3 className='feature-title'>Know Design的能力</h3>
          <div className='feature-wrapper'>
            <div className='feature-wrapper-card'>
              <h3>全量增强：提供全量增强组件库，使用方便</h3>
              <span>基于最新Antd V4.22 改造，提供更丰富的API；样式预设，无缝对接Ant Design；提供更多前端开发依赖</span>
            </div>
            <div className='feature-wrapper-card'>
              <h3>业务组件：中后台典型业务模块最佳实践</h3>
              <span>从多个业务中抽象打磨最佳实践，提供四表一局等多个业务组件，风格体验统一，配置化程度更高，更好用</span>
            </div>
            <div className='feature-wrapper-card'>
              <h3>页面级模版：内置中后台通用页面模版</h3>
              <span>自带中后台产品通用的页面级模版，提供多个页面级的最佳实践，开箱即用</span>
            </div>
            <div className='feature-wrapper-card'>
              <h3>完整方案：配合工具、平台，开发更高效</h3>
              <span>提供完整的前端开发链路解决方案，更多前端工具和开发平台，正在计划开源中，敬请期待</span>
            </div>
          </div>
        </section>
        {/* <section className="home-s3">

        </section> */}
        <section className="home-s4">
          <div className="wrapper">
            <h3>联系我们</h3>
            <div className="sub-title">欢迎扫描下方二维码</div>
            <div className="img-wrapper">

              <a><img src={quncode} alt="" /></a>
            </div>
          </div>
        </section>
        <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
      </div>
    </DocumentTitle>
  );
};

export default injectIntl(HomePage);
