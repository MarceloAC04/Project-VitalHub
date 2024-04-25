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
    // const [observacao, setObservacao] = useState('')

    async function AtualizarDados() {
        try {

    
            
            await api.put(`/Consultas/Prontuario`, { consultaId: userId, medicamento: medicamento, descricao:descricao, diagnostico: diagnostico });

            console.log("Consulta Atualizada com sucesso com sucesso.", `diagnostico: ${diagnostico}, medicamento: ${medicamento}, descricao: ${descricao}  `);


        } catch (error) {
            console.log("Erro ao Atualizar consulta:", error);
        }
    }

    async function BuscarDiagnostico() {
        try {
            const token = await userDecodeToken();
            if (token != null) {
                setUserid(token.jti)
            }
            console.log(token.jti)
            console.log(userId)
            //Rota usada para Buscar os dados
            const response = await api.get(`/Medicos/BuscarPorData?data=2024-04-10&id=${token.jti}`);

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

    useEffect(() => {
        BuscarDiagnostico()
    }, [])
    return (
        <ContainerScrollView>
            <Container>

                <UserProfilePhoto source={userImg} />
                <Title>{userName}</Title>

                <SubTitle>{userAge} Idade <SubTitle>{userEmail}</SubTitle></SubTitle>
                {
                    !isEditing ? (
                        <>
                            <GenericTextArea
                                textLabel={'Descrição da Consulta'}
                                placeholder={descricao}
                                editable={false}
                            />

                            <GenericInput
                                textLabel={'Diagnóstico do paciente'}
                                placeholder={diagnostico}
                                editable={false}
                            />

                            <GenericTextArea
                                textLabel={'Prescrição médica'}
                                placeholder={`Medicamento: ${medicamento}`}
                                editable={false}
                            />
                        </>

                    ) : (
                        <>
                            <GenericEditTextArea
                                textLabel={'Descrição da Consulta'}
                                onChangeText={(text) => setDescricao(text)}
                            />

                            <GenericEditInput
                                textLabel={'Diagnóstico do paciente'}
                                onChangeText={(text) => setDiagnostico(text)}

                            />
                            <GenericEditTextArea
                                textLabel={'Prescrição Médica'}
                                onChangeText={(text) => setMedicamento(text)}
                            />
                        </>
                    )
                }

                <ButtonEnter
                    onPress={() => isEditing ? [setIsEditing(false), AtualizarDados() ]: null}
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
