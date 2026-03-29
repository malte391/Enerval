import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { SvgProps } from 'react-native-svg';

import IconMeter from '@/assets/icons/IcMeter.svg'
import IconUser from '@/assets/icons/IcUser.svg'
import IconFile from '@/assets/icons/IcFile.svg'
import IconSignOut from '@/assets/icons/IcSignOut.svg'

type CpMenuButtonPropTypes = {
    icon: keyof typeof icons;
    label: string;
    onPress: () => void;
    iconSize?: number;
    iconColor?: string;
    fontColor?: string;
};

const icons: Record<string, React.FC<SvgProps>> = {
    meter: IconMeter,
    user: IconUser,
    contract: IconFile,
    signOut: IconSignOut,
}

export default function CpMenuButton({
    icon,
    label,
    onPress,
    iconSize = 40,
    iconColor,
    fontColor = 'black',
    }: CpMenuButtonPropTypes) {

    const CpIcon: React.FC = () => {
        if (!icon) return null;
        const IconComponent = icons[icon];
        if (!IconComponent) return null;
        return <IconComponent width={iconSize} height={iconSize} color={iconColor} />;
    };

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <CpIcon />
            <Text style={[styles.label, {color: fontColor}]}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {width: '100%', flexDirection: 'row', gap: 40, alignItems: 'center'},
    label: {fontSize: 16, fontFamily:'Helvetica-Neue', fontWeight: '600'},
    icon: {}
})