import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, useWindowDimensions } from 'react-native';
import { supabase } from '../supabase/supabasepublic';
import { useRouter } from 'expo-router';
import AuthInput from '@/components/Input/authInput';
import LoginButton from '@/components/Buttons/loginButton';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()
  const { width } = useWindowDimensions()

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Login failed', error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={require('../assets/images/logo.png')} 
        style={{width: width * 0.7,
          height: width * 0.18
        }}
        resizeMode="contain"
        />
      </View>
      <View style={[styles.loginView, {width: width * 0.7}]}>
        <AuthInput value={email} onChangeText={setEmail} placeholder="e-mail" />
        <AuthInput value={password} onChangeText={setPassword} placeholder="password" secureTextEntry={true} />
        <View style={styles.loginBtns}>
          <LoginButton label={loading ? 'Login in...' : 'Login'} onPress={handleLogin}/>
          <LoginButton label="Register" onPress={() => router.replace('/register')}/>
        </View>
      </View>
  </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems:'center', padding: 12, backgroundColor: '#DDFF00' },
  logoView: {marginTop: 180, marginBottom: 200},
  loginView: {padding: 2, gap: 10},
  loginBtns: {flexDirection: 'row', width: '100%', gap: 5, justifyContent: 'center', alignContent: 'center'}
});