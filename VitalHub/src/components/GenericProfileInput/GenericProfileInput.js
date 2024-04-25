import {
    GenericPrescriptionContainer,
    GenericPrescriptionImageInput,
    GenericProfileInput,
    GenericProfileInputAddress,
    GenericProfileInputAddressEdition,
    GenericProfileInputContainer,
    GenericProfileInputContainerAddress,
    GenericProfileInputEdition,
    GenericProfileTextArea,
    GenericProfileTextAreaEdition,
    PrescriptionImageContainer
} from "../../components/GenericProfileInput/Styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LabelText } from "../LabelText/Styles";

export const GenericInput = ({ textLabel, placeholder, editable }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInput placeholder={placeholder} editable={editable} />
        </GenericProfileInputContainer>
    )
}

export const GenericProfileAddressInput = ({ textLabel, placeholder }) => {
    return (
        <GenericProfileInputContainerAddress>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInputAddress placeholder={placeholder}/>
        </GenericProfileInputContainerAddress>
    )
}
export const GenericProfileEditAddressInput = ({ textLabel, placeholder, onChangeText }) => {
    return (
        <GenericProfileInputContainerAddress>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInputAddressEdition placeholder={placeholder} onChangeText={onChangeText} />
        </GenericProfileInputContainerAddress>
    )
}

export const GenericTextArea = ({ textLabel, placeholder, editable, onChangeText }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileTextArea
                placeholder={placeholder}
                multiline
                numberOfLines={5}
                maxLength={200}
                editable={editable}
                onChangeText={onChangeText}
            />
        </GenericProfileInputContainer>
    )
}

export const GenericEditTextArea = ({ textLabel, placeholder, onChangeText}) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileTextAreaEdition
                placeholder={placeholder}
                onChangeText={onChangeText}
                multiline
                numberOfLines={5}
                maxLength={200}
            />
        </GenericProfileInputContainer>
    )
}

export const GenericEditInput = ({ textLabel, placeholder, onChangeText }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInputEdition placeholder={placeholder} onChangeText={onChangeText} />
        </GenericProfileInputContainer>
    )
}

export const GenericPrescriptionInput = ({ textLabel, placeholder, img }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            {img != null ? (
                <PrescriptionImageContainer source={{uri: img}}/>
            ) : (
            <GenericPrescriptionContainer>
                <MaterialCommunityIcons name="alert-box-outline" size={24} color="black" />
                <GenericPrescriptionImageInput placeholder={placeholder} />
            </GenericPrescriptionContainer>
                )}
        </GenericProfileInputContainer>
    )
}

