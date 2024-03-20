import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { MedicSelectCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import {TitleSelectScreen } from "../../components/Title/Styles";

const medicCards = [
    {
        id: 1,
        img: require('../../assets/foto-de-perfil-medico-2.png'),
        medicName: 'Dra Alessandra',
        speciality: 'Demartologa, Esteticista'
    },
    {
        id: 2,
        img: require('../../assets/foto-de-perfil-medico-3.png'),
        medicName: 'Dr Kumushiro',
        speciality: 'Cirurgião, Cardiologista'
    },
    {
        id: 3,
        img: require('../../assets/foto-de-perfil-medico-4.png'),
        medicName: 'Dr Rodrigo Santos',
        speciality: 'Clínico, Pediatra'
    },
]


export const MedicSelect = ({ navigation }) => {
    return (
        <Container>
            <TitleSelectScreen>Selecionar Médico</TitleSelectScreen>

            <MedicSelectCardList
                cardsData={medicCards}
            />

            <ButtonEnter
                placeholder={'confirmar'}
                onPress={() => navigation.replace("DateSelect")}
            />

            <ButtonSecondary
                onPress={() => navigation.replace("Main")}
            />
        </Container>
    )
}