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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../store/speciesSlice";

import axios from "axios";
import Item from "../component/item";

const DetailGenScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [species, setSpecies] = useState([]);
  const detailspecies = useSelector((state) => state.species.detailspecies);
  // console.log(detailspecies);
  useEffect(() => {
    dispatch(getProperty(id));
  }, [id]);
  // (species.length > 0) & console.log(species);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* header */}
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
              HỆ THỐNG NHẬN DIỆN {"\n"} BỆNH TRÊN LÁ ỔI
            </Text>
          </View>
        </View>
      </View>

      {/* body */}
      {/* {detailspecies.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.contentWidget}>
              <View style={styles.underline}></View>
              <Text style={styles.heading}>
                BẢNG CHI TIẾT VỀ ĐẶC ĐIỂM HÌNH THÁI VÀ NÔNG HỌC CỦA MẪU GIỐNG
              </Text>
            </View>
          </View> */}

          {/* <View style={styles.grid}>
            {species?.length > 0 &&
              species?.map((item) => (
                <View key={item?.id} style={styles.item}>
                  <Item item={item} />
                </View>
              ))}
          </View> */}
          {/* <View style={{ padding: 5 }}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>
                  Mẫu giống : {"\n"}
                  {detailspecies[0]?.Species?.name}
                </Text>
                <Text style={styles.tableHeader}>
                  Tên trước kia :{"\n"}
                  {detailspecies[0]?.Species?.name_other}
                </Text>
                <Text style={styles.tableHeader}>
                  Xuất xứ : {"\n"}
                  {detailspecies[0]?.Species?.origin_vn}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  Giới thiệu cụ thể của cây{" "}
                </Text>
              </View>
              {detailspecies?.length > 0 &&
                detailspecies?.map((item) => (
                  <View style={styles.tableRow} key={item.id}>
                    <Text style={styles.tableCell}>
                      {item?.Properties?.name_vn}
                    </Text>
                    <Text style={styles.tableCell}>
                      {item?.PropertiesValue
                        ? item.PropertiesValue.description
                        : item.value}
                    </Text>
                  </View>
                ))}
            </View>
          </View> */}
        {/* </ScrollView> */}
      {/* )}  */}
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
    fontSize: 20,
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
  table: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
});
export default DetailGenScreen;
