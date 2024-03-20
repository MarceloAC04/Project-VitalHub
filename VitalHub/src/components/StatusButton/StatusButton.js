import { AppointmentLevelButtonStyle, AppointmentLevelButtonText, StatusButton, StatusButtonText } from "./Styles";


export const FilterStatusButton = ({
    textButton,
    clickButton = false,
    onPress
}) => {
    return (
        <StatusButton clickButton={clickButton} onPress={onPress}>
            <StatusButtonText clickButton={clickButton}>{textButton}</StatusButtonText>
        </StatusButton>
    )
}

export const AppointmentLevelButton = ({
    textButton,
    clickButton = false,
    onPress
}) => {
    return(
        <AppointmentLevelButtonStyle clickButton={clickButton} onPress={onPress}>
            <AppointmentLevelButtonText clickButton={clickButton}>{textButton}</AppointmentLevelButtonText>
        </AppointmentLevelButtonStyle>
    )
}