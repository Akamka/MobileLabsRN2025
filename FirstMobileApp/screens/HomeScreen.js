import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const news = Array(6).fill({
  title: 'Заголовок новини',
  date: 'Дата новини',
  shortText: 'Короткий текст новини',
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Новини</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={require('../assets/image-placeholder.png')} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text>{item.shortText}</Text>
            </View>
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  newsItem: { flexDirection: 'row', marginBottom: 16 },
  image: { width: 60, height: 60, marginRight: 12, backgroundColor: '#ddd' },
  title: { fontWeight: 'bold' },
  date: { color: 'gray', fontSize: 12 },
});