import { GenericEditInput, GenericEditTextArea, GenericInput, GenericTextArea } from "../../components/GenericProfileInput/GenericProfileInput";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";


export const MedicalRecord = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);

    //Dados do paciente (UserId é o ID da Consulta)
    const { userImg, userName, userAge, userEmail, Id, consultaData } = route.params;

    //Id do Medico
    const [userid, setUserid] = useState('')

    //Consutla - Medico
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')

    //Receita
    const [medicamento, setMedicamento] = useState('')

    const [validate, setValidate] = useState(null)

    async function validation(data) {
        data.forEach(e => {
            if (e === "") {
                alert("Preencha os campos vazios!")
                setValidate(false)
                return;
            } else {
                setValidate(true)
            }
        });
    }

    async function BuscarDiagnostico() {
        console.log(consultaData)
        try {
            console.log(Id);
            //Rota usada para Buscar os dados
             const response = await api.get(`/Medicos/BuscarPorData?data=${consultaData}&id=${Id}`);

            //Defini "consults" como um objeto para acessar os dados
            const consultas = response.data;

            if (consultas) {

                // Consulta encontrada, agora você pode acessar os dados dela
                console.log("Diagnóstico do paciente:", consultas.diagnostico);
                console.log("Exames do paciente:", consultas.descricao);
                console.log("Medicamento do Paciente:", consultas.receita.medicamento);

                setDiagnostico(consultas.diagnostico)
                setDescricao(consultas.descricao)
                setMedicamento(consultas.receita.medicamento)

                // Faça o que precisar com os dados da consulta associada ao paciente clicado
            } else {
                console.log("Consulta para o paciente não encontrada.");
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function AtualizarDados() {
        const data = [];
        try {
            data.push(descricao, medicamento, diagnostico)
            validation(data)
            if (validate) {
                await api.put(`/Consultas/Prontuario`, { consultaId: Id, medicamento: medicamento, descricao: descricao, diagnostico: diagnostico });
    
                console.log("Consulta Atualizada com sucesso com sucesso.", `diagnostico: ${diagnostico}, medicamento: ${medicamento}, descricao: ${descricao}  `);
            }
        } catch (error) {
            console.log("Erro ao Atualizar consulta:", error);
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
                                editable={false}
                                textLabel={'Descrição da Consulta'}
                                placeholder={` ${descricao}
                                `}
                            />

                            <GenericInput
                                textLabel={'Diagnóstico do paciente'}
                                editable={false}
                                placeholder={diagnostico}
                            />

                            <GenericTextArea
                                textLabel={'Prescrição médica'}
                                editable={false}
                                placeholder={`Medicamento: ${medicamento}
                                `}
                            />
                        </>

                    ) : (
                        <>
                            <GenericEditTextArea
                                textLabel={'Descrição da Consulta'}
                                onChangeText={(text) => setDescricao(text)}
                                placeholder={'Descrição'}
                            />

                            <GenericEditInput
                                textLabel={'Diagnóstico do paciente'}
                                onChangeText={(text) => setDiagnostico(text)}
                                placeholder={'Infecção no ouvindo'}
                            />
                            <GenericEditTextArea
                                textLabel={'Prescrição Médica'}
                                onChangeText={(text) => setMedicamento(text)}
                                placeholder={'Prescrição Médica'}
                            />
                        </>
                    )
                }

                {/* Marchetti - Mudei OnPress */}
                <ButtonEnter
                    onPress={() => {
                        isEditing ? (setIsEditing(false), AtualizarDados()) : null
                    }}
                    placeholder={'Salvar'}
                />

                {/* Marchetti - ifelse para quando for else o botão desaparecer (So clonei o código que eu vi no prontuario) */}
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
