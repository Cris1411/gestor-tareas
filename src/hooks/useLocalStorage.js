import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // Estado para almacenar nuestro valor
    // Pasa la función inicial al useState para que solo se ejecute una vez
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Retorna una versión envuelta de la función useState's setter
    const setValue = value => {
        try {
            // Permite que el valor sea una función para que tengamos la misma API que useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};
