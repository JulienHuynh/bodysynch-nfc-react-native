import { SignUpState } from '../types/SignUpState';

type UserAgeAction = {
    type: 'USER_AGE_TYPE',
    age: number,
};

type UserWeightAction = {
    type: 'USER_WEIGHT_TYPE',
    weight: number,
};

type UserGenreAction = {
    type: 'USER_GENRE_TYPE',
    genre: string,
};

type UserGoalAction = {
    type: 'USER_GOALS_TYPE',
    goal: string,
};

type HowYouFoundUsAction = {
    type: 'FOUND_US_TYPE',
    foundUs: string,
};

type UserCredentialsAction = {
    type: 'USER_CREDENTIALS_TYPE',
    username: string,
    email: string,
    password: string,
};

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
