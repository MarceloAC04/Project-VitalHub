import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { ClinicCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from "../../services/service";


// const clinicCards = [
//     { id: 1, clinicName: 'Clínica Natureh', score: '4,5', city: 'São Paulo', uf: 'SP', days: 'Seg-Sex' },
//     { id: 2, clinicName: 'Diamond Pró-Mulher', score: '4,8', city: 'São Paulo', uf: 'SP', days: 'Seg-Sex' },
//     { id: 3, clinicName: 'Clínica Villa Lobos', score: '4,2', city: 'Taboão', uf: 'SP', days: 'Seg-Sab' },
//     { id: 4, clinicName: 'SP Oncologia Clínica', score: '4,2', city: 'Taboão', uf: 'SP', days: 'Seg-Sab' },
// ]



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