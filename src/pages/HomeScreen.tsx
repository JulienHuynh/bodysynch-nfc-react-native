import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList.ts';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Welcome to Home Screen</Text>
            <Button title="S'inscrire" onPress={() => navigation.navigate('Signup')} />
        </View>
    );
}
