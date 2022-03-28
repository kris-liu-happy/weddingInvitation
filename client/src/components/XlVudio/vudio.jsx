import React, { useState } from 'react'

import { AtFab, AtIcon } from 'taro-ui'

import XlAtfab from '../XlAtfab'

const VedioSwitch = (props) => {
  const [isOpenMusic, setIsOpenMusic] = useState(false)

  const { innerAudioContext } = props

  const setOpenMusic = () => {
    !isOpenMusic ? innerAudioContext.pause() : innerAudioContext.play()
    setIsOpenMusic(!isOpenMusic)
  }

  return (
    <XlAtfab
      classNames='xl-home-atfab-vudio xl-home-atfab-context'
      name='音乐'
      icon={!isOpenMusic ? 'sound' : 'pause'}
      fabClick={setOpenMusic} />
  )
}


export default VedioSwitch
