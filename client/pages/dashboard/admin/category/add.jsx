import React, { useRef, useState } from 'react'
import DashboardAdminLayout from '../layout'
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

const CategoryAddPage = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);

    const nameInputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const enteredName = nameInputRef.current.value;

        try {
            await axios.post('/api/categories', JSON.stringify({name: enteredName}), {
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            Router.push('/dashboard/admin/category');
            setLoading(false);
        } catch (error) {
            setError(error.response.data.errors);
        }
    }

    return (
        <DashboardAdminLayout>
            <section className="bg-white ">
                <div className="py-8 px-8 max-w-2xl lg:py-16 ">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new category</h2>
                    {errors.length > 0 && (
                        <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-300" role="alert">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Category Name</label>
                                <input ref={nameInputRef} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required/>
                            </div>
                        </div>
                        <button type="submit" className=" mr-3 inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800">
                            {loading ? 'Saving' : 'Save'}
                        </button>
                        <Link href={'/dashboard/admin/category'}>
                            <button type="button" className="inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-600">
                                Back
                            </button>
                        </Link>
                    </form>
                </div>
            </section>
        </DashboardAdminLayout>
    )
}

export default CategoryAddPage