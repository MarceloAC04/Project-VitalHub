import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from '../../components/SubTitle/Styles';
import { Title } from "../../components/Title/Styles";
import { Input } from "../../components/Input/Styles";
import { Logo } from "../../components/Logo/Styles";
import api from "../../services/Service";
import { useState } from "react";
import { TextAlert } from "../../components/AlertText/AlertText";

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [aviso, setAviso] = useState('');
    const [alerta, setAlerta] = useState(false)

    async function RegisterUser() {
        try {
            if (senha !== confirmarSenha) {
                setAlerta(true)
                setAviso("*Senha errada!")
                return;
            } else if (email === '' || name === '') {
                setAlerta(true)
                setAviso("*Insira email ou nome válido!")
                return;
            } else if (senha.length < 4) {
                setAlerta(true)
                setAviso("*Senha fraca!")
            }
            const formData = new FormData();
            formData.append("Rg", "")
            formData.append("Cpf", "")
            formData.append("DataNascimento", "")
            formData.append("Cep", "")
            formData.append("Logradouro", "")
            formData.append("Numero", 0)
            formData.append("Cidade", "")
            formData.append("Nome", name)
            formData.append("Email", email)
            formData.append("Senha", senha)
            formData.append("IdTipoUsuario", "BE77826B-B330-423B-A8F3-BDA8C0FB3050")
            formData.append("Arquivo", "")
            formData.append("Foto", "")

            await api.post('/Pacientes', formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }).then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
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

            <Input placeholder={'Insira seu Nome'}
                value={name}
                userName
                onChangeText={(txt) => setName(txt)}
            />

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

            {alerta ? <TextAlert alerta={aviso}/> : null}
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