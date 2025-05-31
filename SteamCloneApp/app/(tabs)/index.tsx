import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from "../../components/GameCard";
import { useTheme } from "../../hooks/ThemeContext";

const games = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    image: require("../../assets/images/gta5.jpg"),
    price: 10,
    oldPrice: 20,
    os: ["windows"],
    discount: 50,
  },
  {
    id: 2,
    title: "Battlefield 4",
    image: require("../../assets/images/battlefield4.jpg"),
    price: 35,
    oldPrice: null,
    os: ["windows"],
    discount: null,
  },
  {
    id: 3,
    title: "Factorio",
    image: require("../../assets/images/factorio.jpg"),
    price: 7,
    oldPrice: null,
    os: ["windows", "mac"],
    discount: null,
  },
  {
    id: 4,
    title: "Horizon Zero Dawn",
    image: require("../../assets/images/horizon.jpg"),
    price: 38,
    oldPrice: null,
    os: ["windows"],
    discount: null,
  },
];

export default function HomeScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="logo-steam" size={28} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>Store</Text>
        <Ionicons name="search" size={24} color={theme.text} style={{marginLeft: "auto"}} />
      </View>
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: theme.card }]}>
        <Image source={require("../../assets/images/deadbydaylight.jpg")} style={styles.bannerImg} />
        <View style={styles.bannerOverlay}>
          <Text style={[styles.bannerTitle, { color: theme.text }]}>Dead by Daylight</Text>
          <Text style={[styles.bannerDesc, { color: theme.subtext }]}>Recommended by your friend, Player</Text>
          <View style={styles.discountRow}>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>-70%</Text>
            </View>
            <Text style={styles.oldPrice}>$18</Text>
            <Text style={styles.newPrice}>$5</Text>
          </View>
        </View>
      </View>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tabActive, { backgroundColor: theme.accent }]}>
          <Text style={styles.tabTextActive}>Top Sellers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: theme.card }]}>
          <Text style={[styles.tabText, { color: theme.text }]}>Free to play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: theme.card }]}>
          <Text style={[styles.tabText, { color: theme.text }]}>Early Access</Text>
        </TouchableOpacity>
      </View>
      {/* Games List */}
      <ScrollView style={{flex:1}}>
        {games.map(game => (
          <GameCard key={game.id} {...game} />
        ))}
      </ScrollView>
      {/* Bottom Tab Bar */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: "700", marginLeft: 12 },
  banner: { margin: 20, borderRadius: 18, overflow: "hidden", position: "relative" },
  bannerImg: { width: "100%", height: 150 },
  bannerOverlay: { position: "absolute", left: 15, bottom: 15 },
  bannerTitle: { fontSize: 20, fontWeight: "700" },
  bannerDesc: { fontSize: 14 },
  discountRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  discountTag: { backgroundColor: "#22c55e", borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 },
  discountText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  oldPrice: { color: "#aaa", textDecorationLine: "line-through", marginRight: 8, fontSize: 14 },
  newPrice: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  tabs: { flexDirection: "row", marginHorizontal: 20, marginBottom: 10 },
  tab: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, marginRight: 10 },
  tabActive: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, marginRight: 10 },
  tabText: { fontWeight: "600", fontSize: 14 },
  tabTextActive: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
