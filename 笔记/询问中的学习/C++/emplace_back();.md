---
tags:
  - Cpp
comment: false
---
## Emplace_back 和 Push_back 的区别

1. `push_back`**：先构造对象，再拷贝/移动进容器。
2.  `emplace_back`：**直接在容器内部原地构造对象（更高效）。**
## Push_back 用法

```cpp
People p(tag, name, birthday, sex, tele, phone);
people.push_back(p);  // 拷贝一次
-----
people.push_back(People(tag, name, birthday, sex, tele, phone)); 
// 临时对象 + 移动
```
## Emplace_back 用法

```cpp
people.emplace_back(tag, name, birthday, sex, tele, phone);
```
## 什么时候用 Push_back？

当你**已经有**一个对象时

```cpp
People p(1, "Tom", "2000-01-01", 'M', "123", "456");
people.push_back(p);  // push_back 更自然
```
## 什么时候用 Emplace_back？

当你想**直接构造**对象时

```cpp
//直接构造对象
people.emplace_back(1, "Tom", "2000-01-01", 'M', "123", "456");
```