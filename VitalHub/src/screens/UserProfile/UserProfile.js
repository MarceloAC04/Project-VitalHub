import { GenericInput, GenericProfileAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter, ButtonGrey } from "../../components/Button/Button";
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";


export const UserProfile = ({ navigation }) => {
    return (
        <ContainerScrollView>
            <Container>
                <UserProfilePhoto source={require('../../assets/foto-de-perfil.png')} />

                <Title>Richard Kosta</Title>

                <SubTitle>richard.kosta@gmail.com</SubTitle>

                <GenericInput
                    textLabel={'Data de Nascimento: '}
                    placeholder={'04/05/1999'}
                />
                <GenericInput
                    textLabel={'CPF: '}
                    placeholder={'859********'}
                />
                <GenericInput
                    textLabel={'Endereço: '}
                    placeholder={'Rua Vicenso Silva, 987'}
                />

                <GenericProfileInputContainerRow>
                    <GenericProfileAddressInput
                        textLabel={'Cep: '}
                        placeholder={'06548-909'}
                    />
                    <GenericProfileAddressInput
                        textLabel={'Cidade: '}
                        placeholder={'Moema-SP'}
                    />
                </GenericProfileInputContainerRow>

                <ButtonEnter
                    placeholder={'salvar'}
                />

                <ButtonEnter
                    placeholder={'editar'}
                />

                <ButtonGrey
                    onPress={() => navigation.replace('Login')}
                    placeholder={'Sair do app'}
                />
            </Container>
        </ContainerScrollView>
    )
}