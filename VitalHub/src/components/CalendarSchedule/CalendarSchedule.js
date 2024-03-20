import { ContainerDateDay, DateDayText, ScheduleCalendar } from "./Styles";
import { LocaleConfig } from "react-native-calendars";
import { TouchableOpacity } from "react-native";

//instância da data atual
const currentDate = new Date();

//define a data inicial como sendo o primeiro dia do mês
const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);

//define a data final como sendo o último dia do mês
const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

LocaleConfig.locales['pt-br'] = {
  //meses
  monthNames:
    "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),

  //abreviação de meses
  monthNamesShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),

  //dias da semana
  dayNames:
    "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),

  //abreviação dias da semana
  dayNamesShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
};

LocaleConfig.defaultLocale = 'pt-br'

export const CalendarSchedule = ({ selected = '', selectedDateDay = null }) => {
  return (
    <ScheduleCalendar
      hideArrows={true}
      monthFormat='MMMM yyyy'
      minDate={currentDate.toUTCString()}
      maxDate={endingDate.dateString}
      dayComponent={({ date, state }) => {
        return (
          <TouchableOpacity onPress={() => {
            if (state === 'disabled') {
              return null;
            }
              selectedDateDay(date.dateString)
          }
          }>
            <ContainerDateDay isSelected={date.dateString === selected}>
              <DateDayText isSelected={date.dateString === selected} isDisabled={state === 'disabled'}>{date.day}</DateDayText >
            </ContainerDateDay>
          </TouchableOpacity>
        );
      }}
      theme={{
        monthTextColor: '#4E4B59',
        textMonthFontFamily: 'MontserratAlternates_600SemiBold',
        textMonthFontSize: 22,
        'stylesheet.calendar.header': {
          week: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }
        }
      }}
    />
  )
}
