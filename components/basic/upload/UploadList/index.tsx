import * as React from 'react';
import CSSMotion, { CSSMotionList, CSSMotionListProps } from 'rc-motion';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
import PictureTwoTone from '@ant-design/icons/PictureTwoTone';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import { cloneElement, isValidElement } from '../../_util/reactNode';
import { UploadListProps, UploadFile, UploadListType, InternalUploadFile } from '../interface';
import { previewImage, isImageUrl } from '../utils';
import collapseMotion from '../../_util/motion';
import { ConfigContext } from '../../config-provider';
import Button, { ButtonProps } from '../../button';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import ListItem from './ListItem';

const listItemMotion: Partial<CSSMotionListProps> = {
  ...collapseMotion,
};

delete listItemMotion.onAppearEnd;
delete listItemMotion.onEnterEnd;
delete listItemMotion.onLeaveEnd;

const InternalUploadList: React.ForwardRefRenderFunction<unknown, UploadListProps> = (
  {
    listType,
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon,
    downloadIcon,
    progress,
    appendAction,
    itemRender,
  },
  ref,
) => {
  const forceUpdate = useForceUpdate();
  const [motionAppear, setMotionAppear] = React.useState(false);

  // ============================= Effect =============================
  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach((file: InternalUploadFile) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(file.originFileObj instanceof File || (file.originFileObj as Blob) instanceof Blob) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj as File).then((previewDataUrl: string) => {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [listType, items, previewFile]);

  React.useEffect(() => {
    setMotionAppear(true);
  }, []);

  // ============================= Events =============================
  const onInternalPreview = (file: UploadFile, e?: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return;
    }
    e?.preventDefault();
    return onPreview(file);
  };

  const onInternalDownload = (file: UploadFile) => {
    if (typeof onDownload === 'function') {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  };

  const onInternalClose = (file: UploadFile) => {
    onRemove?.(file);
  };

  const internalIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === 'uploading';
    const fileIcon = isImgUrl && isImgUrl(file) ? <PictureTwoTone /> : <FileTwoTone />;
    let icon: React.ReactNode = isLoading ? <LoadingOutlined /> : <PaperClipOutlined />;
    if (listType === 'picture') {
      icon = isLoading ? <LoadingOutlined /> : fileIcon;
    } else if (listType === 'picture-card') {
      icon = isLoading ? locale.uploading : fileIcon;
    }
    return icon;
  };

  const actionIconRender = (
    customIcon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title?: string,
  ) => {
    const btnProps: ButtonProps = {
      type: 'text',
      size: 'small',
      title,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        callback();
        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e);
        }
      },
      className: `${prefixCls}-list-item-card-actions-btn`,
    };
    if (isValidElement(customIcon)) {
      const btnIcon = cloneElement(customIcon, {
        ...customIcon.props,
        onClick: () => {},
      });

      return <Button {...btnProps} icon={btnIcon} />;
    }
    return (
      <Button {...btnProps}>
        <span>{customIcon}</span>
      </Button>
    );
  };

  // ============================== Ref ===============================
  // Test needs
  React.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload,
  }));

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  // ============================= Render =============================
  const prefixCls = getPrefixCls('upload', customizePrefixCls);

  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
    [`${prefixCls}-list-rtl`]: direction === 'rtl',
  });

  // >>> Motion config
  const motionKeyList = [
    ...items.map(file => ({
      key: file.uid,
      file,
    })),
  ];

  const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
  // const transitionName = list.length === 0 ? '' : `${prefixCls}-${animationDirection}`;

  let motionConfig: Omit<CSSMotionListProps, 'onVisibleChanged'> = {
    motionDeadline: 2000,
    motionName: `${prefixCls}-${animationDirection}`,
    keys: motionKeyList,
    motionAppear,
  };

  if (listType !== 'picture-card') {
    motionConfig = {
      ...listItemMotion,
      ...motionConfig,
    };
  }

  return (
    <div className={listClassNames}>
      <CSSMotionList {...motionConfig} component={false}>
        {({ key, file, className: motionClassName, style: motionStyle }) => (
          <ListItem
            key={key}
            locale={locale}
            prefixCls={prefixCls}
            className={motionClassName}
            style={motionStyle}
            file={file}
            items={items}
            progress={progress}
            listType={listType}
            isImgUrl={isImgUrl}
            showPreviewIcon={showPreviewIcon}
            showRemoveIcon={showRemoveIcon}
            showDownloadIcon={showDownloadIcon}
            removeIcon={removeIcon}
            downloadIcon={downloadIcon}
            iconRender={internalIconRender}
            actionIconRender={actionIconRender}
            itemRender={itemRender}
            onPreview={onInternalPreview}
            onDownload={onInternalDownload}
            onClose={onInternalClose}
          />
        )}
      </CSSMotionList>

      {/* Append action */}
      {appendAction && (
        <CSSMotion {...motionConfig}>
          {({ className: motionClassName, style: motionStyle }) =>
            cloneElement(appendAction, oriProps => ({
              className: classNames(oriProps.className, motionClassName),
              style: {
                ...motionStyle,
                ...oriProps.style,
              },
            }))
          }
        </CSSMotion>
      )}
    </div>
  );
};

const UploadList = React.forwardRef<unknown, UploadListProps>(InternalUploadList);

UploadList.displayName = 'UploadList';

UploadList.defaultProps = {
  listType: 'text' as UploadListType, // or picture
  progress: {
    strokeWidth: 2,
    showInfo: false,
  },
  showRemoveIcon: true,
  showDownloadIcon: false,
  showPreviewIcon: true,
  previewFile: previewImage,
  isImageUrl,
};

export default UploadList;
