import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Додай цей імпорт, шлях під себе

type ChatItemProps = {
  avatar: any;
  name: string;
  lastMessage: string;
  date: string;
  unread?: boolean;
  online?: boolean;
};

export default function ChatItem({ avatar, name, lastMessage, date, unread, online }: ChatItemProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Image source={avatar} style={styles.avatar} />
        {online && <View style={[styles.statusDot, { borderColor: theme.background }]} />}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
        <Text style={[styles.lastMessage, { color: theme.subtext }]}>{lastMessage}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.date, { color: theme.subtext }]}>{date}</Text>
        {unread && (
          <View style={styles.unreadDot}>
            <Ionicons name="ellipse" size={10} color={theme.accent} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  name: { fontWeight: "bold", fontSize: 15 },
  lastMessage: { fontSize: 13, marginTop: 2 },
  date: { fontSize: 11, textAlign: "right" },
  right: { alignItems: "flex-end", minWidth: 40 },
  unreadDot: { marginTop: 5, alignItems: "center" },
  statusDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#22c55e",
    borderWidth: 2,
  },
});
