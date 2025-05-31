import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";

const cardRadius = 14;

export default function SafetyScreen() {
  const [activeTab, setActiveTab] = useState("guard");
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="logo-steam" size={28} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>Safety</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "guard" && { backgroundColor: theme.background },
          ]}
          onPress={() => setActiveTab("guard")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "guard" && { color: theme.text, fontWeight: "bold" },
            ]}
          >
            Guard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "conf" && { backgroundColor: "transparent" },
          ]}
          onPress={() => setActiveTab("conf")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.subtext },
              activeTab === "conf" && { fontWeight: "bold" },
            ]}
          >
            Confirmations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.loggedIn, { color: theme.subtext }]}>
          Logged in as player
        </Text>
        <Text style={[styles.code, { color: theme.text }]}>N5KCV</Text>
        <View style={[styles.progressBarBg, { backgroundColor: theme.input }]}>
          <View style={[styles.progressBarFill, { backgroundColor: theme.accent }]} />
        </View>
      </View>

      {/* Description */}
      <View style={[styles.infoBox, { backgroundColor: theme.input }]}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          You’ll enter your code each time you enter your password to sign in to your Steam account.
        </Text>
        <Text style={[styles.tipText, { color: theme.accent }]}>
          Tip: <Text style={styles.tipLink}>
            If you don't share your PC, you can select "Remember my password"
          </Text> when you sign in to the PC client to enter your password and authenticator code less often.
        </Text>
      </View>

      {/* Actions */}
      <View style={[styles.actionsBox, { backgroundColor: theme.card }]}>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={[styles.actionText, { color: theme.text }]}>Remove Authenticator</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Text style={[styles.actionText, { color: theme.text }]}>My Recovery Code</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItemLast}>
          <Text style={[styles.actionText, { color: theme.text }]}>Help</Text>
          <Ionicons name="chevron-forward" size={18} color={theme.subtext} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 14,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginLeft: 14,
    letterSpacing: 0.2,
  },
  tabsContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 18,
    marginBottom: 14,
    marginTop: 6,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  card: {
    borderTopLeftRadius: cardRadius,
    borderTopRightRadius: cardRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginHorizontal: 0,
    alignItems: "center",
    paddingVertical: 26,
    marginBottom: 0,
  },
  loggedIn: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  code: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 10,
    marginTop: 2,
  },
  progressBarBg: {
    width: 140,
    height: 7,
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8,
  },
  progressBarFill: {
    width: "70%",
    height: 7,
    borderRadius: 6,
  },
  infoBox: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 11,
    fontWeight: "500",
    lineHeight: 20,
  },
  tipText: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  tipLink: {
    color: "#3b82f6",
    fontWeight: "500",
  },
  actionsBox: {
    marginTop: 16,
    marginHorizontal: 14,
    borderRadius: cardRadius,
    paddingVertical: 2,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#23293d", // можна теж винести в theme.border
  },
  actionItemLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  actionText: {
    fontSize: 16,
    flex: 1,
    fontWeight: "600",
  },
});
