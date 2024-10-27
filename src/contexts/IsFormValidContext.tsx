import React, { useState, createContext, Dispatch, SetStateAction, ReactNode } from 'react';

type IsFormValidContextType = [boolean, Dispatch<SetStateAction<boolean>>];

export const isFormValidContext = createContext<IsFormValidContextType>([false, () => {}]);

interface IsFormValidProviderProps {
    children: ReactNode;
}

export default function IsFormValidProvider({ children }: IsFormValidProviderProps) {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    return (
        <isFormValidContext.Provider value={[isFormValid, setIsFormValid]}>
            {children}
        </isFormValidContext.Provider>
    );
}
