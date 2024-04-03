import { Calendar } from "react-native-calendars";
import styled from "styled-components";

export const ScheduleCalendar = styled(Calendar)`
    width: 360px;
`

export const ContainerDateDay = styled.View`
    background-color: ${props => props.isSelected ? '#60BFC5' : 'transparent'};
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;

export const DateDayText = styled.Text`
    color: ${props => props.isSelected ? '#FBFBFB' : props.isDisabled ? '#ACABB7' : '#5F5C6B'};
    font-size: 16px;
    font-family: 'Quicksand_600SemiBold';
`;