import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

import { setStorage } from '../../utils'
import xlRequest from '../../utils/request'

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
          <Image mode='heightFix' className="xl-login-background-img" src="https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=e7987951ba0cda434caf44f98f512057&t=1646556933" />
          <View className="xl-login-content">
            <View className="xl-login-invitation">
              <Text>邀请函</Text>
            </View>
            <View className="xl-login-context">xxx和xxxx的婚礼</View>
            <View>请先登录哟</View>
            <View className='xl-login-btn'>
              <AtButton type='primary' disabled={isLoginLoadding} loading={isLoginLoadding} onClick={this.login.bind(this)}>登录</AtButton>
            </View>
          </View>
      </>
    )
  }
}
