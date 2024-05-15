import { Container, ContainerIcons } from "../../components/Container/Styles";
import { TextAlert } from "../../components/AlertText/AlertText";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Input } from "../../components/Input/Styles";
import { Title } from "../../components/Title/Styles";
import { Logo } from "../../components/Logo/Styles";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import api from "../../services/Service";


export const ResetPassword = ({ navigation, route }) => {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [aviso, setAviso] = useState('');
    const [alerta, setAlerta] = useState(false)
    const email = route.params.recoveEmail;

    async function UpdatePassword() {
        if (pass === confirmPass) {
            await api.put(`/Usuario/AlterarSenha?email=${email}`, {
                senhaNova: pass
            }).then(() => {
                navigation.replace('Login')
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            setAlerta(true)
            setAviso("*Senhas não coincidem!")
        }
    }
    return (
        <Container>
            <ContainerIcons>
                <AntDesign onPress={() => navigation.replace('Login')} name="closecircle" size={30} color="#49B3BA" />
            </ContainerIcons>
            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title>Redefinir Senha</Title>

            <SubTitle>Insira e confirme a sua nova senha</SubTitle>

            <Input placeholder={'Nova Senha'}
                secureTextEntry
                value={pass}
                onChangeText={(txt) => setPass(txt)}
            />

            <Input placeholder={'Confirme nova senha'}
                secureTextEntry
                value={confirmPass}
                onChangeText={(txt) => setConfirmPass(txt)}
            />

            {alerta ? <TextAlert alerta={aviso} /> : null}
            <ButtonEnter
                onPress={() => UpdatePassword()}
                placeholder={'confirmar nova senha'}
            />
        </Container>
    )
}