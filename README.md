# [dingdong-nodejs 叮咚买菜nodejs自动下单脚本](https://github.com/AshinTop/dingdong-nodejs.git)

## 注意事项

**1. 本项目仅供技术学习和交流，不可用作商业行为，任何违法违规造成的问题与本人无关。**

**2. 不可并非太高，不然账号可能会被风控。**


## 0. 前言

2022年初的上海，买菜也变成一件困难的事情，在所有网购外卖平台大多停罢的当下，叮咚是买菜的唯二选择。

每天5点多起床加购物车，6点狂点下单，最后看着几百的东西就剩二三十，还得蹲守捡漏，这样的日子真的已经够够的了。

早起毁一天，而早起抢购却什么都没买到，更是让人伤心欲绝。

看到有大佬写了叮咚买菜的脚本，本人根据实际体验优化了一下，希望能帮助到和我一样被叮咚伤害的人。


**快速开始**

```
// 克隆代码
git clone git@github.com:AshinTop/dingdong-nodejs.git

// install依赖
npm i

// 填入配置信息
# 按照 【2.填入用户配置】 自行配置用户信息

// 运行程序
npm start
```

## 1. 特性

1. 自定义配置（用户相关信息需要自行抓包获取填入）
2. 支持下单成功的提醒邮件
3. 支持定时运行

## 2. 填入用户配置

使用 charles 手机抓包, [教程](https://blog.csdn.net/weixin_54789946/article/details/114879602)

```
const userConfig = {
    // 叮咚买菜小程序用户信息
    'uid': '',
    'longitude': '',
    'latitude': '',
    'station_id': '',
    'city_number': '',
    's_id': '',
    'openid': '',
    'device_token': '',
    'api_version': '9.49.2', // 如果与抓包到的不一致，换成最新的
    'app_version': '2.82.4', // 如果与抓包到的不一致，换成最新的

    // 以下为邮箱配置 非必需 如果要启动定时发送邮件提醒可以选一下 详情见readme.md
    'fromEmail': '', // 发送邮件的邮箱
    'toEmail': '', // 接受邮件的邮箱
    'emailCode': '', // 邮箱授权码， QQ邮箱在 设置 -> 账户 -> POP3/SMTP服务 中开启
    'emailHost': 'smtp.qq.com', // 邮箱服务器地址 如非qq邮箱 请自行更改

    // 抢菜策略，
    'isAuto': false, // 是否开启自动监听模式（5:55自动开启，5:59开始下单）,开启后maxTime设置无效
    'autoTime': { //配置开启和下单时间
      start: [5, 55],//5:55开始获取信息
      doBuy: [5, 59] //5:59开始下单
    },
    'runMode': 'traffic', // normal 为非高峰期策略，traffic 为高峰期策略
    'runInterval': 1000, // 每一个请求的轮询间隔
    'maxTime': 5, // 单次运行最长时间 防止被风控 单位为分钟
    'useLogger': true, // 是否开启logger 调试使用
};

```

## 3. 邮件通知配置（可不配）

1. 邮件通知可以选择不配置，不配置则不能发送邮件提醒

2. 需要准备发送邮箱和接收邮箱（发送邮箱和接收邮箱可以为同一个）

3. 接收邮箱可以绑定iphone自带的邮件APP，实现铃声提醒

### 发送邮箱的配置

1. 打开发送邮箱的 ‘设置 => 账户  => 开启 POP3/SMTP服务’，复制下授权码

2. 如果已经开启服务，点击’生成授权码‘获取授权码

3. 将接收邮箱的授权码和email 配置到 emailCode 和 fromEmail


### 接收邮箱的配置

1. 打开接受邮箱的 '设置 => 账户  => 开启 IMAP/SMTP服务'，复制下授权码

2. 如果已经开启服务，点击’生成授权码‘获取授权码

3. 打开iphone手机的 '设置 =》 邮件 =》 账户 =》 添加账户'，选择邮箱，输入以下信息

|  字段   | 填入内容  |
|  ----  | ----  |
| 全名  | 自定义 |
| 电子邮件  | 接收邮箱的email |
｜ 密码 ｜ 接收邮件的授权码 ｜
｜ 描述 ｜ 自定义 ｜

4. 将接收邮箱email 配置到 toEmail

[iphone绑定QQ邮箱教程](https://zhidao.baidu.com/question/1950479000046686868.html?qbl=relate_question_2&word=iphone%D3%CA%BC%FE%D4%F5%C3%B4%CC%ED%BC%D3qq%D3%CA%CF%E4);

另外，如要开启强通知（类似电话铃声），需要在iphone设置里面邮件提示声音


## 4. 定时运行（可不配）

Crontab 定时任务，适用于mac和linux

**命令行运行**

```
crontab -e
```

**在vim窗口输入**

```
{min} {hour} * * * {nodePath} {path}/dingdong-node/main.js
```

- min和hour表示时间，比如每天5:50开始运行，就是：50 5

- nodePath 为你本地node程序的绝对目录

- path为当前项目的绝对目录

[定时运行教程](https://www.runoob.com/w3cnote/linux-crontab-tasks.html)



