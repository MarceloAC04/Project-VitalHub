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

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [userCpf, setUserCpf] = useState('')
    const [userNiver, setUserNiver] = useState('')
    const [userCep, setUserCep] = useState('')
    const [userCidade, setUserCidade] = useState('')
    const [userLugardouro, setUserLugardouro] = useState('')

    async function profileLoad() {
        const token = await userDecodeToken();

        setUserName(token.name)
        setUserEmail(token.email)
        setUserId(token.jti)
        // console.log(token)
        // console.log(userId)

        // console.log(dadosBuscar)
        const dadosBuscar = await api.get(`/Pacientes/BuscarPorID?id=${userId}`)
        // console.log(dadosBuscar.data.cpf)
        setUserCpf(dadosBuscar.data.cpf)

        // console.log(dadosBuscar.data.dataNascimento)  
        setUserNiver(dadosBuscar.data.dataNascimento)

        // console.log(dadosBuscar.data.endereco)

        // console.log(dadosBuscar.data.endereco.cep)  
        setUserCep(dadosBuscar.data.endereco.cep)

        // console.log(dadosBuscar.data.endereco.cidade)  
        setUserCidade(dadosBuscar.data.endereco.cidade)

        setUserLugardouro(dadosBuscar.data.endereco.logradouro)
    }

    // async function setandoDados() {

    //     // console.log(dadosBuscar)
    //     const dadosBuscar = await api.get(`/Pacientes/BuscarPorID?id=${userId}`)
    //     // console.log(dadosBuscar.data.cpf)
    //     setUserCpf(dadosBuscar.data.cpf)

    //     // console.log(dadosBuscar.data.dataNascimento)  
    //     setUserNiver(dadosBuscar.data.dataNascimento)

    //     console.log(dadosBuscar.data.endereco)

    //     // console.log(dadosBuscar.data.endereco.cep)  
    //     setUserCep(dadosBuscar.data.endereco.cep)

    //     // console.log(dadosBuscar.data.endereco.cidade)  
    //     setUserCidade(dadosBuscar.data.endereco.cidade)

    //     setUserLugardouro(dadosBuscar.data.endereco.logradouro)
    // }

    useEffect(() => {
        profileLoad()
        // setandoDados()
    }, [])

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
                <GenericInput
                    textLabel={'CPF:'}
                    placeholder={userCpf}
                />
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