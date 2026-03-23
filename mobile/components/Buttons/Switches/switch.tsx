import { Switch } from "react-native";

type SwitchPropTypes = {
    value: 1 | 2;
    onSwitch: () => void;
}
export default function DefaultSwitch({value, onSwitch} : SwitchPropTypes) {
    
    return (
        <Switch />
    )
}