//importar o recurso do button tab
import { ContentIcon, TextIcon } from './Styles'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserProfile } from "../UserProfile/UserProfile";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { Home } from '../Home/Home';

const BottomTab = createBottomTabNavigator();

export const Main = ({route}) => {
    return (
        <BottomTab.Navigator
            //definir a rota inicial
            initialRouteName={'Home'}

            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#FFFFFF', height: 80, paddingTop: 10 },
                tabBarActiveBackgroundColor: 'transparent',
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Home') {
                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? '#ECF2FF' : 'transparent'}
                            >
                                {focused ? 
                                <FontAwesome5 name="calendar-check" size={22} color="#607EC5" /> 
                                :
                                <FontAwesome name='calendar' size={22} color='#4E4B59' />
                                }
                                {focused && <TextIcon>agenda</TextIcon>}
                            </ContentIcon>

                        )
                    } else {
                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? '#ECF2FF' : 'transparent'}
                            >
                                <FontAwesome5 name='user-circle' size={22} color={focused ? '#607EC5' : '#4E4B59'} />
                                {focused && <TextIcon>Perfil</TextIcon>}
                            </ContentIcon>

                        )
                    }
                }
            })}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
            />
            <BottomTab.Screen
                name="UserProfile"
                component={UserProfile}
            />

        </BottomTab.Navigator>
    )
}