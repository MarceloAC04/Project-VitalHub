import { GenericEditInput, GenericInput, 
        GenericProfileAddressInput, GenericProfileEditAddressInput } from "../../components/GenericProfileInput/GenericProfileInput";
import { GenericProfileInputContainerRow } from "../../components/GenericProfileInput/Styles";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { UserProfilePhoto } from "../../components/UserProfilePhoto/Styles";
import { ButtonEnter, ButtonGrey } from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppCamera } from "../../components/Camera/Camera";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SubTitle } from "../../components/SubTitle/Styles";
import { Title } from "../../components/Title/Styles";
import { ButtonCamera, ContentImage } from "./Styles";
import * as MediaLibrary from 'expo-media-library';
import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react";
import api from "../../services/Service";
import moment from "moment";
import { Alert } from "react-native";

export const UserProfile = ({ navigation }) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
   
    
    const [userId, setUserId] = useState('') // Deixando salvo aqui para caso eu use
    const [isEditing, setIsEditing] = useState(false)

    //Usuario em Geral
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userCep, setUserCep] = useState('')
    const [userCidade, setUserCidade] = useState('')
    const [userLugardouro, setUserLugardouro] = useState('')
    const [userPhoto, setUserPhoto] = useState('')

    //Paciente
    const [userCpf, setUserCpf] = useState('')
    const [userNiver, setUserNiver] = useState('')

    //Medico
    const [userCrm, setUserCrm] = useState('')

    //Função para puxar os dados
    async function profileLoad() {
        //Decodificação do Token
        const token = await userDecodeToken();

        if (token !== null) {
            //Aqui está pegando os dados do token como (Nome, email, role e id)
            setUserName(token.name)
            setUserEmail(token.email)
            setUserId(token.jti)
            setUserRole(token.role)

            //Determinando que caso o role for Medico, a propriedade "url" irá se torna um "Medicos" ou "Pacientes" (Caso o role for Paciente)
            const url = (token.role === 'Medico' ? 'Medicos' : 'Pacientes')

            //Aqui ele entra no Swegger e acha o caminho para pegar o dados do banco de dados
            //Nota: O useState não atualiza os dados imediatamente, então use a url cru, se não os dados não vão ser pego de prmeira
            await api.get(`/${url}/BuscarPorId?id=${token.jti}`)
                .then(response => {
                    if (token.role === "Medico") {

                        setUserCrm(response.data.crm)

                        setUserCep(response.data.endereco.cep)

                        setUserCidade(response.data.endereco.cidade)

                        setUserLugardouro(response.data.endereco.logradouro)

                        setUserPhoto(response.data.idNavigation.foto)
                    } else {
                        setUserCpf(response.data.cpf)

                        setUserNiver(moment(response.data.dataNascimento).format('YYYY-MM-DD'))

                        setUserCep(response.data.endereco.cep)

                        setUserCidade(response.data.endereco.cidade)

                        setUserLugardouro(response.data.endereco.logradouro)

                        setUserPhoto(response.data.idNavigation.foto)
                    }
                }).catch(error => {
                    console.log(error)
                })

        }
    }

    async function updateProfile() {
        console.log(userId, userCidade)
        try {
            if (userRole === 'Medico') {
                await api.put(`/Medicos/AtualizarPerfil?id=${userId}`, {
                    cep: userCep,
                    logradouro: userLugardouro,
                    cidade: userCidade,
                    crm: userCrm
                })
            }
            else {
                await api.put(`/Pacientes/AtualizarPerfil?id=${userId}`, {
                    dataNascimento: userNiver,
                    cpf: userCpf,
                    cep: userCep,
                    logradouro: userLugardouro,
                    cidade: userCidade
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])

    async function UpdateProfilePhoto() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".")[1]}`,
            type:  `image/${uriCameraCapture.split(".")[1]}`
        })
        await api.put(`/Usuario/AlterarFotoPerfil?id=${userId}`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data"
            }
        }).then( async response => {
            setUserPhoto(uriCameraCapture)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(uriCameraCapture);
        if (uriCameraCapture) {
            UpdateProfilePhoto()
        }
    },[uriCameraCapture])


    return (
        <ContainerScrollView>
            <Container>
                <ContentImage>
                    <UserProfilePhoto src={userPhoto} />

                    <ButtonCamera onPress={() => setOpenCamera(true)}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
                    </ButtonCamera>
                </ContentImage>

                <Title>{userName}</Title>

                <SubTitle>{userEmail}</SubTitle>

                {!isEditing ? (
                    <>
                        {
                            userRole === "Paciente" ? (
                                <GenericInput
                                    textLabel={'Data de Nascimento: '}
                                    placeholder={userNiver}
                                />
                            ) : (<></>)
                        }

                        {
                            userRole === 'Medico' ? (
                                <GenericInput
                                    textLabel={'CRM:'}
                                    placeholder={userCrm}
                                />
                            ) : (
                                <GenericInput
                                    textLabel={'CPF:'}
                                    placeholder={userCpf}
                                />
                            )
                        }

                        <GenericInput
                            textLabel={'Logradouro: '}
                            placeholder={userLugardouro}
                        />

                        <GenericProfileInputContainerRow>
                            <GenericProfileAddressInput
                                textLabel={'Cep: '}
                                placeholder={userCep}
                            />
                            <GenericProfileAddressInput
                                textLabel={'Cidade: '}
                                placeholder={userCidade}
                            />
                        </GenericProfileInputContainerRow>
                    </>
                ) : (
                    <>
                        {
                            userRole === "Paciente" ? (
                                <GenericEditInput
                                    textLabel={'Data de Nascimento: '}
                                    placeholder={userNiver}
                                    onChangeText={(txt) => setUserNiver(txt)}
                                />
                            ) : (<></>)
                        }

                        {
                            userRole === 'Medico' ? (
                                <GenericEditInput
                                    textLabel={'CRM:'}
                                    placeholder={userCrm}
                                    onChangeText={(txt) => setUserCrm(txt)}
                                />
                            ) : (
                                <GenericEditInput
                                    textLabel={'CPF:'}
                                    placeholder={userCpf}
                                    onChangeText={(txt) => setUserCpf(txt)}
                                />
                            )
                        }

                        <GenericEditInput
                            textLabel={'Logradouro: '}
                            placeholder={userLugardouro}
                            onChangeText={(txt) => setUserLugardouro(txt)}
                        />

                        <GenericProfileInputContainerRow>
                            <GenericProfileEditAddressInput
                                textLabel={'Cep: '}
                                placeholder={userCep}
                                onChangeText={(txt) => setUserCep(txt)}
                            />
                            <GenericProfileEditAddressInput
                                textLabel={'Cidade: '}
                                placeholder={userCidade}
                                onChangeText={(txt) => setUserCidade(txt)}
                            />
                        </GenericProfileInputContainerRow>
                    </>
                )}


                <ButtonEnter
                    placeholder={'salvar'}
                    onPress={() => {
                        updateProfile()
                        setIsEditing(false)
                    }}
                />

                <ButtonEnter
                    placeholder={'editar'}
                    onPress={() => setIsEditing(true)}
                />

                <ButtonGrey
                    onPress={() => {
                        AsyncStorage.removeItem('token')

                        navigation.replace('Login')
                    }}
                    placeholder={'Sair do app'}
                />

                <AppCamera
                    visibleCamera={openCamera}
                    setUriCameraCapture={setUriCameraCapture}
                    setOpenCamera={setOpenCamera}
                    getMediaLibrary={true}
                />
            </Container>
        </ContainerScrollView>
    )
}
