import { View, Image } from '@tarojs/components'
import { AtCurtain } from "taro-ui"
import './index.scss'

const loaddingPic = require('../../image/xl-image-loadding.gif')

const XlloadingCurtain = (props) => {

  const { curtainClass, isOpened } = props

  return (
    <AtCurtain isOpened={isOpened}>
      {
        isOpened && <View className={`${curtainClass || 'xl-loading-default'}`}>
          <Image className={`${'xl-image-default-pic'}`} mode={'widthFix'} src={loaddingPic} />
        </View>
      }
    </AtCurtain>
  )
}

export default XlloadingCurtain
