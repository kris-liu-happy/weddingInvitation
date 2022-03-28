import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { MyMusic } from '../../utils/context'

import XlVedio from '../../components/XlVudio/vudio.jsx'

import XlAtfab from '../../components/XlAtfab/index.jsx'

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
      swiperImg: [],
      isOpenedModal: false,
      inviteInformation: {},
      isloadingPage: true,
    }
  }

  componentDidMount() {

    const requests = [xlRequest('photo', { func: 'getYearPhoto', data: { year: '2022' } }), xlRequest('information')]

    Promise.all(requests).then(res => {
      setStorage('information', res[1])
      this.setState({
        swiperImg: res[0],
        inviteInformation: res[1],
        isloadingPage: false
      })
    })
  }

  gotoPrize() {
    this.setState({
      isOpenedModal: true,
    })
  }

  colseModal(){
    this.setState({
      isOpenedModal: false
    })
  }

  handleConfirm(){
    Taro.navigateTo({
      url: '/prize/pages/index'
    })
  }

  render () {
    const { isOpenedModal, swiperImg, isloadingPage, inviteInformation: invite} = this.state

    return (
      <View>
        <Swiper
          className='xl-home-swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          interval='2000'
          autoplay>
            {
              swiperImg.map(item => {
                return(
                  <SwiperItem>
                      <XlImage imageClass={'xl-home-swiperitem-image'} isLazyLoading mode={'scaleToFill'} src={item.src}></XlImage>
                  </SwiperItem>
                )
              })
            }
        </Swiper>

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
          <XlAtfab
            classNames='xl-home-atfab-navigation xl-home-atfab-context'
            name='奖品'
            icon='sketch'
            fabClick={this.gotoPrize.bind(this)} />
        </View>

        <AtModal isOpened={isOpenedModal}>
          <AtModalHeader>游戏规则</AtModalHeader>
          <AtModalContent>
            <View className="xl-home-prize-rules">
                6月1号随机在祝福评论里抽取5位幸运伙伴（领取大奖哦）
            </View>
            <View className="xl-home-prize-to">快去祝福区里留言吧!!!</View>
            <View className="xl-home-prize-to">
                是否前往领奖台？
            </View>
          </AtModalContent>
          <AtModalAction> <Button onClick={this.colseModal.bind(this)}>否</Button> <Button onClick={this.handleConfirm.bind(this)}>是</Button> </AtModalAction>
        </AtModal>

        <XlloadingCurtain isOpened={isloadingPage} />
      </View>
    )
  }
}
