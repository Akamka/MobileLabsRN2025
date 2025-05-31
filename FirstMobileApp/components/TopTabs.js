import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TopTabs({ state, setState }) {
  const tabs = ['Головна', 'Фотогалерея', 'Профіль'];

  return (
    <View style={styles.tabs}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, state === idx && styles.activeTab]}
          onPress={() => setState(idx)}
        >
          <Text style={[styles.tabText, state === idx && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 18
  },
  tabText: {
    fontSize: 16,
    color: '#555'
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#007bff'
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold'
  }
});
