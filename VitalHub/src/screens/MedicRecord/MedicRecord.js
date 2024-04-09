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
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Line } from "./Styles";
import { Alert } from "react-native";

export const MedicRecord = ({ navigation, name, crm, specialty }) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [openModalPhoto, setOpenModalPhoto] = useState(false)
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)

    async function DadosDoMedico(){
        
    }

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            setPhoto(photo.uri)

            setOpenModalPhoto(true)
        }
    }

    function ClearPhoto() {
        setPhoto(null)

        setOpenModalPhoto(false)
    }
    useEffect(() => {
        console.log(name)
        console.log(crm)
        console.log(specialty)

    },[])

    async function SavePhoto() {
        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
                .then(() => {
                    Alert.alert('Sucesso', 'foto salva na galeria')
                    setOpenModalPhoto(false)
                    setOpenCamera(false)
                }).catch(erro => {
                    alert("Error ao processar foto")
                })
        }
    }
    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil-medico.png')} />
                <Title>{name}</Title>

                <SubTitle>{specialty}   <SubTitle>{crm}</SubTitle></SubTitle>

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
                    refCamera={cameraRef}
                    openModalPhoto={openModalPhoto}
                    onPressPhoto={() => CapturePhoto()}
                    onPressCancel={() => ClearPhoto()}
                    confirmPhoto={() => SavePhoto()}
                    onPressExit={() => setOpenCamera(false)}
                    photo={photo}
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