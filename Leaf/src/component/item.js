import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Item = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("DetailGen", { id: item?.name })}
    >
      <Image
        source={{
          uri:
            item?.DetailImages?.Image?.url || item?.DetailImages[0]?.Image?.url,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>Tên cây {item?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "col",
    alignItems: "center",
    width: "100%",
    padding: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  details: {
    width: "60%",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00FF00", // Màu tương đương với text-lime-800
    textAlign: "center",
  },
});

export default Item;
