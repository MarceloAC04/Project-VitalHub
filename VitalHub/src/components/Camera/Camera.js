import { ButtonCapture, ButtonExit,ButtonFlip,ButtonModalPhotoView, ModalPhoto, ModalPhotoContainer, ViewButton, ViewFlip } from "./Styles"
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonSecondary } from '../SecondaryButton/SecondaryButton';
import { ButtonModalAppointment } from '../Button/Button';
import { ContainerIcons } from '../Container/Styles'
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType} from 'expo-camera'
import { useEffect, useState } from 'react';
import { Modal } from 'react-native'

export const AppCamera = ({ visibleCamera, openModalPhoto, 
                            refCamera, 
                            onPressPhoto, 
                            confirmPhoto,
                             onPressCancel, 
                             onPressExit, 
                             photo,
                             getMediaLibrary = false,
                             ...rest
    }) => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [lastestPhoto, setLatestPhoto] = useState(null); // salva a ultima foto da galeria
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        })();
    }, [])

    async function GetLastPhoto() {
        const assets = await MediaLibrary.getAssetsAsync({ sortBy : [[MediaLibrary.SortBy.creationTime, 
            false]], first: 1})
            console.log(assets)
    }

    useEffect(() => {
        if (getMediaLibrary) {
            GetLastPhoto();
        }
    }, [visibleCamera])
    return (
        <Modal
            {...rest}
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
                        type={cameraType}
                        style={{ flex: 1, width: '100%', height: '80%' }}
                    >
                    </Camera>
                    <ViewButton>
                        <ButtonFlip onPress={() => setCameraType(cameraType == CameraType.front ? CameraType.back : CameraType.front)}>
                        <MaterialCommunityIcons name="camera-flip" size={23} color="#fff" />
                        </ButtonFlip>
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