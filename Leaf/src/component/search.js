import React, { useState } from "react";
import { View, Pressable, TextInput, StyleSheet, Keyboard } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const handleSearchPress = () => {
    // Xử lý tìm kiếm dựa trên searchTerm
    console.log("Search term:", searchTerm);
    navigation.navigate("DetailGen", { id: searchTerm });
    Keyboard.dismiss();
    setSearchTerm("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Pressable onPress={handleSearchPress} style={styles.button}>
        <FontAwesome name="search" size={15} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 0.2,
    // borderRadius: 5,
    // borderColor: "gray",
    padding: 2,
    width: "50%",
    height: 40,
    alignSelf: "flex-end",
  },
  input: {
    flex: 1,
    height: 20,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
  },
});

export default SearchBar;
