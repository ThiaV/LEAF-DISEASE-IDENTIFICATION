import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../component/search";

import axios from "axios";
import Item from "../component/item";

const GenFilterScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const species = useSelector((state) => state.species.species);

  (species.length > 0) & console.log(species);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
              NHẬN DIỆN BỆNH TRÊN LÁ ỔI
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 15, marginRight: 4 }}>
        <SearchBar />
      </View>
      {species.length <= 0 && (
        <View style={styles.container}>
          <View style={styles.contentWidget}>
            <View style={styles.underline}></View>
            <Text style={styles.heading}>
              Không tìm thấy mẫu có thuộc tính như mô tả !!!
            </Text>
          </View>
        </View>
      )}
      {species.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.contentWidget}>
              <View style={styles.underline}></View>
              <Text style={styles.heading}>CƠ SỞ DỮ LIỆU NGUỒN GEN</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {species?.length > 0 &&
              species?.map((item) => (
                <View key={item?.id} style={styles.item}>
                  <Item item={item} />
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contentWidget: {
    flexDirection: "row",
    alignItems: "center",
  },
  underline: {
    width: 2.5,
    height: 20,
    backgroundColor: "#FFD700", // Màu tương đương với bg-yellow-500
    marginRight: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3333", // Màu tương đương với text-lime-800
  },
  scrollContainer: {
    flexGrow: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 5,
  },
  item: {
    width: "48%", // Điều chỉnh chiều rộng của mỗi item tùy thuộc vào nhu cầu
    marginBottom: 10,
  },
});
export default GenFilterScreen;
