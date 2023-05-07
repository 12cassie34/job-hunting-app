import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import { COLORS, SIZES } from '../../../constants'
import styles from './popularjobs.style'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'

const Popularjobs = () => {
  const isLoading = false;
  const isError = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        { isLoading 
          ? <ActivityIndicator size="large" color={COLORS.primary} />
          : isError 
                ? <Text>Something weng wrong.</Text>
                : <FlatList
                    data={[1, 2, 4, 4]}
                    renderItem={({ item }) => {
                      return (
                        <PopularJobCard item={item} />
                      )
                    }}
                    keyExtractor={item => item?.job_id}
                    contentContainerStyle={{
                      columnGap: SIZES.medium
                    }}
                    horizontal
                />
        }
      </View>
    </View>
  )
}

export default Popularjobs