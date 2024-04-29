import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { ClinicCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";

export const ClinicSelect = ({ navigation, route }) => {
    const [selectClinic, setSelectClinic] = useState(null)
    const [clinicaListar, setClinicaListar] = useState([])

    function handleContinue() {
        navigation.replace("MedicSelect", {
            agendamento: {

            ...route.params.agendamento, 
            ...selectClinic
            }
        })
    }

    async function ListarClinicas(){
       await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            .then(response =>{
                setClinicaListar(response.data)
            }).catch(error =>{
                console.log(error)
            })

    }

    useEffect(() =>{
        ListarClinicas()
    }, [])


    return (
        <Container>
            <TitleSelectScreen>Selecionar Clínica</TitleSelectScreen>

            <ClinicCardList
                cardsData={clinicaListar}
                setSelectClinic={setSelectClinic}
            />

            <ButtonEnter
                onPress={() => handleContinue()}
                placeholder={'confirmar'}
            />

            <ButtonSecondary
                onPress={() => navigation.replace("Main")}
            />
        </Container>
    )
}
