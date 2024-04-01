import styled, { css } from "styled-components";

export const StatusButtonContainer = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 0px;
`

export const StatusButton = styled.TouchableHighlight.attrs({
    underlayColor: '#607EC5'
})`
    border: 2px solid #607EC5;
    border-radius: 5px;
    width: 100px;
    height: 39px;

    ${props => props.clickButton ? css`
        background-color: #607EC5;
    ` : css`
    background-color: #FBFBFB;
    `}
    align-items: center;
    justify-content: center;
`

export const StatusButtonText = styled.Text`
    font-size: 12px;
    font-family: 'MontserratAlternates_600SemiBold';

    ${props => props.clickButton ? css`
        color: white;
    ` : css`
    color: #607EC5;
    `}
`

export const AppointmentLevelButtonContainer = styled(StatusButtonContainer)`
    justify-content: none;
    margin-bottom: 0;
    gap: 25px;
`

export const AppointmentLevelButtonStyle = styled(StatusButton)`
    border: 2px solid #60BFC5;
    width: 88px;
    height: 40px;

    ${props => props.clickButton ? css`
        background-color: #60BFC5;
    ` : css`
    background-color: #FBFBFB;
    `}
`
export const AppointmentLevelButtonText = styled(StatusButtonText)`
    font-size: 14px;

    ${props => props.clickButton ? css`
        color: white;
    ` : css`
    color: #60BFC5;
    `}
`