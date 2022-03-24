import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'

import { init, end } from './tool'


const Firework = () => {

  useEffect(async () => {

    const {result: { data }} = await Taro.cloud.callFunction({
      name: "prize",
    })
    const query = Taro.createSelectorQuery()

    const {windowHeight, windowWidth} = wx.getSystemInfoSync()

    query.select('#myCanvas').node().exec((res) => {
      end()
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      init(canvas, ctx, windowWidth, windowHeight, data || 0)
    })

    return () => {
      end()
    }

  }, [])

  return (
    <Canvas type="2d" id="myCanvas"></Canvas>
  )
}

export default Firework
