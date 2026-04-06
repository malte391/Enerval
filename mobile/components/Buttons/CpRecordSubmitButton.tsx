import {Image, Pressable, StyleSheet, View} from "react-native";
import Check from '@/assets/icons/IcCheck.svg'

type RecordSubmitButtonProps = {
    onSubmit: () => void;
    loading?: boolean;
}

export default function CpRecordSubmitButton({onSubmit, loading} : RecordSubmitButtonProps) {
   return(
       <Pressable onPress={onSubmit} style={styles.container}>
           {!loading ? <Check width={32} /> :
               <Image source={require('@/assets/GIFs/loading2.gif')} style={{ width: 50, height: 50 }} />}
       </Pressable>
   )
}

const styles = StyleSheet.create({
    container: {borderRadius: '100%', backgroundColor: '#DDFF00', width: 50, height: 50, justifyContent: 'center', alignItems: 'center'},
})