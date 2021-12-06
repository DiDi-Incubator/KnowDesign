---
order: 4
title: 按钮尺寸
---

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。


```jsx
import { DButton } from 'dcloud-design';

class ButtonSize extends React.Component {

  render() {
    return (
      <>
        <DButton size="large" style={{marginLeft: 20}}>按钮-large</DButton>
        <DButton style={{marginLeft: 20}}>按钮-medium</DButton>
        <DButton size="small" style={{marginLeft: 20}}>按钮-small</DButton>
      </>
    );
  }
}

ReactDOM.render(<ButtonSize />, mountNode);
```
