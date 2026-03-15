import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, useWindowDimensions } from 'react-native';
import { supabase } from '../supabase/supabasepublic';
import { useRouter } from 'expo-router';
import LoginButton from '@/components/Buttons/loginButton';
import AuthInput from '@/components/Input/authInput';
import React from 'react';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('Create Account')
  const [buttonColor, setButtonColor] = useState<string>('')
  const router = useRouter();
  const {width} = useWindowDimensions()

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setButtonColor(() => '#FF2323')
      setLabel(() => 'Error! Try Again')
      setPassword(() => '')
      setTimeout(() => {
        setLabel('Create Account')
        setButtonColor('')
      }, 4000)
    } else {
      setLabel('Log-In Successfull! Check your e-mails for verification.')
    }
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
      <View style={[styles.registerView, {width: width * 0.7}]}>
        <AuthInput value={email} onChangeText={setEmail} placeholder="e-mail" />
        <AuthInput value={password} onChangeText={setPassword} placeholder="password" secureTextEntry={true} />
        <View style={styles.btns}>
          <LoginButton label={loading ? '...' : label} onPress={handleRegister} color={buttonColor}/>
        </View>
      </View>
  </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems:'center', gap: 160, padding: 12, backgroundColor: '#DDFF00' },
  logoView: {marginTop: 180},
  registerView: {padding: 2, gap: 10, height: 'auto', width: '100%'},
  btns: {flexDirection: 'row', width: '100%', gap: 5, justifyContent: 'center', alignContent: 'center'}
});