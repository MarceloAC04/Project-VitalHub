import { ScheduleAppointmentButton } from "../../components/ScheduleAppointmentButton/ScheduleAppointmentButton";
import { FilterStatusButton } from "../../components/StatusButton/StatusButton";
import { StatusButtonContainer } from "../../components/StatusButton/Styles";
import { CardList, CardMedicList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles"
import { Calendar } from "../../components/Calendar/Calendar";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import * as Notifications from 'expo-notifications'
import api from "../../services/Service";
import { userDecodeToken } from '../../Utils/Auth'
import moment from "moment";

export const Home = ({ navigation }) => {
    const [statusLista, setStatusLista] = useState("Pendentes");
    const [modalVisible, setModalVisible] = useState(false);
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')

    const [calendarDate, setCalendarDate] = useState('')

    const [appointmentList, setAppointmentList] = useState([])
    const [url, setUrl] = useState('');

    async function roleLoad() {
        const token = await userDecodeToken();
        if (token != null) {
            setRole(token.role)
            setUserId(token.jti)
            setCalendarDate(moment().format('YYYY-MM-DD'))
        }
    }

    async function ListAppointment() {
        // Instancia a chamada da api
        console.log(url);
        (role === 'Medico' ? setUrl('Medicos') : setUrl('Pacientes'))
        await api.get(`/${url}/BuscarPorData?data=${calendarDate}&id=${userId}`)
            .then(response => {
                setAppointmentList(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        roleLoad()
    }, [])

    useEffect(() => {
        if (calendarDate !== '') {
            ListAppointment()
            console.log(calendarDate);
        }
    }, [calendarDate])

    return (
        <>
            {role === "Medico" ? (
                <Container>
                    <StatusBar />
                    <Header
                        userPhoto={require('../../assets/foto-de-perfil-medico.png')}
                        navi={() => navigation.navigate('UserProfile')}
                    />
                    <Calendar
                        setCalendarDate={() => setCalendarDate()}
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

                    <CardList
                        status={statusLista}
                        cardsData={appointmentList}
                        navi={navigation}
                    />
                </Container>
            ) : (
                <Container>
                    <StatusBar />
                    <Header
                        navi={() => navigation.navigate('UserProfile')}
                        userPhoto={require('../../assets/foto-de-perfil.png')}
                    />
                    <Calendar
                        setCalendarDate={() => setCalendarDate()}
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

                    <CardMedicList
                        status={statusLista}
                        cardsData={appointmentList}
                        navi={navigation}
                    />

                    <ScheduleAppointmentButton
                        onPressConfirmAppointment={() => {
                            setModalVisible(false)
                            navigation.navigate("ClinicSelect")
                        }}
                        visible={modalVisible}
                        onPressModal={() => setModalVisible(true)}
                        onPressCancel={() => setModalVisible(false)}
                    />

                </Container>)}
        </>
    )
}