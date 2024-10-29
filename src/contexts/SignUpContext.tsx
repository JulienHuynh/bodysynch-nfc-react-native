import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SignUpReducer } from '../reducers/SignUpReducer';
import { SignUpState } from '../types/SignUpState';
import {UserAgeAction, UserGenreAction, UserGoalAction, RemoveUserGoalAction, UserWeightAction, HowYouFoundUsAction, UserCredentialsAction} from '../types/SignUpActions.ts';

export type InscriptionStep =
    | UserAgeAction
    | UserWeightAction
    | UserGenreAction
    | UserGoalAction
    | RemoveUserGoalAction
    | HowYouFoundUsAction
    | UserCredentialsAction;

const initialSignUpState: SignUpState = {
    age: 0,
    weight: 0,
    genre: '',
    goals: [],
    foundUs: '',
    username: '',
    email: '',
    password: '',
};

// Création du contexte
type SignUpContextType = {
    state: SignUpState;
    dispatch: React.Dispatch<InscriptionStep>;
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(SignUpReducer, initialSignUpState);

    return (
        <SignUpContext.Provider value={{ state, dispatch }}>
            {children}
        </SignUpContext.Provider>
    );
};

// Hook personnalisé pour accéder facilement au contexte
export const useSignUp = (): SignUpContextType => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error('useSignUp doit être utilisé à l’intérieur de SignUpProvider');
    }
    return context;
};
