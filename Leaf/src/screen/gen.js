import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const GenScreen = ({ route }) => {
  const id = route?.params?.id;
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [species, setSpecies] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [diseaseDetails, setDiseaseDetails] = useState(null);

  useEffect(() => {
    const url = `http://10.2.60.87:5000/api/species/all/${id}?page=1`;
    axios
      .get(url)
      .then((res) => setSpecies(res.data.response.rows))
      .catch((err) => console.log(err));
  }, [id]);

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
      console.error("Error choosing image:", error);
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
      console.error("Error taking photo:", error);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post("http://10.13.128.174:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const predictions = response.data.predictions[0];
      const maxProb = Math.max(...predictions);
      const predictedIndex = predictions.indexOf(maxProb);

      const labels = [
        "Bệnh Gỉ Sắt",
        "Bệnh Phấn Trắng",
        "Cháy Lá",
        "Do Côn Trùng",
        "Bệnh Đốm Lá",
        "Cây Khỏe",
      ];
      const result = labels[predictedIndex];

      // Mockup details for demo purposes (should fetch details dynamically if possible)
      const details = {
        name: result,
        description: "Thông tin chi tiết về bệnh sẽ hiển thị ở đây.",
        treatment: "Hướng dẫn điều trị sẽ được cung cấp.",
      };

      setDiseaseDetails({ ...details, probability: maxProb });
      Alert.alert("Prediction Result", `${result} (${(maxProb * 100).toFixed(2)}%)`);
    } catch (error) {
      console.error("Error predicting:", error);
      Alert.alert("Error", "Unable to send image to API.");
    }
  };

  const handleSavePrediction = () => {
    // Save action logic here (e.g., save to local storage, send to server)
    Alert.alert("Save", "Prediction result has been saved.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../assets/Sa-removebg-preview.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.title}>NHẬN DIỆN BỆNH TRÊN LÁ ỔI</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
          <MaterialIcons name="photo-library" size={24} color="white" />
          <Text style={styles.buttonText}>Chọn Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <FontAwesome name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Chụp Ảnh</Text>
        </TouchableOpacity>
        {selectedImage && (
          <>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <TouchableOpacity style={styles.button} onPress={handlePredict}>
              <Text style={styles.buttonText}>Dự Đoán</Text>
            </TouchableOpacity>
          </>
        )}
        {diseaseDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Thông Tin Chi Tiết</Text>
            <Text>Tên bệnh: {diseaseDetails.name}</Text>
            <Text>Mô tả: {diseaseDetails.description}</Text>
            <Text>Điều trị: {diseaseDetails.treatment}</Text>
            <Text>Xác suất: {(diseaseDetails.probability * 100).toFixed(2)}%</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePrediction}>
              <Text style={styles.saveButtonText}>Lưu Kết Quả</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 30,
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FF00",
    textAlign: "center",
    marginVertical: 10,
  },
  content: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#659488",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    width: "90%",
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default GenScreen;
