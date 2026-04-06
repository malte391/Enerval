import React from "react";
import {SvgProps} from "react-native-svg";


type CpModalRoutingButtonProps = {
    label: string;
    icon: keyof typeof icons;
    onPress: () => void;
}

const icons: Record<string, React.FC<SvgProps>> = {

}

export default function CpModalRoutingButton({label, icon, onPress} : CpModalRoutingButtonProps) {

}