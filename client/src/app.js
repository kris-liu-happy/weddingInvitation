import React, { Component } from 'react'
import Taro from '@tarojs/taro'

import './app.scss'

import { getCurrentPages } from './utils'

import { setStorage } from './utils'

import { MyMusic } from './utils/context'

class App extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      innerAudioContext: null
    }
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
    const LXopenId = Taro.getStorageSync('LXopenId')
    if (LXopenId) {
      this.videoPlayer()
      this.goToHome()
    }
  }

  componentDidUpdate() {
    const isMusic = Taro.getStorageSync('isMusic')
    const currentPagesUrl = getCurrentPages()
    const { innerAudioContext } = this.state
    if (!innerAudioContext && isMusic !== 'true' && currentPagesUrl !== 'pages/login/index') {
      this.videoPlayer()
    }
  }

  componentDidShow () {
    const { innerAudioContext } = this.state
    if(innerAudioContext) innerAudioContext.play()
  }

  componentDidCatchError () {}


  async videoPlayer() {
    await setStorage('isMusic', 'true')
    const innerAudioContext = Taro.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/Beautiful%20In%20White.mp3?sign=37a6cced71574c13ceffe6fceb7be4d6&t=1646829334'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    this.setState({innerAudioContext})
  }

  goToHome() {
    Taro.switchTab({
      url: './pages/home/index'
    })
  }

  // this.props.children 是将要会渲染的页面
  render () {
    const { children } = this.props

    const { innerAudioContext } = this.state

    return (
      <>
        <MyMusic.Provider value={innerAudioContext}>
          {children}
        </MyMusic.Provider>
      </>
    )
  }
}

export default App
