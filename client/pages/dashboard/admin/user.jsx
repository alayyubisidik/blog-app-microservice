import { useState } from 'react';
import buildClient from '../../../api/build-client';
import formatDate from '../../../utils/format-date';
import DashboardAdminLayout from './layout';
import axios from 'axios';



const UserPage = ({ users }) => {
    const [loading, setLoading] = useState(false);


    const handleChangeAccessStatus = async (username, access_status) => {
        setLoading(true);
    
        const response = await axios.post(`/api/users/change-access-status/${username}`, {access_status : access_status});
    
        if (response.status === 200) {
            window.location.reload();
            setLoading(false);
        } else { 
            console.log(response.data);
        }
    }

    return (
        <DashboardAdminLayout>
            <section className="bg-gray-50  p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* <!-- Start coding here --> */}
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex mb-[5px] flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <p className='text-xl font-semibold'>User</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">No</th>
                                        <th scope="col" className="px-4 py-3">Full Name</th>
                                        <th scope="col" className="px-4 py-3">Username</th>
                                        <th scope="col" className="px-4 py-3">Email</th>
                                        <th scope="col" className="px-4 py-3">Join on</th>
                                        <th scope="col" className="px-4 py-3">Role</th>
                                        <th scope="col" className="px-4 py-3">Access Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} className="border-b ">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">{user.full_name}</th>
                                            <td className="px-4 py-3">{user.username}</td>
                                            <td className="px-4 py-3">{user.email}</td>
                                            <td className="px-4 py-3">{formatDate(user.created_at)}</td>
                                            <td className="px-4 py-3">{user.role}</td>
                                            <td className="px-4 py-3">
                                                {user.access_status ? (
                                                    <button disabled={loading} onClick={() => handleChangeAccessStatus(user.username, false)} type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 ">
                                                        {loading ? '....' : 'Active'}
                                                    </button>
                                                ) : (
                                                    <button  disabled={loading}  onClick={() => handleChangeAccessStatus(user.username, true)} type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                                                        {loading ? '....' : 'Blocked'}
                                                    </button>
                                                )}
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

    const { data: users } = await client.get('/api/users');

    return {
        props: {
            users: users.data,
        }
    }
}

export default UserPage