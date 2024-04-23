import styled from "styled-components";

export const ContentImage = styled.View`
width: 100%;
height: 280px;
margin-bottom: 20px;

position: relative;
align-items: center;
justify-content: flex-start;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
 padding: 12px;
 border-radius: 10px;
 background-color: #496bba;
 border: 1px solid #fbfbfb;

 bottom: -20px;
 right: 15px;
 position: absolute;
`