import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext"; // шлях під себе!

type GameCardProps = {
  title: string;
  image: any;
  price: number;
  oldPrice?: number | null;
  os: string[];
  discount?: number | null;
};

export default function GameCard({ title, image, price, oldPrice, os, discount }: GameCardProps) {
  const { theme } = useTheme();

  const osIcons: Record<string, any> = {
    windows: <FontAwesome name="windows" size={16} color={theme.subtext} style={{marginRight: 4}} />,
    mac: <FontAwesome name="apple" size={16} color={theme.subtext} style={{marginRight: 4}} />,
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Image source={image} style={styles.cover} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.osRow}>
          {os.map((o) => (
            <View key={o}>{osIcons[o]}</View>
          ))}
        </View>
        <View style={styles.priceRow}>
          {oldPrice ? <Text style={[styles.oldPrice, { color: theme.subtext }]}>${oldPrice}</Text> : null}
          <Text style={[styles.price, { color: theme.text }]}>{`$${price}`}</Text>
          {discount ? (
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
  },
  cover: { width: 52, height: 52, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  osRow: { flexDirection: "row", marginTop: 2, marginBottom: 8 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  oldPrice: { textDecorationLine: "line-through", marginRight: 8, fontSize: 14 },
  price: { fontWeight: "bold", fontSize: 16 },
  discountTag: { backgroundColor: "#22c55e", borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 },
  discountText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
