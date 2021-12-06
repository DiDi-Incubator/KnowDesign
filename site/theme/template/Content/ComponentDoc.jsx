import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Row, Col, Affix, Tooltip } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import {
  AppstoreOutlined,
  AppstoreFilled,
  CodeFilled, 
  CodeOutlined, 
  BugFilled, 
  BugOutlined
} from '@ant-design/icons';


import Demo from './Demo';
// import EditButton from './EditButton';
import { ping } from '../utils';

export default class ComponentDoc extends React.Component {
  static contextTypes = {
    intl: PropTypes.object,
  };

  state = {
    expandAll: false,
    visibleAll: process.env.NODE_ENV !== 'production',
    showRiddleButton: false,
  };

  componentDidMount() {
    const { demos = {}, location = {} } = this.props;
    if (location.hash) {
      const demoKey = location.hash.split('-demo-')[1];
      const demoData = demos[demoKey];
      if (demoData && demoData.meta && demoData.meta.debug) {
        this.setState({ visibleAll: true });
      }
    }
    this.pingTimer = ping(status => {
      if (status !== 'timeout' && status !== 'error') {
        this.setState({
          showRiddleButton: true,
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { location, theme } = this.props;
    const { location: nextLocation, theme: nextTheme } = nextProps;
    const { expandAll, visibleAll, showRiddleButton } = this.state;
    const {
      expandAll: nextExpandAll,
      visibleAll: nextVisibleAll,
      showRiddleButton: nextShowRiddleButton,
    } = nextState;

    if (
      nextLocation.pathname === location.pathname &&
      expandAll === nextExpandAll &&
      showRiddleButton === nextShowRiddleButton &&
      theme === nextTheme &&
      visibleAll === nextVisibleAll &&
      showRiddleButton === nextShowRiddleButton
    ) {
      return false;
    }
    return true;
  }

  handleExpandToggle = () => {
    const { expandAll } = this.state;
    this.setState({
      expandAll: !expandAll,
    });
  };

  handleVisibleToggle = () => {
    const { visibleAll } = this.state;
    this.setState({
      visibleAll: !visibleAll,
    });
  };

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
  }

  render() {
    const { props } = this;
    const { doc, location, intl: { locale } } = this.props;
    const { content, meta } = doc;
    const demos = Object.keys(props.demos).map((key) => props.demos[key]);
    const { expandAll, visibleAll, showRiddleButton } = this.state;
    const isSingleCol = meta.cols === 1;
    const leftChildren = [];
    const rightChildren = [];
    let showedDemo = demos.some((demo) => demo.meta.only)
      ? demos.filter((demo) => demo.meta.only)
      : demos.filter((demo) => demo.preview);
    if (!visibleAll) {
      showedDemo = showedDemo.filter(item => !item.meta.debug);
    }
    showedDemo
      .sort((a, b) => a.meta.order - b.meta.order)
      .forEach((demoData, index) => {
        const demoElem = (
          <Demo
            {...demoData}
            key={demoData.meta.filename}
            utils={props.utils}
            expand={expandAll}
            location={location}
          />
        );
        if (index % 2 === 0 || isSingleCol) {
          leftChildren.push(demoElem);
        } else {
          rightChildren.push(demoElem);
        }
      });
    const expandTriggerClass = classNames('code-box-expand-trigger', {
      'code-box-expand-trigger-active': expandAll,
    });

    const jumper = showedDemo.map((demo) => {
      const { title } = demo.meta;
      const localizeTitle = title[locale] || title;
      return (
        <li key={demo.meta.id} title={localizeTitle}>
          <a href={`#${demo.meta.id}`}>{localizeTitle}</a>
        </li>
      );
    });

    const { title, subtitle, filename } = meta;
    const articleClassName = classNames({
      'show-riddle-button': showRiddleButton,
    });
    return (
      <DocumentTitle title={`${subtitle || ''} ${title[locale] || title} - Dantd`}>
        <article className={articleClassName}>
          <Affix className="toc-affix" offsetTop={16}>
            <ul id="demo-toc" className="toc">
              {jumper}
            </ul>
          </Affix>
          <section className="markdown">
            <h1>
              {title[locale] || title}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}
              {/* <EditButton
                title={<FormattedMessage id="app.content.edit-page" />}
                filename={filename}
              /> */}
            </h1>
            {props.utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content)),
            )}
            <h2>
              <FormattedMessage id="app.component.examples" />
              <span className="all-code-box-controls">
                <Tooltip
                  title={
                    <FormattedMessage
                      id={`app.component.examples.${expandAll ? 'collapse' : 'expand'}`}
                    />
                  }
                >
                  {expandAll ? (
                    <CodeFilled className={expandTriggerClass} onClick={this.handleExpandToggle} />
                  ) : (
                    <CodeOutlined className={expandTriggerClass} onClick={this.handleExpandToggle} />
                  )}
                </Tooltip>
                <Tooltip
                  title={
                    <FormattedMessage
                      id={`app.component.examples.${visibleAll ? 'hide' : 'visible'}`}
                    />
                  }
                >
                  {visibleAll ? (
                    <BugFilled className={expandTriggerClass} onClick={this.handleVisibleToggle} />
                  ) : (
                    <BugOutlined className={expandTriggerClass} onClick={this.handleVisibleToggle} />
                  )}
                </Tooltip>
              </span>
            </h2>
          </section>
          <Row gutter={16}>
            <Col
              span={isSingleCol ? 24 : 12}
              className={isSingleCol ? 'code-boxes-col-1-1' : 'code-boxes-col-2-1'}
            >
              {leftChildren}
            </Col>
            {isSingleCol ? null : (
              <Col className="code-boxes-col-2-1" span={12}>
                {rightChildren}
              </Col>
            )}
          </Row>
          {props.utils.toReactComponent(
            [
              'section',
              {
                className: 'markdown api-container',
              },
            ].concat(getChildren(doc.api || ['placeholder'])),
          )}
        </article>
      </DocumentTitle>
    );
  }
}
