// AdminRegistrationForm.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BaseUrl from '../ipconfig';


const AdminRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegistration = async () => {
    try {
      if (!fullName || !email || !phoneNumber || !password) {
        Alert.alert('All fields are required', 'Please fill in all the fields.');
        return;
      }

      const backendUrl = `${BaseUrl}/admins/register`;

      const data = {
        fullName,
        email,
        phoneNumber,
        password,
      };

      const response = await axios.post(backendUrl, data);
      console.log('Registration successful:', response.data);

      // Show success message
      Alert.alert('Success', 'Registration successful' );
      navigation.navigate('AdminHome'),
      // Clear input fields
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Registration Failed', 'There was an error during registration. Please try again.');
    }
  };

  return (
    <LinearGradient colors={['#f0f8ff']} style={styles.container}>
      <View>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="xyz@gmail.com"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', 
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor:'#fff5ee',
  },
  button: {
    backgroundColor: '#191970',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminRegistrationForm;
