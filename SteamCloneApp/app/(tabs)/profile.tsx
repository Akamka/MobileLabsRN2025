import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";

// Путь до аватара
const AVATAR = require("../../assets/images/placeholder-avatar.png");

export default function ProfileScreen() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.avatarBox}>
        <View>
          <Image source={AVATAR} style={styles.avatar} />
          <View style={[styles.statusDot, { borderColor: theme.background }]} />
        </View>
        <Text style={[styles.name, { color: theme.text }]}>Firstname Lastname</Text>
        <Text style={[styles.group, { color: theme.text, opacity: 0.75 }]}>Group</Text>
      </View>
      <View style={[styles.settings, { backgroundColor: theme.card }]}>
        <TouchableOpacity style={styles.settingsBtn} onPress={toggleTheme}>
          <Text style={[styles.settingsText, { color: theme.text }]}>
            Change Theme ({themeName === "dark" ? "Dark" : "Light"})
          </Text>
          <Text style={styles.chevron}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsBtnLast}>
          <Text style={[styles.settingsText, { color: theme.text }]}>Logout</Text>
          <Text style={styles.chevron}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarBox: { alignItems: "center", marginTop: 44, marginBottom: 40 },
  avatar: { width: 94, height: 94, borderRadius: 47, backgroundColor: "#242b35" },
  statusDot: {
    position: "absolute",
    right: 3,
    bottom: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#22c55e",
    borderWidth: 3,
  },
  name: { fontWeight: "700", fontSize: 18, marginTop: 14, letterSpacing: 0.1, textAlign: "center" },
  group: { fontWeight: "500", fontSize: 15, marginTop: 2, textAlign: "center" },
  settings: { marginHorizontal: 16, borderRadius: 16, paddingTop: 7, paddingBottom: 7 },
  settingsBtn: {
    flexDirection: "row", alignItems: "center", paddingVertical: 18, paddingHorizontal: 18,
    borderBottomWidth: 1, borderBottomColor: "#23293d",
  },
  settingsBtnLast: { flexDirection: "row", alignItems: "center", paddingVertical: 18, paddingHorizontal: 18 },
  settingsText: { fontSize: 16, flex: 1, fontWeight: "500" },
  chevron: { color: "#a3a3a3", fontSize: 20, fontWeight: "600" },
});
