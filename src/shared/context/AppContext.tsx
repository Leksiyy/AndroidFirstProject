﻿import { createContext } from 'react';

type AppContextType = {
  navigate: (href: string) => void;
};

const init = {
  navigate: (_: string) => {throw "navigate Not implemented"},
}

export const AppContext = createContext<AppContextType>(init);