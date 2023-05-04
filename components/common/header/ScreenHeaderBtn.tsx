import React, { FunctionComponent } from 'react'
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'

import styles from './screenheader.style'


interface ScreenHeaderBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: string;
  handlePress?: () => void;
}

const ScreenHeaderBtn: FunctionComponent<ScreenHeaderBtnProps> = ({
  iconUrl,
  dimension,
  handlePress
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} resizeMode='cover' style={styles.btnImg(dimension)}/>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn