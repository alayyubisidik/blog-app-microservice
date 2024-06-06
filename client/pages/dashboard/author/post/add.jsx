import React, { useRef, useState } from 'react'
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import buildClient from '../../../../api/build-client';
import DashboardAuthorLayout from '../layout';

const PostAddPage = ({ categories, currentUser }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);

    const titleInputRef = useRef();
    const contentInputRef = useRef();
    const categoryIdInputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const enteredTitle = titleInputRef.current.value;
        const enteredContent = contentInputRef.current.value;
        const enteredCategoryId = categoryIdInputRef.current.value;

        console.log(enteredTitle, enteredContent, enteredCategoryId)

        try {
            await axios.post('/api/posts', JSON.stringify({
                title: enteredTitle,
                content: enteredContent,
                category_id: enteredCategoryId,
                user_id: currentUser.id
            }), {
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            Router.push('/dashboard/author/post');
            setLoading(false);
        } catch (error) {
            setError(error.response.data.errors);
        }
    }

    return (
        <DashboardAuthorLayout>
            <section className="bg-white ">
                <div className="py-8 px-8 max-w-2xl lg:py-16 ">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new post</h2>
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                <input ref={titleInputRef} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Content</label>                                
                                <textarea ref={contentInputRef} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                <select id="category_id" ref={categoryIdInputRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className=" mr-3 inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800">
                            {loading ? 'Saving' : 'Save'}
                        </button>
                        <Link href={'/dashboard/author/post'}>
                            <button type="button" className="inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-600">
                                Back
                            </button>
                        </Link>
                    </form>
                </div>
            </section>
        </DashboardAuthorLayout>
    )
}


export async function getServerSideProps({ req }) {
    const client = buildClient(req);

    const { data: categories } = await client.get('/api/categories');

    return {
        props: {
            categories: categories.data
        }
    }
}

export default PostAddPage