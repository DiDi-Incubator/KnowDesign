---
category: Components
type: Data Entry
title: Cascader
cover: https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg
---

Cascade selection box.

## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

## API

```jsx
<Cascader options={options} onChange={onChange} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether allow clear | boolean | true |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| changeOnSelect | (Work on single select) Change value on each selection if set to true, see above demo for details | boolean | false |  |
| className | The additional css class | string | - |  |
| defaultValue | Initial selected value | string\[] \| number\[] | \[] |  |
| disabled | Whether disabled select | boolean | false |  |
| displayRender | The render function of displaying single selected options. You can use tagRender for multiple mode | (label, selectedOptions) => ReactNode | label => label.join(`/`) |  |
| dropdownClassName | The additional className of popup overlay | string | - | 4.17.0 |
| dropdownRender | Customize dropdown content | (menus: ReactNode) => ReactNode | - | 4.4.0 |
| expandIcon | Customize the current item expand icon | ReactNode | - | 4.4.0 |
| expandTrigger | expand current item when click or hover, one of `click` `hover` | string | `click` |  |
| fieldNames | Custom field name for label and value and children | object | { label: `label`, value: `value`, children: `children` } |  |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative. [example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | function(triggerNode) | () => document.body |  |
| loadData | To load option lazily, and it cannot work with `showSearch` | (selectedOptions) => void | - |  |
| maxTagCount | Max tag count to show. `responsive` will cost render performance | number \| `responsive` | - | 4.17.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \| function(omittedValues) | - | 4.17.0 |
| notFoundContent | Specify content to show when no result matches | string | `Not Found` |  |
| open | Set visible of cascader popup | boolean | - | 4.17.0 |
| options | The data options of cascade | [Option](#Option)\[] | - |  |
| placeholder | The input placeholder | string | `Please select` |  |
| placement | Use preset popup align config from builtinPlacements：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` | 4.17.0 |
| showSearch | Whether show search input in single mode | boolean \| [Object](#showSearch) | false |  |
| size | The input size | `large` \| `middle` \| `small` | - |  |
| style | The additional style | CSSProperties | - |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| tagRender | Customize tag render when `multiple` | (props) => ReactNode | - | 4.17.0 |
| value | The selected value | string\[] \| number\[] | - |  |
| onChange | Callback when finishing cascader select | (value, selectedOptions) => void | - |  |
| onDropdownVisibleChange | Callback when popup shown or hidden | (value) => void | - | 4.17.0 |
| multiple | Support multiple or not | boolean | - | 4.17.0 |
| searchValue | Set search value，Need work with `showSearch` | string | - |  |
| onSearch | The callback function triggered when input changed | (search: string) => void | - |  |
| dropdownMenuColumnStyle | The style of the drop-down menu column | CSSProperties | - |  |
| loadingIcon | The apparence of lazy loading (now is useless) | ReactNode | - |  |

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | function(inputValue, path): boolean | - |  |
| limit | Set the count of filtered items | number \| false | 50 |  |
| matchInputWidth | Whether the width of list matches input, ([how it looks](https://github.com/ant-design/ant-design/issues/25779)) | boolean | true |  |
| render | Used to render filtered options | function(inputValue, path): ReactNode | - |  |
| sort | Used to sort filtered options | function(a, b, inputValue) | - |  |

### Option

```typescript
interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |
