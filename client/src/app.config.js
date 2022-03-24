export default {
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/album/index',
    'pages/comments/index',
  ],
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于参加刘强和徐琴的婚礼使用" // 高速公路行驶持续后台定位
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/home/index',
      text: '首页'
    },
    {
      pagePath: 'pages/album/index',
      text: '相册'
    },
     {
      pagePath: 'pages/comments/index',
      text: '祝福'
    }]
  },
  subpackages: [
    {
      "root": "albumDetailTemplate",
      "pages": [
        "pages/index",
      ],
    },
    {
      "root": "prize",
      "pages": [
        "pages/index",
      ],
    }
  ],
  cloud: true
}
