import { SignUpState } from '../types/SignUpState';
import {UserAgeAction, UserGenreAction, UserGoalAction, UserWeightAction, HowYouFoundUsAction, UserCredentialsAction} from '../types/SignUpActions.ts';

type InscriptionStep = UserAgeAction | UserWeightAction | UserGenreAction | UserGoalAction | HowYouFoundUsAction | UserCredentialsAction;

export const SignUpReducer = (state: SignUpState, action: InscriptionStep): SignUpState => {
    switch (action.type) {
        case 'USER_AGE_TYPE':
            return {
                ...state,
                age: action.age,
            };
        case 'USER_WEIGHT_TYPE':
            return {
                ...state,
                weight: action.weight,
            };
        case 'USER_GENRE_TYPE':
            return {
                ...state,
                genre: action.genre,
            };
        case 'USER_GOALS_TYPE':
            return {
                ...state,
                goal: action.goal,
            };
        case 'FOUND_US_TYPE':
            return {
                ...state,
                foundUs: action.foundUs,
            };
        case 'USER_CREDENTIALS_TYPE':
            return {
                ...state,
                username: action.username,
                email: action.email,
                password: action.password,
            };
        default:
            return state;
    }
};
