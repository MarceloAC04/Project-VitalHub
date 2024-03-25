import axios from "axios";

//Declarar a porta da API
const portaApi = '4466'

//Declarar o ip da maquina - Da sua maquina de preferência (DUHHHH)
const ip = '172.16.39.87'

//Definir a base da URL de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//Configurar o axios
const api = axios.create({
    baseURL: apiUrlLocal
})

export default api