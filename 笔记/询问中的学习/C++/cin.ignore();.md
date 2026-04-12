---
tags:
  - Cpp
comment: false
---
|写法|能不能用|是否推荐|
|---|---|---|
|`cin.ignore()`|✅ 能用，但容易出问题|❌ 不推荐|
|`cin.ignore(1)`|✅ 能用，但不稳|❌ 不推荐|
|`cin.ignore(numeric_limits::max(), '\n')`|✅ 完美解决|✅ 强烈推荐|
### 关于 `cin.ignore(numeric_limits<streamsize>::max(), '\n');`

- 一直忽略到换行符
    
- 不管前面有多少字符
    
- 永远不会卡住