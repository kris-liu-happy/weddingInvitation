import React, { useState } from 'react'

import { AtFab, AtIcon } from 'taro-ui'

const VedioSwitch = (props) => {
  const [isOpenMusic, setIsOpenMusic] = useState(false)

  const { innerAudioContext } = props

  const setOpenMusic = () => {
    console.log(isOpenMusic, innerAudioContext)
    !isOpenMusic ? innerAudioContext.pause() : innerAudioContext.play()
    setIsOpenMusic(!isOpenMusic)
  }

  return (
    <AtFab className='xl-home-atfab-vudio xl-home-atfab-context' onClick={() => {setOpenMusic()}}>
      <AtIcon value={!isOpenMusic ? 'sound' : 'sound'} size='20' color='#fff'></AtIcon>
      音乐
    </AtFab>
  )
}


export default VedioSwitch
