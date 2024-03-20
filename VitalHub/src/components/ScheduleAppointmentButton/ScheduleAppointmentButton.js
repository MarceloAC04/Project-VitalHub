import { ModalScheduleAppointment } from "../Modal/Modal";
import { ScheduleAppointment } from "./Styles"
import { FontAwesome6 } from '@expo/vector-icons';


export const ScheduleAppointmentButton = ({onPressModal, onPressConfirmAppointment , onPressCancel, visible}) => {
    return (
        <>
        <ScheduleAppointment onPress={onPressModal}>
            <FontAwesome6 name="stethoscope" size={26} color="#FBFBFB" />
        </ScheduleAppointment>
        <ModalScheduleAppointment
            visible={visible}
            animation={'slide'}
            transparent={true} 
            onPressConfirm={onPressConfirmAppointment}
            onPressCancel={onPressCancel}
        />
        </>
    )
}