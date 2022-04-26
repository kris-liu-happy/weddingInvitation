import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Text, Button, Image } from '@tarojs/components'
import { AtTextarea, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss'
import { timestampToTime } from '../../utils/date'

import xlRequest from '../../utils/request'
import XlloadingCurtain from '../../components/XlloadingCurtain'
import XlAtfab from '../../components/XlAtfab/index.jsx'
import { shareAppMessage } from '../../utils/share'

const getRandomColor = () => {
  const color = ['red', 'rgb(0, 255, 0)', '#0000FF', '#fff']
  const getRandom = (max = 10, min = 0) => Math.floor(Math.random() * (max - min) + min)
  const colorId = getRandom(color.length)

  return color[colorId]
}

export default class comments extends Component {

  onShareAppMessage() {
    return shareAppMessage()
  }

  onShareTimeline() {
    return shareAppMessage()
  }

  constructor() {
    super(...arguments)
    this.state = {
      list: [],
      isOpenedModal: false,
      commentVal: '',
      // 0 记载中 1加载完毕 2更新中
      loadingState: 0,
      lastIndex: '',
      btnLoadding: false
    },
    this.barrage = null,
    this.myRef = React.createRef(),
    this.timer = null,
    this.barrageRanksIndex = 0,
    this.tunnelNum = 4
  }

  updateBarrage () {

    this.removeBarrage()

    const { list } = this.state


    const msgs = list.map(item => {
      return {
        color: getRandomColor(),
        content: item.comment,
      }
    })

    const len = msgs.length

    if (!len) return
    if(len > 10) {
      const tenPerline = Math.floor(len/4)

      const remainder = len%4

      let msgsPerTen = msgs.slice((this.barrageRanksIndex*this.tunnelNum), (this.barrageRanksIndex*this.tunnelNum + this.tunnelNum))

      this.barrage.open()

      this.barrage.addData(msgsPerTen)
      this.timer = setInterval(() => {
        this.barrageRanksIndex = this.barrageRanksIndex === tenPerline ? 0 : this.barrageRanksIndex + 1
        if (tenPerline === this.barrageRanksIndex) {
          msgsPerTen = msgs.slice((this.barrageRanksIndex*this.tunnelNum), (this.barrageRanksIndex*this.tunnelNum + remainder))
        } else {
          msgsPerTen = msgs.slice((this.barrageRanksIndex*this.tunnelNum), (this.barrageRanksIndex*this.tunnelNum + this.tunnelNum))
        }
        this.barrage.addData(msgsPerTen)
      }, 2000)
    } else {
      this.barrage.open()
      this.barrage.addData(msgs)
      this.timer = setInterval(() => {
        this.barrage.addData(msgs)
      }, 2000)
    }
  }

  addBarrage() {
    const pages = Taro.getCurrentPages()
    const barrageComp = pages[pages.length - 1].selectComponent('#barrage')
    this.barrage = barrageComp.getBarrageInstance({
      font: 'bold 16px sans-serif',
      duration: 15,
      lineHeight: 2,
      range: [0, 1],
      mode: 'separate',
      padding: [10, 0, 10, 0],
      tunnelShow: false,
      alpha: 0.8,
    })
    this.updateBarrage()
  }

  removeBarrage () {
    this.barrage.close()
    clearInterval(this.timer)
    this.barrageRanksIndex = 0
  }

  async getCommentsList() {
      this.setState({
        loadingState: 0
      }, async () => {
        try {

            const list = await xlRequest('comments', {
              func: 'getAllComments'
            })
          // const { result } = await Taro.cloud.callFunction({
          //   name: "comments",
          //   data: {
          //     func: 'getAllComments'
          //   }
          // })
            // let list = data || []
            const uuid = 'item_' + new Date().getTime()
            if (list.length)  list[list.length - 1].uuid = uuid
            this.setState({
              list,
              loadingState: 1,
              lastIndex:list.length ? uuid : ''
            }, () => {
              this.barrage ? this.updateBarrage() : this.addBarrage()
            })
        } catch (error) {
          console.log(error)
        }
      })
  }

  async componentDidShow () {
    this.getCommentsList()
  }



  componentDidHide () {
    this.removeBarrage()
  }

  addComment() {
    this.setState({
      isOpenedModal: true
    })
  }

  cancelComment() {
    this.setState({
      isOpenedModal: false,
      commentVal: '',
      btnLoadding: false,
    })
  }

  async saveComment () {
    const { commentVal } = this.state
    try {
      this.setState({
        btnLoadding: true,
      }, async () => {
        await Taro.cloud.callFunction({
          name: "comments",
          data: {
            func: 'addComment',
            data: {
              comment: commentVal
            }
          }
        })
        this.cancelComment()
        this.getCommentsList()
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(value) {
    this.setState({
      commentVal: value
    })
  }

  render () {
    const {list, isOpenedModal, commentVal, loadingState, lastIndex, btnLoadding} = this.state
    return (
      <View className='xl-comments-content'>

        <XlloadingCurtain isOpened={loadingState === 0 || loadingState === 2}/>

        <View className='xl-comments-barrage'>
          <barrage id="barrage" className="barrage" renderingMode="dom" zIndex="100" />
        </View>


        {
          loadingState === 1 &&
          <ScrollView
            className='xl-comments-scrollview'
            scrollY
            scrollWithAnimation
            scrollIntoView={lastIndex}
          >
            {
              list.map(item => {
                return (
                  <View id={item?.uuid || ''}  className='msg-item' key={Math.random() * Math.random()}>
                    <View className='msg-item__user-avatar'>
                        <Image className='msg-item__user-avatar-img' src={item.avatarUrl} />
                    </View>
                    <View className='msg-item__desc'>
                        <View className='msg-item__user-info'>
                            <View className='msg-item__user-name'>
                                {item.nickName}
                            </View>
                            <View className='msg-item__msg-time'>
                                {timestampToTime(item.createdTime)}
                            </View>
                        </View>
                        <View className='msg-item__msg-text'>{item.comment}</View>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        }

        <XlAtfab
          classNames='xl-comment-atfab-context'
          name='祝福'
          icon='add'
          fabClick={this.addComment.bind(this)} />

        <AtModal isOpened={isOpenedModal}>
          <AtModalHeader>祝福</AtModalHeader>
          <AtModalContent>
            <View className="xl-comment-blessing">
                <Text className='xl-comment-blessing-text'>祝福语：</Text>
                <AtTextarea
                  count={false}
                  value={commentVal}
                  onChange={this.handleChange.bind(this)}
                  maxLength={200}
                  placeholder='请写入你的祝福语'
                />
            </View>
          </AtModalContent>
          <AtModalAction> <Button onClick={this.cancelComment.bind(this)}>取消</Button> <Button loading={btnLoadding} onClick={this.saveComment.bind(this)}>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
