---
tags:
  - Cpp
comment: false
---
# Lambda 的结构拆解

一个 lambda 的完整结构是：

```cpp
[capture](parameters) -> return_type {
    body;
}
```

 lambda 对应如下：

| 部分        | 含义                       |
| --------- | ------------------------ |
| `[]`      | 捕获列表                     |
| `( ... )` | 参数列表                     |
| `{ ... }` | 函数体                      |
| 返回类型      | 自动推断（因为 return 的都是 bool） |
