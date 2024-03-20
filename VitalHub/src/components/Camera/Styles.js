import styled from "styled-components";

export const ViewFlip = styled.View`
    flex: 1;
    align-items: center;
    background-color: black;
`
export const ViewButton = styled.View`
    background-color: transparent;
    flex-direction: row;
    justify-content: flex-end;
    width: 90%;
    gap: 42px;
`

export const ButtonFlip = styled.TouchableOpacity`
    padding: 15px;
`

export const ButtonCapture = styled(ButtonFlip)`
    margin: 10px;
    padding: 20px;
    border-radius: 15px;
    background-color: #121212;
    justify-content: center;
    align-items: center;
`
export const ButtonExit = styled(ButtonCapture)`
    padding: 20px;
`

export const ModalPhotoContainer = styled.View`
    flex: 1;
    align-items: center; 
    justify-content: space-evenly;
    padding: 20px;
`

export const ModalPhoto = styled.Image`
    width: 100%; 
    height: 480px; 
    border-radius: 10px;
    margin-top: 50px;
`

export const ButtonModalPhotoView = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`