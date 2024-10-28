import React, {useContext} from 'react';
import { View } from 'react-native';
import PersonalInfos from './PersonalInfos';
import {Button, SegmentedButtons} from 'react-native-paper';
import IsFormValidProvider, {isFormValidContext} from '../../contexts/IsFormValidContext.tsx';
import UserGoal from './UserGoal.tsx';
import {SignUpProvider} from '../../contexts/SignUpContext.tsx';

export default function SignUp() {
    return (
        <IsFormValidProvider>
            <SignUpProvider>
                <InnerSignUp />
            </SignUpProvider>
        </IsFormValidProvider>
    );
}

function InnerSignUp() {
    const [isFormValid] = useContext(isFormValidContext);
    const [currentPage, setCurrentPage] = React.useState('1');

    const changePage = (page: string) => {
        console.log(isFormValid);
        console.log('changePage', page, currentPage);
        if (isFormValid || parseInt(page, 10) <= parseInt(currentPage, 10)) {
            setCurrentPage(page);
        }
    };

    return (
        <View style={{ padding: 16 }}>
            { currentPage === '1' && <PersonalInfos /> }
            { currentPage === '2' && <UserGoal /> }
            <SegmentedButtons
                value={currentPage}
                onValueChange={changePage}
                buttons={[
                    {value: '1'},
                    {value: '2'},
                    {value: '3'},
                ]}
            />
            <Button mode="contained" onPress={() => changePage((parseInt(currentPage, 10) + 1).toString())} disabled={!isFormValid}>
                Suivant
            </Button>
        </View>
    );
}
