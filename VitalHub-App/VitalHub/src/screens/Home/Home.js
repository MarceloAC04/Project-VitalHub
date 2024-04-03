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



export const Home = ({ navigation}) => {
    const [statusLista, setStatusLista] = useState("Pendentes");
    const [modalVisible, setModalVisible] = useState(false);
    const [pacienteListar, setPacienteListar] = useState([]);
    

    const [role, setRole] = useState("")

    

    async function ListarPaciente(){

        // const Data = await api.get('/Consultas/ConsultasMedico')
        await api.get('/Consultas/ConsultasMedico') 
            .then(response =>{
                setPacienteListar(response.data)
                // console.log(response.data)
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