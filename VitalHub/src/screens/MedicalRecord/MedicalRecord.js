import { GenericEditInput, GenericEditTextArea, GenericInput, GenericTextArea } from "../../components/GenericProfileInput/GenericProfileInput";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";
// import { userDecodeToken } from '../../Utils/Auth'


export const MedicalRecord = ({ navigation, route }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { userImg, userName, userAge, userEmail } = route.params;

    const [userId, setUserId] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [descricao, setDescricao] = useState('')



    async function BuscarDiagnostico() {
        const token = await userDecodeToken();
        if (token != null) {
            setUserId(token.jti)
        }
        console.log(token.jti)
        await api.get(`/Consultas/ConsultasMedico?id=${token.jti}`)
            .then(response => {
                console.log(response.data)
                setDescricao(response.data)
            }).catch(error => {
                console.log(error)
            })
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
                            />

                            <GenericInput
                                textLabel={'Diagnóstico do paciente'}
                                placeholder={diagnostico}
                            />

                            <GenericTextArea
                                textLabel={'Prescrição médica'}
                                placeholder={''}
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
