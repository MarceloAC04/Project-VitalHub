import { GenericEditInput, GenericInput, GenericProfileAddressInput, GenericProfileEditAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter, ButtonGrey } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../Utils/Auth"
import api from "../../services/Service";
import moment from "moment";
import axios from "axios";

export const UserProfile = ({ navigation }) => {
    const [userId, setUserId] = useState('') // Deixando salvo aqui para caso eu use
    const [isEditing, setIsEditing] = useState(false)

    //Usuario em Geral
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userCep, setUserCep] = useState('')
    const [userCidade, setUserCidade] = useState('')
    const [userLugardouro, setUserLugardouro] = useState('')

    //Paciente
    const [userCpf, setUserCpf] = useState('')
    const [userNiver, setUserNiver] = useState('')

    //Medico
    const [userCrm, setUserCrm] = useState('')

    //Função para puxar os dados
    async function profileLoad() {
        //Decodificação do Token
        const token = await userDecodeToken();
        console.log(token)

        if (token !== null) {
            //Aqui está pegando os dados do token como (Nome, email, role e id)
            setUserName(token.name)
            setUserEmail(token.email)
            setUserId(token.jti)
            setUserRole(token.role)

            //Determinando que caso o role for Medico, a propriedade "url" irá se torna um "Medicos" ou "Pacientes" (Caso o role for Paciente)
            const url = (token.role === 'Medico' ? 'Medicos' : 'Pacientes')

            //Aqui ele entra no Swegger e acha o caminho para pegar o dados do banco de dados
            //Nota: O useState não atualiza os dados imediatamente, então use a url cru, se não os dados não vão ser pego de prmeira
            await api.get(`/${url}/BuscarPorId?id=${token.jti}`)
                .then(response => {
                    if (token.role === "Medico") {

                        setUserCrm(response.data.crm)

                        setUserCep(response.data.endereco.cep)

                        setUserCidade(response.data.endereco.cidade)

                        setUserLugardouro(response.data.endereco.logradouro)
                    } else {
                        setUserCpf(response.data.cpf)

                        setUserNiver(moment(response.data.dataNascimento).format('YYYY-MM-DD'))

                        setUserCep(response.data.endereco.cep)

                        setUserCidade(response.data.endereco.cidade)

                        setUserLugardouro(response.data.endereco.logradouro)
                    }
                }).catch(error => {
                    console.log(error)
                })

        }
    }

    async function updateProfile() {

        console.log(userId, userCidade, userCep, userLugardouro, userCrm, userRole)
        try {
            if (userRole === 'Medico') {

                const token = await AsyncStorage.getItem('token');
                console.log(token);

                const axiosInstance = axios.create({
                    baseURL: 'http://172.16.39.87:4466/api',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', 
                    },
                });

                //Mudei o caminho tava assim = /Medicos/AtualizarPerfil?id=${userId}
                await axiosInstance.put(`/Medicos?idUsuario=${userId}`, {
                    crm: userCrm,
                    cep: userCep,
                    logradouro: userLugardouro,
                    cidade: userCidade

                })

                console.log("Perfil de Medico Atualizado com sucesso");
            }
            else {
                //Mudei o caminho tava Assim = /Pacientes/AtualizarPerfil?id=${userId}
                await api.put(`/Pacientes?idUsuario=${userId}`, {
                    dataNascimento: userNiver,
                    cpf: userCpf,
                    cep: userCep,
                    logradouro: userLugardouro,
                    cidade: userCidade
                })
                console.log("Perfil de Paciente Atualizado com sucesso");
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])



    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil.png')} />

                <Title>{userName}</Title>

                <SubTitle>{userEmail}</SubTitle>

                {!isEditing ? (
                    <>
                        {/* Marchetti - Coloquei o editable={false}, dessa forma quando pressionarem o input ele não é acionado */}
                        {
                            userRole === "Paciente" ? (
                                <GenericInput
                                    textLabel={'Data de Nascimento: '}
                                    placeholder={userNiver}
                                    editable={false}
                                />
                            ) : (<></>)
                        }

                        {
                            userRole === 'Medico' ? (
                                <GenericInput
                                    textLabel={'CRM:'}
                                    placeholder={userCrm}
                                    editable={false}
                                />
                            ) : (
                                <GenericInput
                                    textLabel={'CPF:'}
                                    placeholder={userCpf}
                                    editable={false}
                                />
                            )
                        }

                        <GenericInput
                            textLabel={'Logradouro: '}
                            placeholder={userLugardouro}
                            editable={false}
                        />

                        <GenericProfileInputContainerRow>
                            <GenericProfileAddressInput
                                textLabel={'Cep: '}
                                placeholder={userCep}
                                editable={false}
                            />
                            <GenericProfileAddressInput
                                textLabel={'Cidade: '}
                                placeholder={userCidade}
                                editable={false}
                            />
                        </GenericProfileInputContainerRow>
                    </>
                ) : (
                    <>
                        {/* Marchetti - Troquei todos os Placeholders aqui por um defaultValue. Caso eu deixace o input estaria impossível de escrever*/}
                        {
                            userRole === "Paciente" ? (
                                <GenericEditInput
                                    textLabel={'Data de Nascimento: '}
                                    defaultValue={userNiver}
                                    onChangeText={(txt) => setUserNiver(txt)}
                                />
                            ) : (<></>)
                        }

                        {
                            userRole === 'Medico' ? (
                                <GenericEditInput
                                    textLabel={'CRM:'}
                                    defaultValue={userCrm}
                                    onChangeText={(txt) => setUserCrm(txt)}
                                />
                            ) : (
                                <GenericEditInput
                                    textLabel={'CPF:'}
                                    defaultValue={userCpf}
                                    onChangeText={(txt) => setUserCpf(txt)}
                                />
                            )
                        }

                        <GenericEditInput
                            textLabel={'Logradouro: '}
                            defaultValue={userLugardouro}
                            onChangeText={(txt) => setUserLugardouro(txt)}
                        />

                        <GenericProfileInputContainerRow>
                            <GenericProfileEditAddressInput
                                textLabel={'Cep: '}
                                defaultValue={userCep}
                                onChangeText={(txt) => setUserCep(txt)}
                            />
                            <GenericProfileEditAddressInput
                                textLabel={'Cidade: '}
                                defaultValue={userCidade}
                                onChangeText={(txt) => setUserCidade(txt)}
                            />
                        </GenericProfileInputContainerRow>
                    </>
                )}

                {/* Marchetti - mudei onPress() */}
                <ButtonEnter
                    placeholder={'salvar'}
                    onPress={() => isEditing ? [setIsEditing(false), updateProfile()] : null}
                />

                {/* Marchetti - fiz um ifelse, para quando a gente clicar no botão de editar ele sumir. */}
                {/* NOTA: Seria interessante a gente fazer que enquanto estamos no modo editar fazer o botão editar sai do modo*/}
                {!isEditing ? (
                    <ButtonEnter
                        onPress={() => setIsEditing(true)}
                        placeholder={'Editar'}
                    />
                ) : null}

                <ButtonGrey
                    onPress={() => {
                        //Aqui ele tira o token do APP - Dessa forma ele não salva e o perfil desloga
                        AsyncStorage.removeItem('token')

                        navigation.replace('Login')
                    }}
                    placeholder={'Sair do app'}
                />
            </Container>
        </ContainerScrollView>
    )
}
