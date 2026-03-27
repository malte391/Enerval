import { Image, Text } from "react-native"
import PreviewTile from "./CptileSquare"
import { router } from "expo-router"


const title = {
    ger: 'Monatlicher Verbrauch',
    eng: 'Monthly Consumption'
}

export default function CpMonthlyConsumptionTile() {

    return (
        <PreviewTile title={title.ger} onPress={() => router.push('/ModConsumptionView' as any)} preview={
            <Image source={require('@/assets/images/logo.png')} 
                style={{width: '100%', height: '50%'}}
                resizeMode="contain"
                />
        }/> 
    )
}