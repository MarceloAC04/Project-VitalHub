import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { ClinicCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/Service";

export const ClinicSelect = ({ navigation }) => {

    const [clinicaListar, setClinicaListar] = useState([])

    async function ListarClinicas(){
       await api.get('/Clinica/ListarTodas')
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
            />

            <ButtonEnter
                onPress={() => navigation.replace("MedicSelect")}
                placeholder={'confirmar'}
            />

            <ButtonSecondary
                onPress={() => navigation.replace("Main")}
            />
        </Container>
    )
}
