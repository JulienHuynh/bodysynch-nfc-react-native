import React, {useContext} from 'react';
import { View } from 'react-native';
import PersonalInfos from './PersonalInfos';
import { Button } from 'react-native-paper';
import IsFormValidProvider, {isFormValidContext} from '../../contexts/IsFormValidContext.tsx';

export default function SignUp() {
    return (
        <IsFormValidProvider>
            <InnerSignUp />
        </IsFormValidProvider>
    );
}

function InnerSignUp() {
    const [isFormValid] = useContext(isFormValidContext);

    return (
        <View>
            <PersonalInfos />
            <Button mode="contained" onPress={() => console.log('test')} disabled={!isFormValid}>
                Suivant
            </Button>
        </View>
    );
}
