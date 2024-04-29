import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText } from "../../components/Header/Styles";
import { UserProfilePhotoHeader } from "../../components/UserProfilePhoto/Styles";
import { SubTitle } from "../../components/SubTitle/Styles";
import { TitleHeader } from "../../components/Title/Styles";
import { FontAwesome } from '@expo/vector-icons';
import { userDecodeToken } from '../../Utils/Auth'
import { useEffect, useState } from "react";
import api from "../../services/Service";

export const Header = ({navi }) => {
    const [userName, setUserName] = useState('')
    const [userPhoto, setUserPhoto] = useState('')

    async function profileLoad() {
        const token = await userDecodeToken();

        console.log(token)
        setUserName(token.name)
        const url = (token.role === 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/${url}/BuscarPorId?id=${token.jti}`)
            .then(response => {
                    setUserPhoto(response.data.idNavigation.foto)
            }).catch(error => {
                console.log(error)
            })

    }

    useEffect(() => {
        profileLoad()
    }, [])

    return (
        <HeaderContainer>
            <HeaderUserProfile onPress={navi}>
                <UserProfilePhotoHeader src={userPhoto} />
                <HeaderUserProfileText>
                    <SubTitle>Bem vindo</SubTitle>
                    <TitleHeader>{userName}</TitleHeader>
                </HeaderUserProfileText>
            </HeaderUserProfile>
            <FontAwesome name="bell" size={24} color="white" />
        </HeaderContainer>
    )
}