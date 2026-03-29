---
tags:
  - Cpp
comment: false
---
## >>>>> Part 0. Variables and Operators <<<<<
---
### 1. Variables（变量）

##### 基本数据类型:

1.1： **int a;**              // 整数  
1.2 ：**long long int a;**    // 长整数  
1.3： **float a;**            // 单精度浮点数  
1.4： **double a;**           // 双精度浮点数  
1.5： **char a;**             // 字符  
1.6： **string s;**           // 字符串  
1.7： **bool b;**             // 布尔值  
1.8： **int &b = a;**         // b是a的引用, 对b的操作会影响a  

##### 常量:

2.1： **char ch = 'a';**          // 单个字符  
2.2： **char str[] = "hello";**   // C风格字符串  
2.3： **string s = "hello";**     // C++风格字符串  

[[using]]
---
### 2. Operators（运算符）

##### 自增/自减:

1.1： **a++;**        // 自增运算符         //先使用a，后自增  
1.2： **a--;**        // 自减运算符         //先使用a，后自减  

##### 算术运算符:

2.1： **+**           // 加法运算符  
2.2： **-**           // 减法运算符  
2.3： **\***          // 乘法运算符  
2.4： **/**           // 除法运算符  
2.5： **%**           // 取余运算符  

##### 比较运算符:

3.1： **\=\=**          // 等于运算符  
3.2： **!=**          // 不等于运算符  
3.3： **=**           // 赋值运算符  
3.4： **>**           // 大于运算符  
3.5： **<**           // 小于运算符  
3.6： **>=**          // 大于等于运算符  
3.7： **<=**          // 小于等于运算符  

##### 逻辑运算符:

4.1： **!**           // 逻辑非运算符  
4.2： **&&**          // 逻辑与运算符  
4.3： **||**          // 逻辑或运算符  

##### 位运算符:

5.1： **&**           // 按位与运算符  
5.2： **|**           // 按位或运算符  
5.3： **^**           // 按位异或运算符  
5.4： **~**           // 按位取反运算符  
5.5： **<<**          // 左移运算符  
5.6： **>>**          // 右移运算符  

##### [[3.x 三目运算符]]

6.1： **(condition ? a : b)**   // 如果condition为真,则返回a,否则返回b  

---
## >>>>> Part 1. Input & Output (IO) <<<<<
---
### 格式符 (Format Specifiers)

1. **d**      // int  
2. **lld**    // long long int  
3. **f**      // float  
4. **lf**     // double  
5. **c**      // char  
6. **s**      // string -> 在遇到空格、换行时停止读取  
7. **u**      // unsigned int -> 无符号整数  
8. **x**      // hexadecimal int -> 十六进制整数  
9. **o**      // octal int -> 八进制整数  
### Input 1 : scanf（输入函数）

1. **scanf("%d", &a);**    // 读取一个整数  
2. **scanf("%lld", &a);**  // 读取一个长整数  
3. **scanf("%f", &a);**    // 读取一个单精度浮点数  
4. **scanf("%lf", &a);**   // 读取一个双精度浮点数  
5. **scanf("%c", &a);**    // 读取一个字符 [此时会读空格字符]  
   - **scanf(" %c", &a);** // 读取一个字符 [此时会读非空格字符]  
6. **scanf("%s", s);**     // 读取一个字符串 [注意不能有空格]  
7. **scanf("%u", &a);**    // 读取一个无符号整数  
8. **scanf("%x", &a);**    // 读取一个十六进制整数  
9. **scanf("%o", &a);**    // 读取一个八进制整数  
### Output 1 : printf（输出函数）

1. **printf("%d", a);**    // 输出一个整数  
2. **printf("%lld", a);**  // 输出一个长整数  
3. **printf("%f", a);**    // 输出一个单精度浮点数  
4. **printf("%lf", a);**   // 输出一个双精度浮点数  
   - **printf("%.nlf", a);**   // 输出一个双精度浮点数, 保留 n 位小数  
1. **printf("%c", a);**    // 输出一个字符  
2. **printf("%s", s);**    // 输出一个字符串  
3. **printf("%u", a);**    // 输出一个无符号整数  
4. **printf("%x", a);**    // 输出一个十六进制整数  
5. **printf("%o", a);**    // 输出一个八进制整数  
### Input 2 : cin（输入流）

1. **cin >> a;**      // 读取一个整数、浮点数、字符  
2. **cin >> s;**      // 读取一个字符串 [注意不能有空格]  

### Output 2 : cout（输出流）

1. **cout << fixed << [[setprecision();]] << a;**       // 输出浮点数, 保留 n 位小数
2. **cout << setw(n) << a;**                  // 输出整数, 左对齐, 宽度为 n  
3. **cout << setfill('0') << setw(n) << a;**        // 输出整数, 右对齐, 宽度为 n, 不足补 0  
4. **cout << hex << a;**                      // 十六进制输出  
5. **cout << oct << a;**                      // 八进制输出  
6. **cout << dec << a;**                      // 十进制输出  
7. **cout << scientific << d;**               // 科学计数法输出浮点数  
8. **cout << boolalpha << flag;**             // 输出 true/false 而不是 1/0  

### Input 3 : getline（整行输入）

1. **getline(cin, a);**        // 读取一整行字符串 [包括空格]
   - **getline(cin, a, '\n');** // 读取一整行字符串 [包括空格] 直到遇到换行符

2.  **cin.get(a);**        //读取一个字符 [此时会读空格字符]
   -  **cin.get(a, n);**       // 读取 n-1 个字符 [此时会读空格字符]

3. **cin.getline(a, n);**      // 读取 n-1 个字符 [包括空格] 直到换行符  

4. **while(cin >> a);**        // 读取一整行字符串 [包括空格] 直到文件结束符 -> EOF -> \[\^Z\]  
   - **while(cin.peek() != EOF);**        // 试读一整行字符串 [包括空格] 直到文件结束符 -> EOF -> \[\^Z\]  


###  Input 4 ：Loop（容器输入循环）

1. **逐个读取 vector 元素**
```cpp
vector<int> v;
for (int i = 0; i < n; i++) 
{
	cin >> v[i];  //逐个读取vector元素
}
```

2. **逐个读取数组元素**
```cpp
int arr[n];
for (int i = 0; i < n; i++) 
{
	cin >> arr[i];   //逐个读取数组元素
}
```

### Input 5 ：Buffer Clear

1. [[cin.ignore();]] // 忽略一个字符 [包括换行符]
	- **cin.ignore(n, '\n');** // 忽略 n 个字符 [直到遇到换行符（不包括）] 
		-> 常用于 getline() 后

---
## >>>>> Part 2. Logic <<<<<

### 1. Conditionals

```cpp
1.1 if (condition) // 如果满足条件
{
    // 将要进行的处理
}

1.2 if (!condition) // 如果不满足条件
{
    // 将要进行的处理
}

1.3 if (condition_a && condition_b) // 如果同时满足a,b条件
{
    // 将要进行的处理
}

1.4 if (condition_a || condition_b) // 如果满足a或b条件
{
    // 将要进行的处理
}

1.5 else if (condition) // 如果满足其他条件 [不满足if的条件]
{
    // 将要进行的处理
}

1.6 else 
{
    // 不满足以上所有条件,将要进行的处理
}
```
### 2. Switch

```cpp
switch (condition) // 根据条件进行分支处理
{
    case 1:
        // 处理 case 1
        break;
    case 2: 
        // 处理 case 2
        break;
    default: 
        // 默认处理
        break;
}
```
### 3. Loops

```cpp

// 3.1 普通循环 n 次
for (int i = 0; i < n; i++) { ... }

// 3.2 遍历字符串 s 的每个字符
for (char c : s) { ... }

// 3.3 -1 遍历 vector v 中的每个元素 [不会改变 vector 元素]
for (auto x : v) { ... }

// 3.3 -2 遍历 vector v 中的每个元素 [会改变 vector 元素]
for (auto &x : v) { ... }

// 3.4 循环控制
for (int i = 0; i < n; i++) 
{
    if (condition) 
	    break;    // 跳出循环
    if (condition) 
	    continue; // 跳过本次循环，进入下一次循环
}

// 3.5 双重循环
for (int i = 0; i < n; i++) 
{
    for (int j = 0; j < m; j++) 
	{ 
		// 双重循环
	}
}

// 4.1 While 循环 (满足条件时)
while (condition); // 当满足条件时循环
        {
            // 将要进行的处理
        }

// 4.2 While 循环 (不满足条件时)
while (!condition); // 当不满足条件时循环
        {
            // 将要进行的处理
        }

// 4.3 Do-While 循环 (至少执行一次)
do // 至少执行一次循环
{
	// 将要进行的处理
}
while (condition); // 在满足条件时循环
```

---
## >>>>> Part 3. Operations and Functions <<<<<
---
### 1.1 sort();
```cpp
- 1.1 sort(v.begin(), v.end()); 
	  //对 vector v 进行排序 [默认升序]
    
- 1.2 sort(v.begin(), v.end(), greater<int>()); 
	  // 对 vector v 进行排序 [降序]
    
- 2.1 sort(arr, arr + n); 
	  // 对数组 arr 进行排序 [默认升序]
    
- 2.2 sort(arr, arr + n, greater<int>()); 
	  // 对数组 arr 进行排序 [降序]
```
### 1.2 reverse();
```cpp
- 1.1 reverse(v.begin(), v.end()); 
	  // 反转 vector
	  
- 1.2 reverse(arr, arr + n); 
	  // 对数组 arr 进行反转
```
### 1.3 algorithm：
```cpp
- 1.1 max(a, b); 
	  // 返回 a,b 中的较大值
	
- 1.2 min(a, b); 
	  // 返回 a,b 中的较小值
	
- 1.3 pow(a, b); 
	  // 返回 a 的 b 次方
	
- 1.4 sqrt(a); 
	  // 返回 a 的平方根
```
### 2.1 string 操作

-  **2.1 基本属性与容量**
    1. `s.length();`      // 返回字符串 s 的长度
    2. `s.size();`        // 返回字符串 s 的长度
    3. `s.empty();`       // 判断是否为空
    4. `s.clear();`       // 清空字符串 s
    5. `s.capacity();`    // 返回当前分配的容量
    6. `s.resize(n);`     // 调整大小为 n
    7. `s.reserve(n);`    // 预留至少 n 个字符的空间

-   **2.2 访问接口**
    1. `s.front();`       // 返回第一个字符
    2. `s.back();`        // 返回最后一个字符
    3. `s.begin();`       // 返回迭代器起点 [指向第一个字符]
    4. `s.end();`         // 返回迭代器终点 [指向最后一个字符的下一个位置]

- **2.3 尾部操作**
    1. `s.push_back('a');` // 在字符串 s 的末尾添加字符 'a'
    2. `s.pop_back();` // 删除字符串 s 的最后一个字符

- **2.4 插入/删除/替换**  
    1. `s.insert(pos, str);` // 在 pos 位置插入字符串 str   
```cpp
        string s = "hello";
        s.insert(2, "___");
        cout << s << endl;    // 输出 "h___ello"
```
- 
	2. `s.erase(pos, len);` // 删除从 pos 开始的 len 个字符  
```cpp
        string s = "hello";
        s.erase(2, 3);
        cout << s << endl; // 输出 "he"
```
- 
	3.  `s.replace(pos, len, str);` // 用 str 替换从 pos 开始的 len 个字符  
```cpp
        string s = "hello";
        s.replace(2, 3, "___");
        cout << s << endl; // 输出 "h___o"
```

- **2.5 查找**
    1. `s.find("abc");`        // 查找子串 [第一次出现位置, 未找到返回 string::npos]
    2. `s.rfind("abc");`       // 反向查找子串 [最后一次出现位置, 未找到返回 string::npos]
```cpp
        string s = "hello";
        int pos = s.find("ll");
        if (pos != string::npos) cout << pos; // 输出第一次出现的含2的位置
        else cout << "-1";   // 未找到则输出 -1
```
- 
    3. `s.find_first_of("abc");`    // 查找任意字符 [返回第一次出现的位置, 未找到返回 string::npos]
    4. `s.find_last_of("abc");`     // 反向查找任意字符 [返回最后一次出现的位置, 未找到返回 string::npos]
```cpp
        string s = "hello";
        int pos = s.find_last_of("ll");   
        // 查找子串 "ll" [返回最后一次出现的位置 3, 未找到则返回 string::npos]
        if (pos != string::npos)
        {
            cout << pos << endl; // 输出最后一次出现的位置 3
        }
        else
        {
            cout << "-1" << endl; // 未找到则输出 -1
        }
        ```

- **2.6 子串**
    1. `s.substr(pos, len);` // 返回子串 [从 pos 开始, 长度为 len]
        // 结合 `find_first_not_of` 使用, 查找第一个不属于 "abc" 的字符
```cpp
        string s = "hello";
        string sub = s.substr(2, 3);
        cout << sub << endl; // 输出 "llo"
```

- **2.7 比较**
    1. `s1 == s2;`        // 判断字符串是否相等
    2. `s1.compare(s2);`
        // 比较字符串 s1 和字符串 s2 的大小关系 [返回一个整数, 表示 s1 与 s2 的大小关系]
        // 若 s1 等于 s2, 则返回 0
        // 若 s1 大于 s2, 则返回一个大于 0 的整数
        // 若 s1 小于 s2, 则返回一个小于 0 的整数

- **2.8 类型转换**
    1. `stoi(s);`         // string 转 int
    2. `stod(s);`         // string 转 double
    3. `to_string(n);`    // 数字转 string
```cpp
        int d = 123;
        string str = to_string(d);  // 将整数 d 转换为字符串
        cout << str << endl; // "123"
 
        int x = stoi(str);  // 将字符串 str 转换为整数 123
        cout << x << endl;   // 123

        double lf = stod(str);  // 将字符串 str 转换为浮点数 123.0
        cout << lf << endl;  // 123.0
```

- **2.9 交换**
    1. `s.swap(s2);` // 交换两个字符串内容
```cpp
        string s1 = "hello";
        string s2 = "world";
        s1.swap(s2);
        cout << s1 << endl; // "world"
        cout << s2 << endl; // "hello"
```

### 2.2 vector 操作

- **2.1 基本属性与容量**
    1. `v.size();`       // 返回 vector v 的大小
    2. `v.empty();`      // 判断是否为空
    3. `v.capacity();`   // 返回容量
    4. `v.resize(n);`    // 调整大小
    5. `v.reserve(n);`   // 预留空间

- **2.2 迭代器接口**
    1. `v.begin();`      // 返回第一个元素的迭代器
    2. `v.end();`        // 返回最后一个元素的迭代器 [不包括最后一个元素]
    3. `v.rbegin();`     // 返回最后一个元素的迭代器 [反向迭代器]
    4. `v.rend();`       // 返回第一个元素的迭代器 [反向迭代器]
```cpp
        for (auto it = v.begin(); it != v.end(); ++it) 
        {
            cout << *it << " ";
        }
```

- **2.3 访问接口**
    1. `v.front();`      // 返回第一个元素
    2. `v.back();`       // 返回最后一个元素

- **2.4 清空**
    1. `v.clear();`      // 清空 vector v

- **2.5 尾部操作**
    1. `v.push_back(x);` // 在 vector v 的末尾添加元素 x
    2. `v.pop_back();`   // 删除 vector v 的最后一个元素
    3.  [[emplace_back();]]

- **2.6 删除**
    1. `v.erase(v.begin() + i);`                // 删除第 i 个元素
    2. `v.erase(v.begin() + i, v.begin() + j);`   // 删除区间 [i, j)

- **2.7 插入**
    1. `v.insert(v.begin() + i, x);` // 在第 i 个元素前插入 x

- **2.8 交换**
    1. `v.swap(v.begin() + i, v.begin() + j);` // 交换第 i 和第 j 个元素

- **2.9 赋值**
    1. `v.assign(n, x);` // 将 vector v 中的 n 个元素赋值为 x
---
## >>>>> Part 4. Common Functions <<<<<
---
### 1.1 Simple Prime Checker (ver1) 
 **简单质数筛：输出n以内的所有质数**

```cpp
void isPrime(int n) 
{
    // 辅助函数：判断某个数是否为质数
    // 使用 Lambda 表达式封装在函数内部，避免污染全局命名空间
    auto checkPrime = [](int x) 
    {
        if (x <= 1) 
            return false; // 1及以下不是质数
        for (int i = 2; i * i <= x; i++) // 检查到 sqrt(x)
        {
            if (x % i == 0) 
                return false; // 找到因子，不是质数
        }
        return true; // 没有因子，是质数
    };
    
    for (int i = 2; i <= n; i++) // 遍历从2到n的每个数
    {
        if (checkPrime(i)) // 如果i是质数
            cout << i << " "; // 输出i
    }
}

int main() 
{
    int value;
    cin >> value; // 读取用户输入
    isPrime(value); // 调用封装好的函数 isPrime, 此时输出的就是 value 以内的所有质数
    return 0;
}
```
### 1.2 Simple Prime Checker (ver2)
**简单质数筛---仅检查某个数**
```cpp
bool isPrime(int x)
{
    if (x <= 1)
        return false;
    if (x == 2 || x == 3)
        return true;
    if (x % 2 == 0)
        return false;
    for (int i = 3; i * i <= x; i += 2)
    {
        if (x % i == 0)
            return false;
    }
    return true;
}
```
### 2. Euler Sieve Prime Checker (欧拉筛)

```cpp
vector<int> primes;   // 全局向量，用于存储筛选出的质数
vector<bool> isPrime; // 全局向量，用于标记每个数是否为质数

void EulerSieve(int n)
{
    primes.clear();              // 清空质数列表
    isPrime.assign(n + 1, true); // 初始化 isPrime 数组，默认所有数为质数
    isPrime[0] = isPrime[1] = false; // 0 和 1 不是质数，标记为 false

    for (int i = 2; i <= n; i++) // 遍历从 2 到 n 的每个数
    {
        if (isPrime[i])              // 如果 i 是质数
            primes.push_back(i);     // 将 i 添加到质数列表中
        for (int p : primes)         // 遍历已找到的所有质数 p
        {
            if (1LL * i * p > n)     // 防止整数溢出，如果 i*p 超过 n 则停止
                break;
            isPrime[i * p] = false;  // 标记 i*p 为非质数
            if (i % p == 0)          // 关键优化：当 p 是 i 的最小质因数时停止
                break;
        }
    }
}

// 最终，primes 向量中存储的就是 1 到 n 之间的所有质数

```
### 3. Bubble Sort (冒泡排序)
**冒泡排序---每次比较相邻的两个元素，如果顺序错误就交换**

```cpp
void bubble_sort(int *arr, int len) // 对数组 arr 进行排序, 数组长度为 len
{
    for (int i = 0; i < len - 1; i++)
    {
        bool swapped = false; // 用于标记是否发生了交换
        for (int j = 0; j < len - 1 - i; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true; // 标记发生了交换
            }
        }
        if (!swapped) // 如果在这一轮遍历中没有发生交换，说明数组已经有序
            break;
    }
}
```
### 4. Quick Sort (快速排序)
**快速排序 , 选择基准值 , 将数组分为两部分 , 递归排序**

```cpp
void quick_sort(int *arr, int left, int right)
{
    if (left >= right) 
        return;

    int i = left;
    int j = right;
    int pivot = arr[left]; // 选取基准值

    while (i < j) // 当 i 小于 j 时, 说明还没有遍历完
    {
        while (i < j && arr[j] >= pivot) // 从右向左找第一个小于基准值的元素
        {
            j--; // 找到小于基准值的元素, 移动指针 j
        }
        if (i < j)
        {
            arr[i++] = arr[j]; // 将小于基准值的元素放到左边
        }

        while (i < j && arr[i] <= pivot) // 从左向右找第一个大于基准值的元素
        {
            i++; // 找到大于基准值的元素, 移动指针 i
        }
        if (i < j)
        {
            arr[j--] = arr[i]; // 将大于基准值的元素放到右边
        }
    }

    arr[i] = pivot; // 将基准值放到正确位置

    quick_sort(arr, left, i - 1);  // 递归左半部分
    quick_sort(arr, i + 1, right); // 递归右半部分
}

```
### 5. Binary Search 
**二分查找---在有序数组中查找目标值**

```cpp
int binary_search(int *arr, int len, int target)
{
    int left = 0;
    int right = len - 1;

    while (left <= right) // 当 left 小于等于 right 时, 说明还没有遍历完
    {
        int mid = left + (right - left) / 2; // 计算中间位置
        
        if (arr[mid] == target) 
        {
            return mid; // 找到目标, 返回目标的索引
        }
        else if (arr[mid] < target) 
        {    
            left = mid + 1; // 目标在右半部分
        }
        else 
        {    
            right = mid - 1; // 目标在左半部分
        }
    }
    return -1; // 未找到
}
```
### 6. Greatest Common Divisor -> GCD 
**最大公约数---欧几里得算法(辗转相除)**

```cpp
int gcd(int a, int b)
{
    if (b == 0)
        return a;
    else
        return gcd(b, a % b); // 递归调用, 直到 b 为 0, 则 a 为最大公约数
}

// 也可以写成:
return b == 0 ? a : gcd(b, a % b); 
// 递归调用, 直到 b 为 0, 则 a 为最大公约数
```
### 7. Palindrome Checker 
**回文检查器---检查一个数是否为回文数**

```cpp
bool isPal(int x) 
{
    string s = to_string(x);
    string re(s.rbegin(), s.rend());
    if (s == re)
        return true;
    else
        return false;
}
```

## >>>>> Part 5. New Specs in C++ <<<<<

### 1.  [[lambda]] Expression
**匿名函数**

**1：lambda表达式的定义方式**

            类型 变量名 = [捕获列表](参数列表) -> 返回类型 { 函数体 };

**2：捕获列表：用于在 lambda 表达式中访问外部变量**

            2.1 []: 空捕获列表, 不捕获任何外部变量

            2.2 [=]: 值捕获列表, 捕获所有外部变量按值传递

            2.3 [&]: 引用捕获列表, 捕获所有外部变量按引用传递

            2.4 [a, &b]: 混合捕获列表, 捕获变量 a 按值传递, 捕获变量 b 按引用传递

**3：参数列表: 用于定义 lambda 表达式的参数**

1. **((类型)(变量名))：**
	eg：(int a, int b): 定义了两个参数 a, b, 类型为 int
	
2. **返回类型：** 用于指定 lambda 表达式的返回类型
	
3. **-> (类型)**：表示 lambda 表达式的返回类型
	eg: -> int: 表示 lambda 表达式的返回类型为 int
	
4. **函数体：** 用于实现 lambda 表达式的功能
	eg: { return a + b; }: 表示 lambda 表达式的函数体, 实现了简单的加法操作

```cpp
auto add = [](int a, int b) -> int { return a + b; };
cout << add(3, 4) << endl; // 输出 7
```