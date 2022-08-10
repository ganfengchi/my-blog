// const { defaultTheme } = require('vuepress')
// vuepress 2.x 的文档地址 https://v2.vuepress.vuejs.org/zh/

// 引入主题
const { defaultTheme } = require('@vuepress/theme-default')

// 引入插件
// const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

// 引入 工具函数
const { path } = require('@vuepress/utils')
// const { getRandomElement } = require('./utils')

// 引入 菜单
const { navbar, sidebar } = require('./config/index.js')

module.exports = {
    lang: 'zh-CN',
    title: '欢迎来到甘丰迟的博客',
    description: '这是我的第一个 VuePress 站点',
    base: "/my-blog/",
    temp: './.temp',
    // 指定缓存目录
    cache: './.cache',
    // 指定 build 的输出目录, 默认打包到 docs/.vuepress 里面
    dest: './dist', // 现在会打包到与 docs 平级的目录下
    // 开发服务器地址和端口, 默认是 0.0.0.0:8080
    // vuepress 默认主题 的配置
    theme: defaultTheme({

        // 左上角网站 Logo
        logo: '/images/avatar.jpg',
        // 顶部导航栏
        navbar,
        // // 侧边栏菜单
        sidebar,

        // 自定义容器默认标题设置
        tip: '说明',
        warning: '警告',
        danger: '危险',
        // 切换颜色模式按钮的标题文字
        toggleColorMode: '切换颜色模式',
        // 最后更新时间文本
        lastUpdatedText: '上次更新',
        // 贡献者文本
        contributorsText: '作者',
        // 仓库配置
        repoLabel: 'github 仓库',
        repo: 'https://gitee.com/gan-fengchi',
        editLink: false
        // 设置默认主题使用的插件
        // themePlugins: {}
    }),
}