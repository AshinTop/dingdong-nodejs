const fs = require('fs');
const path = require('path');
// 请填写下面的userConfig
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
  'isAuto': false, // 是否开启自动监听模式（5:50自动开启，5:58开始下单）
  'autoTime': { //配置开启时间和下单时间
    start: [5, 55],//5:55开始获取信息
    doBuy: [5, 59] //5:59开始下单
  },
  'runMode': 'normal', // normal 为捡漏模式，traffic为高峰期策略
  'runInterval': 1000 * 10, // 每一个请求的轮询间隔
  'miniMoney': 40, // 下单的最少价格
  'maxTime': 2, // 单次运行最长时间(traffic时有效) ，防止被风控 , 单位为分钟
  'maxLoopCount': 100,//单个请求重试的最大次数
  'useLogger': true, // 是否开启logger 调试使用
};

if (fs.existsSync(path.resolve(__dirname, './_dev_scripts/my-config.js'))) {
  // 请忽略这部分，填写上面的config
  module.exports = require('./_dev_scripts/my-config');
} else {
  module.exports = userConfig;
}