import { Button, View } from "react-native";

export const Navegation = ({navigation}) => {
    return(
        <View style={{flex: 1, alignItems: 'center',
        justifyContent: 'center'}}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="Reset"
                onPress={() => navigation.navigate("Reset")}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate("Register")}
            />
            <Button
                title="ResetPassword"
                onPress={() => navigation.navigate("ResetPassword")}
            />
            <Button
                title="EmailCode"
                onPress={() => navigation.navigate("EmailCode")}
            />
            <Button
                title="UserProfile"
                onPress={() => navigation.navigate("UserProfile")}
            />
            <Button
                title="ClinicLocation"
                onPress={() => navigation.navigate("ClinicLocation")}
            />
            <Button
                title="HomeMedic"
                onPress={() => navigation.navigate("HomeMedic")}
            />
            <Button
                title="HomePatient"
                onPress={() => navigation.navigate("HomePatient")}
            />
            <Button
                title="ClinicSelect"
                onPress={() => navigation.navigate("ClinicSelect")}
            />
            <Button
                title="MedicSelect"
                onPress={() => navigation.navigate("MedicSelect")}
            />
            <Button
                title="DateSelect"
                onPress={() => navigation.navigate("DateSelect")}
            />
            <Button
                title="MedicRecord"
                onPress={() => navigation.navigate("MedicRecord")}
            />
        </View>
    )
}