import React, { Component } from 'react'
import { Swiper, SwiperItem, View } from '@tarojs/components'
import XlImage from '../../components/XlImage'
import Taro from '@tarojs/taro'
import xlRequest from '../../utils/request'
import XlloadingCurtain from '../../components/XlloadingCurtain'

import './index.scss'

export default class albumDetailTemplate extends Component {

  constructor () {
    super()
    this.state = {
      currentAlbumList: [],
      isloadingPage: true
    }
  }

  componentDidMount () {
    const { id, title } = JSON.parse(wx.getStorageSync('currentAlbum'))
    wx.setNavigationBarTitle({title: `${id}·${title}`})
    xlRequest('photo', { func: 'getYearPhoto', data: { year: id } }).then(res => {
      this.setState({
        currentAlbumList: res,
        isloadingPage: false
      })
    })
  }

  handleImgSave = (src) => {
    Taro.getImageInfo({
        src,
        success: (res) => {
            Taro.saveImageToPhotosAlbum({
                filePath: res.path,
                success: () => {
                    Taro.showToast({
                        title: '保存成功~'
                    })
                },
                fail: (e) => {
                    if (e.errMsg.indexOf('auth') > 0) {
                        Taro.showModal({
                            title: "提示",
                            content: "打开相册权限才能保存图片哦！",
                            success(mres) {
                                if (mres.confirm) {
                                    console.log('start.Taro.openSetting');
                                    // 取消过授权需要打开设置页面
                                    Taro.openSetting({
                                        success: function (rrres) {
                                            if (rrres.authSetting['scope.writePhotosAlbum']) {
                                                Taro.showToast({
                                                    title: '权限已打开，请重新保存~',
                                                    icon: 'none'
                                                })
                                            }
                                        },
                                        fail: function (error) {
                                            console.log('tt.openSetting.fail', error);
                                        },
                                    });
                                } else if (mres.cancel) {
                                    //成功提示
                                    Taro.showToast({
                                        title: "取消保存",
                                        icon: 'none',
                                    });
                                }
                            }
                        })
                    } else if (e.errMsg.indexOf('cancel') > 0) {
                        Taro.showToast({
                            title: '取消保存!',
                            icon: 'none'
                        })
                    } else {
                        Taro.showToast({
                            title: '保存失败!',
                            icon: 'none'
                        })
                    }
                }
            });
        },
        fail: (e) => {
            console.log(e);
            Taro.showToast({
                title: '保存失败，请重试~',
                icon: 'none'
            })
        }
    });
  };

  renderList = () => {
    let {
      currentAlbumList: photoList
    } = this.state;
    return photoList.map((item) => {
        return (
            <SwiperItem key={Math.random() * Math.random()}>
                <View className='photo-swiper-item'>
                    <XlImage mode='widthFix' imageClass='photo-swiper-photo' src={item.src} lazyLoad onPicClick={this.handleImgSave.bind(this, item.src)} />
                </View>
            </SwiperItem>
        )
    });
  }

  render () {

    const { isloadingPage } = this.state

    return (
      <View className='page photo'>
          <Swiper
            className='photo-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#ff4c91'
            vertical
            circular
            indicatorDots
            autoplay
          >
              {
                  this.renderList()
              }
          </Swiper>
          <View className='photo-save-tips'>点击图片保存至相册</View>

          <XlloadingCurtain isOpened={isloadingPage}/>
      </View>
    )
  }
}
