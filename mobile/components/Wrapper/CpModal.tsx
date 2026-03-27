// CpModal.tsx
import React, { ReactNode } from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet} from "react-native";
import CpHeader1 from "@/components/Text/CpHeader1";

type CpModalProps = {
    title: string;
    children: ReactNode;
};

export default function CpModal({ title, children }: CpModalProps) {
    return (
        <SafeAreaView style={styles.root}>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
                <CpHeader1 text={title} />
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    scroll: {
        gap: 18,
    },
});