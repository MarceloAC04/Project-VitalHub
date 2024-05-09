import { ScheduleAppointmentButton } from "../../components/ScheduleAppointmentButton/ScheduleAppointmentButton";
import { FilterStatusButton } from "../../components/StatusButton/StatusButton";
import { StatusButtonContainer } from "../../components/StatusButton/Styles";
import { CardList, CardMedicList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles";
import { Calendar } from "../../components/Calendar/Calendar";
import { TitleNotFound } from "../../components/Title/Styles";
import { Header } from "../../components/Header/Header";
import { userDecodeToken } from '../../Utils/Auth';
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import api from "../../services/Service";
import moment from "moment";

export const Home = ({ navigation }) => {
    const [statusLista, setStatusLista] = useState("Pendentes");
    const [modalVisible, setModalVisible] = useState(false);
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')

    const [calendarDate, setCalendarDate] = useState('')

    const [appointmentList, setAppointmentList] = useState([])

    async function roleLoad() {
        const token = await userDecodeToken();
        if (token != null) {
            setRole(token.role)
            setUserId(token.jti)
            setCalendarDate(moment().format('YYYY-MM-DD'))
        }
    }

    async function ListAppointment() {
        // Instancia a chamada da apis
        var url = '';
        (role === "Medico" ? url = 'Medicos' : url = 'Pacientes')
        await api.get(`/${url}/BuscarPorData?data=${calendarDate}&id=${userId}`)
            .then(response => {
                setAppointmentList(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        roleLoad()
        ListAppointment()
    }, [statusLista])

    useEffect(() => {
        if (calendarDate !== '') {
            ListAppointment()
        }
    }, [calendarDate])

    return (
        <Container>
            <StatusBar />
            <Header
                navi={() => navigation.navigate('UserProfile')}
            />
            <Calendar
                setCalendarDate={setCalendarDate}
            />

            <StatusButtonContainer>
                <FilterStatusButton
                    textButton={"Agendadas"}
                    clickButton={statusLista === "Pendentes"}
                    onPress={() => setStatusLista("Pendentes")}
                />

                <FilterStatusButton
                    textButton={"Realizadas"}
                    clickButton={statusLista === "Realizados"}
                    onPress={() => setStatusLista("Realizados")}
                />
                <FilterStatusButton
                    textButton={"Canceladas"}
                    clickButton={statusLista === "Cancelados"}
                    onPress={() => setStatusLista("Cancelados")}
                />
            </StatusButtonContainer>
            {role === "Medico" ? (
                <>
                    {appointmentList.length === 0 ? (<TitleNotFound>Nenhuma consulta encontrada!</TitleNotFound>) :
                        (<CardList
                            status={statusLista}
                            cardsData={appointmentList}
                            navi={navigation}
                        />)}
                </>
            ) : (
                <>
                {appointmentList.length === 0 ? (<TitleNotFound>Nenhuma consulta encontrada!</TitleNotFound>) 
                : (
                    <CardMedicList
                        status={statusLista}
                        cardsData={appointmentList}
                        navi={navigation}
                    />) }
                    <ScheduleAppointmentButton
                        navigation={navigation}
                        setModalVisible={setModalVisible}
                        visible={modalVisible}
                        onPressModal={() => setModalVisible(true)}
                        onPressCancel={() => setModalVisible(false)}
                    />
                  
                </>
                )}
        </Container>
    )
}