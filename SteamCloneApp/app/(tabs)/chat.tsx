import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChatItem from "../../components/ChatItem";
import { useTheme } from "../../hooks/ThemeContext"; // <-- Додай цей рядок

const AVATAR1 = require("../../assets/images/placeholder-avatar.png");
const AVATAR2 = require("../../assets/images/placeholder-avatar.png");
const AVATARQ = require("../../assets/images/placeholder-avatar.png");
const AVATAREX = require("../../assets/images/placeholder-avatar.png");

export default function ChatScreen() {
  const [tab, setTab] = useState("chats");
  const { theme } = useTheme(); // <-- Глобальна тема

    const chats = [
    {
      avatar: AVATAR1,
      name: "Mark Dyson",
      lastMessage: "I'm already starting to play",
      date: "14 Jun",
      unread: true,
      online: true,
    },
    {
      avatar: AVATAR1,
      name: "Mark Dyson",
      lastMessage: "You: Ok",
      date: "14 Jun",
      unread: false,
      online: false,
    },
    {
      avatar: AVATAR2,
      name: "Player123",
      lastMessage: "You: Ok",
      date: "14 Jun",
      unread: false,
      online: true,
    },
    {
      avatar: AVATAR2,
      name: "Player123",
      lastMessage: "You: Ok",
      date: "14 Jun",
      unread: false,
      online: false,
    },
    {
      avatar: AVATARQ,
      name: "Player",
      lastMessage: "Hello! • 12 Jun",
      date: "",
      unread: false,
      online: false,
    },
    {
      avatar: AVATARQ,
      name: "Player",
      lastMessage: "Hello! • 12 Jun",
      date: "",
      unread: false,
      online: false,
    },
    {
      avatar: AVATAREX,
      name: "💎 Σxpřêşso #=_.#",
      lastMessage: "Ok",
      date: "",
      unread: false,
      online: true,
    },
    {
      avatar: AVATAREX,
      name: "💎 Σxpřêşso #=_.#",
      lastMessage: "Ok",
      date: "",
      unread: false,
      online: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="logo-steam" size={28} color={theme.text} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>Chat</Text>
        <Ionicons name="search" size={22} color={theme.text} style={{ marginLeft: "auto" }} />
      </View>
      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === "chats" && {
              backgroundColor: theme.input,
              borderColor: theme.accent,
              borderWidth: 2,
            },
          ]}
          onPress={() => setTab("chats")}
        >
          <Text style={[
            styles.tabText,
            tab === "chats" && { color: theme.text, fontWeight: "bold" }
          ]}>
            Open chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            tab === "friends" && {
              backgroundColor: theme.input,
              borderColor: theme.accent,
              borderWidth: 2,
            },
          ]}
          onPress={() => setTab("friends")}
        >
          <Text style={[
            styles.tabText,
            tab === "friends" && { color: theme.text, fontWeight: "bold" }
          ]}>
            My friends
          </Text>
        </TouchableOpacity>
      </View>
      {/* List */}
      <ScrollView>
        {chats.map((item, idx) => (
          <ChatItem key={idx} {...item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 10 },
  headerTitle: { fontSize: 24, fontWeight: "700", marginLeft: 12 },
  tabs: { flexDirection: "row", marginHorizontal: 18, marginTop: 18, marginBottom: 8, borderRadius: 12 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center" },
  tabText: { color: "#a3a3a3", fontWeight: "600", fontSize: 14 },
});
