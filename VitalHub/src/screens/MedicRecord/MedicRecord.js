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
import { useEffect, useState } from "react";
import { Line } from "./Styles";
import api from '../../services/Service'

export const MedicRecord = ({ navigation, route}) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
    const [descricaoExame, setDescricaoExame] = useState('')

    async function InsertExame() {
        const idConsulta = route.params.Id
        console.log(idConsulta)
        const formData = new FormData();
        formData.append("ConsultaId", idConsulta )
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split('.').pop()}`,
            type: `image/${uriCameraCapture.split('.').pop()}`
        });
        formData.append("Descricao", "")

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(uriCameraCapture);
    },[])

    useEffect(() => {
        if (uriCameraCapture != null) {
            InsertExame()
        }
    }, [uriCameraCapture])
    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto src={route.params.userImg} />
                <Title>Dr. {route.params.userName}</Title>

                <SubTitle>{route.params.userSpecialty}    <SubTitle>CRM-{route.params.userCrm}</SubTitle></SubTitle>

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
                    // editable={false}
                    // value={descricaoExame}
                    placeholder={`Medicamento: Advil \nDosagem: 50 mg \nFrequência: 3 vezes ao dia \nDuração: 3 dias`}
                />

                <GenericPrescriptionInput
                    textLabel={'Prescrição médica'}
                    placeholder={`Nenhuma foto informada`}
                    img={uriCameraCapture}
                />

                <GenericProfileInputContainerRow>
                    <MedicRecordButton onPress={() => setOpenCamera(true)} placeholder={'Enviar'} />
                    <CardLinkText onPress={() => setPhoto(null)}> Cancelar </CardLinkText>
                </GenericProfileInputContainerRow>

                <AppCamera
                    visibleCamera={openCamera}
                    setUriCameraCapture={setUriCameraCapture}
                    setOpenCamera={setOpenCamera}
                />

                <Line />

                <GenericTextArea
                value={descricaoExame}
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