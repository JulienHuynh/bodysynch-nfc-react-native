import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import InstagramIcon from '../../../assets/images/instagram.svg';
import BsCard from '../../molecules/BsCard/BsCard.tsx';
import {UserGoalsEnum} from '../../../enums/UserGoalsEnum.ts';
import {useSignUp} from '../../../contexts/SignUpContext.tsx';
import {isFormValidContext} from '../../../contexts/IsFormValidContext.tsx';

const UserGoalCardList: React.FC = () => {
    const { state, dispatch } = useSignUp();
    const [userGoals, setUserGoals] = React.useState<number[]>(state.goals);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isFormValid, setIsFormValid] = useContext(isFormValidContext);

    useEffect(() => {
        setIsFormValid(userGoals.length > 0);
    }, [userGoals, setIsFormValid]);

    const handleSelect = (value: number) => {
        if (userGoals.includes(value)) {
            setUserGoals(userGoals.filter((goal) => goal !== value));
            handleRemoveUserGoals(value);
            return;
        } else {
            setUserGoals([...userGoals, value]);
            handleUserGoals(value);
        }
    };

    const handleUserGoals = (goal: number) => {
        dispatch({ type: 'USER_GOALS_TYPE', goal });
    };

    const handleRemoveUserGoals = (goal: number) => {
        dispatch({ type: 'REMOVE_GOAL_TYPE', goal });
    };

    return (
        <View style={styles.cardList}>
            <BsCard SvgIcon={InstagramIcon} text={'Optimisation Sportive'}
                    handleSelect={handleSelect}
                    value={UserGoalsEnum.OptimisationSportive}
                    isSelected={state.goals.includes(UserGoalsEnum.OptimisationSportive)}/>
            <BsCard SvgIcon={InstagramIcon} text={'Santé & Longévité'}
                    handleSelect={handleSelect}
                    value={UserGoalsEnum.SanteLongevite}
                    isSelected={state.goals.includes(UserGoalsEnum.SanteLongevite)}/>
            <BsCard SvgIcon={InstagramIcon} text={'Accompagnement Expert'}
                    handleSelect={handleSelect}
                    value={UserGoalsEnum.AccompagnementExpert}
                    isSelected={state.goals.includes(UserGoalsEnum.AccompagnementExpert)}/>
            <BsCard SvgIcon={InstagramIcon} text={'Equilibre & Bien-être'}
                    handleSelect={handleSelect}
                    value={UserGoalsEnum.EquilibreBienEtre}
                    isSelected={state.goals.includes(UserGoalsEnum.EquilibreBienEtre)}/>
        </View>
    );
};

export default UserGoalCardList;

const styles = StyleSheet.create({
    cardList: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
});
