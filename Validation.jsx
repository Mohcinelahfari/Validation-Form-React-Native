import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';

function Validation() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  const validation = () => {
    let isValid = true;

    // Reset errors before validation
    setErrors([]);

    if (name.trim() === '') {
      setErrors((prevErrors) => [...prevErrors, 'Name is required.']);
      isValid = false;
    }

    if (email.trim() === '') {
      setErrors((prevErrors) => [...prevErrors, 'Email is required.']);
      isValid = false;
    }

    if (password.trim() === '') {
      setErrors((prevErrors) => [...prevErrors, 'Password is required.']);
      isValid = false;
    }

    if (!isChecked) {
      setErrors((prevErrors) => [...prevErrors, 'You must agree to the terms.']);
      isValid = false;
    }

    if (role === '') {
      setErrors((prevErrors) => [...prevErrors, 'Role is required.']);
      isValid = false;
    }

    return isValid;
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setIsChecked(false);
    setRole('');
    setErrors([]);
    setIsDisable(false);
  };

  const handleSubmit = () => {
    setIsDisable(true);

    if (validation()) {
      Alert.alert('Success', 'Form submitted successfully!');
      resetForm();
    } else {
      setIsDisable(false);
    }
  };

  return (
    <ScrollView   style={styles.container}
    contentContainerStyle={{paddingBottom: 30 }}
    keyboardShouldPersistTaps="handled">
      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.title}>Validation Form</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} />
        <Text style={styles.checkboxLabel}>
          I agree to the terms and conditions
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Select Role" value="" />
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Guest" value="guest" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.button, isDisable && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isDisable}
      >
        <Text style={styles.buttonText}>
          {isDisable ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures full screen height is used
    padding: 20,
  },
  errorContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
  },
  errorText: {
    color: '#721c24',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 50,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    flex: 0,  // Prevent button from stretching
  },
  
  
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default Validation;
