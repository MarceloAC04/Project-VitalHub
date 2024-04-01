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
    const [userCpf, setUserCpf] = useState('')

    async function profileLoad(){
        const token = await userDecodeToken();
        
        setUserName(token.name)
        setUserEmail(token.email)
        // setUserCpf(cpf)
        // console.log(cpf)
        console.log(token)
        const cpf = await api.get(`./Paciente/BuscarPorID?id=${token.jt}`)
        
    }

    useEffect(() =>{
        profileLoad()
    }, [])
    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil.png')} />

                <Title>{userName}</Title>

                <SubTitle>{userEmail}</SubTitle>

                <GenericInput
                    textLabel={'Data de Nascimento: '}
                    placeholder={'04/05/1999'}
                />
                <GenericInput
                    textLabel={'CPF: '}
                    placeholder={userCpf}
                />
                <GenericInput
                    textLabel={'Endereço: '}
                    placeholder={'Rua Vicenso Silva, 987'}
                />

                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Cep: '}
                        placeholder={'06548-909'}
                    />
                    <GenericProfileAddressInput
                        textLabel={'Cidade: '}
                        placeholder={'Moema-SP'}
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