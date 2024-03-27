import { ScheduleAppointmentButton } from "../../components/ScheduleAppointmentButton/ScheduleAppointmentButton";
import { FilterStatusButton } from "../../components/StatusButton/StatusButton";
import { StatusButtonContainer } from "../../components/StatusButton/Styles";
import { CardList, CardMedicList } from "../../components/CardList/CardList";
import { Container } from "../../components/Container/Styles"
import { Calendar } from "../../components/Calendar/Calendar";
import { Header } from "../../components/Header/Header";
import { global } from "../../services/Global";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import * as Notifications from 'expo-notifications'
import { user } from "../../utlis/User";
import { userDecodeToken } from "../../utlis/Auth";
import api from "../../services/service";


const cardsPatient = [
    {
        id: 1, img: require('../../assets/foto-de-perfil-2.png'),
        situation: 'pendente', name: 'Nicole Sarga', age: '22 anos',
        query: 'Rotina', schedule: '14:00', email: 'niccole.sarga@gmail.com'
    },
    {
        id: 2, img: require('../../assets/foto-de-perfil.png'),
        situation: 'pendente', name: 'Richard Kosta', age: '28 anos',
        query: 'Urgência', schedule: '15:00', email: 'richard.kosta@gmail.com'
    },
    {
        id: 3, img: require('../../assets/foto-de-perfil-2.png'),
        situation: 'realizada', name: 'Nicole Sarga', age: '22 anos',
        query: 'Rotina', schedule: '14:00', email: 'niccole.sarga@gmail.com'
    },
    {
        id: 4, img: require('../../assets/foto-de-perfil.png'),
        situation: 'realizada', name: 'Richard Kosta', age: '28 anos',
        query: 'Urgência', schedule: '15:00', email: 'richard.kosta@gmail.com'
    },
    {
        id: 5, img: require('../../assets/foto-de-perfil-3.png'),
        situation: 'cancelada', name: 'Robbert Charlie', age: '62 anos',
        query: 'Consulta', schedule: '15:00', email: 'robbert.@gmail.com'
    },
    {
        id: 6, img: ({ uri: "https://github.com/MarceloAC04.png" }),
        situation: 'pendente', name: 'Yotsugi Ononoki', age: '100 anos',
        query: 'Consulta', schedule: '13:00', email: 'onono.@gmail.com'
    }
]

const cardsMedic = [{
    id: '1',
    img: require('../../assets/foto-de-perfil-medico.png'),
    situation: 'pendente',
    name: 'Dr.Claudio',
    age: '22 anos',
    query: 'Rotina',
    schedule: '14:00',
    email: 'doutor.claudio@gmail.com',
    crm: 'CRM-15286',
    specialty: 'Clinico Geral'
},
{
    id: '2',
    img: require('../../assets/foto-de-perfil-medico.png'),
    situation: 'realizada',
    name: 'Dr.Claudio',
    age: '22 anos',
    query: 'Rotina',
    schedule: '14:00',
    email: 'doutor.claudio@gmail.com',
    crm: 'CRM-15286',
    specialty: 'Clinico Geral'
}
]
export const Home = ({ navigation}) => {
    const [statusLista, setStatusLista] = useState("pendente");
    const [modalVisible, setModalVisible] = useState(false);
    const [pacienteListar, setPacienteListar] = useState([])

    async function ListarPaciente(){
        await api.get('./get') 
    }
  

    async function profileLoad(){
        const token = await userDecodeToken();

        user.role = token.role
    }

    useEffect(() =>{
        profileLoad()
    }, [])

    return (
        <>
            {user.role === "Medico" ? (
                <Container>
                     <StatusBar />
                    <Header
                        userPhoto={require('../../assets/foto-de-perfil-medico.png')}
                        navi={() => navigation.navigate('UserProfile')}
                    />
                    <Calendar />

                    <StatusButtonContainer>
                        <FilterStatusButton
                            textButton={"Agendadas"}
                            clickButton={statusLista === "pendente"}
                            onPress={() => setStatusLista("pendente")}
                        />

                        <FilterStatusButton
                            textButton={"Realizadas"}
                            clickButton={statusLista === "realizada"}
                            onPress={() => setStatusLista("realizada")}
                        />
                        <FilterStatusButton
                            textButton={"Canceladas"}
                            clickButton={statusLista === "cancelada"}
                            onPress={() => setStatusLista("cancelada")}
                        />
                    </StatusButtonContainer>

                    <CardList
                        status={statusLista}
                        cardsData={cardsPatient}
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
                    <Calendar />

                    <StatusButtonContainer>
                        <FilterStatusButton
                            textButton={"Agendadas"}
                            clickButton={statusLista === "pendente"}
                            onPress={() => setStatusLista("pendente")}
                        />

                        <FilterStatusButton
                            textButton={"Realizadas"}
                            clickButton={statusLista === "realizada"}
                            onPress={() => setStatusLista("realizada")}
                        />
                        <FilterStatusButton
                            textButton={"Canceladas"}
                            clickButton={statusLista === "cancelada"}
                            onPress={() => setStatusLista("cancelada")}
                        />
                    </StatusButtonContainer>

                    <CardMedicList
                        status={statusLista}
                        cardsData={cardsMedic}
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