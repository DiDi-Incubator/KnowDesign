/* @remove-on-es-build-begin */
// this file is not used if use https://www.npmjs.com/package/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn && // eslint-disable-line no-console
  typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    'You are using a whole package of knowdesign, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}
/* @remove-on-es-build-end */

// hooks
export { default as useDynamicList } from './hook/use-dynamic-list';
export { default as useDebounce } from './hook/use-debounce';
export { default as useAsync } from './hook/use-async';
export { default as useAsyncRetry } from './hook/use-async-retry';
export { default as useTimeout } from './hook/use-timeout';
export { default as useDeepCompareEffect } from './hook/use-deep-compare-effect';
export { default as useMountedState } from './hook/use-mounted-state';
export { default as useAsyncFn } from './hook/use-async-fn';
export { default as useInterval } from './hook/use-interval';
export { default as useFormatMessage } from './hook/use-format-message';
export { default as useRequest } from './hook/use-request';

// create hook factory
export { default as createGlobalState } from './hook/create-global-state';
export { default as createStateContext } from './hook/create-state-context';
export { default as createReducerContext } from './hook/create-reducer-context';

// antd 基础组件
export type { AffixProps } from './basic/affix';
export { default as Affix } from './basic/affix';

export type { AnchorProps, AnchorLinkProps } from './basic/anchor';
export { default as Anchor } from './basic/anchor';

export type { AutoCompleteProps } from './basic/auto-complete';
export { default as AutoComplete } from './basic/auto-complete';

export type { AlertProps } from './basic/alert';
export { default as Alert } from './basic/alert';

export type { AvatarProps } from './basic/avatar';
export { default as Avatar } from './basic/avatar';

export type { BackTopProps } from './basic/back-top';
export { default as BackTop } from './basic/back-top';

export type { BadgeProps } from './basic/badge';
export { default as Badge } from './basic/badge';

export type { BreadcrumbProps, BreadcrumbItemProps } from './basic/breadcrumb';
export { default as Breadcrumb } from './basic/breadcrumb';

export type { ButtonProps } from './basic/button';
export { default as Button } from './basic/button';

export type { CalendarProps } from './basic/calendar';
export { default as Calendar } from './basic/calendar';

export type { CardProps } from './basic/card';
export { default as Card } from './basic/card';

export type { CollapseProps, CollapsePanelProps } from './basic/collapse';
export { default as Collapse } from './basic/collapse';

export type { CarouselProps } from './basic/carousel';
export { default as Carousel } from './basic/carousel';

export type { CascaderProps } from './basic/cascader';
export { default as Cascader } from './basic/cascader';

export type { CheckboxProps, CheckboxOptionType } from './basic/checkbox';
export { default as Checkbox } from './basic/checkbox';

export type { ColProps } from './basic/col';
export { default as Col } from './basic/col';

export type { CommentProps } from './basic/comment';
export { default as Comment } from './basic/comment';

export type { DatePickerProps } from './basic/date-picker';
export { default as DatePicker } from './basic/date-picker';

export type { DescriptionsProps } from './basic/descriptions';
export { default as Descriptions } from './basic/descriptions';

export type { DividerProps } from './basic/divider';
export { default as Divider } from './basic/divider';

export type { DropDownProps } from './basic/dropdown';
export { default as Dropdown } from './basic/dropdown';

export type { DrawerProps } from './basic/drawer';
export { default as Drawer } from './basic/drawer';

export type { EmptyProps } from './basic/empty';
export { default as Empty } from './basic/empty';

export type { FormInstance, FormProps, FormItemProps } from './basic/form';
export { default as Form } from './basic/form';

export { default as Grid } from './basic/grid';

export type { InputProps } from './basic/input';
export { default as Input } from './basic/input';

export type { ImageProps } from './basic/image';
export { default as Image } from './basic/image';

export type { InputNumberProps } from './basic/input-number';
export { default as InputNumber } from './basic/input-number';

export type { LayoutProps } from './basic/layout';
export { default as Layout } from './basic/layout';

export type { ListProps } from './basic/list';
export { default as List } from './basic/list';

export type { ArgsProps as MessageArgsProps } from './basic/message';
export { default as message } from './basic/message';

export type { MenuProps, MenuTheme, SubMenuProps, MenuItemProps } from './basic/menu';
export { default as Menu } from './basic/menu';

export type { MentionProps } from './basic/mentions';
export { default as Mentions } from './basic/mentions';

export type { ModalProps, ModalFuncProps } from './basic/modal';
export { default as Modal } from './basic/modal';

export type { StatisticProps } from './basic/statistic';
export { default as Statistic } from './basic/statistic';

export { default as notification } from './basic/notification';

export type { PageHeaderProps } from './basic/page-header';
export { default as PageHeader } from './basic/page-header';

export type { PaginationProps } from './basic/pagination';
export { default as Pagination } from './basic/pagination';

export type { PopconfirmProps } from './basic/popconfirm';
export { default as Popconfirm } from './basic/popconfirm';

export type { PopoverProps } from './basic/popover';
export { default as Popover } from './basic/popover';

export type { ProgressProps } from './basic/progress';
export { default as Progress } from './basic/progress';

export type { RadioProps, RadioChangeEvent, RadioGroupProps } from './basic/radio';
export { default as Radio } from './basic/radio';

export type { RateProps } from './basic/rate';
export { default as Rate } from './basic/rate';

export type { ResultProps } from './basic/result';
export { default as Result } from './basic/result';

export type { RowProps } from './basic/row';
export { default as Row } from './basic/row';

export type { SelectProps } from './basic/select';
export { default as Select } from './basic/select';

export type { SkeletonProps } from './basic/skeleton';
export { default as Skeleton } from './basic/skeleton';

export type { SliderSingleProps } from './basic/slider';
export { default as Slider } from './basic/slider';

export type { SpaceProps } from './basic/space';
export { default as Space } from './basic/space';

export type { SpinProps } from './basic/spin';
export { default as Spin } from './basic/spin';

export type { StepProps, StepsProps } from './basic/steps';
export { default as Steps } from './basic/steps';

export type { SwitchProps } from './basic/switch';
export { default as Switch } from './basic/switch';

export type {
  TableProps,
  TablePaginationConfig,
  ColumnGroupType as TableColumnGroupType,
  ColumnType as TableColumnType,
  ColumnProps as TableColumnProps,
  ColumnsType as TableColumnsType,
} from './basic/table';
export { default as Table } from './basic/table';

export type { TransferProps } from './basic/transfer';
export { default as Transfer } from './basic/transfer';

export type {
  TreeProps,
  AntTreeNodeProps as TreeNodeProps,
  DataNode as TreeDataNode,
} from './basic/tree';
export { default as Tree } from './basic/tree';

export type { TreeSelectProps } from './basic/tree-select';
export { default as TreeSelect } from './basic/tree-select';

export type { TabsProps, TabPaneProps } from './basic/tabs';
export { default as Tabs } from './basic/tabs';

export type { TagProps, TagType } from './basic/tag';
export { default as Tag } from './basic/tag';

export type { TimePickerProps, TimeRangePickerProps } from './basic/time-picker';
export { default as TimePicker } from './basic/time-picker';

export type { TimelineProps, TimelineItemProps } from './basic/timeline';
export { default as Timeline } from './basic/timeline';

export type { TooltipProps } from './basic/tooltip';
export { default as Tooltip } from './basic/tooltip';

export type { TypographyProps } from './basic/typography';
export { default as Typography } from './basic/typography';

export type { UploadProps } from './basic/upload';

export { default as Upload } from './basic/upload';

export { default as version } from './basic/version';

// localProvider
export { default as IntlProvider } from './locale-provider';
export { default as ConfigProvider } from './basic/config-provider';

export { default as Utils } from './utils';
export type { RequestInit } from './utils/type';
// d1-pkgs
export { default as Container } from './extend/container';
export { default as AppContainer } from './extend/app-container';
export { default as RouteGuard } from './extend/route-guard';
export { default as ProTable } from './extend/pro-table';

export type { ITableBtn } from './extend/d-table';
export { DTable, pagination as DTablePagination } from './extend/d-table';

export { default as EditableTable } from './extend/editable-table';
export type { IFormItem } from './extend/x-form';
export { default as XForm } from './extend/x-form';
export { default as DrawerForm } from './extend/drawer-form';
export { default as ModalForm } from './extend/modal-form';
export { default as StepsForm } from './extend/steps-form';
export type { IColumnsType } from './extend/query-form';
export { default as QueryForm } from './extend/query-form';

export { default as ChartItem } from './extend/chart-item';
export { default as SingleChart } from './extend/single-chart';
export { default as LineConnectPieChart } from './extend/line-connect-pie-chart';
export { default as TableWithPieChart } from './extend/table-with-pie-chart';

export type { IMenuItem } from './extend/hash-menu';
export { default as HashMenu } from './extend/hash-menu';

export { default as ProgressBar } from './extend/progress-bar';
export { default as RouterTabs } from './extend/router-tabs';
export { default as ProDescription } from './extend/pro-description';
export { default as DragGroup } from './extend/drag-group';
export { default as DRangeTime } from './extend/d-range-time';
export { default as DSearchInput } from './extend/d-search-input';

// commonPage
export { AlarmGroupSetting } from './common-pages/alarm-group-setting';
export { AlarmLog } from './common-pages/alarm-log';
export { AlarmStrategy } from './common-pages/alarm-strategy';
export { default as ResourcesManage } from './common-pages/resources-manage';
export { default as Exception } from './common-pages/exception';
export { Login } from './common-pages/login';
export { OperationLog } from './common-pages/operation-log';
export { ProjectManage } from './common-pages/project-manage';
export { RoleManage } from './common-pages/role-manage';
export { UserManage } from './common-pages/user-manage';
export { default as RenderTableOpts } from './common-pages/render-table-opts';
export { default as RenderTableLabels } from './common-pages/render-table-labels';
export { default as RenderTitle } from './common-pages/render-title';

// dantd 扩展组件
// export { default as DEmptyLine } from './extend/d-empty-line';
export { default as DDescriptions } from './extend/d-descriptions';
// export { default as DTable } from './extend/d-table';
// export { default as DDataTable } from './extend/d-data-table';
export { default as DCode } from './extend/d-code';
// export { default as VirtualSelect } from './virtual-select';
// export { default as DColorSelect } from './extend/d-color-select';
export { default as DCard } from './extend/d-card';
export { default as DResult } from './extend/d-result';
export { default as DTag } from './extend/d-tag';
export { default as DFormItems } from './basic/d-form-items';
export { default as DQueryForm } from './extend/d-query-form';

export { default as DLayout } from './extend/d-layout';
export { default as DProLayout } from './extend/d-pro-layout';

export { default as DBreadcrumb } from './extend/d-breadcrumb';
