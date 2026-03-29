---
tags:
  - Cpp
comment: false
---
### **当使用** `setprecision()` **时，后续所有浮点输出都会被影响**

`fixed` 和 `setprecision()` 会修改 `cout` 的**全局状态**，直到你手动恢复为止。
### 取消Setprecision：

```cpp
cout << fixed << setprecision(6) << 【输出】 << defaultfloat << setprecision(6) << endl;
```