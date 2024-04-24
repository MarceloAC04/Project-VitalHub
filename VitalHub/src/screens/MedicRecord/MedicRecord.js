import { GenericInput, GenericPrescriptionInput, GenericTextArea } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { MedicRecordButton } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { AppCamera } from "../../components/Camera/Camera";
import { CardLinkText } from "../../components/Card/Style";
import { Title } from "../../components/Title/Styles";
import { useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Line } from "./Styles";

export const MedicRecord = ({ navigation }) => {
    const [openCamera, setOpenCamera] = useState(false)
    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil-medico.png')} />
                <Title>Dr. Claudio</Title>

                <SubTitle>Cliníco geral    <SubTitle>CRM-15286</SubTitle></SubTitle>

                <GenericTextArea
                    textLabel={'Descrição da Consulta'}
                    placeholder={`O paciente possuí uma infecção no ouvido. Necessario repouso de 2 dias e acompanhamento médico constante.`}
                />

                <GenericInput
                    textLabel={'Diagnóstico do paciente'}
                    placeholder={'Infecção no ouvindo'}
                />

                <GenericTextArea
                    textLabel={'Descrição da Consulta'}
                    placeholder={`Medicamento: Advil \nDosagem: 50 mg \nFrequência: 3 vezes ao dia \nDuração: 3 dias`}
                />

                <GenericPrescriptionInput
                    textLabel={'Prescrição médica'}
                    placeholder={`Nenhuma foto informada`}
                    img={photo}
                />

                <GenericProfileInputContainerRow>
                    <MedicRecordButton onPress={() => setOpenCamera(true)} placeholder={'Enviar'} />
                    <CardLinkText onPress={() => setPhoto(null)}> Cancelar </CardLinkText>
                </GenericProfileInputContainerRow>

                <AppCamera
                    visibleCamera={openCamera}
                    setOpenCamera={setOpenCamera}
                />

                <Line />

                <GenericTextArea
                    placeholder={`Resultado do exame de sangue : \ntudo normal`}
                />
                <ButtonSecondary
                    onPress={() => navigation.replace('Main')}
                    placeholder={'voltar'}
                />
            </Container>
        </ContainerScrollView>
    )
}