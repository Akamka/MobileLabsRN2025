import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext";

type CommunityPostProps = {
  avatar: any;
  author: string;
  time: string;
  tag?: string;
  image: any;
  title: string;
  description: string;
  likes: number;
  comments: number;
};

export default function CommunityPost({
  avatar,
  author,
  time,
  tag,
  image,
  title,
  description,
  likes,
  comments,
}: CommunityPostProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.headerRow}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={[styles.author, { color: theme.text }]}>{author}</Text>
        {tag ? (
          <Text style={[styles.tag, { backgroundColor: theme.accent, color: "#fff" }]}>{tag}</Text>
        ) : null}
        <Text style={[styles.time, { color: theme.subtext }]}>{time}</Text>
        <Ionicons name="ellipsis-horizontal" size={18} color={theme.subtext} style={{ marginLeft: "auto" }} />
      </View>
      <Image source={image} style={styles.postImage} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.subtext }]}>{description}</Text>
      <View style={styles.actionRow}>
        <View style={styles.action}>
          <Ionicons name="thumbs-up-outline" size={18} color="#22c55e" />
          <Text style={styles.actionTextActive}>{likes}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="chatbubble-outline" size={18} color={theme.subtext} />
          <Text style={[styles.actionText, { color: theme.subtext }]}>{comments}</Text>
        </View>
        <View style={[styles.action, { marginLeft: "auto" }]}>
          <Ionicons name="arrow-redo-outline" size={18} color={theme.subtext} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  author: { fontWeight: "bold", fontSize: 15, marginRight: 6 },
  tag: {
    fontWeight: "700",
    fontSize: 10,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginTop: 2,
  },
  time: { fontSize: 12, marginLeft: 2 },
  postImage: {
    width: "100%",
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: { fontWeight: "bold", fontSize: 15, marginBottom: 2 },
  description: { fontSize: 13, marginBottom: 4 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  action: { flexDirection: "row", alignItems: "center", marginRight: 18 },
  actionText: { fontSize: 13, marginLeft: 5 },
  actionTextActive: { color: "#22c55e", fontSize: 13, marginLeft: 5, fontWeight: "bold" },
});
