import { useState } from "react";
import { ButtonEnter } from "../../components/Button/Button";
import { Container, ContainerIcons } from "../../components/Container/Styles";
import { Input } from "../../components/Input/Styles";
import { Logo } from "../../components/Logo/Styles";
import { SubTitle, SubTitleContainer } from "../../components/SubTitle/Styles";
import { TextAlert } from "../../components/AlertText/AlertText";
import { Title } from "../../components/Title/Styles";
import { AntDesign } from '@expo/vector-icons';
import api from "../../services/Service";

export const Reset = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [aviso, setAviso] = useState('');
    const [alerta, setAlerta] = useState(false)

    async function SendEmail() {
        if (email != '') {
            await api.post(`/RecuperarSenha?email=${email}`)
                .then(() => {
                    navigation.replace("EmailCode", { recoveryEmail: email });
                }).catch(error => {
                    console.log(error);
                })
        } else {
            setAlerta(true)
            setAviso("*Insira um email válido!")
        }
    }

    return (
        <Container>
            <ContainerIcons>
                <AntDesign onPress={() => navigation.replace('Login')} name="arrowleft" size={30} color="#49B3BA" />
            </ContainerIcons>

            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title>Recuperar senha</Title>

            <SubTitleContainer>
                <SubTitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</SubTitle>
            </SubTitleContainer>

            <Input
                placeholder={'Usuário ou E-mail'}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            {alerta ? <TextAlert alerta={aviso} /> : null}
            <ButtonEnter
                onPress={() => SendEmail()}
                placeholder={'continuar'}
            />
        </Container>
    )
}