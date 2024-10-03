/**
 * Custom hook to interact with local storage
 * @returns {object} - An object with functions to interact with local storage.
 * @returns {function} getItem - Function to get an item from local storage by key.
 * @returns {function} setItem - Function to save an item in local storage by key.
 * @returns {function} removeItem - Function to remove an item from local storage by key.
 */
export function useLocalStorage() {
    function getItem(key: string) {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    function setItem(key: string, value: unknown) {
        return window.localStorage.setItem(key, JSON.stringify(value));
    }

    function removeItem(key: string) {
        return window.localStorage.removeItem(key);
    }

    return { getItem, setItem, removeItem };
}