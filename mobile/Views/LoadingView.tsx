import { Image } from 'expo-image'
import {View} from "react-native";

export default function LoadingView() {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 150}}>
            <Image
                source={require('@/assets/GIFs/loading2.gif')}
                style={{ width: 50, height: 50 }}
            />
        </View>
    )
}