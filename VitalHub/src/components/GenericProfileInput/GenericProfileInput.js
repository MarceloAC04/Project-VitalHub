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

export const GenericInput = ({ textLabel, placeholder, editable  }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInput editable={editable} placeholder={placeholder} />
        </GenericProfileInputContainer>
    )
}

export const GenericProfileAddressInput = ({ textLabel, placeholder, editable  }) => {
    return (
        <GenericProfileInputContainerAddress>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInputAddress editable={editable} placeholder={placeholder}/>
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

export const GenericTextArea = ({ textLabel, placeholder, value, editable }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileTextArea
                placeholder={placeholder}
                multiline
                editable={editable}
                value={value}
                numberOfLines={5}
                maxLength={200}
            />
        </GenericProfileInputContainer>
    )
}

export const GenericEditTextArea = ({ textLabel, value, placeholder, onChangeText}) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileTextAreaEdition
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                multiline
                numberOfLines={5}
                maxLength={200}
            />
        </GenericProfileInputContainer>
    )
}

export const GenericEditInput = ({ textLabel, value, placeholder, onChangeText }) => {
    return (
        <GenericProfileInputContainer>
            <LabelText>{textLabel}</LabelText>
            <GenericProfileInputEdition value={value} placeholder={placeholder} onChangeText={onChangeText} />
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

