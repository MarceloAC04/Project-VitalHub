import { CalendarSchedule } from "../../components/CalendarSchedule/CalendarSchedule";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { SelectInputPicker } from "../../components/SelectInput/SelectInput";
import { ModalConfirmAppointment } from "../../components/Modal/Modal";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { userDecodeToken } from "../../Utils/Auth";
import { useEffect, useState } from "react";
import api from "../../services/Service";

export const DateSelect = ({ navigation, route }) => {
    const [agendamento, setAgendamento] = useState(null)
    const [selectDay, setSelectDay] = useState('')
    const [selectDateTime, setSelectDateTime] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const [userId, setUserId] = useState('')
    async function profileLoad() {
        const token = await userDecodeToken();

        if (token != null) {
            setUserId(token.jti);
        }
    }

    async function ConfirmAppointment() {
        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,
            pacienteId: userId,
            situacaoId: "7737D6FE-8331-4FB5-AAF4-C671A8A72384"
        }).then(async response => {
            setModalVisible(false)
            navigation.replace("Main")
        }).catch(error => {
            console.log(agendamento);
            console.log(error);
        })
    }

    useEffect(() => {
        profileLoad()
    }, [])

    async function handleContinue() {
        if (selectDay === '') {
            alert("Selecione o dia da consulta!")
        } else if (selectDateTime === '') {
            alert("Selecione o horário da consulta!")
        } else {
            setAgendamento({
                ...route.params.agendamento,
                dataConsulta: `${selectDay} ${selectDateTime}`
            });

            setModalVisible(true);

        }
    }
    return (
        <ContainerScrollView>

            <Container>
                <TitleSelectScreen>Selecionar data</TitleSelectScreen>

                <CalendarSchedule
                    selected={selectDay}
                    selectDay={setSelectDay}
                />

                <SelectInputPicker
                    textLabel={'Selecione um horário disponível'}
                    textInput={'Selecionar horário'}
                    setSelectDateTime={setSelectDateTime}
                />

                <ButtonEnter
                    onPress={() => handleContinue()}
                    placeholder={'confirmar'}
                />

                <ModalConfirmAppointment
                    visible={modalVisible}
                    animation={'fade'}
                    onPressConfirm={() => ConfirmAppointment()}
                    onPressCancel={() => setModalVisible(false)}
                    appointment={agendamento}
                />

                <ButtonSecondary
                    onPress={() => navigation.replace("Main")}
                />
            </Container>
        </ContainerScrollView>
    )
}