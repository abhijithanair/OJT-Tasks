export let isAuthenticated = false;

export const setIsAuthenticated = (value: boolean) => {
    isAuthenticated = value;
};

export const getIsAuthenticated = () => {
    return isAuthenticated;
};