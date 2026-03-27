import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View} from "react-native";
import CpModal from "@/components/Wrapper/CpModal";

const title = {
    ger: 'Verträge verwalten',
    engl: 'Edit contracts'
}

export default function ModSetContracts() {
    return (
        <CpModal title={title.ger}>
           <View>

           </View>
        </CpModal>
    )
}