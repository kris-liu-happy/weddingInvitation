import React, { Component } from 'react'
import { View, Text, Image, Map } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

import XlAtfab from '../../components/XlAtfab/index.jsx'

const callHe = require('../../image/xl-call-he.png')
const callShe = require('../../image/xl-call-she.png')


export default class Login extends Component {

  constructor () {
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
          width: 28,
          height: 28,
          callout: {
            content: '华阳街道府河路一段208号（花府宴·宴会厅A厅）',
            color: '#fff',
            bgColor: '#ff4c91',
            fontSize: 14,
            textAlign: 'center',
            padding: 6,
            borderRadius: 6,
            display: 'ALWAYS',
          },
          iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
        }
      ],
      brideMobile: '',
      groomMobile: '',
    }
  }

  componentDidMount() {
    const {latitude, longitude, dinnerAddress, bridePhone, groomPhone} = Taro.getStorageSync('information')

    const markers = [
        {
          longitude,
          latitude,
          id: 0,
          width: 28,
          height: 28,
          callout: {
            content: dinnerAddress,
            color: '#fff',
            bgColor: '#ff4c91',
            fontSize: 14,
            textAlign: 'center',
            padding: 6,
            borderRadius: 6,
            display: 'ALWAYS',
          },
          iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
        }
    ]

    this.setState({
      markers,
      restaurantLat: {
        longitude,
        latitude,
      },
      brideMobile: bridePhone,
      groomMobile: groomPhone,
    })
  }

  gotoAddress() {
    const { restaurantLat: {
      longitude, latitude
    } } = this.state

    console.log(longitude, latitude)

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

  // 电话联系新娘、新郎
  handlePhoneCall = (phone) => {
    Taro.makePhoneCall({
        phoneNumber: phone
    })
  };

  render () {
    const { markers, restaurantLat: {
      longitude, latitude
    }, brideMobile, groomMobile } = this.state
    return (
      <View>
        <View className='xl-map-atfab'>
          <XlAtfab
            classNames='xl-map-atfab-navigation xl-map-atfab-context'
            name='导航'
            icon='map-pin'
            fabClick={this.gotoAddress.bind(this)} />
        </View>

        <View className='xl-location__tool'>
            <View className='xl-location__tool-btn'>
                <View className='xl-location__tool-call' onClick={this.handlePhoneCall.bind(this, groomMobile)}>
                    <Image src={callHe} className='xl-location__tool-call-img' />
                    <Text className='xl-location__tool-call-txt'>呼叫新郎</Text>
                </View>
                <View className='xl-location__tool-call' onClick={this.handlePhoneCall.bind(this, brideMobile)}>
                    <Image src={callShe} className='xl-location__tool-call-img' />
                    <Text className='xl-location__tool-call-txt'>呼叫新娘</Text>
                </View>
            </View>
        </View>

         <Map className='xl-map' markers={markers} longitude={longitude} latitude={latitude} />
      </View>
    )
  }
}
