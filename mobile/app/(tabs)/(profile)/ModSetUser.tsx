import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View} from "react-native";
import CpModal from "@/components/Wrapper/CpModal";

const title = {
    ger: 'Deine Daten anpassen',
    engl: 'Edit your data'
}

export default function ModSetUser() {
    return (
        <CpModal title={title.ger}>
            <View>

            </View>
        </CpModal>
    )
}