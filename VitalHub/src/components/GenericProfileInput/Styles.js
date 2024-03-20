import styled from "styled-components";

export const GenericProfileInputContainer = styled.View`
    width: 90%;
    margin-top: 19px;
    gap: 10px;
`

export const GenericProfileInput = styled.TextInput.attrs({
    placeholderTextColor: '#33303E'
})`
    font-family: 'MontserratAlternates_500Medium';
    color: #33303E;
    background-color: #F5F3F3;
    height: 53px;
    width: 100%;
    border-radius: 5px;
    padding: 16px;
    font-size: 14px;
    
`

export const GenericProfileTextArea = styled(GenericProfileInput).attrs({
    placeholderTextColor: '#33303E'
})`
    font-family: 'MontserratAlternates_600SemiBold';
    height: 120px;
    width: 100%;
    text-align: justify;
    font-size: 14px;
    vertical-align: top;
`

export const GenericProfileTextAreaEdition = styled(GenericProfileInput).attrs({
    placeholderTextColor: '#34898F'
})`
    font-family: 'MontserratAlternates_600SemiBold';
    color: #34898F;
    background-color: transparent;
    border: 2px solid #49b3ba;
    height: 120px;
    width: 100%;
    vertical-align: top;
    
`

export const GenericProfileInputEdition = styled(GenericProfileTextAreaEdition).attrs({
    placeholderTextColor: '#34898F'
})`
    height: 53px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #34898F;
    background-color: transparent;
    border: 2px solid #49b3ba;
    vertical-align: middle;
`

export const GenericProfileInputContainerRow = styled.View`
    flex-direction: row;
    width: 90%;
`
export const GenericProfileInputContainerAddress = styled(GenericProfileInputContainer)`
    width: 55%;
`

export const GenericProfileInputAddress = styled(GenericProfileInput)`
    width: 80%;
`
export const GenericPrescriptionContainer = styled.View`
    height: 120px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #F5F3F3;
`
export const GenericPrescriptionImageInput = styled(GenericProfileInput)`
    font-family: 'MontserratAlternates_600SemiBold';
    width: 65%;
`

export const PrescriptionImageContainer = styled.Image`
    height: 100px;
`
