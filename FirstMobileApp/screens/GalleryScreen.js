import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';

const data = Array(12).fill({});

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={() => (
          <View style={styles.item}>
            <Image
              source={require('../assets/image-placeholder.png')}
              style={styles.img}
            />
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  item: { flex: 1, margin: 8, aspectRatio: 1 },
  img: { width: '100%', height: '100%', backgroundColor: '#eee' },
});