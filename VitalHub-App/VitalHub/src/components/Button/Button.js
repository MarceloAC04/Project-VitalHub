import { ActivityIndicator } from "react-native";
import { Button, ButtonCancelRouteMap, ButtonMedicRecord, ButtonRouteMap, ButtonTitle, ButtonTitleGoogle, GoogleButton, GreyButton, ModalAppointmentButton, ModalConfirmAppointmentButton } from "./Styles"
import { MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Loading } from "../Loding/Styles";
import { useState } from "react";


export const ButtonEnter = ({ onPress, placeholder }) => {

    //Usei um state para definir quando o botão pode ser pressionado ou não.
    const [buttonDisabled, setButtonDisabled] = useState(false);

    //Fiz um função para acionar os objeto e identificar eles true e false
    const handlePressed = () => {
        //Desativei o botão e defini ele como pressionado 
        setButtonDisabled(true)

        //Daqui 5 segundos o que está dentro do TimeOut será acionado.
        setTimeout(() => {
            //Defini que o botão pode ser acionado de novo
            setButtonDisabled(false)
        }, 5000)

        //Existe um pequeno problema com onPress aqui. Existe botãos que não tem o onPress como função, então dá um erro no app. Talvez tratar essa função seria uma boa. Um exemplo de lugar que está dando erro é no Profile o botão - Editar e Salvar - estão dando problema.
        onPress(onPress)
    }

    return (
        // Aqui no Button eu fiz que no momento que o botão é precionado a função é ativada, fiz if Else, onde quando o botão é precionado o "placeholder" é substituido por um "Loading"
        <Button onPress={handlePressed} disabled={buttonDisabled}>
            {buttonDisabled ? (<Loading
                size={"large"}
                color={"white"}
                animating={true}
            />) :
                (<ButtonTitle>{placeholder}</ButtonTitle>)}
        </Button>
    )
}

export const ButtonGrey = ({ onPress, placeholder }) => {
    return (
        <GreyButton onPress={onPress}>
            <ButtonTitle>{placeholder}</ButtonTitle>
        </GreyButton>
    )
}

export const ButtonGoogle = ({ onPress, placeholder }) => {
    return (
        <GoogleButton onPress={onPress}>
            <AntDesign name="google" size={20} color="#496BBA" />
            <ButtonTitleGoogle>{placeholder}</ButtonTitleGoogle>
        </GoogleButton>
    )
}

export const ButtonModalAppointment = ({ onPress, placeholder }) => {
    return (
        <ModalAppointmentButton onPress={onPress}>
            <ButtonTitle>{placeholder}</ButtonTitle>
        </ModalAppointmentButton>
    )
}

export const ButtonModalConfirmAppointment = ({ onPress, placeholder }) => {
    return (
        <ModalConfirmAppointmentButton onPress={onPress}>
            <ButtonTitle>{placeholder}</ButtonTitle>
        </ModalConfirmAppointmentButton>
    )
}

export const MedicRecordButton = ({ onPress, placeholder }) => {
    return (
        <ButtonMedicRecord onPress={onPress}>
            <ButtonTitle><MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />  {placeholder}</ButtonTitle>
        </ButtonMedicRecord>
    )
}

export const RouteMapButton = ({ onPress }) => {
    return (
        <ButtonRouteMap onPress={onPress}>
            <FontAwesome5 name="route" size={24} color="white" />
        </ButtonRouteMap>
    )
}
export const RouteCancelMapButton = ({ onPress }) => {
    return (
        <ButtonCancelRouteMap onPress={onPress}>
            <MaterialCommunityIcons name="cancel" size={24} color="white" />
        </ButtonCancelRouteMap>
    )
}