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
import { userDecodeToken } from '../../Utils/Auth'
import api from "../../services/Service";

export const MedicRecord = ({ navigation, route }) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [openModalPhoto, setOpenModalPhoto] = useState(false)
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)

    //Id do Medico
    const [userId, setUserid] = useState('')

    //Consutla - Medico
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')

    //Receita
    const [medicamento, setMedicamento] = useState('')
    const { userName, userCrm, specialty, consultaId } = route.params;

    async function DadosDoMedico() {
        try {
            const token = await userDecodeToken();
            if (token != null) {
                setUserid(token.jti)
            }
            console.log(token.jti)
            console.log(consultaId)
            //Rota usada para Buscar os dados
            const response = await api.get(`/Pacientes/BuscarPorData?data=2024-04-10&id=${token.jti}`);

            //Defini "consults" como um objeto para acessar os dados
            const consultas = response.data;

            //Defini que o objeto BuscarId, is
            const BuscarId = consultas.find(consulta => consulta.id === consultaId);

            if (BuscarId) {

                // Consulta encontrada, agora você pode acessar os dados dela
                console.log(BuscarId)
                console.log("Diagnóstico do paciente:", BuscarId.diagnostico);
                console.log("Exames do paciente:", BuscarId.descricao);
                console.log("Medicamento do Paciente:", BuscarId.receita.medicamento);


                setDiagnostico(BuscarId.diagnostico)
                setDescricao(BuscarId.descricao)
                setMedicamento(BuscarId.receita.medicamento)

                // Faça o que precisar com os dados da consulta associada ao paciente clicado
            } else {
                console.log("Consulta para o paciente não encontrada.");
            }
        } catch (error) {
            console.log(error)
        }
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
        DadosDoMedico()

    }, [])

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
                <Title>{userName}</Title>

                <SubTitle>{specialty}   <SubTitle>{userCrm}</SubTitle></SubTitle>

                <GenericTextArea
                    textLabel={'Descrição da Consulta'}
                    placeholder={ descricao}
                    editable={false}
                />

                <GenericInput
                    textLabel={'Diagnóstico do paciente'}
                    placeholder={diagnostico }
                    editable={false}
                />

                <GenericTextArea
                    textLabel={'Descrição da Consulta'}
                    placeholder={`Medicamento: ${medicamento}`}
                    editable={false}
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