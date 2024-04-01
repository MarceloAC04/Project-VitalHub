import { EmailCodeInput, EmailCodeInputContainer } from "../../components/EmailCodeInput/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { Container, ContainerIcons } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { Logo } from "../../components/Logo/Styles";
import { AntDesign } from '@expo/vector-icons';

export const EmailCode = ({navigation}) => {
    return (
        <Container>

            <ContainerIcons>
                <AntDesign onPress={() => navigation.replace('Reset')} name="closecircle" size={30} color="#49B3BA" />
            </ContainerIcons>

            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title>Verifique seu e-mail</Title>

            <SubTitle>Digite o código de 4 dígitos enviado para
                username@email.com</SubTitle>

            <EmailCodeInputContainer>
                <EmailCodeInput placeholder={'0'} maxLength={1} keyboardType={'numeric'}/>

                <EmailCodeInput placeholder={'0'} maxLength={1} keyboardType={'numeric'} />

                <EmailCodeInput placeholder={'0'} maxLength={1} keyboardType={'numeric'} />

                <EmailCodeInput placeholder={'0'} maxLength={1} keyboardType={'numeric'} />
            </EmailCodeInputContainer>

            <ButtonEnter 
                onPress={() => navigation.replace('ResetPassword')}
                placeholder={'ENTRAR'}
            />

            <ButtonSecondary 
                placeholder={'Reenviar Código'}      
            />
        </Container>
    )
}