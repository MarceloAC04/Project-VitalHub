import { CalendarStyle} from "../../components/Calendar/Styles";
import { StyleSheet } from "react-native";
import moment from "moment"
import 'moment/locale/pt-br';

//instância da data atual
const currentDate = new Date();

//define a data inicial como sendo o primeiro dia do mês
const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);

//define a data final como sendo o último dia do mês
const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

export const Calendar = () => {
    return (
            <CalendarStyle
                scrollable

                calendarAnimation={{ type: "sequence", duration: 30 }}
                daySelectionAnimation={styleCalendar.selectedAnimationStyle}
                iconLeftStyle={styleCalendar.iconsStyle}
                iconRightStyle={styleCalendar.iconsStyle}

                selectedDate={currentDate}
                startingDate={moment()}
                minDate={moment()}
                maxDate={endingDate}

                calendarHeaderStyle={styleCalendar.calendarHeaderStyle}
                dateNumberStyle={styleCalendar.numberDateStyle}
                dateNameStyle={styleCalendar.nameDateStyle}

                // estilização do item que está selecionado - efeito do item marcado
                highlightDateNameStyle={styleCalendar.selectedDateNameStyle}
                highlightDateNumberStyle={styleCalendar.selectedDateNumberStyle}
                highlightDateContainerStyle={styleCalendar.selectedContainerStyle}
                IconContainer={{ flex: 0.1 }}
            />
    )
}

const styleCalendar = StyleSheet.create({
    iconsStyle: {
        display: 'none'
    },
    calendarHeaderStyle: {
        fontSize: 22,
        textAlign: "center",
        alignSelf: 'flex-start',
        color: '#4E4B59',
        fontFamily: "MontserratAlternates_600SemiBold",
        paddingHorizontal: 16
    },
    nameDateStyle: {
        color: "#ACABB7",
        fontSize: 12,
        textTransform: 'capitalize'
    },
    numberDateStyle: {
        color: "#5F5C6B",
        fontSize: 16
    },
    selectedDateNameStyle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    selectedDateNumberStyle: {
        color: "white",
        fontSize: 14
    },
    selectedContainerStyle: {
        backgroundColor: `#60BFC5`
    },
    selectedAnimationStyle: {
        type: "border",
        duration: 200,
        borderWidth: 2,
        borderHighlightColor: "#49B3BA"
    }
})