import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText } from "../../components/Header/Styles";
import { UserProfilePhotoHeader } from "../../components/UserProfilePhoto/Styles";
import { SubTitle } from "../../components/SubTitle/Styles";
import { TitleHeader } from "../../components/Title/Styles";
import { FontAwesome } from '@expo/vector-icons';

export const Header = ({userPhoto, userName, navi}) => {
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