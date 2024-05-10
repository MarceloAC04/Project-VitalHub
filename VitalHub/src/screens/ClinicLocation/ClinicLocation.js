import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { MapClinicLocation } from "../../components/MapClinic/MapClinic";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";


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
             lat={clincLocation.endereco?.latitude}
             long={clincLocation.endereco?.longitude}
             />

                <Title>{clincLocation.nomeFantasia}</Title>
                <SubTitle>{clincLocation.endereco?.cidade}, SP</SubTitle>

                <GenericInput
                    textLabel={'Endereço'}
                    placeholder={clincLocation.endereco?.logradouro}
                />
                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Número'}
                        placeholder={clincLocation.endereco?.numero.toString()}
                    />

                    <GenericProfileAddressInput
                        textLabel={'Cidade'}
                        placeholder={clincLocation.endereco?.cidade}
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
