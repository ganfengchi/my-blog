// const navbar = require('../config/navbar.js')
// const sidebar = require('../config/sidebar.js')

// module.exports = {
//   navbar,
//   sidebar
// }
module.exports = {
    navbar: [
        // {
        //     text: '前端学习',
        //     children: [

        //     ],
        // },
    ],
    sidebar: [
        {
            text: 'I want to say',
            link: '/view/sidebar/myinfo'
        },
        {
            text: 'typescript  学习笔记',
            link: '/view/sidebar/typescript',
        },
        {
            text: '一些经验重要...',
            collapsible:true,
            children: [
                
                {
                    text: 'js终止代码执行',
                    link: '/view/sidebar/myExperience/endCodeExecution',
                },
                {
                    text: 'typeScript DOM 类型',
                    link: '/view/sidebar/myExperience/typeScriptDOM',
                },
                {
                    text: 'FileReader',
                    link: '/view/sidebar/myExperience/fileReader',
                },
                {
                    text: 'Blob',
                    link: '/view/sidebar/myExperience/blob',
                },
                {
                    text: 'webWorker',
                    link: '/view/sidebar/myExperience/webWorker',
                },
                
                {
                    text: '判断数据类型的几种方法 ',
                    link: '/view/sidebar/myExperience/typeOf',
                },
                {
                    text: 'promise 和async await的区别',
                    link: '/view/sidebar/myExperience/promiseAndAsyncAwait',
                },
                {
                    text: 'try catch',
                    link: '/view/sidebar/myExperience/tryCatch',
                },
                {
                    text: 'async await 要优雅',
                    link: '/view/sidebar/myExperience/async_await',
                },
                {
                    text: 'websocket',
                    link: '/view/sidebar/myExperience/websocket',
                },
                {
                    text: '最少代码实现一个outside',
                    link: '/view/sidebar/myExperience/outside',
                },
                {
                    text: '文件流下载',
                    link: '/view/sidebar/myExperience/fileDownload',
                },
                {
                    text: '文件上传',
                    link: '/view/sidebar/myExperience/fileUpload',
                },
                {
                    text: '双向MAP映射',
                    link: '/view/sidebar/myExperience/mapPing',
                },
                {
                    text: 'IntersectionObserver 交叉观察器',
                    link: '/view/sidebar/myExperience/IntersectionObserver',
                },
                {
                    text: 'currentTarget和target的区别',
                    link: '/view/sidebar/myExperience/eventTarget',
                },
                {
                    text: '什么是optipn请求',
                    link: '/view/sidebar/myExperience/optionRequest',
                },
                {
                    text: 'scrollWidth,clientWidth,offsetWidth等等的区别',
                    link: '/view/sidebar/myExperience/clientWidth',
                },
                {
                    text: 'vue2动态组件注册',
                    link: '/view/sidebar/myExperience/dynamicComponents',
                },
                {
                    text: '浏览器缓存',
                    link: '/view/sidebar/myExperience/browserCache',
                },
                {
                    text: 'promise 知识1 ',
                    link: '/view/sidebar/myExperience/promise1',
                },
            ]
        },
        {
            text: 'vue3',
            collapsible:true,
            children:[
                {
                    text: 'vue3简介',
                    link: '/view/sidebar/vue3/home',
                },
                {
                    text: '响应性API',
                    link: '/view/sidebar/vue3/reactiveApi',
                },
                // {
                //     text: 'composition Api（组合式api）',
                //     link: '/view/sidebar/vue3/compositionApi',
                // },
            ]
        },
        {
            text: '一些笔试题',
            link: '/view/sidebar/writtenTest',
        },

    ]
}