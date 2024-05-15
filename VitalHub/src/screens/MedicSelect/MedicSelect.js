import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { TextAlert } from "../../components/AlertText/AlertText";
import { MedicSelectCardList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";
import api from '../../services/Service'

export const MedicSelect = ({ navigation, route }) => {
    const [medicList, setMedicList] = useState([]);
    const [selectMedic, setSelectMedic] = useState(null);
    const [aviso, setAviso] = useState('');
    const [alerta, setAlerta] = useState(false)

    async function ListarMedicos() {
        // Instancia a chamada da api
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then(response => {
                setMedicList(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    function handleContinue() {
        if (medicList != null) {
            navigation.replace("DateSelect", {
                agendamento: {
    
                    ...route.params.agendamento,
                    ...selectMedic
                }
            })
        } else {
            setAlerta(true)
            setAviso('*Nenhum médico selecionado!')
        }
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

            {alerta ? <TextAlert alerta={aviso} /> : null}
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