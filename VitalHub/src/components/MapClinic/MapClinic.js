import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { MapClinic, MapFindingLocationText } from "../../components/MapClinic/Styles";
import {RouteCancelMapButton, RouteMapButton } from '../Button/Button';
import MapView, { Marker, PROVIDER_GOOGLE , PROVIDER_DEFAULT} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { mapskey } from '../../services/mapsApiKeys';
import { SubTitle } from "../SubTitle/Styles";


export const MapClinicLocation = ({lat, long}) => {
    const mapsReference = useRef(null);
    const [initialPosition, setInitialPosition] = useState(null);
    const finalPosition = {
        latitude: long,
        longitude: lat
    };

    const [routeClinic, setRouteClinic] = useState(false)

    async function LocationCapture() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation)

        }
    }

    async function ReloadViewMap() {
        if (mapsReference.current && initialPosition) {
            await mapsReference.current.fitToCoordinates(
                [{ latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
                { latitude: finalPosition.latitude, longitude: finalPosition.longitude }
                ],
                {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true
                }
            )
            setRouteClinic(true);
        }
    }

    useEffect(() => {
        LocationCapture()
    }, [1000])


    return (
        <MapClinic>
            {
                initialPosition != null ? (
                    <MapView
                        ref={mapsReference}
                        initialRegion={{
                            latitude: finalPosition.latitude,
                            longitude: finalPosition.longitude,
                            longitudeDelta: 0.005,
                            latitudeDelta: 0.005
                        }}
                        customMapStyle={grayMapStyle}
                        style={styles.map}
                        provider={PROVIDER_DEFAULT}
                    >
                        <Marker
                            coordinate={{
                                latitude: finalPosition.latitude,
                                longitude: finalPosition.longitude,
                                longitudeDelta: 0.005,
                                latitudeDelta: 0.005
                            }}
                            title='Clinica'
                            pinColor='red'
                        />
                        {
                            routeClinic ? (
                                <>
                                    <Marker
                                        coordinate={{
                                            latitude: initialPosition.coords.latitude,
                                            longitude: initialPosition.coords.longitude,
                                            longitudeDelta: 0.005,
                                            latitudeDelta: 0.005
                                        }}
                                        title='Posição inicial'
                                        pinColor='#60BFC5'
                                    />
                                    <MapViewDirections
                                        origin={initialPosition.coords}
                                        destination={{
                                            latitude: finalPosition.latitude,
                                            longitude: finalPosition.longitude,
                                            longitudeDelta: 0.005,
                                            latitudeDelta: 0.005
                                        }}
                                        apikey={mapskey}
                                        strokeColor='#496BBA'
                                        strokeWidth={5}
                                        optimizeWaypoints={true}
                                    />
                                    <RouteCancelMapButton
                                        onPress={() => setRouteClinic(false)}
                                    />
                                </>

                            ) : (
                                <RouteMapButton
                                    onPress={() =>{ 
                                        ReloadViewMap()
                                    }}
                                />
                            )
                        }
                    </MapView>
                ) : (
                    <MapFindingLocationText>
                        <SubTitle>Procurando localização</SubTitle>
                        <ActivityIndicator />
                    </MapFindingLocationText>
                )
            }
        </MapClinic>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%'
    },

});

const grayMapStyle = [
    {
        elementType: "geometry",
        stylers: [
            {
                color: "#E1E0E7",
            },
        ],
    },
    {
        elementType: "geometry.fill",
        stylers: [
            {
                saturation: -5,
            },
            {
                lightness: -5,
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#FBFBFB",
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#33303E",
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#66DA9F",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [
            {
                color: "#1B1B1B",
            },
        ],
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "on",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#C6C5CE",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#FBFBFB",
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#ACABB7",
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                color: "#8C8A97",
            },
        ],
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
            {
                color: "#8C8A97",
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#8EA5D9",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#fbfbfb",
            },
        ],
    },
];
