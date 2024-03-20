import { ButtonEnter } from "../../components/Button/Button"
import { Button, ButtonTitle } from "../../components/Button/Styles"
import { Container, ContainerIcons } from "../../components/Container/Styles"
import { Input } from "../../components/Input/Styles"
import { Logo } from "../../components/Logo/Styles"
import { SubTitle, SubTitleContainer } from "../../components/SubTitle/Styles"
import { Title } from "../../components/Title/Styles"
import { AntDesign } from '@expo/vector-icons';

export const Reset = ({navigation}) => {
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

            <Input placeholder={'Usuário ou E-mail'} />

            <ButtonEnter
                onPress={() => navigation.replace('EmailCode')} 
                placeholder={'continuar'}
            />
        </Container>
    )
}