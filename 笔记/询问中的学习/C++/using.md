---
tags:
  - Cpp
comment: false
---
## `using` 关键字总结（C++）

### 1. 基本概念

`using` 是 C++11 引入的**类型别名机制**，用于给已有类型起一个新的名字。
### 作用

- 提升代码可读性
    
- 简化复杂类型
    
- 替代旧式 `typedef`
    
- 支持模板别名（typedef 做不到）
#### 2. 基本语法

###### 2.1 类型别名
```cpp
using 别名 = 原类型;
```
**示例：**
```cpp
using ll = long long;
using ull = unsigned long long;
using pii = pair<int, int>;
```

#### 3. 与 `typedef` 的对比

###### 3.1 可读性
```cpp
typedef long long ll;   // 旧式写法
using ll = long long;   // ✅ 推荐
```
###### 3.2 模板支持（typedef 做不到）
```cpp
template <typename T>
using vec = vector<T>;

vec<int> v;   // 等价于 vector<int>
```
#### 4. 作用域特性

### ✅ `using` 只在当前作用域生效
```cpp
void f() {
    using ll = long long; // 只在 f 内有效
}
```
### ✅ 不会污染全局或库代码

这是它比 `#define` 更安全的核心原因。

#### 5. 为什么不推荐 `using int = long long`

### ❌ 原因

- 破坏语言基础类型语义
    
- 误导阅读者
    
- IDE、语法高亮、静态分析工具全部失效
    
- 模板推导可能异常
    
- 容易导致奇怪的 bug
    
- 不利于长期维护
### ✅ 正确做法
```cpp
using ll = long long;
```
#### 6. 竞赛中的最佳实践

### ✅ 推荐写法
```cpp
using ll = long long;
using pii = pair<int, int>;
using vi = vector<int>;
```
### ✅ 不推荐写法
```cpp
using int = long long;   // ❌ 不要这样写
#define int long long    // ❌ 更不要这样写
```
#### 7. 常见使用场景

###### 7.1 简化 STL 类型
```cpp
using pii = pair<int, int>;
using pll = pair<long long, long long>;
using vi = vector<int>;
using vll = vector<long long>;
```
###### 7.2 简化函数指针
```cpp
using func = void(*)(int, int);
```
###### 7.3 模板别名（高级但常用）
```cpp
template<typename T>
using vec = vector<T>;
```