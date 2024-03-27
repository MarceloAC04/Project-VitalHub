import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter, ButtonGrey } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {userDecodeToken} from '../../Utils/Auth'
import { useEffect, useState } from "react";


export const UserProfile = ({ navigation }) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    async function profileLoad(){
        const token = await userDecodeToken();

        setUserName(token.name)
        setUserEmail(token.email)
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
                    placeholder={'859********'}
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
                    onPress={() => {null}}
                />

                <ButtonEnter
                    placeholder={'editar'}
                    onPress={() => {null}}
                />

                <ButtonGrey
                    onPress={() =>{
                        AsyncStorage.removeItem('token')
                        navigation.replace('Login')
                    }}
                    placeholder={'Sair do app'}
                />
            </Container>
        </ContainerScrollView>
    )
}