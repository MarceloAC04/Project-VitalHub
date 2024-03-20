import { ContentAccount, TextAccount } from "../../components/ContentAccount/Styles";
import { ButtonEnter, ButtonGoogle } from "../../components/Button/Button";
import { LinkAccount, LinkMedium } from "../../components/Links/Styles";
import { Container } from "../../components/Container/Styles";
import { Title } from "../../components/Title/Styles";
import { Input } from "../../components/Input/Styles";
import { global } from "../../services/Global";
import { Logo } from "../../components/Logo/Styles";
import { useState } from "react";

export const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('patient@email.com')

    function Login() {
        if (userEmail === 'doctor@email.com') {
            global.role = 'doctor'
        } else {
            global.role = 'patient'
        }
        navigation.replace("Main")
    }
    return (
        <Container>

            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title >Entrar ou criar conta</Title>

            <Input placeholder={'Usuário ou E-mail'}
                value={userEmail}
                onChangeText={(txt) => setUserEmail(txt)}
            />
            <Input placeholder={'Senha'}
                value={'1234'}
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