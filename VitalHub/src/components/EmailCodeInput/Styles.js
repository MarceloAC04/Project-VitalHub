import styled from "styled-components";

export const EmailCodeInputContainer = styled.View`
    width: 90%;
    flex-direction: row;
    margin-top: 20px;
    padding: 20px 8px 20px 8px;
    justify-content: space-between
`

export const EmailCodeInput = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
    width: 65px;
    height: 62px;
    font-size: 16px;
    border-radius: 5px;
    border: 2px solid #77CACF;
    font-family: 'MontserratAlternates_600SemiBold';
    font-size: 40px;
    text-align: center;
    color: #34898f;
`