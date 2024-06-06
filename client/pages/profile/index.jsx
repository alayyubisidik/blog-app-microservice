import axios from "axios";
import { useState } from "react";

const ProfilePage = ({ currentUser }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [email, setEmail] = useState(currentUser ? currentUser.email : '');
    const [username, setUsername] = useState(currentUser ? currentUser.username : '');
    const [fullname, setFullName] = useState(currentUser ? currentUser.full_name : '');

    async function submitHandler(e) {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        setSuccessMessage('');

        const data = JSON.stringify({
            email,
            username,
            full_name: fullname
        });

        try {
            await axios.put(`/api/users/update/${currentUser.username}`, data, {
                headers: {
                    'Content-Type': "application/json"
                }
            });

            setSuccessMessage('Profile updated successfully!');
            window.location.reload();
        } catch (error) {
            setErrors(error.response.data.errors);
        }

        setLoading(false);
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    Profile
                </p>

                {errors.length > 0 && (
                    <div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-300" role="alert">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error.message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {successMessage && (
                    <div className="p-4 mb-4 text-sm text-green-700 rounded-lg bg-green-300" role="alert">
                        {successMessage}
                    </div>
                )}

                <div className="w-full bg-[#EEF7FF] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Edit Your Profile
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <input
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="johndoe"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Full Name
                                </label>
                                <input
                                    value={fullname}
                                    onChange={e => setFullName(e.target.value)}
                                    type="text"
                                    name="full_name"
                                    id="full_name"
                                    placeholder="John Doe"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                    required
                                />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className={`w-full text-white ${loading ? 'bg-blue-500' : 'bg-blue-600'} hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            >
                                {loading ? 'Updating ' : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
