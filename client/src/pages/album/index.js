import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { setStorage } from '../../utils'
import './index.scss'

export default class Album extends Component {

  constructor () {
    super()
    this.state = {
      albumList: [
        {
          imgSrc: 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/6.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
          title: '相见',
          id: '2018'
        },
        {
          imgSrc: 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
          title: '相知',
          id: '2019'
        },
        {
          imgSrc: 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
          title: '相爱',
          id: '2020'
        },
        {
          imgSrc: 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/9.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
          title: '相伴',
          id: '2021'
        },
        {
          imgSrc: 'https://686c-hl-3gzlig2n8cebc09a-1300238365.tcb.qcloud.la/login/8.jpg?sign=4da1d1a7025cfda1be862d9634391a54&t=1646809888',
          title: '相守',
          id: '2022'
        }
      ],
    }
  }

  async gotoAlbumTemplate(item) {
    const { id } = item
    await setStorage('currentAlbum', id)
    Taro.navigateTo({
      url: '/albumDetailTemplate/pages/index'
    })
  }

  render () {

    const { albumList } = this.state
    return (
      <View>
        {
          albumList.map((item, index) => {
            return (
              <View className={`xl_album_template xl_album_template_${index}`} onClick={this.gotoAlbumTemplate.bind(this, item)}>
                <View className="xl_album_size">
                  {item.id}·{item.title}
                </View>
                <Image className="xl_album_sigleImg" lazy-load src={item.imgSrc}></Image>
              </View>
            )
          })
        }
      </View>
    )
  }
}
