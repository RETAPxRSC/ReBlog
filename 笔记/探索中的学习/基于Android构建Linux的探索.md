---
tags:
  - Linux
  - Android
comment: true
---
# 基于Android构建Linux的探索

---
### 写在前面

这篇博客是Re闲来无事鼓捣安卓架构下的Termux以及Proot-distro过程中的学习与分享，当然也包含踩过的坑，希望能帮到跟我一样闲着折腾安卓的大家喵

---

# 0. 我应该准备什么？

-  首先，当然是有充足存储空间的一台安卓设备（教程中以三星Tab S9+作为参考）
-  其次，确认自己的设备处理器型号（此处教程针对骁龙系列处理器）
-  最后，准备一个良好的网络环境会大幅提升过程的体验~

---
# 1. 安装 Termux / Termux-X11

Termux是我们将安卓设备“变”为Linux设备的核心，而Termux-X11则是基于X协议的“显示器”

-  最推荐的Termux安装源是 https://github.com/termux/termux-app
-  同样的，Termux-X11： https://github.com/termux/termux-x11
-  我们还需要Nightly.deb： https://github.com/termux/termux-x11

---
# 2. 在Termux环境中安装 X11

在安装完之后，我们便可以进入Termux、更新软件包、并根据指引安装X11-repo

#### *更新软件包*
```bash
pkg update
```
#### *安装 x11 Repo*
```bash
pkg install x11-repo
```
#### *安装 Nightly 包*    *~~可能需要使用 mv 移动路径~~*
```bash
apt install ./termux-x11-nightly-1.03.01-0-a11.deb
```

==请注意：对于大部分安卓平板，在系统设置中设置关闭在后台的耗电限制以及允许自启动等权限对于Termux是必须的！==

---
# 3. 在Termux中安装Proot-Distro

#### *安装 Proot-Distro*
```bash
apt install proot-distro
```

现在我们已经安装好了一切前置的依赖，可以进入Linux系统的选择了！

在这里有一个对于Linux新手非常合适的网站，我们可以用于参考合适自己的Linux系统（~~虽然大部分都不支持，但是还是可以作为参考喵~~）

https://distrochooser.de/zh-hans

我们既然是（~~野鸡~~）稳定方案，那么在此次教材中我们就使用Debian作为示范，也欢迎大家摸索自己合适的系统（*有没有Arch小南梁喵*）

以下是PD截止文章截稿支持的所有系统，大家也可以通过命令查询

```bash
proot-distro list
```

```
Supported distributions (format: name < alias >):

  * Adélie Linux < adelie >
  * AlmaLinux < almalinux >
  * Alpine Linux < alpine >
  * Arch Linux < archlinux >
  * Artix Linux < artix >
  * Chimera Linux < chimera >
  * Debian (trixie) < debian >
  * Deepin < deepin >
  * Fedora < fedora >
  * Manjaro < manjaro >
  * OpenSUSE < opensuse >
  * Oracle Linux < oracle >
  * Pardus < pardus >
  * Rocky Linux < rockylinux >
  * Termux < termux >
  * Trisquel GNU/Linux < trisquel >
  * Ubuntu (25.10) < ubuntu >
  * Void Linux < void >

Install selected one with: proot-distro install <alias>
```
#### *现在我们来安装Debian*
```bash
proot-distro install debian
```
#### *登录Debian（root）*
```bash
proot-distro install debian
```
#### *更新软件库*
```bash
apt update
```
#### *更新证书（可选）*
```bash
apt install ca-certificates vim;
```
#### *更换国内源*  ---  https://mirrors.tuna.tsinghua.edu.cn/
```bash
nano /etc/apt/sources.list
```
#### 写入以下内容 *~~（记得注释原有的源）~~*
```File

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
deb https://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
# deb-src https://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware

```
#### *现在我们可以愉快的升级了*
```bash
apt upgrade
```

由于Proot-Distro默认安装的是最小的Debian（真的很小），因此我们需要安装一些工具来让我们回归正常使用Linux的逻辑

#### *安装 sudo，adduser*
```bash
apt install sudo adduser
```

#### *现在我们可以注册用户了*
```bash
adduser retap
```

~~在一路的跳过后~~

为了在Termux环境中使用sudo，我们还需要修改visudo
#### *修改visudo*
```bash
EDITOR=nano visudo
```
#### *写入以下内容*
```File
retap ALL=(ALL:ALL) ALL
```

接下来，我们就可以正式登录用户环境了，但是请务必记住，**==我们需要为X11共享Tmp文件夹==**，因此我们需要修改启动命令
#### *登录用户环境*
```bash
proot-distro login debian --user retap --shared-tmp
```
#### *安装中文包（可选）*
```bash
sudo apt install -y locales \
	fonts-wqy-microhei fonts-wqy-zenhei \
    fonts-noto-cjk
```
#### *安装中文Locales (可选)*
```bash
sudo dpkg-reconfigure locales
```

在列表里找到：
zh_CN.UTF-8 UTF-8
#### *配置默认语言*
```bash
echo 'LANG=zh_CN.UTF-8' >> ~/.profile
echo 'LC_CTYPE=zh_CN.UTF-8' >> ~/.profile
```
---
# 4. 安装并启动图形化界面

很好！现在我们已经完成了所有底层配置，接下来我们将为它赋予一层图形化的外衣
#### *安装 Xfce4*
```bash
sudo apt install -y xfce4 xfce4-goodies dbus-x11
```

在选择完默认语言选项，安装完成后，我们需要==**返回Termux**==
### **==接下来的这些操作也正是以后我们启动的操作==**
#### *启动X11*
```bash
termux-x11 :0 &
```
#### *登录 Debian*
```bash
proot-distro login debian --user retap --shared-tmp
```
#### *设置Display*
```bash
export DISPLAY=:0
```
#### *启动 Xfce*
```bash
startxfce4
```

到这一步就大功告成了！现在我们应该能在X11应用程序的界面中看到熟悉的小老鼠Xfce了喵

---
# 5. 干净的关闭图形化界面

不同于安卓的简单关机，由于我们嵌套模拟了Linux环境，为了确保进程被安全关闭，我们可以这样退出

#### *在 Xfce 的界面点击注销*
#### *在Linux中终止进程*
```bash
pkill -u $USER xfce4-session
pkill -u $USER dbus-daemon
exit
```
#### *在Termux中终止进程*
```bash
pkill -f termux-x11
pkill -f Xwayland
exit
```

经过这些步骤，我们可以确保干净的关闭并退出所有相关进程，避免可能出现的冲突

---
# 6. 它能做什么？

不同于大家熟悉的Windows，大家可能并不习惯Linux的包管理模式，那么大家折腾了这么久，它能做些什么呢？

---
1. 安装Vscode --- 没错，Vscode+GCC完美的支持我们所模拟的环境，只需要关闭Electron的Sandbox功能，我们便可以获得一个功能与电脑完全一致的Vscode，大大的利好了我们计算机学生。经此操作的平板可以轻松在续航和便捷程度上超越笨重而只拥有羸弱续航的游戏本，胜任（~~大学生体质~~）轻松的代码编写任务

-  Vscode.deb下载： https://code.visualstudio.com/

-  Vscode/C++配置
```bash
sudo apt update
sudo apt install g++ gdb build-essential -y
```
当然，我们还需要对环境进行一些配置，参考[[#7. 环境配置]]

-  Vscode启动配置
```bash
code --no-sandbox --disable-setuid-sandbox
```
---
2. 安装浏览器 --- 当然，必不可少的浏览器需求也是可以轻松解决的

-  安装Firefox
```bash
sudo apt install firefox-esr -y
```
---
3. 安装QQ/微信 --- 我们的国民软件也有对Linux的良好支持，但是同样的，我们需要关闭这些Electron架构软件的Sandbox

- https://im.qq.com/linuxqq
- https://linux.weixin.qq.com

- （样例）关闭Sandbox启动QQ
```bash
  qq --no-sandbox --disable-setuid-sandbox
```
---
# 7. 环境配置

#### 对于Vs/C++，我们需要以下文件
```bash
.vscode/
 ├── c_cpp_properties.json   ← IntelliSense 配置
 ├── tasks.json              ← 编译
 └── launch.json             ← 调试
```

*c_cpp_properties.json*
```json
{
    "version": 4,
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "compilerPath": "/usr/bin/g++",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "linux-gcc-arm64"
        }
    ]
}
```

*tasks.json*
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "g++",
            "args": [
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/a.out"
            ],
            "group": "build",
            "problemMatcher": ["$gcc"]
        }
    ]
}
```

*launch.json*
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug C++",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/a.out",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}
```

现在我们就完成了Vscode的C++环境配置

---
# 8. 故障排查

#### 1. ==Process completed (signal 9)==  哎呦，闪退了？！

先别担心，这是安卓16的子进程限制，我们可以简单的将其解决，无需使用传统的ADB方式

1. 找到你的平板“设置”，通过连续点按版本号进入开发者选项（不同品牌可能包含不同操作，视你的平板而定）
2. 在开发者选项中找到 “禁用子进程限制”

通过这样简单的操作，我们就可以保证Termux/Termux-X11的稳定运行，让你的安卓平板完美的变身为Linux轻薄本啦~

---
# 9. 写在后面

这是Retap有史以来尝试撰稿的第一篇博客，全部基于Re最近~~无聊~~鼓捣的小玩意（？

欢迎大家尝试跟随我的“教程”动手，尝试让自己的新老设备通过Linux焕发第二春，或者为自己打造一台独特而有个性的轻薄的“开发者”笔记本

欢迎大家在评论区交流过程中遇到的问题，跟我互动喵~

那么这里是Re，我们下一篇博客见~

2026/04/12