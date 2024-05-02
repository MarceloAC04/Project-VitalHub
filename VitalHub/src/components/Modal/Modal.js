import {
    ModalContainer,
    ModalScheduleView,
    ModalMedicalRecordContainer,
    ModalMedicalRecordView,
    ModalView, ModalScheduleContainer,
    ModalScheduleAppointmentFormContainer,
    ModalConfirmAppointmentContainer,
    ModalConfirmAppointmentContainerLabel,
    ModalConfirmAppointmentContent
} from "./Styles";
import { SubTitle, SubTitleContainerModal, SubTitleModalConfirm, SubTitleModalConfirmLabel } from "../SubTitle/Styles";
import { ScheduleAppointmentContainer, ScheduleAppointmentInput } from "../ModalAppointmentInput/Styles";
import { ButtonEnter, ButtonModalAppointment, ButtonModalConfirmAppointment } from "../Button/Button";
import { AppointmentLevelButtonContainer } from "../StatusButton/Styles";
import { AppointmentLevelButton } from "../StatusButton/StatusButton";
import { ButtonSecondary } from "../SecondaryButton/SecondaryButton";
import { UserProfilePhotoModal } from "../UserProfilePhoto/Styles";
import { LabelText } from "../LabelText/Styles";
import { Title } from "../Title/Styles";
import { Modal} from "react-native";
import { useState } from "react";
import api from "../../services/Service";


export const ModalAppointment = ({ id, idSituacao, animation, transparent, visible, onPressCancel, onPressConfirm, img, name, age, email, situation, ...rest }) => {

    const [idConsulta, setIdConsulta] = useState('')
    const [status, setStatus] = useState('')
    // Dentro do seu componente
    async function CancelarConsulta() {
        try {

            setStatus(idSituacao)
            console.log(id);
            // Verifica se o status é "Pendente" para permitir o cancelamento
            if (idSituacao === '7737d6fe-8331-4fb5-aaf4-c671a8a72384') {
                // Chama a rota da API para atualizar o status da consulta para "Cancelar"
                await api.put(`Consultas/Status?idConsulta=${id}&status=Cancelados`);
                console.log("Consulta cancelada com sucesso.");

            } else {
                console.log("Não é possível cancelar uma consulta que não está pendente.");
            }
        } catch (error) {
            console.log("Erro ao cancelar consulta:", error);
        }


    }

    //useEffect chamando a função

    return (
        <Modal {...rest}
            animationType={animation}
            transparent={transparent}
            visible={visible}
        >
            {situation == 'Pendentes' ? (
                <ModalView>
                    <ModalContainer>
                        <Title>Cancelar Consulta</Title>
                        <SubTitleContainerModal>
                            <SubTitle>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</SubTitle>
                        </SubTitleContainerModal>
                        <ButtonEnter
                            onPress={() => {
                                CancelarConsulta();  // Chama a função para cancelar a consulta
                                onPressConfirm();    // Chama a função fornecida para confirmar a ação
                            }}
                            placeholder={'Confirmar'}
                        />
                        <ButtonSecondary
                            onPress={onPressCancel}
                        />
                    </ModalContainer>

                </ModalView>
            ) : (
                <ModalMedicalRecordView>
                    <ModalMedicalRecordContainer>
                        <UserProfilePhotoModal src={img} />
                        <Title>{name}</Title>
                        <SubTitle>{age} anos <SubTitle>{email}</SubTitle></SubTitle>
                        <ButtonEnter
                            onPress={onPressConfirm}
                            placeholder={'Ver Prontuário'}
                        />
                        <ButtonSecondary
                            onPress={onPressCancel}
                        />
                    </ModalMedicalRecordContainer>
                </ModalMedicalRecordView>
            )}
        </Modal>
    )
}

export const ModalScheduleAppointment = ({ navigation, setModalVisible, animation, transparent, visible, onPressConfirm, onPressCancel, ...rest }) => {
    const [statusAppoinment, setStatusAppoinment] = useState("");
    const [statusButton, setStatusButton] = useState("")

    const [appointment, setAppoinment] = useState(null);

    async function handleContinue() {
        await setModalVisible(false)
        navigation.replace("ClinicSelect", { agendamento: appointment })
    }
    return (
        <Modal {...rest}
            animationType={animation}
            transparent={transparent}
            visible={visible}
        >
            <ModalScheduleView>
                <ModalScheduleContainer>
                    <Title>Agendar consulta</Title>

                    <ModalScheduleAppointmentFormContainer>
                        <ScheduleAppointmentContainer>
                            <LabelText>Qual o nível da consulta</LabelText>
                            <AppointmentLevelButtonContainer>
                                <AppointmentLevelButton
                                    textButton={'Rotina'}
                                    clickButton={statusButton === "Rotina"}
                                    onPress={() => {
                                        setStatusButton("Rotina"); setAppoinment({
                                            ...appointment,

                                            prioridadeId: "CC663923-B9F3-4165-8811-B65E3ABFA2CA",
                                            prioridadeLabel: "Rotina"
                                        })
                                    }}
                                />

                                <AppointmentLevelButton
                                    textButton={'Exame'}
                                    clickButton={statusButton === "Exame"}
                                    onPress={() => {
                                        setStatusButton("Exame"); setStatusAppoinment({
                                            ...appointment,

                                            prioridadeId: "37DB74DE-9AD6-44D0-973E-C717DF50AE4B",
                                            prioridadeLabel: "Exame"
                                        })
                                    }}
                                />

                                <AppointmentLevelButton
                                    textButton={'Urgência'}
                                    clickButton={statusButton === "Urgencia"}
                                    onPress={() => {
                                        setStatusButton("Urgencia"); setStatusAppoinment({
                                            ...appointment,

                                            prioridadeId: "2200AAC1-DBB5-4777-BD2F-7FDD8D1D55E8",
                                            prioridadeLabel: "Urgência"
                                        })
                                    }}
                                />
                            </AppointmentLevelButtonContainer>
                        </ScheduleAppointmentContainer>

                        <ScheduleAppointmentContainer>
                            <LabelText>informe a localização desejada</LabelText>
                            <ScheduleAppointmentInput
                                placeholder={'Informe a localização'}
                                value={appointment ? appointment.localizacao : null}
                                onChangeText={(txt) => setAppoinment({
                                    ...appointment,
                                    localizacao: txt
                                })}
                            />
                        </ScheduleAppointmentContainer>
                    </ModalScheduleAppointmentFormContainer>

                    <ButtonModalAppointment
                        onPress={() => handleContinue()}
                        placeholder={'confirmar'}
                    />


                    <ButtonSecondary
                        onPress={onPressCancel}
                    />
                </ModalScheduleContainer>
            </ModalScheduleView>
        </Modal>
    )
}

export const ModalConfirmAppointment = ({ animation, transparent, visible, appointment, onPressCancel, onPressConfirm, ...rest }) => {
    return (
        <Modal
            {...rest}
            animationType={animation}
            transparent={transparent}
            visible={visible}>
            <ModalView>
                <ModalConfirmAppointmentContainer>
                    {appointment == null ? (null) : (
                        <>
                            <Title>Agendar consulta</Title><SubTitleModalConfirm>Consulte os dados selecionados para a sua consulta</SubTitleModalConfirm><ModalConfirmAppointmentContent>
                                <ModalConfirmAppointmentContainerLabel>
                                    <LabelText>Data da consulta</LabelText>
                                    <SubTitleModalConfirmLabel>{appointment.dataConsulta}</SubTitleModalConfirmLabel>
                                </ModalConfirmAppointmentContainerLabel>

                                <ModalConfirmAppointmentContainerLabel>
                                    <LabelText>Médico(a) da consulta</LabelText>
                                    <SubTitleModalConfirmLabel>Dr. {appointment.medicoLabel}</SubTitleModalConfirmLabel>
                                    <SubTitleModalConfirmLabel>{appointment.medicoSpecialityLabel}</SubTitleModalConfirmLabel>
                                </ModalConfirmAppointmentContainerLabel>

                                <ModalConfirmAppointmentContainerLabel>
                                    <LabelText>Local da consulta</LabelText>
                                    <SubTitleModalConfirmLabel>{appointment.localizacao}, SP</SubTitleModalConfirmLabel>
                                </ModalConfirmAppointmentContainerLabel>

                                <ModalConfirmAppointmentContainerLabel>
                                    <LabelText>Tipo da consulta</LabelText>
                                    <SubTitleModalConfirmLabel>{appointment.prioridadeLabel}</SubTitleModalConfirmLabel>
                                </ModalConfirmAppointmentContainerLabel>
                            </ModalConfirmAppointmentContent><ButtonModalConfirmAppointment
                                onPress={onPressConfirm}
                                placeholder={'confirmar'} /><ButtonSecondary
                                onPress={onPressCancel} />
                        </>)}
                </ModalConfirmAppointmentContainer>
            </ModalView>
        </Modal>
    )
}

export const ModalLocalAppointment = ({ animation, transparent, onPressConfirm, onPressCancel, idClinic, visible, img, specialty, crm, name, ...rest }) => {
    return (
        <Modal  {...rest}
            animationType={animation}
            transparent={transparent}
            visible={visible}>
            <ModalMedicalRecordView>
                <ModalMedicalRecordContainer>
                    <UserProfilePhotoModal src={img} />
                    <Title>Dr. {name} </Title>
                    <SubTitle>{specialty} - <SubTitle>CRM-{crm}</SubTitle></SubTitle>
                    <ButtonEnter
                        onPress={onPressConfirm}
                        placeholder={'Ver local da consulta'}
                    />
                    <ButtonSecondary
                        onPress={onPressCancel}
                    />
                </ModalMedicalRecordContainer>
            </ModalMedicalRecordView>
        </Modal>
    )
}