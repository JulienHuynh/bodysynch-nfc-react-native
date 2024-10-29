import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import UserGoalCardList from '../../components/organisms/UserGoalCardList/UserGoalCardList.tsx';

export default function UserGoal() {

    return (
        <View >
            <Text variant="titleLarge" style={styles.title}>Mes objectifs</Text>
            <UserGoalCardList />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 50,
        textAlign: 'center',
    },
});
