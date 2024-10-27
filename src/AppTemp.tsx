import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen.tsx';
import SignUp from './pages/sign-up-process/SignUp.tsx';

const Stack = createStackNavigator();

export default function AppTemp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Signup" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
