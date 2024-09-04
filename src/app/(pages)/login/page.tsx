'use client'
import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { loginErrorTypes} from '@/lib/types';
import axios from 'axios';
import { signIn } from 'next-auth/react'



export default function Login() {
    
    const [authState, setAuthState] = useState({
        email: '',
        password: '',
    })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<loginErrorTypes>({});


    const submitForm = async () => {
        setLoading(true); 
        setErrors({});

        try {
            const res = await axios.post('/api/auth/login', authState);
            const response = res.data;

            if (res.status === 200) {
                console.log('User logged in');
                signIn('credentials', {
                    email: authState.email,
                    password: authState.password,
                    callbackUrl: '/',
                    redirect: true,
                })

            } else if (res.status === 400) {
                setErrors(response.errors);
            }
        } catch (err: any) {
            console.log('Something went wrong:', err.response?.data || err.message);
            if (err.response && err.response.status === 400) {
                setErrors(err.response.data.errors);
            } else {
                // Handle any other types of errors (e.g., network errors)
                setErrors({ general: 'An unexpected error occurred.' });
            }
        } finally {
            setLoading(false);
        }
    };

   // Google login
   const googleLogin = async() =>{
    await signIn("google",{
        callbackUrl:'/',
        redirect:true
    })
   }


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState)
    }

    return (
        <section className="bg-richblack min-h-screen flex items-center justify-center">
            <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-md 2xl:max-w-md bg-smokyBlack rounded-lg shadow-md p-8 border-bistre">
                    <h2 className="text-center text-2xl font-bold leading-tight text-rawNumber">
                        Login
                    </h2>
                    <p className="mt-2 text-center text-base text-rawnumber2">
                        Do not have an account?{' '}
                        <a
                            href="/signup"
                            title=""
                            className="font-medium text-rawNumber transition-all duration-200 hover:underline hover:text-seashell"
                        >
                            Sign Up
                        </a>
                    </p>
                    <form action="#" method="POST" className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-rawNumber">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <Input
                                        className="flex h-10 w-full rounded-md border border-rawNumber bg-transparent px-3 py-2 text-sm text-white placeholder:text-seashell focus:outline-none focus:ring-1 focus:ring-rawnumber2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        onChange={(e) => setAuthState({ ...authState, email: e.target.value })}
                                    />
                                    <span className="text-red-500 font-bold">
                                        {errors?.email}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-rawNumber">
                                        {' '}
                                        Password{' '}
                                    </label>
                                </div>
                                <div className="mt-2 relative">
                                    <Input
                                        className="flex h-10 w-full rounded-md border border-rawNumber bg-transparent px-3 py-2 text-sm text-white placeholder:text-seashell focus:outline-none focus:ring-1 focus:ring-rawnumber2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Password"
                                        id="password"
                                        onChange={(e) => setAuthState({ ...authState, password: e.target.value })}
                                    />
                                    <span className="text-red-500 font-bold">
                                        {errors?.password}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 pb-1  right-3 flex items-center bg-transparent text-seashell hover:text-rawnumber2"
                                    >
                                        {isPasswordVisible ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-seashell hover:bg-rawNumber/80
                                    ${loading ? "bg-bistre" : "bg-rawnumber2"}`}
                                    onClick={submitForm}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing' : 'login'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-rawnumber2 bg- px-3.5 py-2.5 font-semibold text-seashell transition-all duration-200 hover:bg-rawNumber hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            onClick={googleLogin}
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-rose-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </span>
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
