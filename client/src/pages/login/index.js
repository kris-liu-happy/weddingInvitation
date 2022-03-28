import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

import { setStorage } from '../../utils'
import xlRequest from '../../utils/request'

const LoveOath = [
  '两姓联姻，一堂缔约',
  '良缘永结，匹配同称',
  '看此日桃花灼灼，宜室宜家',
  '卜他年瓜瓞绵绵，尔昌尔炽',
  '谨以白头之约，书向鸿笺',
  '好将红叶之盟，载明鸳谱'
]

export default class Login extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      isLoginLoadding: false,
    }
  }

  goToHome() {
    Taro.switchTab({
      url: '../home/index'
    })
  }

  async login() {
    try {
      const { userInfo } = await Taro.getUserProfile({desc: '登录'}).then()
      this.setState({
        isLoginLoadding: true
      }, async () => {
        const data = await xlRequest("login", {
          userInfo: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            prize: 0
          }
        })
        await setStorage('LXopenId', data.openId)
        this.goToHome()
        this.setState({
          isLoginLoadding: false
        })
      })
    } catch (err) {
      console.log(err)
      this.setState({
        isLoginLoadding: false
      })
    }
  }

  render () {
    const { isLoginLoadding } = this.state
    return (
      <>
          <Image mode='heightFix' className="xl-login-background-img" src={'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/login.jpg'} />
          <View className="xl-login-content">
            <View className="xl-login-invitation">
              <Text>邀请函</Text>
            </View>
            <View  className="xl-login-context-love">
              {
                LoveOath.map((item, index) => {
                  return(
                    <View className="xl-login-context-love-size" key={index}>
                      {item}
                    </View>
                  )
                })
            }
            </View>
            <View className='xl-login-btn'>
              <AtButton type='primary' disabled={isLoginLoadding} loading={isLoginLoadding} onClick={this.login.bind(this)}>登录</AtButton>
            </View>
          </View>
      </>
    )
  }
}
