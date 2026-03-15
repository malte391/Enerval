import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { ButtonProps } from "./ButtonPropTypes";

export default function LoginButton({label, onPress, color} : ButtonProps) {

    return(
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={[styles.label, {color: color ? color : '#DDFF00'}]}>{label}</Text>
        </Pressable>
    )
} 

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 16,
    alignItems:'center',
    justifyContent: 'center'
  },
  label: {
    color: '#DDFF00',
    fontWeight: 'bold',
    fontSize: 16
  }
});