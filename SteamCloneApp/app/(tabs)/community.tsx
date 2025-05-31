import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CommunityPost from "../../components/CommunityPost";
import { useTheme } from "../../hooks/ThemeContext";

export default function CommunityScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="logo-steam" size={28} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>Community</Text>
      </View>
      <Text style={[styles.headerDesc, { color: theme.subtext }]}>
        Community and official content for all games and software
      </Text>
      
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.searchBtn, { backgroundColor: theme.card }]}>
          <Ionicons name="search" size={16} color={theme.subtext} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabActive, { backgroundColor: theme.accent }]}>
          <Text style={styles.tabTextActive}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: theme.card }]}>
          <Text style={[styles.tabText, { color: theme.text }]}>Screenshots</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: theme.card }]}>
          <Text style={[styles.tabText, { color: theme.text }]}>Artwork</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, { backgroundColor: theme.card }]}>
          <Text style={[styles.tabText, { color: theme.text }]}>Workshop</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}}>
        {/* Один пост як приклад */}
        <CommunityPost
          avatar={require("../../assets/images/eurogamer.jpg")}
          author="Eurogamer"
          time="yesterday · 2:20 pm"
          tag="NEWS"
          image={require("../../assets/images/kingdomcome.jpg")}
          title="Florida tourist attraction sues Fortnite, seeks removal of in-game castle"
          description="Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition."
          likes={324}
          comments={12}
        />
        {/* Можеш додати ще */}
      </ScrollView>
      {/* Твоя TabBar якщо треба */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: "700", marginLeft: 12 },
  headerDesc: { fontSize: 14, paddingHorizontal: 20, marginTop: 4, marginBottom: 8 },
  tabs: { flexDirection: "row", alignItems: "center", marginHorizontal: 12, marginBottom: 2 },
  searchBtn: { borderRadius: 8, width: 32, height: 32, justifyContent: "center", alignItems: "center", marginRight: 7 },
  tab: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 10, marginRight: 7 },
  tabActive: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 10, marginRight: 7 },
  tabText: { fontWeight: "600", fontSize: 13 },
  tabTextActive: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
