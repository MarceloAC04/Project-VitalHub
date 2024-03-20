import { Camera} from 'expo-camera'
import { ButtonCapture, ButtonExit,ButtonModalPhotoView, ModalPhoto, ModalPhotoContainer, ViewButton, ViewFlip } from "./Styles"
import { Container, ContainerIcons } from '../Container/Styles'
import { Alert, Modal } from 'react-native'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ButtonModalAppointment } from '../Button/Button';
import { ButtonSecondary } from '../SecondaryButton/SecondaryButton';
import * as MediaLibrary from 'expo-media-library';

export const AppCamera = ({ visibleCamera, openModalPhoto, refCamera, onPressPhoto, confirmPhoto, onPressCancel, onPressExit, photo}) => {
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        })();
    }, [])
    return (
        <Modal
            visible={visibleCamera}
            animationType='slide'
            transparent={false}
        >
            {openModalPhoto ? (
                <ModalPhotoContainer>
                    <ContainerIcons>
                        <AntDesign onPress={onPressCancel} name="arrowleft" size={30} color="#49B3BA" />
                    </ContainerIcons>
                    <ModalPhoto source={{ uri: photo }} />

                    <ButtonModalPhotoView>
                        <ButtonModalAppointment onPress={confirmPhoto} placeholder={'Confirmar'}/>

                        <ButtonSecondary onPress={onPressCancel} placeholder='Refazer'/>
                    </ButtonModalPhotoView>
                </ModalPhotoContainer>
            ) : (
                <ViewFlip>
                    <Camera
                        ref={refCamera}
                        style={{ flex: 1, width: '100%', height: '80%' }}
                    >
                    </Camera>
                    <ViewButton>
                        <ButtonCapture onPress={onPressPhoto}>
                            <FontAwesome name='camera' size={23} color={'#fff'} />
                        </ButtonCapture>
                        <ButtonExit onPress={onPressExit}>
                            <Ionicons name="exit-outline" size={27} color="#fff" />
                        </ButtonExit>
                    </ViewButton>
                </ViewFlip>
            )}
        </Modal>
    )
}