import { ContentAccount, TextAccount } from "../../components/ContentAccount/Styles";
import { ButtonEnter, ButtonGoogle } from "../../components/Button/Button";
import { LinkAccount, LinkMedium } from "../../components/Links/Styles";
import { Container } from "../../components/Container/Styles";
import { Title } from "../../components/Title/Styles";
import { Input } from "../../components/Input/Styles";
import { global } from "../../services/Global";
import { Logo } from "../../components/Logo/Styles";
import { useState } from "react";

import api from "../../services/service"

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Login() {

        try {
            //Chamar a api de login
            const response = await api.post('https://172.16.39.87:4466/api/Login', {
                email: email,
                senha: senha
            })

            console.log(response)
        } catch (error) {
            console.warn(error)
        }


        // navigation.replace("Main")
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
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
                secureTextEntry
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