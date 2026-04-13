import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Header from '../components/header';
export default function Login(){
 const router = useRouter();
 

return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        value=''
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Password"
        value=''
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#888"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={()=>router.push('./user-portal')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Go to Signup */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>

        <TouchableOpacity onPress={() => router.push('./signup')}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8F4',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
  },

  subtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    color: '#4CAF50',
  },

  link: {
    color: '#1B5E20',
    fontWeight: 'bold',
  },
});