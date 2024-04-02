import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter, ButtonGrey } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { userDecodeToken } from "../../utlis/Auth";
import { user } from "../../utlis/User";
import api from "../../services/service";


export const UserProfile = ({ navigation }) => {
    const [user, setUser] = useState('')

    //Usuario em Geral
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [userCep, setUserCep] = useState('')
    const [userCidade, setUserCidade] = useState('')
    const [userLugardouro, setUserLugardouro] = useState('')

    //Paciente
    const [userCpf, setUserCpf] = useState('')
    const [userNiver, setUserNiver] = useState('')

    //Medico
    const [userCrm, setUserCrm] = useState('')

    async function profileLoad() {
        const token = await userDecodeToken();

        setUser(token)

        if (token !== null) {
            setUserName(token.name)
            setUserEmail(token.email)
            setUserId(token.jti)
            setUserRole(token.role)
            console.log(token.jti)
            console.log(token.role)
            // console.log(token)
            // console.log(profile)
            // console.log(dataConsulta)
        }
    }

    async function LoadMedicOrPacient() {

        const url = (userRole === 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/${url}/BuscarPorId?id=${user.jti}`)
            .then(response => {
                if (userRole === "Medico") {

                    setUserCrm(response.data.crm)
                    console.log(userCrm)

                    setUserCep(response.data.endereco.cep)

                    // console.log(response.data.endereco.cidade)  
                    setUserCidade(response.data.endereco.cidade)

                    setUserLugardouro(response.data.endereco.logradouro)
                } else {
                    // console.log(response.data.cpf)
                    setUserCpf(response.data.cpf)

                    // console.log(response.data.dataNascimento)  
                    setUserNiver(response.data.dataNascimento)

                    // console.log(response.data.endereco)

                    // console.log(response.data.endereco.cep)  
                    setUserCep(response.data.endereco.cep)

                    // console.log(response.data.endereco.cidade)  
                    setUserCidade(response.data.endereco.cidade)

                    setUserLugardouro(response.data.endereco.logradouro)
                }
            }).catch(error =>{
                console.log(error)
            })






    }


    useEffect(() => {
        profileLoad()
        LoadMedicOrPacient()
    }, [])

    // useEffect(() => {
        
    // }, [])

    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil.png')} />

                <Title>{userName}</Title>

                <SubTitle>{userEmail}</SubTitle>

                <GenericInput
                    textLabel={'Data de Nascimento: '}
                    placeholder={userNiver}
                />

                {
                    userRole === 'Medico' ? (
                        <GenericInput
                            textLabel={'CRM:'}
                            placeholder={userCrm}
                        />
                    ) : (
                        <GenericInput
                            textLabel={'CPF:'}
                            placeholder={userCpf}
                        />
                    )
                }

                <GenericInput
                    textLabel={'Endereço: '}
                    placeholder={userLugardouro}
                />

                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Cep: '}
                        placeholder={userCep}
                    />
                    <GenericProfileAddressInput
                        textLabel={'Cidade: '}
                        placeholder={userCidade}
                    />
                </GenericProfileInputContainerRow>

                <ButtonEnter
                    placeholder={'salvar'}
                />

                <ButtonEnter
                    placeholder={'editar'}
                />

                <ButtonGrey
                    onPress={() => {
                        AsyncStorage.removeItem('token')

                        // user.role=''
                        navigation.replace('Login')
                    }}
                    placeholder={'Sair do app'}
                />
            </Container>
        </ContainerScrollView>
    )
}