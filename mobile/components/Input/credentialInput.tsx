import React from "react"
import { useState } from "react"
import { StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native"

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
};

export default function CredentialInput({ label, value, onChangeText, placeholder }: Props) {
    const {width} = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCapitalize="none"
            placeholderTextColor="hsla(68, 100%, 50%, 0.80)"
            />
        </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    height: 50,
    color: '#DDFF00',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 12,
  },
  container: {gap: 2},
  label: {fontSize: 11, marginLeft: 2}
});