import DashboardAdminLayout from './layout'

const FeedbackPage = () => {
    return (
        <DashboardAdminLayout>
            <section className="bg-gray-50  p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* <!-- Start coding here --> */}
                    <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex mb-[5px] flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <p className='text-xl font-semibold'>Feedback</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">No</th>
                                        <th scope="col" className="px-4 py-3">Title</th>
                                        <th scope="col" className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b ">
                                        <td className="px-4 py-3">1</td>
                                        <td className="px-4 py-3">PC</td>
                                        <td className="px-4 py-3"><button>Button</button></td>
                                    </tr>
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

export default FeedbackPage