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
import SearchBar from "../component/search";

import axios from "axios";
import Item from "../component/item";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const requestPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Ứng dụng cần quyền truy cập thư viện ảnh!");
  }
};

const GenScreen = ({ route }) => {
    const id = route.params.id;
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const [species, setSpecies] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
  
    useEffect(() => {
      const url = `http://10.2.60.87:5000/api/species/all/${id}?page=1`;
  
      axios
        .get(url)
        .then((res) => setSpecies(res.data.respone.rows))
        .catch((err) => console.log(err));
    }, []);
  
    const handleChooseImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
  
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error("Lỗi khi chọn ảnh:", error);
      }
    };
  
    const handleTakePhoto = async () => {
      try {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
  
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error("Lỗi khi chụp ảnh:", error);
      }
    };
    const handlePredict = async () => {
        if (!selectedImage) {
          console.error("Chưa chọn ảnh.");
          alert("Vui lòng chọn ảnh trước khi dự đoán.");
          return;
        }
      
        const formData = new FormData();
        formData.append("file", {
          uri: selectedImage,
          name: "image.jpg",
          type: "image/jpeg",
        });
      
        try {
          const response = await axios.post("http://10.2.58.169:8000/predict", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          // Dữ liệu dự đoán từ API
          const predictions = response.data.predictions[0];
          const maxProb = Math.max(...predictions); // Xác suất lớn nhất
          const predictedIndex = predictions.indexOf(maxProb); // Chỉ số dự đoán
      
          // Liên kết lớp với tên bệnh (bạn cần sửa các nhãn theo lớp của mình)
          const labels = ["Bệnh Gỉ Sắt", "Bệnh Phấn Trắng", "Cháy Lá", "Do Côn Trùng", "Bệnh Đốm Lá", "Cây Khỏe"];
          const result = labels[predictedIndex];
      
          console.log("Kết quả dự đoán:", result);
          alert(`Kết quả dự đoán: ${result} (Xác suất: ${(maxProb * 100).toFixed(2)}%)`);
        } catch (error) {
          console.error("Lỗi khi gửi ảnh đến API:", error);
          alert("Không thể gửi ảnh đến API.");
        }
      };
      
  
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
                  borderColor: "gray",
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
        <View style={{ alignItems: "center", marginVertical: 20 }}>
                 {/* Nút chọn ảnh */}
            <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="photo-library" size={24} color="white" />
                <Text style={styles.buttonText}> Chọn Ảnh</Text>
                </View>
            </TouchableOpacity>

  {/* Nút chụp ảnh */}
            <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="camera" size={24} color="white" />
                <Text style={styles.buttonText}> Chụp Ảnh</Text>
                </View>
            </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
            <Text style={styles.buttonText}>Chọn Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>Chụp Ảnh</Text>
          </TouchableOpacity> */}
          {selectedImage && (
            <>
              <Image
                source={{ uri: selectedImage }}
                style={styles.image}
              />
              <TouchableOpacity style={styles.button} onPress={handlePredict}>
                <Text style={styles.buttonText}>Dự Đoán</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#659488",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
  },
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
  export default GenScreen;