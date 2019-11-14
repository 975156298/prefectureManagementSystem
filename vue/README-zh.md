
## Build Setup

```bash
# 克隆项目
git clone git@gitee.com:huangzuomin/vueTemplate.git

# 进入项目目录
cd vueTemplate

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

#  打包发布
npm run build:prod

打包后，后端代理地址修改说明： .env.production 文件 里面的 VUE_APP_BASE_API 的值

打包相关文件夹修改说明：
修改文件 vue.config.js
文件里面的参数： 
   publicPath： 值‘/’ 绝对路径。‘/dev’ 这发布的链接前面需要有/dev.
   outputDir: 输出文件夹的名字默认 dist
   assetsDir： 静态文件夹的名字，默认 static

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://images.gitee.com/uploads/images/2019/0624/171429_b3ee87d2_859983.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://images.gitee.com/uploads/images/2019/0624/171428_34102e01_859983.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://images.gitee.com/uploads/images/2019/0624/171426_410f6646_859983.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://images.gitee.com/uploads/images/2019/0624/171428_0f97d5ac_859983.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
