import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TILE_WIDTH, TILE_HEIGHT } from '@/app/contants/tileConstants'


type TileProps = {
    title: string;
    onPress: () => void;
    onLongPress?: () => void
    preview: ReactNode;
}


export default function PreviewTile({title, onPress, onLongPress, preview} : TileProps) {

    return(
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View style={style.container}>
                <Text style={style.header}>{title}</Text>
                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 6 }} />
                <View style={style.preview}>{preview}</View>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'hsla(60, 2%, 88%, 0.88)', 
        width: TILE_WIDTH, 
        height: TILE_HEIGHT, 
        padding: 12, 
        paddingRight: 16, 
        borderRadius: 12, 
        shadowColor: '#f5e642',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    header: {fontSize: 14, fontWeight: '500'},
    preview: {flex: 1, alignItems: 'center', justifyContent: 'center'}
})