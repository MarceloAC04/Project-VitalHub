import {
    RealizedScheduleTime,
    RealizedTimeContainer,
    ScheduleClinicContainer,
    ScheduleContainer,
    ScheduleTime
} from "../ScheduleCard/Styles";
import {
    CardClinicContainer,
    CardClinicContent,
    CardContainer,
    CardContainerText,
    CardLinkText,
    CardMedicContainer,
    CardMedicSelectContainer,
    RealizedCardLinkText
} from "./Style";
import { SubTitleCard, SubTitleCardAge, SubTitleCardScore, SubTitleClinicCard, SubTitleMedicCard } from "../SubTitle/Styles";
import { ModalAppointment, ModalLocalAppointment } from "../Modal/Modal";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { UserProfilePhotoCard } from "../UserProfilePhoto/Styles";
import { TitleCard } from "../Title/Styles";
import { useState } from "react";

import * as Notifications from 'expo-notifications'

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,

    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export const AppointmentCard = ({ id, img, name, navi, age, query, schedule, email, situation, idSituacao }) => {
    const [modalVisible, setModalVisible] = useState(false);

    async function handleClose(screen, props) {
        setModalVisible(false)
        navi.navigate(screen, props)
    }

    const handleCallNotification = async () => {

        const {status} = await Notifications.getPermissionsAsync();
    
        //verifica se o usuário concedeu permissão para notificações
        if (status !== "granted") {
          alert("Você não deixou as notificações ativas.")
          return;
        }
    
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Consulta cancelada!",
            body: "Sua consulta marcada foi cancelada",
            sound: 'default',
          },
          trigger: null
        })
      }
    

    return (
        <CardContainer>
            <UserProfilePhotoCard src={img} />
            <CardContainerText>
                <TitleCard>{name}</TitleCard>
                <SubTitleCardAge>{age} anos  <SubTitleCard>{query}</SubTitleCard></SubTitleCardAge>
                {situation == 'Pendentes' ? (
                    <ScheduleContainer>
                        <ScheduleTime> <AntDesign name="clockcircle" size={14} color="#49B3BA" />  {schedule}</ScheduleTime>
                    </ScheduleContainer>
                ) : (
                    <RealizedTimeContainer>
                        <RealizedScheduleTime> <AntDesign name="clockcircle" size={14} color="#4E4B59" />  {schedule}</RealizedScheduleTime>
                    </RealizedTimeContainer>
                )}
            </CardContainerText>
            {situation == 'Pendentes' ? (
                <>
                    <CardLinkText onPress={() => setModalVisible(true)}> Cancelar </CardLinkText>
                    <ModalAppointment
                        visible={modalVisible}
                        onPressCancel={() => setModalVisible(false)}
                        onPressConfirm={() => { handleClose('Main') 
                        handleCallNotification()}}
                        animation={'fade'}
                        transparent={true}
                        id={id}
                        img={img}
                        name={name}
                        age={age}
                        email={email}
                        situation={situation}
                        idSituacao={idSituacao}
                    />
                </>
            ) : (null)}
            {situation == 'Realizados' ? (
                <>
                    <RealizedCardLinkText onPress={() => setModalVisible(true)}>Ver Prontuário</RealizedCardLinkText>
                    <ModalAppointment
                        visible={modalVisible}
                        onPressCancel={() => setModalVisible(false)}
                        onPressConfirm={() => handleClose("MedicalRecord",
                            {userId: id ,userImg: img, userName: name, userAge: age, userEmail: email})
                        }
                        animation={'fade'}
                        transparent={true}
                        id={id}
                        img={img}
                        name={name}
                        age={age}
                        email={email}
                        situation={situation}
                    />
                </>
            ) : (<CardLinkText>           </CardLinkText>)}
        </CardContainer >
    )
}

export const AppointmentMedicCard = ({ id, idSituacao, img, idClinic, name, age, navi, query, crm, specialty, schedule, email, situation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLocalVisible, setModalLocalVisible] = useState(false);

    async function handleClose(screen, props) {
        setModalVisible(false)
        setModalLocalVisible(false)
        navi.navigate(screen, props)
    }

    const handleCallNotification = async () => {

        const {status} = await Notifications.getPermissionsAsync();
    
        //verifica se o usuário concedeu permissão para notificações
        if (status !== "granted") {
          alert("Você não deixou as notificações ativas.")
          return;
        }
    
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Consulta cancelada!",
            body: "Sua consulta marcada foi cancelada",
            sound: 'default'
          },
          trigger: null
        })
      }

    
    return (
        <CardMedicContainer onPress={() => { situation === 'Pendentes' ? setModalLocalVisible(true) : null }}>
            <>
                <UserProfilePhotoCard src={img} />
                <CardContainerText>
                    <TitleCard>Dr.{name}</TitleCard>
                    <SubTitleCardAge>CRM-{crm}  <SubTitleCard>{query}</SubTitleCard></SubTitleCardAge>
                    <ModalLocalAppointment
                        visible={modalLocalVisible}
                        onPressCancel={() => setModalLocalVisible(false)}
                        onPressConfirm={() => handleClose('ClinicLocation', { clinicaId: idClinic })}
                        animation={'fade'}
                        transparent={true}
                        id={id}
                        img={img}
                        name={name}
                        idClinic={idClinic}
                        crm={crm}
                        specialty={specialty}
                    />
                    {situation == 'Pendentes' ? (
                        <ScheduleContainer>
                            <ScheduleTime> <AntDesign name="clockcircle" size={14} color="#49B3BA" />  {schedule}</ScheduleTime>
                        </ScheduleContainer>
                    ) : (
                        <RealizedTimeContainer>
                            <RealizedScheduleTime> <AntDesign name="clockcircle" size={14} color="#4E4B59" />  {schedule}</RealizedScheduleTime>
                        </RealizedTimeContainer>
                    )}
                </CardContainerText>
                {situation == 'Pendentes' ? (
                    <>
                        <CardLinkText onPress={() => setModalVisible(true)}> Cancelar </CardLinkText>
                        <ModalAppointment
                            visible={modalVisible}
                            onPressCancel={() => setModalVisible(false)}
                            onPressConfirm={() => {handleClose('Main')
                            handleCallNotification()}}
                            animation={'fade'}
                            transparent={true}
                            id={id}
                            img={img}
                            name={name}
                            age={age}
                            email={email}
                            situation={situation}
                            idSituacao={idSituacao}
                        />
                    </>
                ) : (null)}
                {situation == 'Realizados' ? (
                    <RealizedCardLinkText onPress={() => navi.replace('MedicRecord', {Id: id, userName: name, userImg: img, userCrm: crm, userSpecialty: specialty})}>Ver Prontuário</RealizedCardLinkText>
                ) : (<CardLinkText>           </CardLinkText>)}
            </>
        </CardMedicContainer >
    )
}

export const ClinicSelectCard = ({ id, clinicName, onPress, isSelect = false, score, city, uf, days }) => {
    return (
        <CardClinicContainer isSelect={isSelect} onPress={onPress}>
            <>
                <CardClinicContent>
                    <TitleCard>{clinicName}</TitleCard>
                    {/* <SubTitleCardScore><AntDesign name="star" size={16} color="#F9A620" />{score}</SubTitleCardScore> */}
                </CardClinicContent>

                <CardClinicContent>
                    <SubTitleClinicCard>{city}</SubTitleClinicCard>
                    <ScheduleClinicContainer>
                        <ScheduleTime><MaterialCommunityIcons name="calendar-outline" size={16} color="#49B3BA" /> Seg - Sex</ScheduleTime>
                    </ScheduleClinicContainer>
                </CardClinicContent>
            </>
        </CardClinicContainer>
    )
}

export const MedicSelectCard = ({ id, img, medicName, onPress, isSelect = false, speciality }) => {
    return (
        <CardMedicSelectContainer isSelect={isSelect} onPress={onPress}>
            <>
                <UserProfilePhotoCard src={img} />
                <CardContainerText>
                    <TitleCard>{medicName}</TitleCard>
                    <SubTitleMedicCard>{speciality}</SubTitleMedicCard>
                </CardContainerText>
            </>
        </CardMedicSelectContainer>
    )
}