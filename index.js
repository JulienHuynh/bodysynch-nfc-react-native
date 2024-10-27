/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import AppTemp from './src/AppTemp';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#8883f0',
        secondary: '#d6d6fa',
    },
};

function Main(){
    return (
        <PaperProvider theme={theme}>
            <AppTemp />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
