export type UserAgeAction = {
    type: 'USER_AGE_TYPE',
    age: number,
};

export type UserWeightAction = {
    type: 'USER_WEIGHT_TYPE',
    weight: number,
};

export type UserGenreAction = {
    type: 'USER_GENRE_TYPE',
    genre: string,
};

export type UserGoalAction = {
    type: 'USER_GOALS_TYPE',
    goal: string,
};

export type HowYouFoundUsAction = {
    type: 'FOUND_US_TYPE',
    foundUs: string,
};

export type UserCredentialsAction = {
    type: 'USER_CREDENTIALS_TYPE',
    username: string,
    email: string,
    password: string,
};
