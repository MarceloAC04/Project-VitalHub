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
import { Modal } from "react-native";
import { useEffect, useState } from "react";
import { userDecodeToken } from '../../Utils/Auth'
import api from "../../services/Service"; 


export const ModalAppointment = ({ id, idSituacao, animation, transparent, visible, onPressCancel, onPressConfirm, img, name, age, email, situation, ...rest }) => {

    const [idConsulta, setIdConsulta] = useState('')
    const [status, setStatus] = useState('')
    // Dentro do seu componente
    async function CancelarConsulta() {
        try {

            setStatus(idSituacao)
            // Verifica se o status é "Pendente" para permitir o cancelamento
            if (idSituacao === '4f2d403f-8928-4135-a306-724cf9fb4bfa') {
                // Chama a rota da API para atualizar o status da consulta para "Cancelar"
                const response = await api.put(`/Consultas/Status`, { id: id, situacaoId: '9E21D12D-36D8-4A11-9E8E-9AA46805DBAD' });
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
                                // console.log(`Id de Consulta:${id}`)
                                // console.log(idSituacao)
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
                        <UserProfilePhotoModal source={img} />
                        <Title>{name}</Title>
                        <SubTitle>{age} idade <SubTitle>{email}</SubTitle></SubTitle>
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

export const ModalScheduleAppointment = ({ animation, transparent, visible, onPressConfirm, onPressCancel, ...rest }) => {
    const [statusAppoinment, setStatusAppoinment] = useState("");
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
                                    clickButton={statusAppoinment === "Rotina"}
                                    onPress={() => setStatusAppoinment("Rotina")}
                                />

                                <AppointmentLevelButton
                                    textButton={'Exame'}
                                    clickButton={statusAppoinment === "Exame"}
                                    onPress={() => setStatusAppoinment("Exame")}
                                />

                                <AppointmentLevelButton
                                    textButton={'Urgência'}
                                    clickButton={statusAppoinment === "Urgencia"}
                                    onPress={() => setStatusAppoinment("Urgencia")}
                                />
                            </AppointmentLevelButtonContainer>
                        </ScheduleAppointmentContainer>

                        <ScheduleAppointmentContainer>
                            <LabelText>informe a localização desejada</LabelText>
                            <ScheduleAppointmentInput
                                placeholder={'Informe a localização'}
                            />
                        </ScheduleAppointmentContainer>
                    </ModalScheduleAppointmentFormContainer>

                    <ButtonModalAppointment
                        onPress={onPressConfirm}
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

export const ModalConfirmAppointment = ({ animation, transparent, visible, date, appointmentTime, onPressCancel, onPressConfirm }) => {
    return (
        <Modal
            animationType={animation}
            transparent={transparent}
            visible={visible}>
            <ModalView>
                <ModalConfirmAppointmentContainer>
                    <Title>Agendar consulta</Title>
                    <SubTitleModalConfirm>Consulte os dados selecionados para a sua consulta</SubTitleModalConfirm>

                    <ModalConfirmAppointmentContent>
                        <ModalConfirmAppointmentContainerLabel>
                            <LabelText>Data da consulta</LabelText>
                            <SubTitleModalConfirmLabel>{date} {appointmentTime}</SubTitleModalConfirmLabel>
                        </ModalConfirmAppointmentContainerLabel>

                        <ModalConfirmAppointmentContainerLabel>
                            <LabelText>Médico(a) da consulta</LabelText>
                            <SubTitleModalConfirmLabel>Dra Alessandra</SubTitleModalConfirmLabel>
                            <SubTitleModalConfirmLabel>Demartologa, Esteticista</SubTitleModalConfirmLabel>
                        </ModalConfirmAppointmentContainerLabel>

                        <ModalConfirmAppointmentContainerLabel>
                            <LabelText>Local da consulta</LabelText>
                            <SubTitleModalConfirmLabel>São Paulo, SP</SubTitleModalConfirmLabel>
                        </ModalConfirmAppointmentContainerLabel>

                        <ModalConfirmAppointmentContainerLabel>
                            <LabelText>Tipo da consulta</LabelText>
                            <SubTitleModalConfirmLabel>Rotina</SubTitleModalConfirmLabel>
                        </ModalConfirmAppointmentContainerLabel>
                    </ModalConfirmAppointmentContent>

                    <ButtonModalConfirmAppointment
                        onPress={onPressConfirm}
                        placeholder={'confirmar'}
                    />

                    <ButtonSecondary
                        onPress={onPressCancel}
                    />
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
                    <UserProfilePhotoModal source={img} />
                    <Title>{idClinic} </Title>
                    <SubTitle>{specialty} <SubTitle>{crm}</SubTitle></SubTitle>
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