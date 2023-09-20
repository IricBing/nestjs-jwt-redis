# 基于Redis的JWT魔改方案

功能特点：

1. 服务端可主动踢人。
2. 无感token自动续期，不再需要refresh token操作。
3. 支持单设备登录。（例如微信，你只能同时在一台手机或一台电脑上登录，不可使用两个手机同时登录一个微信）

## 项目文档：

* [NestJS HTTP认证设计](https://www.virtualbing.fun/#/NodeJS/NestJS/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/HTTP%E8%AE%A4%E8%AF%81/README)
* [JWT 魔改版（基于Redis）](https://www.virtualbing.fun/#/NodeJS/NestJS/%E5%AE%9E%E8%B7%B5%E7%A7%AF%E7%B4%AF/%E8%AE%A4%E8%AF%81/jwt-redis)
