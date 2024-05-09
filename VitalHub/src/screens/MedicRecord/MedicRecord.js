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
import { userDecodeToken } from "../../Utils/Auth";

export const MedicRecord = ({ navigation, route }) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
    const [descricaoExame, setDescricaoExame] = useState('')

    //Id do Medico
    const [userId, setUserid] = useState('')

    //Consutla - Medico
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')

    //Receita
    const [medicamento, setMedicamento] = useState('')
    const { userImg, userName, userCrm, specialty, consultaId, consultaData } = route.params;

    async function DadosDoMedico() {
        console.log('Data:', consultaData)
        try {
            const token = await userDecodeToken();
            if (token != null) {
                setUserid(token.jti)
            }
            //Rota usada para Buscar os dados
            const response = await api.get(`/Pacientes/BuscarPorData?data=${consultaData}&id=${token.jti}`);

            //Defini "consults" como um objeto para acessar os dados
            const consultas = response.data;

            //Defini que o objeto BuscarId, is
            const BuscarId = consultas.find(consulta => consulta.id === consultaId);

            if (BuscarId) {
                setDiagnostico(BuscarId.diagnostico)
                setDescricao(BuscarId.descricao)
                setMedicamento(BuscarId.receita.medicamento)
                // setDescricaoExame(BuscarId.exames[0].descricao)

                // Faça o que precisar com os dados da consulta associada ao paciente clicado
            } else {
                console.log("Consulta para o paciente não encontrada.");
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function InsertExame() {
        console.log(consultaId)
        const formData = new FormData();
        formData.append("ConsultaId", consultaId)
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split('.').pop()}`,
            type: `image/${uriCameraCapture.split('.').pop()}`
        });
        formData.append("Descricao", "")

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
       DadosDoMedico()
       
    }, [])

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
                    placeholder={` ${descricao}
                    `}
                    editable={false}
                />

                <GenericInput
                    textLabel={'Diagnóstico do paciente'}
                    placeholder={diagnostico}
                    editable={false}
                />

                <GenericTextArea
                    textLabel={'Prescrição médica'}
                    editable={false}
                    placeholder={` ${medicamento}
                    `}
                />

                <GenericPrescriptionInput
                    textLabel={'Exame'}
                    placeholder={`Nenhuma foto informada`}
                    img={uriCameraCapture}
                />

                <GenericProfileInputContainerRow>
                    <MedicRecordButton onPress={() => setOpenCamera(true)} placeholder={'Enviar'} />
                    <CardLinkText onPress={() => setDescricao('')}> Cancelar </CardLinkText>
                </GenericProfileInputContainerRow>

                <AppCamera
                    visibleCamera={openCamera}
                    setUriCameraCapture={setUriCameraCapture}
                    setOpenCamera={setOpenCamera}
                    getMediaLibrary={true}
                />

                <Line />

                <GenericTextArea
                    value={descricaoExame}
                    placeholder={descricaoExame}
                />
                <ButtonSecondary
                    onPress={() => navigation.replace('Main')}
                    placeholder={'voltar'}
                />
            </Container>
        </ContainerScrollView>
    )
}