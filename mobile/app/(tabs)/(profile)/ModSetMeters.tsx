
import CpModal from "@/components/Wrapper/CpModal";
import {Text, View} from "react-native";
import CpHeader1 from "@/components/Text/CpHeader1";
import {useEffect} from "react";
import {useProfile} from "@/context/ProfileContext";
import {getAllRecordsOfAMeter} from "@/model/Records/recordHandling";

const title = {
    ger: 'Deine Zähler bearbeiten',
    engl: 'Edit your meters'
}

export default function ModSetMeters() {

    const { meters } = useProfile()


    return (
        <CpModal title={title.ger}>
            <View>
                {meters.map((meter, index) => (
                    <View key={index}>
                        <Text key={index}>{meter.meter_number}</Text>
                    </View>
                ))}
            </View>
        </CpModal>
    )
}