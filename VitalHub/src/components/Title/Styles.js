import styled from "styled-components";


export const Title = styled.Text`
    font-size: 20px;
    color: #33303e;
    font-family: 'MontserratAlternates_600SemiBold';
    margin-bottom: 5px;
    /* Adcionei o text-align desse jeito para dar uma leve estilizda  */
    text-align: ${props => `${props.textAlign}`};
`

export const TitleHeader = styled(Title)`
    font-size: 16px;
    margin-bottom: 0px;
    color: white;
`

export const TitleCard = styled(Title)`
    color: #33303E;
    font-size: 16px;
`
export const TitleSelectScreen = styled(Title)`
    margin-top: 35px;
`
export const TitleNotFound = styled(Title)`
    color: #33303e;
    font-size: 16px;
    margin-top: 35px;
`