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
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { getIdFilter, getFilterData } from "../store/speciesSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [genus, setGenus] = useState("");
  const properties = useSelector((state) => state.species.properties);
  const handleChangeGenus = (value) => {
    setGenus(value);
  };
  const [filter, setFilter] = useState({});
  const handleChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };
  // console.log(filter);
  const handlePress = async () => {
    dispatch(getFilterData(filter));
    setFilter({});
    setGenus("");
    navigation.navigate("GenFilter");
  };
  useEffect(() => {
    genus != "" && dispatch(getIdFilter(genus));
  }, [genus]);
  // console.log(properties);
  return (
    <View style={{ flex: 1 }}>
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
              // source={{
              //   uri: "../../assets/Sa-removebg-preview.png",
              // }}
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
              NHẬN DIỆN BỆNH {"\n"} TRÊN LÁ ỔI
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginLeft: 10, marginBottom: 10 }}>
        <View style={styles.contentWidget}>
          <View style={styles.underline}></View>
          <Text style={styles.heading}>BỘ LỌC THUỘC TÍNH</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, marginLeft: 15, top: 10 }}>
            Hãy chọn loại cây
          </Text>
          <View style={styles.container}>
            <Picker
              selectedValue={genus}
              style={styles.picker}
              onValueChange={(itemValue) => handleChangeGenus(itemValue)}
            >
              <Picker.Item label="Chọn ở đây" value="" />
              <Picker.Item label="Lúa" value="N" />
              <Picker.Item label="Ngô" value="B" />
              <Picker.Item label="Dưa lưới" value="D" />
              <Picker.Item label="Đậu nành" value="DN" />
              <Picker.Item label="Ổi" value="O" />
            </Picker>
          </View>
        </View>

        {properties.length > 0 && genus != "" && (
          <View style={{ top: 30, flexDirection: "column" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                bottom: 10,
              }}
            >
              <View style={{ borderWidth: 1, borderRadius: 20 }}>
                <TouchableOpacity onPress={handlePress}>
                  <Text style={{ padding: 10 }}>Thực hiện</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              {properties.map((item) =>
                item.PropertiesValues.length > 0 ? (
                  <View
                    key={item.id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{ flex: 1, fontSize: 16, top: 10, marginLeft: 10 }}
                    >
                      {item?.name_vn}
                    </Text>
                    <View style={styles.container}>
                      <Picker
                        selectedValue={filter[item?.id]}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                          handleChange(item?.id, itemValue)
                        }
                        prompt="Chọn một mục"
                      >
                        <Picker.Item label="" value="-1" />
                        {item?.PropertiesValues.map((propertiesvalue) => (
                          <Picker.Item
                            label={propertiesvalue.description}
                            value={propertiesvalue?.option}
                            key={propertiesvalue?.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                ) : null
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    alignContent: "center",
    // bottom: 2,
    paddingBottom: 2,
    marginRight: 10,
    marginLeft: 15,
  },
  picker: {
    height: 40,
    width: 160,
  },
});
export default Search;
