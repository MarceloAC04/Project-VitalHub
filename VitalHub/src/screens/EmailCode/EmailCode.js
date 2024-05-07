import { EmailCodeInput, EmailCodeInputContainer } from "../../components/EmailCodeInput/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { Container, ContainerIcons } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { LinkAccount } from "../../components/Links/Styles";
import { Title } from "../../components/Title/Styles";
import { Logo } from "../../components/Logo/Styles";
import { useEffect, useRef, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import api from "../../services/Service";

export const EmailCode = ({navigation, route}) => {
    const [code, setCode] = useState('')
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)]

    async function focusNextInput(index) {
        // Se o index é menor que a quantidade de campos
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }

    async function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function CheckCode() {
        console.log(code);
        await api.post(`/RecuperarSenha/ValidarCodigoDeRecuperacaoSenha?email=${route.params.recoveryEmail}&codigo=${code}`)
            .then(() => {
                navigation.replace("ResetPassword", {recoveEmail: route.params.recoveryEmail});
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        inputs[0].current.focus()
    }, [])

    return (
        <Container>

            <ContainerIcons>
                <AntDesign onPress={() => navigation.replace('Reset')} name="closecircle" size={30} color="#49B3BA" />
            </ContainerIcons>

            <Logo source={require('../../assets/VitalHub-logo2.png')} />

            <Title>Verifique seu e-mail</Title>

            <SubTitle>Digite o código de 4 dígitos enviado para {" "}
                  <LinkAccount>{route.params.recoveryEmail}</LinkAccount>
            </SubTitle>

            <EmailCodeInputContainer>
                {
                    [0, 1, 2, 3].map((index) => (
                        <EmailCodeInput 
                        key={index} //Chave de acordo com o index do mapo
                         ref={inputs[index]} //Referencia de acordo com o index do map
                         placeholder={'0'}
                         maxLength={1} 
                         keyboardType={'numeric'}
                         caretHidden={true}

                         onChangeText={(text) => {
                            // Verificar se o texto não é vazio (pra voltar ao campo anterior)
                            if (text === "") {
                                focusPrevInput(index)
                            } else {
                                const novoCodigo = [...code]
                                novoCodigo[index] = text
                                setCode(novoCodigo.join(''))
                                //Verificar se o campo tem 1 caracter (passa pro proximo campo)
                                focusNextInput(index)
                            }
                         }}
                        />
                    ))
                }
            </EmailCodeInputContainer>

            <ButtonEnter 
                onPress={() => CheckCode()}
                placeholder={'Enviar'}
            />

            <ButtonSecondary 
                placeholder={'Reenviar Código'}      
            />
        </Container>
    )
}