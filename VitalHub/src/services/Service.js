import axios from "axios";

// Declarar a porta da api

const portaApi = '4466'

// Declarar o ip da maquina
const ip = '172.16.39.87'

// Definir a base da url de acessos da api:
const apiUrlLocal = `http://${ip}:${portaApi}/api`

// Configurar o axios
const api = axios.create({
    baseURL : apiUrlLocal
})

export default api