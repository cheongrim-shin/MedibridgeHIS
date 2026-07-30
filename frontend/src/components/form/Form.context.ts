import { createContext } from 'react';
import type { ComponentSize } from '../types';

export interface FormContextValue {
    size?: 'none' | ComponentSize;
}

export const FormContext = createContext<FormContextValue>({});
