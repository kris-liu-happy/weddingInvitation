import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { Canvas } from '@tarojs/components'
import XlloadingCurtain from '../XlloadingCurtain'
import xlRequest from '../../utils/request'

import { init, end } from './tool'


const Firework = () => {

  const [isloadingPage, setIsloadingPage] = useState(true)

  const [ranking, setRanking] = useState('')

  useEffect(async () => {
    const data = await xlRequest('prize')
    setIsloadingPage(false)
    setRanking(data)
  }, [])

  useEffect(() => {
    if(isloadingPage) return
    const query = Taro.createSelectorQuery()
    const {windowHeight, windowWidth} = wx.getSystemInfoSync()
    query.select('#myCanvas').node().exec((res) => {
      end()
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      init(canvas, ctx, windowWidth, windowHeight, ranking || 0)
    })

    return () => {
      end()
    }
  }, [ranking])

  return (
    <>
      <Canvas className='xl-canvas-show' type="2d" id="myCanvas"></Canvas>

      <XlloadingCurtain isOpened={isloadingPage} />
    </>
  )
}

export default Firework
