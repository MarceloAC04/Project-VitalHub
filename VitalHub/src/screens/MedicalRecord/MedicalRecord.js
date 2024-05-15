import { GenericEditInput, GenericEditTextArea, GenericInput, GenericTextArea } from "../../components/GenericProfileInput/GenericProfileInput";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { TextAlert } from "../../components/AlertText/AlertText";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";


export const MedicalRecord = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [aviso, setAviso] = useState('');
    const [alerta, setAlerta] = useState(false)

    //Dados do paciente (UserId é o ID da Consulta)
    const { userImg, userName, userAge, userEmail, Id } = route.params;

    //Id do Medico
    const [userid, setUserid] = useState('')

    //Consutla - Medico
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')

    //Receita
    const [medicamento, setMedicamento] = useState('')
    const [descricaoExame, setDescricaoExame] = useState('')

    const [validate, setValidate] = useState(null)

    async function validation(data) {
        data.forEach(e => {
            if (e === "") {
                setAlerta(true)
                setAviso("*Preencha os campos vazios!")
                setValidate(false)
                return;
            } else {
                setValidate(true)
            }
        });
    }

    async function BuscarDiagnostico() {
        try {
            console.log(Id);
            //Rota usada para Buscar os dados
            const response = await api.get(`Consultas/BuscarPorId?id=${Id}`);

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
                setDescricaoExame(consultas.exames[0].descricao)

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

                            <GenericTextArea
                                textLabel={"Exame"}
                                value={descricaoExame}
                                placeholder={descricaoExame}
                            />
                        </>

                    ) : (
                        <>
                            <GenericEditTextArea
                                textLabel={'Descrição da Consulta'}
                                value={descricao}
                                onChangeText={(text) => setDescricao(text)}
                                placeholder={descricao}
                            />

                            <GenericEditInput
                                textLabel={'Diagnóstico do paciente'}
                                value={diagnostico}
                                onChangeText={(text) => setDiagnostico(text)}
                                placeholder={diagnostico}
                            />
                            <GenericEditTextArea
                                value={medicamento}
                                textLabel={'Prescrição Médica'}
                                onChangeText={(text) => setMedicamento(text)}
                                placeholder={medicamento}
                            />
                        </>
                    )
                }

                {alerta ? <TextAlert alerta={aviso} /> : null}
                <ButtonEnter
                    onPress={() => {
                        isEditing ? (setIsEditing(false), AtualizarDados()) : null
                    }}
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
