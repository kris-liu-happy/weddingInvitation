import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Map, Text, Swiper, SwiperItem, Image, Button } from '@tarojs/components'
import './index.scss'

import { AtFab, AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

import { MyMusic } from '../../utils/context'

import VedioSwitch from '../../components/vudio/vudio.jsx'

const informations = [
  {
    label: '公历:',
    value: '2022年6月4日'
  },
  {
    label: '农历:',
    value: '2022年5月初6'
  },
  {
    label: '新郎电话:',
    value: '13888888888'
  },
  {
    label: '新娘电话:',
    value: '13888888888'
  },
  {
    label: '宴会地址:',
    value: '华阳街道府河路一段208号（花府宴·宴会厅A厅）'
  },
]

export default class Home extends Component {
  static contextType = MyMusic;
  constructor() {
    super(...arguments)
    this.state = {
      restaurantLat: {
        longitude: '104.056605',
        latitude: '30.497768',
      },
      markers: [
        {
          longitude: '104.056605',
          latitude: '30.497768',
          id: 0,
          width: 34,
          height: 49
        }
      ],
      swiperImg: [
        'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
        'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
        'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/4.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
        'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      ],
      isOpenedModal: false
    }
  }

  gotoTemplate() {
    const { restaurantLat: {
      longitude, latitude
    } } = this.state

    Taro.getLocation({
      type: 'gcj02', //返回可以用于 Taro.openLocation的经纬度
      success: function (res) {
        Taro.openLocation({
          latitude: +latitude,
          longitude: +longitude,
          name: '花府宴·宴会厅',
          address: '华阳街道府河路一段208号',
          scale: 18
        })
      }
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
    const { markers, isOpenedModal, restaurantLat: {
      longitude, latitude
    } , swiperImg} = this.state

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
                      <Image className='xl-home-swiperitem-image' lazy-load mode='scaleToFill' src={item}></Image>
                  </SwiperItem>
                )
              })
            }
        </Swiper>

        <View className='xl-home-information'>
            {
              informations.map(item => {
                return(
                  <View className='xl-home-information-context'>
                    <View className='xl-home-information-context-label'>
                        {item.label}
                    </View>
                    <View className='xl-home-information-context-value'>
                        {item.value}
                    </View>
                  </View>
                )
              })
            }
        </View>


        <View className='xl-home-atfab'>
          <VedioSwitch innerAudioContext={this.context} />
          <AtFab className='xl-home-atfab-navigation xl-home-atfab-context' onClick={this.gotoTemplate.bind(this)}>
            <AtIcon value='map-pin' size='20' color='#fff'></AtIcon>
            导航
          </AtFab>
          <AtFab className='xl-home-atfab-navigation xl-home-atfab-context' onClick={this.gotoPrize.bind(this)}>
            <AtIcon value='map-pin' size='20' color='#fff'></AtIcon>
            奖品
          </AtFab>
        </View>

        <Map className='xl-home-map' markers={markers} longitude={longitude} latitude={latitude} />


        <AtModal isOpened={isOpenedModal}>
          <AtModalHeader>游戏规则</AtModalHeader>
          <AtModalContent>
            <View className="xl-home-prize-rules">
                6月1号随机在祝福评论里抽取5位幸运伙伴（领取大奖哦）
            </View>
            <View className="xl-home-prize-to">快起祝福区里留言吧!!!</View>
            <View className="xl-home-prize-to">
                是否前往领奖台？
            </View>
          </AtModalContent>
          <AtModalAction> <Button onClick={this.colseModal.bind(this)}>否</Button> <Button onClick={this.handleConfirm.bind(this)}>是</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
