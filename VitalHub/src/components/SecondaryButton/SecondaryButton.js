import { SecondaryButton, SecondaryButtonText } from "./Styles";


export const ButtonSecondary = ({onPress, placeholder = 'cancelar' }) => {
    return (
        <SecondaryButton>
            <SecondaryButtonText onPress={onPress}>{placeholder}</SecondaryButtonText>
        </SecondaryButton>
    )
}