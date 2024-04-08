import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import BaseUrl from '../ipconfig';

const AccountantRegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (!fullName || !dateOfBirth || !gender || !address || !phoneNumber || !email || !password) {
        alert('All fields are required', 'Please fill in all the fields.');
        return;
      }

      if (!email.endsWith('@gmail.com')) {
        alert('Invalid Email', 'Please enter a valid Gmail email address.');
        return;
      }

      if (phoneNumber.length !== 10) {
        alert('Please enter a 10-digit phone number.');
        return;
      }

      const backendUrl = `${BaseUrl}/accountants/register`;

      const data = {
        fullName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        password,
      };

      const response = await axios.post(backendUrl, data);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Registration Failed', 'There was an error during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
      />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD-MM-YYYY"
        onChangeText={(text) => setDateOfBirth(text)}
      />

      <Text style={styles.label}>Gender:</Text>
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(value) => setGender(value)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Transgender" value="transgender" />
      </Picker>

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="xyz@gmail.com"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegistration} color="#008b8b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0ffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black', 
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
});

export default AccountantRegistrationForm;
