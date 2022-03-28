import './index.scss'


import { AtFab, AtIcon } from 'taro-ui'

const xlAtfab = (props) => {

  const { icon, name, classNames, fabClick, iconSize, iconColor } = props

  return (
    <>
      <AtFab className={`${classNames} xlatfab`} onClick={fabClick}>
        <AtIcon value={icon} size={iconSize || '20'} color={iconColor || '#fff'}></AtIcon>
        {name}
      </AtFab>
    </>

  )
}

export default xlAtfab
