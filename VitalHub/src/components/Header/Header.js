import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText } from "../../components/Header/Styles";
import { UserProfilePhotoHeader } from "../../components/UserProfilePhoto/Styles";
import { SubTitle } from "../../components/SubTitle/Styles";
import { TitleHeader } from "../../components/Title/Styles";
import { FontAwesome } from '@expo/vector-icons';
import { userDecodeToken } from "../../utlis/Auth";
import { useEffect, useState } from "react";
import { user } from "../../utlis/User";

export const Header = ({userPhoto, navi}) => {
    const [userName, setUserName] = useState('')
  

    async function profileLoad(){
        const token = await userDecodeToken();

        user.role = token.role
        setUserName(token.name)
    }

    useEffect(() =>{
        profileLoad()
    }, [])
    return (
        <HeaderContainer>
            <HeaderUserProfile onPress={navi}>
                <UserProfilePhotoHeader source={userPhoto} />
                <HeaderUserProfileText>
                    <SubTitle>Bem vindo</SubTitle>
                    <TitleHeader>{userName}</TitleHeader>
                </HeaderUserProfileText>
            </HeaderUserProfile>
            <FontAwesome name="bell" size={24} color="white" />
        </HeaderContainer>
    )
}