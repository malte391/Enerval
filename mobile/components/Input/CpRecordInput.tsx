import React, { useRef } from 'react';
import {View, TextInput, Text, StyleSheet, Pressable, Platform} from 'react-native';
import { useFonts } from 'expo-font';

type CpRecordInputProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    digitCount?: number;
};

export default function CpRecordInput({ value, onChange, onFocus, onBlur, digitCount = 6 }: CpRecordInputProps) {
    const inputRef = useRef<TextInput>(null);
    const digits = value.padStart(digitCount, '0').slice(-digitCount).split('');
    const [fontsLoaded] = useFonts({
        'Digital7': require('@/assets/fonts/digital-7.ttf'),
    })
    const fontFallBack = Platform.select({
        ios: 'System',
        android: 'Roboto',
        default: 'System',
    });

    function handleChange(text: string) {
        const clean = text.replace(/[^0-9]/g, '').slice(0, digitCount);
        onChange(clean);
    }

    return (
        <Pressable onPress={() => inputRef.current?.focus()} style={styles.wrapper}>
            <View style={styles.display}>
                {digits.map((digit, i) => (
                    <View key={i} style={[styles.cell, i === digitCount - 1 && styles.cellLast]}>
                        <Text style={[styles.digit, fontsLoaded ? {fontFamily: 'Digital7'} : {fontFamily: fontFallBack}]}>{digit}</Text>
                    </View>
                ))}
            </View>
            <Text style={styles.unit}>kWh</Text>
            <TextInput
                ref={inputRef}
                value={value}
                onChangeText={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                keyboardType="numeric"
                maxLength={digitCount}
                style={styles.hidden}
                caretHidden
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-end',
        gap: 4,
    },
    unit: {
        fontSize: 13,
        color: '#aaa',
        fontWeight: '500',
        marginRight: 5,
    },
    display: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#bbb',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingHorizontal: 6,
        paddingLeft: 8,
        paddingVertical: 8,
        gap: 5,
    },
    cell: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1.5,
        paddingRight: 3,
        borderRightColor: '#888',
    },
    cellLast: {
        borderRightWidth: 1.5,
        borderRightColor: 'transparent',
    },
    digit: {
        fontSize: 44,
        color: '#111',
    },
    hidden: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0,
    },
});