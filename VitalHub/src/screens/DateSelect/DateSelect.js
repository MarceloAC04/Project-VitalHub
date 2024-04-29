import { CalendarSchedule } from "../../components/CalendarSchedule/CalendarSchedule";
import { ButtonSecondary } from "../../components/SecondaryButton/SecondaryButton";
import { SelectInputPicker } from "../../components/SelectInput/SelectInput";
import { ModalConfirmAppointment } from "../../components/Modal/Modal";
import { Container, ContainerScrollView } from "../../components/Container/Styles";
import { ButtonEnter } from "../../components/Button/Button";
import { TitleSelectScreen } from "../../components/Title/Styles";
import { useEffect, useState } from "react";

export const DateSelect = ({ navigation, route}) => {
    const [select, setSelect] = useState('')
    const [selectDate, setSelectDate] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log(route);
    })
    return (
        <ContainerScrollView>

            <Container>
                <TitleSelectScreen>Selecionar data</TitleSelectScreen>

                <CalendarSchedule
                    selected={select}
                    selectedDateDay={setSelect}
                />

                <SelectInputPicker
                    textLabel={'Selecione um horário disponível'}
                    textInput={'Selecionar horário'}
                    selectedTime={setSelectDate}
                />

                <ButtonEnter
                    onPress={() => setModalVisible(true)}
                    placeholder={'confirmar'}
                />

                <ModalConfirmAppointment
                    visible={modalVisible}
                    animation={'fade'}
                    onPressConfirm={() => {
                        setModalVisible(false)
                        navigation.replace("Main")
                    }}
                    onPressCancel={() => setModalVisible(false)}
                    date={select}
                    appointmentTime={selectDate}
                />

                <ButtonSecondary
                    onPress={() => navigation.replace("Main")}
                />
            </Container>
        </ContainerScrollView>
    )
}