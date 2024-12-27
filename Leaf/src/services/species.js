// import createApiClient from "./api.services";
// class SpeciesService {
//   constructor(baseUrl = "/api/species") {
//     this.api = createApiClient(baseUrl);
//   }
//   async getAllSpecies() {
    
//     return (await this.api.get(`/species`)).data;
//   }
//   async getSpecies(id,page) {
//     console.log(id,page)
//     return (await this.api.get(`/all/${id}?page=${page}`)).data;
//   }
  
// }
// export default new SpeciesService();
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from './api.services'; // Import axios instance

const App = () => {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState(null);

  // Gửi yêu cầu GET đến API FastAPI để lấy thông điệp chào mừng
  const fetchMessage = async () => {
    try {
      const response = await api().get('/'); // Gọi API GET / từ FastAPI
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  // Gửi yêu cầu POST đến API FastAPI để nhận dự đoán
  const sendPredictionRequest = async () => {
    try {
      const input = inputData.split(',').map(num => parseFloat(num)); // Chuyển đổi input thành mảng số
      const response = await api().post('/predict', { data: input }); // Gửi yêu cầu POST tới FastAPI
      setPrediction(response.data.predictions); // Lưu kết quả dự đoán
    } catch (error) {
      console.error('Error making prediction request:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Fetch Welcome Message" onPress={fetchMessage} />
      <TextInput
        placeholder="Nhập dữ liệu đầu vào (vd: 1.0, 2.0, 3.0)"
        value={inputData}
        onChangeText={setInputData}
        style={{ borderBottomWidth: 1, marginVertical: 10, padding: 10 }}
      />
      <Button title="Dự đoán" onPress={sendPredictionRequest} />
      
      {prediction && (
        <View>
          <Text>Dự đoán: {JSON.stringify(prediction)}</Text>
        </View>
      )}
    </View>
  );
};

export default App;

