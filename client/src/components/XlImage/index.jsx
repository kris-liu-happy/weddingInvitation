import React, { useState } from 'react'
import { Image } from '@tarojs/components'
import './index.scss'

const loaddingPic = require('../../image/xl-image-loadding.gif')

const XlImage = (props) => {

  const [isVisible, setIsVisible] = useState(false)

  const { imageClass, src, mode, isLazyLoading, onPicClick } = props

  const picComplete = (e) => {
    setIsVisible(true)
  }

  const picError = (e) => {
    console.log(e, 'error')
  }

  const picClick = () => {
    onPicClick && onPicClick()
  }

  return (
    <>
    {
      !isVisible && <Image className={`xl-image-default-pic ${imageClass}`} mode={'widthFix'} src={loaddingPic} />
    }
    {
      <Image onClick={picClick} className={`${imageClass} ${isVisible ? 'xl-image-show' : 'xl-image-hide'}`} src={src} mode={mode} onError={picError} onLoad={picComplete} lazyLoad={isLazyLoading || false} />
    }
    </>
  )
}

export default XlImage
