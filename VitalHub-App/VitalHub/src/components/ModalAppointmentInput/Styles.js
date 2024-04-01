import styled from "styled-components";

export const ScheduleAppointmentContainer = styled.View`
    width: 90%;
    margin-top: 20px;
    gap: 10px;
`

export const ScheduleAppointmentInput = styled.TextInput.attrs({
    placeholderTextColor: '#34898F'
})`
    height: 53px;
    width: 316px;
    border-radius: 5px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #34898F;
    background-color: transparent;
    border: 2px solid #60BFC5;
    vertical-align: middle;
    padding: 16px;
`