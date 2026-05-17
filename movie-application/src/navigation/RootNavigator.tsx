import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../utils/navigationService";
import AppNavigator from "./AppNavigator";

const RootNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
         <AppNavigator />
        </NavigationContainer>
    )
}

export default RootNavigator;