import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { decode } from 'html-entities';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { capitalizeWordFirstLetter } from '@/src/helpers';

const { width } = Dimensions.get('window');

const TabBar = ({ tabs, activeTab, onTabPress }) => {
  const scrollViewRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const tabWidth = Math.max(width / tabs.length, 100); // Minimum tab width of 100
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;
  const isDarkMode = colorScheme === 'dark' ? true : false;
  const handleTabPress = (index) => {
    onTabPress(index);
  };

  const TabItem = ({ tab, isActive, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          paddingHorizontal: 7,
          marginHorizontal: 15,
          paddingBottom: 4,
          borderBottomWidth: isActive ? 1 : 0,
          borderBottomColor: isDarkMode ? '#e0e0e0' : '#8a8a8a',
        }}
      >
        <Text
          style={[
            styles.tabText,
            {
              color: isActive ? (isDarkMode ? '#ffffff' : '#000000') : styles.tabText.color,
            },
          ]}
        >
          {capitalizeWordFirstLetter(decode(tab.name))}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabBarContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            tab={tab}
            isActive={activeTab === index}
            onPress={() => handleTabPress(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const lightStyles = StyleSheet.create({
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addButton: {
    marginRight: 16,
    paddingVertical: 8,
  },
  iconColor: '#18879c',
  tabText: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'HindShiliguri',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  activeTabText: {
    color: 'black',
  },
});
const darkStyles = StyleSheet.create({
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  addButton: {
    marginRight: 16,
    paddingVertical: 8,
  },
  iconColor: '#18879c',
  tabText: {
    color: 'gray',
    fontSize: 14,
    fontFamily: 'HindShiliguri',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  activeTabText: {
    color: 'white',
  },
});

export default TabBar;
