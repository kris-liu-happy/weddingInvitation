import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { setStorage } from '../../utils'
import XlImage from '../../components/XlImage/index.jsx'
import xlRequest from '../../utils/request'
import XlloadingCurtain from '../../components/XlloadingCurtain'

import './index.scss'

export default class Album extends Component {

  constructor () {
    super()
    this.state = {
      albumList: [],
      isloadingPage: true
    }
  }

  componentDidMount() {
    xlRequest('photo', { func: 'getPhotoList', }).then(res => {
      this.setState({
        albumList: res,
        isloadingPage: false
      })
    })
  }

  async gotoAlbumTemplate(item) {
    await setStorage('currentAlbum', JSON.stringify(item))
    Taro.navigateTo({
      url: '/albumDetailTemplate/pages/index'
    })
  }

  render () {

    const { albumList, isloadingPage } = this.state
    return (
      <>
        <View>
          {
            albumList.map((item, index) => {
              return (
                <View className={`xl_album_template xl_album_template_${index}`} onClick={this.gotoAlbumTemplate.bind(this, item)}>
                  <View className="xl_album_size">
                    {item.id}·{item.title}
                  </View>
                  <XlImage imageClass="xl_album_sigleImg" mode={'aspectFill'} isLazyLoading src={item.src}></XlImage>
                </View>
              )
            })
          }
        </View>
        <XlloadingCurtain isOpened={isloadingPage} />
      </>
    )
  }
}
