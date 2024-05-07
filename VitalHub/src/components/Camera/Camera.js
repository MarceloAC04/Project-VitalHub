import { ButtonCapture, ButtonExit, ButtonFlip, ButtonLatest, ButtonModalPhotoView, LastPhoto, ModalPhoto, ModalPhotoContainer, ViewButton, ViewFlip } from "./Styles";
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonSecondary } from '../SecondaryButton/SecondaryButton';
import { ButtonModalAppointment } from '../Button/Button';
import { ContainerIcons } from '../Container/Styles';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera'
import { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import { useRef } from "react";

export const AppCamera = ({ visibleCamera, setOpenCamera, setUriCameraCapture, getMediaLibrary = false, ...rest }) => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [lastestPhoto, setLatestPhoto] = useState(null); // salva a ultima foto da galeria
    const [openModalPhoto, setOpenModalPhoto] = useState(false)
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync({quality: 1});
            setPhoto(photo.uri)

            setOpenModalPhoto(true)
        }
    }

    function ClearPhoto() {
        setPhoto(null)

        setOpenModalPhoto(false)
    }

    async function closeCamera()
    {
        await setOpenCamera(false)
    }
    

    async function SavePhoto() {
        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
                .then(() => {
                    Alert.alert('Sucesso', 'foto salva na galeria')
                    setOpenModalPhoto(false)
                    closeCamera()
                }).catch(erro => {
                    console.log(erro);
                })
        }
    }
    async function sendCapture() {
        await setUriCameraCapture(photo)
    }
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        })();
    }, [])

    async function GetLastPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync({
            sortBy: [[MediaLibrary.SortBy.creationTime,
                false]], first: 1
        })
        if (assets.length > 0) {
            setLatestPhoto(assets[0].uri)
        }
    }

    async function SelectImageGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
            sendCapture()
            closeCamera()
        }
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
                        <AntDesign onPress={() => ClearPhoto()} name="arrowleft" size={30} color="#49B3BA" />
                    </ContainerIcons>
                    <ModalPhoto source={{ uri: photo }} />

                    <ButtonModalPhotoView>
                        <ButtonModalAppointment onPress={() => {
                            SavePhoto()
                            sendCapture()
                        }} placeholder={'Confirmar'} />

                        <ButtonSecondary onPress={() => ClearPhoto()} placeholder='Refazer' />
                    </ButtonModalPhotoView>
                </ModalPhotoContainer>
            ) : (
                <ViewFlip>
                    <Camera
                        ref={cameraRef}
                        type={cameraType}
                        style={{ flex: 1, width: '100%', height: '80%' }}
                    >
                    </Camera>
                    <ViewButton>
                        <ButtonLatest onPress={() => SelectImageGallery()}>
                            {lastestPhoto != null ? (
                                <LastPhoto
                                    source={{ uri: lastestPhoto }}
                                />
                            ) :
                                (null)
                            }

                        </ButtonLatest>
                        <ButtonFlip onPress={() => setCameraType(cameraType == CameraType.front ? CameraType.back : CameraType.front)}>
                            <MaterialCommunityIcons name="camera-flip" size={23} color="#fff" />
                        </ButtonFlip>

                        <ButtonCapture onPress={() => CapturePhoto()}>
                            <FontAwesome name='camera' size={23} color={'#fff'} />
                        </ButtonCapture>

                        <ButtonExit onPress={() => closeCamera()}>
                            <Ionicons name="exit-outline" size={27} color="#fff" />
                        </ButtonExit>

                    </ViewButton>
                </ViewFlip>
            )}
        </Modal>
    )
}