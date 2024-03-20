import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    width: 90%;
    height: 44px;
    background-color: #496BBA;
    border-radius: 5px;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
    padding: 8px 12px 8px 12px;
`

export const GreyButton = styled(Button)`
    width: 50%;
    background-color: #ACABB7;
`

export const ButtonTitle = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-family: 'MontserratAlternates_700Bold';
    text-transform: uppercase;
`

// GOOGLE SIGN-IN BUTTON
export const GoogleButton = styled(Button)`
    background-color: #FAFAFA;
    border: 1px solid #496BBA;
    flex-direction: row;
    gap: 27px;
`
export const ButtonTitleGoogle = styled(ButtonTitle)`
    color: #496BBA;
`

export const ModalAppointmentButton = styled(Button)`
    width: 100%;
    margin-top: 30px;
`
export const ModalConfirmAppointmentButton = styled(Button)`
    width: 80%;
    margin-top: 30px;
`

export const ButtonMedicRecord = styled(Button)`
    width: 60%;
    height: 44px;
    background-color: #49B3BA;
    align-items: center;
`
export const ButtonRouteMap = styled.TouchableOpacity.attrs({
    underlayColor: 'transparent'
})`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: #49B3BA;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    bottom: 60px;
    
`
export const ButtonCancelRouteMap = styled(ButtonRouteMap)`
    background-color: #C81D25;
    bottom: 120px;
    
`