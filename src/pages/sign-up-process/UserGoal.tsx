import { View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import React from 'react';

export default function UserGoal() {

    return (
        <View style={{ padding: 16 }}>
            <Text variant="titleLarge">Mes objectifs</Text>

            <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
            <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
            <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
            <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
        </View>
    );
}
