import {defineStore} from 'pinia';
import { loginUser, postUser, getUser } from '../api/user.api';
import type { User } from '../types/common.type';

export const useUserStore = defineStore('user', () => {
    const register = async (user: User) => {
        try {
            await postUser(user);
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const login = async (user: User) => {
        try {
            const response = await loginUser(user);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id);
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    const getCurrentUser = async (userId: number) => {
        try {
            const user: User = await getUser(userId);
            return user;
        } catch (error: any) {
            console.log(error.message);
            throw error;
        }
    }

    return {register, login, getCurrentUser}
});
