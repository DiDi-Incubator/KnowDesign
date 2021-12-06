---
order: 0
title: 基本
---

简单的使用`代码块展示`，以及`代码块编辑`。

```jsx
import { DCode } from 'dcloud-design';
const codeStr = 'const twoSum = function(nums, target) {\n    const newNumsMap = new Map(nums.map((item, idx) => [item, idx]));\n\n    let result = [];\n    nums.forEach((numItem, numIndex) => {\n        const subItem = target - numItem;\n        if (newNumsMap.has(subItem) \&\& numIndex !== newNumsMap.get(subItem)) {\n            result = [newNumsMap.get(subItem), numIndex];\n        }\n    })\n    return result;\n};\n\nconst nums = [2, 7, 11, 15];\nconst target = 9;\n\nconsole.info(twoSum(nums, target));';
const Demo: React.FC = () => {
  return (
    <div>
      <h3>DCode</h3>
      <DCode language="javascript" editable={false} value={codeStr} />
      <h3>DCode editor</h3>
      <DCode height={300} language="javascript" editable={true} defaultValue={codeStr} />
    </div>
  );
}

ReactDOM.render(
  <div>
    <Demo />
  </div>,
  mountNode,
);
```
