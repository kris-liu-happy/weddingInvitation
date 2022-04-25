import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Video } from '@tarojs/components'
import { MyMusic } from '../../utils/context'

import XlVedio from '../../components/XlVudio/vudio.jsx'

import XlImage from '../../components/XlImage/index.jsx'

import XlloadingCurtain from '../../components/XlloadingCurtain'

import { setStorage } from '../../utils'

import xlRequest from '../../utils/request'

import './index.scss'

const xlHomeBottom = require('../../image/xl-home-bottom.png')

const inviteTips = require('../../image/xl-home-invite-tips.png')

const inviteLetter = require('../../image/xl-home-invite-letter.png')


export default class Home extends Component {
  static contextType = MyMusic;
  constructor() {
    super(...arguments)
    this.state = {
      inviteInformation: {},
      isloadingPage: true,
    }
  }

  componentDidMount() {

    const requests = [xlRequest('information')]

    Promise.all(requests).then(res => {
      setStorage('information', res[0])
      this.setState({
        inviteInformation: res[0],
        isloadingPage: false
      })
    })
  }

  handleConfirm(){
    Taro.navigateTo({
      url: '/prize/pages/index'
    })
  }

  render () {
    const { isloadingPage, inviteInformation: invite } = this.state
    return (
      <View>
        <View className="xl-home-swiper">
          <Video
              className="xl-home-swiper"
              src={invite.video}
              controls={true}
              autoplay={true}
              initialTime='0'
              id='video'
              loop={true}
              muted={true}
            />
        </View>

        <View className='invite-info'>
            <Image className='invite-letter' src={inviteLetter} />
            <View className='invite-couple'>
                <View className='invite-groom'>Mr.{invite.groomName}</View>
                <View className='invite-bride'>Miss.{invite.brideName}</View>
            </View>
            <View className='invite-date'>{invite.dinnerTime}</View>
            <View className='invite-address'>{invite.dinnerAddress}</View>
            <View className='invite-address-tips'>
                诚/挚/邀/请/您/参/加/我/们/的/婚/礼
            </View>
            <Image src={inviteTips} className='invite-tips' />
        </View>

        <XlImage imageClass={'xl-home-bottom-img' } mode={"widthFix"} src={xlHomeBottom}></XlImage>


        <View className='xl-home-atfab'>
          <XlVedio innerAudioContext={this.context} />
        </View>

        <XlloadingCurtain isOpened={isloadingPage} />
      </View>
    )
  }
}
