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
    const [statusLista, setStatusLista] = useState("Pendentes");
    const [modalVisible, setModalVisible] = useState(false);
    const [pacienteListar, setPacienteListar] = useState([]);
    const [data, setData] = useState([]) 

    const [role, setRole] = useState("")

    

    async function ListarPaciente(){

        // const Data = await api.get('/Consultas/ConsultasMedico')
        await api.get('/Consultas/ConsultasMedico') 
            .then(response =>{
                setPacienteListar(response.data)
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }
  

    async function profileLoad(){
        const token = await userDecodeToken();

        setRole(token.role) 
    }

    useEffect(() =>{
        profileLoad()
        ListarPaciente()
    }, [])

    return (
        <>
            {role === "Medico" ? (
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
                        cardsData={pacienteListar}
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
                            clickButton={statusLista === "Pendentes"}
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