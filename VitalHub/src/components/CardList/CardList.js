import { AppointmentCard, AppointmentMedicCard, ClinicSelectCard, MedicSelectCard } from "../../components/Card/Card";
import { ListCard } from "./Styles";
import { useState } from "react";
import moment from "moment";

export const CardList = ({ status, navi, cardsData, Date }) => {
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => status == item.situacao.situacao && (
                <AppointmentCard
                    id={item.id}
                    situation={item.situacao.situacao}
                    idSituacao={item.situacao.id}
                    navi={navi}
                    img={item.paciente.idNavigation.foto}
                    name={item.paciente.idNavigation.nome}
                    age={moment(item.dataConsulta).format('YYYY') - moment(item.paciente.dataNascimento).format('YYYY')}
                    query={item.descricao}
                    schedule={moment(item.dataConsulta).format('h:mm')}
                    email={item.paciente.idNavigation.email}
                    data={moment(item.dataConsulta).format('YYYY-MM-DD')}
                />
            )}
        />
    )
}

export const CardMedicList = ({ status, navi, cardsData, Date }) => {
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => status == item.situacao.situacao && (
                <AppointmentMedicCard
                    id={item.id}
                    idClinic={item.medicoClinica.clinicaId}
                    idSituacao={item.situacao.id}
                    situation={item.situacao.situacao}
                    navi={navi}
                    img={item.medicoClinica.medico.idNavigation.foto}
                    name={item.medicoClinica.medico.idNavigation.nome}
                    age={item.age}
                    query={item.descricao}
                    schedule={moment(item.dataConsulta).format('h:mm')}
                    email={item.email}
                    crm={item.medicoClinica.medico.crm}
                    specialty={item.medicoClinica.medico.especialidade.especialidade1}
                    data={moment(item.dataConsulta).format('YYYY-MM-DD')}
                />
            )
            }
        />
    )
}

export const ClinicCardList = ({ cardsData }) => {
    const [idClinic, setIdClinic] = useState(null)
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
                <ClinicSelectCard
                    id={item.id}
                    onPress={() => setIdClinic(item.id)}
                    isSelect={idClinic == item.id}
                    clinicName={item.nomeFantasia}
                    city={item.endereco.cidade}
                    days={item.days}
                    select={item.select}
                />
            }
        />
    )
}

export const MedicSelectCardList = ({ cardsData }) => {
    const [idMedic, setIdMedic] = useState(null)
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
                <MedicSelectCard
                    id={item.id}
                    onPress={() => setIdMedic(item.id)}
                    isSelect={idMedic == item.id}
                    img={item.idNavigation.foto}
                    medicName={item.idNavigation.nome}
                    speciality={item.especialidade.especialidade1}
                />
            }
        />
    )
}