import * as React from 'react';
import { useContext } from 'react';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import RcImage, { ImageProps } from 'rc-image';
import defaultLocale from '../locale/en_US';
import PreviewGroup, { icons } from './PreviewGroup';
import { ConfigContext } from '../config-provider';
import { getTransitionName } from '../_util/motion';

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup;
}

const Image: CompositionImage<ImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  ...otherProps
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('image', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const { locale: contextLocale = defaultLocale } = useContext(ConfigContext);
  const imageLocale = contextLocale.Image || defaultLocale.Image;

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === 'object' ? preview : {};

    return {
      mask: (
        <div className={`${prefixCls}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      ),
      icons,
      ..._preview,
      transitionName: getTransitionName(rootPrefixCls, 'zoom', _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, 'fade', _preview.maskTransitionName),
    };
  }, [preview, imageLocale]);

  return <RcImage prefixCls={prefixCls} preview={mergedPreview} {...otherProps} />;
};

export { ImageProps };

Image.PreviewGroup = PreviewGroup;

export default Image;
