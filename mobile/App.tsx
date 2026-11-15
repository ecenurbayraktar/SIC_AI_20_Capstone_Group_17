
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.icon}>💜</Text>

        <Text style={styles.title}>
          HatıranYeter
        </Text>

        <Text style={styles.subtitle}>
          Her anı bir bağ, her hatıra bir hikâye.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Hoş Geldiniz
          </Text>

          <Text style={styles.cardText}>
            Sevdiklerinizin değerli anılarını
            birlikte yaşatmak için buradayız.
          </Text>
        </View>

        <Text style={styles.footer}>
          Samsung Innovation Campus
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },
  icon: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#6744A0",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#777080",
    textAlign: "center",
    marginBottom: 36,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#6744A0",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    color: "#999999",
    fontSize: 12,
  },
});
