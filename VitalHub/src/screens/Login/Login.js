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
    const [email, setEmail] = useState('medico2@email.com')
    const [senha, setSenha] = useState('1234')

    async function Login() {

        try {

            //Chamar a api de login
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            })

            //Guardou no AsyncStorage
            await AsyncStorage.setItem('token', JSON.stringify(response.data))

            //Coloquei um TimeOut aqui no Login. Para daqui 5 segundos ele entrar na main... Dessa forma ele acompanha o Time Out do Loading
            // console.log(response.data)
            setTimeout(() => {
                navigation.replace("Main")
            }, 5000)

        } catch (error) {
            console.warn(error)
        }

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