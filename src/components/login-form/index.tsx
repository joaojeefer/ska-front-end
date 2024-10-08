"use client";

/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useContext } from 'react';
import { AuthContext } from '@/contexts';
import { SignInApiPayload } from '@/api/types';
import { Spinner } from '../spinner';

export const LoginForm = () => {
    const { isSigningIn, handleSignIn } = useContext(AuthContext);
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
        } as SignInApiPayload;

        await handleSignIn(data);
    }

    if (isSigningIn) {
        return (
            <div className="flex flex-1 justify-center items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Faça seu login
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Usuário
                </label>
                <div className="mt-2">
                    <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Entrar
                </button>
                </div>
            </form>
            </div>
        </div>
    )
}
