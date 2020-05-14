import { AdminMenu, LoggedUserMenu, UserMenu } from './userMenu';

const TOKEN_KEY = 'jwt';
const UID = '';
const USER = '';

export const login = (uid, refreshToken, username) => {
    localStorage.setItem(UID, uid);
    localStorage.setItem(TOKEN_KEY, refreshToken);
    localStorage.setItem(USER, username);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER);
    localStorage.removeItem(UID);
}

export const isLogin = () => {
   if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

export const getLoggedUser = () => {
if (localStorage.getItem(TOKEN_KEY)) {
        return localStorage.getItem(USER);
    }

    return '';
}

export const getMenu = () =>
{
    if(isLogin())
      return LoggedUserMenu
    else 
      return UserMenu
}