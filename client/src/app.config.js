export default {
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/album/index',
    'pages/comments/index',
    'pages/map/index'
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
      text: '邀请',
      iconPath: 'image/tab/invite.png',
      selectedIconPath: 'image/tab/invite-active.png'
    },
    {
      pagePath: 'pages/map/index',
      text: '导航',
      iconPath: 'image/tab/location.png',
      selectedIconPath: 'image/tab/location-active.png'
    },
    {
      pagePath: 'pages/album/index',
      text: '相册',
      iconPath: 'image/tab/photo.png',
      selectedIconPath: 'image/tab/photo-active.png'
    },
     {
      pagePath: 'pages/comments/index',
      text: '祝福',
      iconPath: 'image/tab/msg.png',
      selectedIconPath: 'image/tab/msg-active.png'
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
