import React from "react"
import { useState } from "react"
import { StyleSheet, TextInput, useWindowDimensions } from "react-native"

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export default function AuthInput({ value, onChangeText, placeholder, secureTextEntry }: Props) {
    const {width} = useWindowDimensions()
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      placeholderTextColor="hsla(68, 100%, 50%, 0.80)"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    width: '100%',
    height: 50,
    color: '#DDFF00',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
  },
});