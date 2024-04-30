import RNPickerSelect from "react-native-picker-select";
import { LabelText } from "../LabelText/Styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import { useEffect, useState } from "react";


export const SelectInputPicker = ({ textInput, textLabel, setSelectDateTime}) => {
    const dataActual = moment().format('YYYY-MM-DD');
    const [arrayOptions, setArraryOptions] = useState(null);

    function loadOptions() {
        //Conferir quantas as horas faltam até 00:00
        const leftHours = moment(dataActual).add(24, 'hours').diff(moment(), 'hour')
        console.log(leftHours)

        //Criar um laço que rode a quantidade de horas que faltam
        const options = Array.from({ length: leftHours }, (_, index) => {
            let valor = new Date().getHours() + (index + 1);

            return {
                label: `${valor}:00`, value: `${valor}:00`
            }
        })

        //Devolver para cada hora, uma nova opção no select
        setArraryOptions(options);
    }

    useEffect(() => {
        loadOptions();
    }, [])
    return (
        <View style={styles.container}>
            <LabelText>{textLabel}</LabelText>
            {
                arrayOptions != null ? (

                    <RNPickerSelect
                        onValueChange={(value) => setSelectDateTime(value)}
                        items={arrayOptions}
                        placeholder={{ label: textInput, value: null }}
                        Icon={() => <AntDesign name="caretdown" size={24} color="#34898F" />}
                        style={{ ...styles }}
                    />) : 
                    (
                    <ActivityIndicator />
                    )
            }
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