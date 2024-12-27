import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Khởi tạo database
const db = SQLite.openDatabase({ name: 'logs.db', location: 'default' });

const App = () => {
  const [content, setContent] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL,
          timestamp TEXT NOT NULL
        );`
      );
    });
    fetchLogs();
  }, []);

  const addLog = () => {
    if (!content.trim()) {
      Alert.alert('Cảnh báo', 'Nội dung nhật ký không được để trống!');
      return;
    }
    const timestamp = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO logs (content, timestamp) VALUES (?, ?)',
        [content, timestamp],
        () => {
          setContent('');
          fetchLogs();
          Alert.alert('Thành công', 'Nhật ký đã được lưu!');
        }
      );
    });
  };

  const fetchLogs = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM logs ORDER BY timestamp DESC',
        [],
        (_, results) => {
          const rows = results.rows;
          let logsArray = [];
          for (let i = 0; i < rows.length; i++) {
            logsArray.push(rows.item(i));
          }
          setLogs(logsArray);
        }
      );
    });
  };

  const deleteOldLogs = () => {
    const timeLimit = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM logs WHERE timestamp < ?',
        [timeLimit],
        () => {
          fetchLogs();
          Alert.alert('Thông báo', `Đã xóa các nhật ký cũ trước ${timeLimit}`);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lưu Nhật Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung nhật ký..."
        value={content}
        onChangeText={setContent}
      />
      <Button title="Lưu Nhật Ký" onPress={addLog} />
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text>ID: {item.id}</Text>
            <Text>Nội dung: {item.content}</Text>
            <Text>Thời gian: {item.timestamp}</Text>
          </View>
        )}
      />
      <Button title="Xóa Nhật Ký Cũ" onPress={deleteOldLogs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  logItem: { marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
});

export default App;
