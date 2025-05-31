import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // Шлях під себе

const TABS = [
  { name: "index", iconType: "Ionicons", iconName: "bag-outline" },
  { name: "community", iconType: "Ionicons", iconName: "people-outline" }, // Community = люди
  { name: "chat", iconType: "Ionicons", iconName: "chatbubble-ellipses-outline", notification: true }, // Чат
  { name: "safety", iconType: "Ionicons", iconName: "shield-outline" }, // Safety (щит)
  { name: "profile", iconType: "MaterialCommunityIcons", iconName: "radiation", isAlert: true }, // Профиль (або що хочеш)
];

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { theme } = useTheme();

  return (
    <View style={[styles.bar, { backgroundColor: theme.tabBar, borderTopColor: theme.border }]}>
      {TABS.map((tab, idx) => {
        const routeIndex = state.routes.findIndex((r: any) => r.name === tab.name);
        const isFocused = state.index === routeIndex;

        let iconColor = tab.isAlert
          ? "#ef4444"
          : isFocused
            ? theme.text
            : theme.subtext;
        let iconSize = 26;

        let iconElement = null;
        if (tab.iconType === "Ionicons") {
          iconElement = (
            <Ionicons name={tab.iconName as any} size={iconSize} color={iconColor} />
          );
        } else if (tab.iconType === "MaterialCommunityIcons") {
          iconElement = (
            <MaterialCommunityIcons name={tab.iconName as any} size={iconSize} color={iconColor} />
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {iconElement}
              {tab.notification && (
                <View style={[styles.dot, { backgroundColor: theme.accent, borderColor: theme.tabBar }]} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 56,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  dot: {
    position: "absolute",
    right: -6,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
});
