import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";


export const HeaderContainer = styled(LinearGradient).attrs({
    colors: ['#60BFC5', '#496BBA'],
    start: {x: -0.05, y: 1.08},
    end: {x: 1, y: 0}

})`
    width: 100%;
    padding: 20px;
    padding-bottom: 22px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 0px 0px 15px 15px;
    box-shadow: 0px 4px 15px #00000014;
`

export const HeaderUserProfile = styled.TouchableOpacity`
    flex-direction: row;
    width: 60%;
    gap: 10px;
`

export const HeaderUserProfileText = styled(HeaderUserProfile)`
    gap: 3px;
    flex-direction: column;
    align-items: flex-start;
`