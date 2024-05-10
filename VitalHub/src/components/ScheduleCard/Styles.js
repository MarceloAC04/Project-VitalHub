import styled from "styled-components";

export const ScheduleContainer = styled.View`
    background-color: #E8FCFD;
    flex-direction: row;
    width: 50%;
    padding: 4px; 
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    /* border: 1px solid orange; */
`;

export const ScheduleTime = styled.Text`
    color: #49B3BA;
    font-size: 14px;
    font-family: 'Quicksand_600SemiBold';
    text-align: center;
    align-self: flex-start;
`
export const RealizedTimeContainer = styled(ScheduleContainer)`
    background-color: #F1F0F5;
    width: 105px;
    
    
`

export const RealizedScheduleTime = styled(ScheduleTime)`
    color: #4E4B59;
    background-color: #F1F0F5;
`
//IOS
// export const ScheduleClinicContainer = styled(ScheduleContainer)`
//     width: 35%;
//     margin-top: 0;
// `

//ANDORID

export const ScheduleClinicContainer = styled(ScheduleContainer)`
    width: 45%;
    margin-top: 0;
`