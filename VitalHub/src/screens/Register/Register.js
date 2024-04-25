import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from '../../components/SubTitle/Styles';
import { Title } from "../../components/Title/Styles";
import { Input } from "../../components/Input/Styles";
import { Logo } from "../../components/Logo/Styles";
import api from "../../services/Service";
import { Alert } from "react-native";
import { useState } from "react";

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    async function RegisterUser() {
        try {
            if (senha !== confirmarSenha) {
                alert("Senha errada!")
            }
            await api.post('/Pacientes', {
                email: email,
                senha: senha,
                rg: "",
                cpf: "",
                dataNascimento: "",
                cep: "",
                logradouro: "",
                numero: 0,
                cidade: "",
                nome: "",
                foto: "",
                idTipoUsuario: "BE77826B-B330-423B-A8F3-BDA8C0FB3050"
            })

            setTimeout(() => {
                navigation.replace("Login")
            }, 5000)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title>Criar Conta</Title>

            <SubTitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</SubTitle>

            <Input placeholder={'Insira seu Email'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Input placeholder={'Senha'}
                secureTextEntry
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input placeholder={'Confirmar Senha'}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={(txt) => setConfirmarSenha(txt)}
            />

            <ButtonEnter
                placeholder={'cadastrar'}
                onPress={() => RegisterUser()}
            />

            <ButtonSecondary
                onPress={() => navigation.replace('Login')}
            />
        </Container>
    )
}