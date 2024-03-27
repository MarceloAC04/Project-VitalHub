import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { MedicSelectCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import {TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from '../../services/Service'

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
    const [medicList, setMedicList] = useState([]);

    async function ListarMedicos() {
        // Instancia a chamada da api
      await api.get('/Medicos')
       .then(response => {
        setMedicList(response.data)
       }).catch( error => {
        console.log(error)
       })
    }

    useEffect(() => {
        ListarMedicos()
    }, [])
    return (
        <Container>
            <TitleSelectScreen>Selecionar Médico</TitleSelectScreen>

            <MedicSelectCardList
                cardsData={medicList}
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