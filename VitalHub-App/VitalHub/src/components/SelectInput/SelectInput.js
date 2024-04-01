import RNPickerSelect from "react-native-picker-select";
import { LabelText } from "../LabelText/Styles";
import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const dataTime = [
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
]

export const SelectInputPicker = ({ textInput, textLabel, selectedTime = null }) => {
    return (
        <View style={styles.container}>
            <LabelText>{textLabel}</LabelText>
            <RNPickerSelect
                onValueChange={(value) => selectedTime(value)}
                items={dataTime}
                placeholder={{ label: textInput, value: null }}
                Icon={() => <AntDesign name="caretdown" size={24} color="#34898F" />}
                style={{...styles}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        gap: 10,
    },
    inputIOS: {
        color: '#34898F',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_600SemiBold'
    },
    inputAndroid: {
        color: '#34898F',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_600SemiBold',
        textAlign: 'left'
    },
    viewContainer: {
        justifyContent: 'center',
        borderColor: '#60BFC5',
        borderWidth: 2,
        borderRadius: 5,
        height: 53,
        paddingLeft: 16,
    },
    iconContainer: {
        bottom: 0,
        right: 13
    },
    placeholder: {
        color: '#34898F',
        fontSize: 16,
        fontFamily: 'MontserratAlternates_600SemiBold',
        textAlign: 'justify'
    }
});