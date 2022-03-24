import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { AtFab, AtIcon } from 'taro-ui'

const albumList = [
  {
    id: '2018',
    imgs: [
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/1.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
    ]
  },
  {
    id: '2019',
    imgs: [
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/1.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
    ]
  },
  {
    id: '2020',
    imgs: [
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/1.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
    ]
  },
  {
    id: '2021',
    imgs: [
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/1.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
    ]
  },
  {
    id: '2022',
    imgs: [
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/1.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/2.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/3.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
      'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
    ]
  }
]


export default class albumDetailTemplate extends Component {

  constructor () {
    super()
    this.state = {
      currentAlbumList: [],
    }
  }

  componentDidMount () {
    const currentAlbum = wx.getStorageSync('currentAlbum')
    albumList.map(item => {
      if (item.id === currentAlbum) {
        this.setState({
          currentAlbumList: item.imgs
        })
        return
      }
    })
  }

  previewImage(flag) {
    const { currentAlbumList } = this.state
    wx.previewImage({
      current: currentAlbumList[flag === 'all' ? 0 : flag],
      urls: currentAlbumList
    })
  }

  render () {
    const { currentAlbumList } = this.state
    return (
      <View className='xl_album_detail_container'>
          <View className='xl_album_detail_album'>
            {
              currentAlbumList.length && currentAlbumList.map((item, index) => {
                return (
                  <Image onClick={this.previewImage.bind(this, index)} className="xl_album_detail_sigleImg" lazy-load src={item}></Image>
                )
              })
            }
          </View>

          <AtFab className='xl-album_detail-preview' onClick={this.previewImage.bind(this, 'all')}>
            <AtIcon value='playlist' size='20' color='#fff'></AtIcon>
            预览
          </AtFab>
      </View>
    )
  }
}
