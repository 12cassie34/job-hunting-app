import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'

import styles from './specifics.style'
import { DetailTab } from '../../../app/job-details/[id]'

interface SpecificsProps {
  title: DetailTab;
  points: string[];
}

const Specifics: FunctionComponent<SpecificsProps> = ({ title, points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <View style={styles.pointsContainer}>
        {points.map((item, index) => (
          <View key={index} style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Specifics