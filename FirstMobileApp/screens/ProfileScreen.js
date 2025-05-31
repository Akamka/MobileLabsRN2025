import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    //логіка реєстрації
    alert('Зареєстровано!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Реєстрація</Text>
      <TextInput
        style={styles.input}
        placeholder="Електронна пошта"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль (ще раз)"
        secureTextEntry
        value={password2}
        onChangeText={setPassword2}
      />
      <TextInput
        style={styles.input}
        placeholder="Прізвище"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.input}
        placeholder="Ім'я"
        value={name}
        onChangeText={setName}
      />
      <Button title="Зареєструватися" onPress={handleRegister} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
});