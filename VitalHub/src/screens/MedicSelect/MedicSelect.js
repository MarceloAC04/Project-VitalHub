import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { MedicSelectCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import {TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from '../../services/Service'
 
export const MedicSelect = ({ navigation, route }) => {
    const [medicList, setMedicList] = useState([]);
    const [selectMedic, setSelectMedic] = useState(null);

    async function ListarMedicos() {
        // Instancia a chamada da api
      await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
       .then(response => {
        setMedicList(response.data)
       }).catch( error => {
        console.log(error)
       })
    }

    function handleContinue() {
        navigation.replace("DateSelect", {
            agendamento: {

            ...route.params.agendamento, 
            ...selectMedic
            }
        })
    }

    useEffect(() => {
        console.log(route)
        ListarMedicos()
    }, [])
    return (
        <Container>
            <TitleSelectScreen>Selecionar Médico</TitleSelectScreen>

            <MedicSelectCardList
                cardsData={medicList}
                setSelectMedic={setSelectMedic}
            />

            <ButtonEnter
                placeholder={'confirmar'}
                onPress={() => handleContinue()}
            />

            <ButtonSecondary
                onPress={() => navigation.replace("Main")}
            />
        </Container>
    )
}