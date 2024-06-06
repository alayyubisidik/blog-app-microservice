import Link from 'next/link';
import buildClient from '../../../../api/build-client';
import DashboardAdminLayout from '../layout'
import axios from 'axios';
import { useState } from 'react';

const CategoryPage = ({ categories }) => {

    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState([]);

    const handleDelete = async (slug) => {
        try {
            await axios.delete(`/api/categories/${slug}`);

            window.location.reload();
            setLoading(false);
        } catch (error) {
            setError(error.response.data.errors);
        }
    }
    return (
        <DashboardAdminLayout>
            <section className="bg-gray-50  p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* <!-- Start coding here --> */}
                
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
                        {errors.length > 0 && (
                            <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-300" role="alert">
                                <ul>
                                    {errors.map((error, index) => (
                                        <li key={index}>{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex mb-[5px] flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <p className='text-xl font-semibold'>Category</p>
                            <Link href={'/dashboard/admin/category/add'}>
                                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">
                                    Create new category
                                </button>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">No</th>
                                        <th scope="col" className="px-4 py-3">Name</th>
                                        <th scope="col" className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <tr key={index} className="border-b ">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">{category.name}</th>
                                            <td className="px-4 py-3">
                                                <Link href={`/dashboard/admin/category/edit/${category.slug}`}>
                                                    <button type="button" className=" mr-3 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button onClick={() => handleDelete(category.slug)} type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 ">
                                                    {loading ? 'Deleting' : 'Delete'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        </nav>
                    </div>
                </div>
            </section>
        </DashboardAdminLayout>
    )
}

export async function getServerSideProps({ req }) {
    const client = buildClient(req);

    const { data: categories } = await client.get('/api/categories');

    return {
        props: {
            categories: categories.data,
        }
    }
}

export default CategoryPage