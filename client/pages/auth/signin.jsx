import React, { useState, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    async function submitHandler(e) {
        e.preventDefault();

        setLoading(true);

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const data = JSON.stringify({
            email: enteredEmail,
            password: enteredPassword
        });

        try {
            await axios.post('/api/users/signin', data, {
                headers: {
                    'Content-Type' : "application/json"
                }
            });
            
            Router.push('/');
        } catch (error) {
            setErrors(error.response.data.errors);
        }

        setLoading(false);
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    Blog App
                </Link>

                {errors.length > 0 && (
                    <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-300" role="alert">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="w-full bg-[#EEF7FF] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input ref={emailInputRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input ref={passwordInputRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required />
                            </div>
                            <button disabled={loading} type="submit" className={`w-full text-white ${loading ? 'bg-blue-500' : 'bg-blue-600'} hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
