import React, { FunctionComponent } from 'react'
import { View, Text, Image } from 'react-native'

import styles from './company.style'
import { icons, imagePlaceholder } from '../../../constants'
import { checkImageURL } from '../../../utils/validation'

interface CompanyProps {
  companyLogo?: string;
  jobTitle: string;
  companyName: string;
  location: string;
}

const Company: FunctionComponent<CompanyProps> = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          source={{
            uri: checkImageURL(companyLogo) ? companyLogo : imagePlaceholder
          }}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode='contain'
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  )
}

export default Company