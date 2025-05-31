import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import TopTabs from './components/TopTabs';
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [tab, setTab] = useState(0);

  let ScreenComponent;
  if (tab === 0) ScreenComponent = HomeScreen;
  if (tab === 1) ScreenComponent = GalleryScreen;
  if (tab === 2) ScreenComponent = ProfileScreen;

  return (
    <View style={styles.container}>
      <Header />
      <TopTabs state={tab} setState={setTab} />
      <View style={{ flex: 1 }}>
        <ScreenComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
