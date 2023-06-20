import React, { FunctionComponent } from 'react'

import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'
import { DetailTab } from '../../../app/job-details/[id]';

interface TabButtonProps {
  name: DetailTab;
  activeTab: DetailTab;
  onHandleSearchType: () => void
}

const TabButton: FunctionComponent<TabButtonProps> = ({ name, activeTab, onHandleSearchType }) => {

  return (
    <TouchableOpacity
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  )
}

interface TabsProps {
  tabs: DetailTab[];
  activeTab: DetailTab;
  onChangeActiveTab: (tab: DetailTab) => void;
}

const Tabs: FunctionComponent<TabsProps> = ({ tabs, activeTab, onChangeActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => onChangeActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.toString()}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  )
}

export default Tabs