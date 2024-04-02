import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { MapClinicLocation } from "../../components/MapClinic/MapClinic";


export const ClinicLocation = ({ navigation }) => {
    return (
        <ContainerScrollView>
            <Container>
             <MapClinicLocation />

                <Title>Clínica Natureh</Title>
                <SubTitle>São Paulo, SP</SubTitle>

                <GenericInput
                    textLabel={'Endereço'}
                    placeholder={'Rua Vicenso Silva, 987'}
                />
                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Número'}
                        placeholder={'578'}
                    />

                    <GenericProfileAddressInput
                        textLabel={'Bairro'}
                        placeholder={'Moema-SP'}
                    />
                </GenericProfileInputContainerRow>

                <ButtonSecondary
                    placeholder={'voltar'}
                    onPress={() => navigation.replace('Main')}
                />

            </Container>
        </ContainerScrollView>
    )
}
