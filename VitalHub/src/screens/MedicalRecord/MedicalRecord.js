import { GenericEditInput, GenericEditTextArea, GenericInput, GenericTextArea } from "../../components/GenericProfileInput/GenericProfileInput";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";
import { userDecodeToken } from '../../Utils/Auth'


export const MedicalRecord = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);

    //Dados do paciente (UserId é o ID da Consulta)
    const { userImg, userName, userAge, userEmail, userId } = route.params;

    //Id do Medico
    const [userid, setUserid] = useState('')

    //Consutla - Medico
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')

    //Receita
    const [medicamento, setMedicamento] = useState('')
    const [observacao, setObservacao] = useState('')



    async function BuscarDiagnostico() {
        try {
            const token = await userDecodeToken();
            if (token != null) {
                setUserid(token.jti)
            }
            console.log(token.jti)
            console.log(userId)
            //Rota usada para Buscar os dados
            const response = await api.get(`/Consultas/ConsultasMedico?id=${token.jti}`);

            //Defini "consults" como um objeto para acessar os dados
            const consultas = response.data;

            //Defini que o objeto BuscarId, is
            const BuscarId = consultas.find(consulta => consulta.id === userId);

            if (BuscarId) {

                // Consulta encontrada, agora você pode acessar os dados dela
                console.log(BuscarId)
                console.log("Diagnóstico do paciente:", BuscarId.diagnostico);
                console.log("Exames do paciente:", BuscarId.descricao);
                console.log("Medicamento do Paciente:", BuscarId.receita.medicamento);
                console.log("Observações do Medico:", BuscarId.receita.observacoes);

                setDiagnostico(BuscarId.diagnostico)
                setDescricao(BuscarId.descricao)
                setMedicamento(BuscarId.receita.medicamento)
                setObservacao(BuscarId.receita.observacoes)

                // Faça o que precisar com os dados da consulta associada ao paciente clicado
            } else {
                console.log("Consulta para o paciente não encontrada.");
            }
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        BuscarDiagnostico()
    }, [])
    return (
        <ContainerScrollView>
            <Container>

                <UserProfilePhoto src={userImg} />
                <Title>{userName}</Title>

                <SubTitle>{userAge} Idade <SubTitle>{userEmail}</SubTitle></SubTitle>
                {
                    !isEditing ? (
                        <>
                            <GenericTextArea
                                textLabel={'Descrição da Consulta'}
                                placeholder={descricao}
                            />

                            <GenericInput
                                textLabel={'Diagnóstico do paciente'}
                                placeholder={diagnostico}
                            />

                            <GenericTextArea
                                textLabel={'Prescrição médica'}
                                placeholder={`Medicamento: ${medicamento}

${observacao}
                                `}
                            />
                        </>

                    ) : (
                        <>
                            <GenericEditTextArea
                                textLabel={'Descrição da Consulta'}
                                placeholder={'Descrição'}
                            />

                            <GenericEditInput
                                textLabel={'Diagnóstico do paciente'}
                                placeholder={'Infecção no ouvindo'}
                            />
                            <GenericEditTextArea
                                textLabel={'Prescrição Médica'}
                                placeholder={'Prescrição Médica'}
                            />
                        </>
                    )
                }

                <ButtonEnter
                    onPress={() => isEditing ? setIsEditing(false) : null}
                    placeholder={'Salvar'}
                />

                {!isEditing ? (
                    <ButtonEnter
                        onPress={() => setIsEditing(true)}
                        placeholder={'Editar'}
                    />
                ) : null}

                <ButtonSecondary
                    onPress={() => navigation.navigate('Main')}
                />

            </Container>
        </ContainerScrollView>
    )
}
