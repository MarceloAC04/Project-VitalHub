import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { MapClinicLocation } from "../../components/MapClinic/MapClinic";
import api from "../../services/Service";
import { useEffect, useState } from "react";


export const ClinicLocation = ({ navigation, route }) => {
    const {clinicaId} = route.params;
    const [clincLocation, setClinicLocation]= useState({})

    async function searchClinic() {
        await api.get(`/Clinica/BuscarPorId?id=${clinicaId}`)
        .then(response => {
           setClinicLocation(response.data)
           console.log(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        searchClinic()
    }, [])
    return (
        <ContainerScrollView>
            <Container>
             <MapClinicLocation 
             lat={clincLocation.latitude}
             long={clincLocation.longitude}
             />

                <Title>{clincLocation.nomeFantasia}</Title>
                <SubTitle>São Paulo, SP</SubTitle>

                <GenericInput
                    textLabel={'Endereço'}
                    placeholder={clincLocation.endereco.longradouro}
                />
                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Número'}
                        placeholder={clincLocation.endereco.numero}
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
