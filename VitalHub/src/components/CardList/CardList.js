import { AppointmentCard, AppointmentMedicCard, ClinicSelectCard, MedicSelectCard } from "../../components/Card/Card";
import { ListCard } from "./Styles";
import { useState } from "react";

export const CardList = ({ status, navi, cardsData }) => {
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => status == item.situation && (
                <AppointmentCard
                    id={item.id}
                    situation={item.situation}
                    navi={navi}
                    img={item.img}
                    name={item.name}
                    age={item.age}
                    query={item.query}
                    schedule={item.schedule}
                    email={item.email}
                />
            )}
        />
    )
}

export const CardMedicList = ({ status, navi, cardsData }) => {
    return (
        <ListCard
            data={cardsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => status == item.situation && (
                <AppointmentMedicCard
                    id={item.id}
                    situation={item.situation}
                    navi={navi}
                    img={item.img}
                    name={item.name}
                    age={item.age}
                    query={item.query}
                    schedule={item.schedule}
                    email={item.email}
                    crm={item.crm}
                    specialty={item.specialty}
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
                    clinicName={item.clinicName}
                    score={item.score}
                    city={item.city}
                    uf={item.uf}
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
                    img={item.img}
                    medicName={item.medicName}
                    speciality={item.speciality}
                />
            }
        />
    )
}