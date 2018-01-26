# 全职招聘-WEBAPP

## 项目介绍

  项目是一个招聘类webapp，后端使用express，mongodb完成接口开发；前端使用react全家桶及系列中间件处理数据，UI主要使用Antd-Mobile。

  项目主体功能：注册->登录-完善信息->牛人与BOss列表->聊天列表->聊天->个人中心

## 使用技术栈

  ### 前端

      creact-react-app
      react16
      redux
      react-redux
      redux-thunk
      react-router4
      prop-types
      axios
      browser-cookies
      antd-mobile

  ### 后端  

      node
      express
      mongoose
      utility
      cookie-parser
      body-parser


## 项目目录

        .
        ├── README.md
        ├── config               // 开发环境的配置
        ├── public
        │   ├── index.html       // 项目页面入口文件
        ├── package.json         // 项目配置文件
        ├── scripts              // npm scrips 命令配置
        ├── server               // 后端配置
        │   ├── server.js        // 服务启动文件
        │   ├── model.js         // 数据库配置
        │   ├── userRoute.js     // 接口配置    
        ├── src
        │   ├── static           // 公用资源
        │   ├── components       // 所有组件
        │   ├── container        // 所有页面
        │   ├── redux            // redux管理
        │   ├── http.js	         // axios配置
        │   ├── index.js         // 入口文件
        │   ├── util.js          // 功能函数封装
        │   └── reducer.js       // 所有reducer合并


## 运行项目

  ### 环境依赖

      项目运行前须要安装NodeJs&MongoDB，Mongo端口为27017，express服务器端口9093，访问地址为：localhost

  ### 运行项目
      
      首先需要使用命令行工具CD到根目录，按顺序执行如下命令

      第一个窗口用于拉取依赖&启动服务器
      npm install //拉取依赖
      node server/server.js //启动服务

      第二个窗口用于启动MongoDB
      全局直接执行命令 Mongo

      第三个窗口用于启动项目
      npm run start


