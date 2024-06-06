import React, { useState } from 'react'
import axios from 'axios';
import Router from 'next/router';
import DashboardAdminLayout from '../../layout';
import buildClient from '../../../../../api/build-client';
import Link from 'next/link';

const CategoryEditPage = ({ category }) => {

    const [name, setName] = useState(category.name);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`/api/categories/${category.slug}`, JSON.stringify({name: name}), {
              headers: {
                'Content-Type' : 'application/json'
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
            <section class="bg-white ">
                <div class="py-8 px-8 max-w-2xl lg:py-16 ">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 ">Edit Category</h2>
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
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Category Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " required/>
                            </div>
                        </div>
                        <button type="submit" class="mr-3 inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800">
                            {loading ? 'Saving' : 'Save'}
                        </button>
                        <Link href={'/dashboard/admin/category'}>
                            <button type="button" class="inline-flex text-white items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center black bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-600">
                                Back
                            </button>
                        </Link>
                    </form>
                </div>
            </section>
        </DashboardAdminLayout>
    )
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const client = buildClient(context.req);

  const { data: category } = await client.get(`/api/categories/${slug}`);

  return {
      props: {
          category: category.data,
      }
  }
}


export default CategoryEditPage