import { ContentAccount, TextAccount } from "../../components/ContentAccount/Styles";
import { ButtonEnter, ButtonGoogle } from "../../components/Button/Button";
import { LinkAccount, LinkMedium } from "../../components/Links/Styles";
import { Container } from "../../components/Container/Styles";
import { Title } from "../../components/Title/Styles";
import { Input } from "../../components/Input/Styles";
import { Logo } from "../../components/Logo/Styles";
import { useState } from "react";
import api from "../../services/Service"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('doctor@email.com')
    const [senha, setSenha] = useState('doctor1234')

    async function Login() {

        try {
            //Chamar a api de login
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            })
            await AsyncStorage.setItem('token', JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }


        navigation.replace("Main")
    }
    return (
        <Container>

            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title >Entrar ou criar conta</Title>

            <Input placeholder={'Usuário ou E-mail'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />
            <Input placeholder={'Senha'}
              secureTextEntry
              value={senha}
              onChangeText={(txt) => setSenha(txt)}
            />

            <LinkMedium onPress={() => navigation.replace("Reset")}>Esqueceu sua senha?</LinkMedium>

            <ButtonEnter
                onPress={() => Login()}
                placeholder={'Entrar'}
            />

            <ButtonGoogle
                placeholder={'Entrar com o Google'}
            />

            <ContentAccount>
                <TextAccount>Não tem conta? </TextAccount>
                <LinkAccount onPress={() => navigation.replace("Register")}>Crie uma conta agora!</LinkAccount>
            </ContentAccount>

        </Container>
    )
}