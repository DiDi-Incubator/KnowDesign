import React, { useEffect } from 'react';
import { SenseConsolePage } from './plugin/console/public/application';
import { EuiTab, EuiTabs, EuiToolTip } from '@elastic/eui';
import { i18n } from './packages/kbn-i18n/src';
import { SearchProfiler } from './x-pack/plugins/searchprofiler/public';
import './index.less';
import { CurrentCluster } from './plugin/console/common/types';

export interface BootDependencies {
  notifications: any;
  currentCluster?: CurrentCluster;
  isSuperApp?: boolean;
  prefix?: string;
  activeId?: string;
  consoleEditorValue?: string;
  onInputEditorChange?: string;
  noNeedTab?: boolean;
}

export const DevToolsPage = (props: any) => {
  i18n.load('/zh-cn.json').catch((error) => {
    console.log(error);
  });
  const devTools = [
    {
      id: 'console',
      tooltipContent: '',
      title: i18n.translate('console.consoleDisplayName', {
        defaultMessage: 'Console',
      }),
      component: SenseConsolePage,
    },
    {
      id: 'searchprofiler',
      order: 5,
      title: i18n.translate('xpack.searchProfiler.pageDisplayName', {
        defaultMessage: 'Search Profiler',
      }),
      component: SearchProfiler,
    },
  ];
  const [activeDevTool, setActiveDevTool] = React.useState(
    devTools.find((item) => item.id === props.activeId) || devTools[0],
  );

  useEffect(() => {
    setActiveDevTool(activeDevTool);
  }, [props.currentCluster]);

  const onTabClick = (key) => {
    setActiveDevTool(devTools.find((item) => item.id === key));
  };

  return (
    <>
      <div className={'app-wrapper-panel'}>
        <div className="application">
          <main className="devApp">
            {props.noNeedTab ? null : (
              <EuiTabs>
                {devTools.map((currentDevTool) => (
                  <EuiToolTip content={currentDevTool.tooltipContent} key={currentDevTool.id}>
                    <EuiTab
                      isSelected={currentDevTool.id === activeDevTool.id}
                      onClick={() => onTabClick(currentDevTool.id)}
                    >
                      {currentDevTool.title}
                    </EuiTab>
                  </EuiToolTip>
                ))}
              </EuiTabs>
            )}
            <div className="devApp__container" role="tabpanel" data-test-subj={activeDevTool.id}>
              <>
                <activeDevTool.component {...props} />
              </>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
