import { ModalScheduleAppointment } from "../Modal/Modal";
import { ScheduleAppointment } from "./Styles"
import { FontAwesome6 } from '@expo/vector-icons';


export const ScheduleAppointmentButton = ({onPressModal, navigation, setModalVisible, onPressConfirmAppointment , onPressCancel, visible}) => {
    return (
        <>
        <ScheduleAppointment onPress={onPressModal}>
            <FontAwesome6 name="stethoscope" size={26} color="#FBFBFB" />
        </ScheduleAppointment>
        <ModalScheduleAppointment
            visible={visible}
            navigation={navigation}
            setModalVisible={setModalVisible}
            animation={'slide'}
            transparent={true} 
            onPressCancel={onPressCancel}
        />
        </>
    )
}