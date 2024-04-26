import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {decode, encode} from 'base-64';

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

// Funcao de decodificar o token
export const userDecodeToken = async () => {
    // capturado o token
    const token = await AsyncStorage.getItem('token');

    if (token === null) {
        return null;
    }

    // Descriptografando o token
    const decoded = jwtDecode(token)

    //Retorna as propriedades que estão dentro do TOKEN como objeto
    return {
        role: decoded.role,
        name : decoded.name,
        email : decoded.email,
        jti: decoded.jti
    }
}