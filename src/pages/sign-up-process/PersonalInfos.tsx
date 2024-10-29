import {StyleSheet, View} from 'react-native';
import { Text, TextInput, HelperText, Menu } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { isFormValidContext } from '../../contexts/IsFormValidContext.tsx';
import {useSignUp} from '../../contexts/SignUpContext.tsx';

export default function PersonalInfos() {
    const { state, dispatch } = useSignUp();
    const [age, setAge] = useState(state.age.toString());
    const [weight, setWeight] = useState(state.weight.toString());
    const [genre, setGenre] = useState(state.genre);
    const [menuVisible, setMenuVisible] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [weightTouched, setWeightTouched] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFormValid, setIsFormValid] = useContext(isFormValidContext);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        const checkFormValidity = () => {
            return (
                !numberInputHasErrors(age) &&
                !numberInputHasErrors(weight) &&
                genre !== ''
            );
        };

        setIsFormValid(checkFormValidity());
    }, [age, weight, genre, state, setIsFormValid]);

    const handleSelect = (value: string) => {
        setGenre(value);
        handleUserGenre(value);
        closeMenu();
    };

    const onChangeAge = (ageInput: string) => {
        setAgeTouched(true);
        if (ageInput === '') {
            setAge('');
            handleUserAge(0);
            return;
        }
        const numericValue = ageInput.replace(/[^0-9]/g, '');
        const ageInt = parseInt(numericValue, 10);
        setAge(numericValue);
        if (!isNaN(ageInt)) {
            handleUserAge(ageInt);
        }
    };

    const onChangeWeight = (weightInput: string) => {
        setWeightTouched(true);
        if (weightInput === '') {
            setWeight('');
            handleUserWeight(0);
            return;
        }
        const numericValue = weightInput.replace(/[^0-9]/g, '');
        const weightInt = parseInt(numericValue, 10);
        setWeight(numericValue);
        if (!isNaN(weightInt)) {
            handleUserWeight(weightInt);
        }
    };

    const numberInputHasErrors = (value: string) => {
        return value === '' || isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0;
    };

    const handleUserAge = (age: number) => {
        dispatch({ type: 'USER_AGE_TYPE', age });
    };

    const handleUserWeight = (weight: number) => {
        dispatch({ type: 'USER_WEIGHT_TYPE', weight });
    };

    const handleUserGenre = (genre: string) => {
        dispatch({ type: 'USER_GENRE_TYPE', genre });
    };

    return (
        <View>
            <Text variant="titleLarge" style={styles.title}>Informations personnelles</Text>

            <TextInput
                label="Votre Age"
                value={state.age ? state.age.toString() : ''}
                onChangeText={onChangeAge}
                keyboardType="numeric"
            />
            <HelperText type="error" visible={ageTouched && numberInputHasErrors(age)}>
                L'âge doit être un nombre valide
            </HelperText>

            <View>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <TextInput
                            label="Votre Genre"
                            value={state.genre}
                            onPressIn={openMenu}
                            editable={false}
                        />
                    }
                >
                    <Menu.Item onPress={() => handleSelect('Homme')} title="Homme" />
                    <Menu.Item onPress={() => handleSelect('Femme')} title="Femme" />
                    <Menu.Item onPress={() => handleSelect('Autre')} title="Autre" />
                </Menu>
            </View>

            <TextInput
                label="Votre Poids"
                value={state.weight ? state.weight.toString() : ''}
                onChangeText={onChangeWeight}
                keyboardType="numeric"
            />
            <HelperText type="error" visible={weightTouched && numberInputHasErrors(weight)}>
                Le poids doit être un nombre valide
            </HelperText>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 50,
        textAlign: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
