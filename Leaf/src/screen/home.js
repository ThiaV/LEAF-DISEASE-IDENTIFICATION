import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SpeciesService from "../services/species";
import { FontAwesome } from "@expo/vector-icons";

const slider1 = { id: 1, source: require("../../assets/Oi.jpg") };
const slider2 = { id: 2, source: require("../../assets/Oi.jpg") };
const slider3 = { id: 3, source: require("../../assets/dua.jpg") };
const slider4 = { id: 4, source: require("../../assets/lan.jpg") };



const data = [slider1, slider2, slider3, slider4];

import axios from "axios";
import SearchBar from "../component/search";
import Search from "./search";

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const handleImagePress = async (id) => {
    // Xử lý logic khi ảnh được bấm vào
    console.log("ID của ảnh:", id);
    navigation.navigate("Gen", { id: id });
  };
  const handleSearchPress = () => {
    navigation.navigate("DetailGen", { id: searchTerm });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: width * 0.9,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ width: width * 0.2 }}
          >
            <Image
              source={require("../../assets/Sa-removebg-preview.png")}
              // source={{
              //   uri: "../../assets/logo.png",
              // }}
              style={{
                width: width * 0.2,
                height: width * 0.3,
                resizeMode: "contain",
                borderRadius: (width * 0.2) / 2,
                borderWidth: 2,
                borderColor: "gray"
              }}
            />
          </TouchableOpacity>
          <View style={{ width: width * 0.7, paddingHorizontal: 4 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#00FF00",
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 5,
              }}
            >
              NHẬN DIỆN BỆNH {"\n"} TRÊN LÁ ỔI
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          marginBottom: 10,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("Search")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ marginLeft: 10 }}>Bộ lọc</Text>
          <FontAwesome
            name="filter"
            size={20}
            color="gray"
            style={{ marginLeft: 5 }}
          />
        </Pressable>
        <SearchBar />
      </View>

      <ScrollView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item.id)}>
              <Image
                source={item.source}
                style={{ width, height: "50%", aspectRatio: 1 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
