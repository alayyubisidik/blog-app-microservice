
import UserIcon from "../../../components/dashboard/icon/user-icon"
import DashboardAdminLayout from "./layout"
import OverviewBox from "../../../components/dashboard/overview-box"
import CategoryIcon from "../../../components/dashboard/icon/category-icon"
import PostIcon from "../../../components/dashboard/icon/post-icon"
import FeedbackIcon from "../../../components/dashboard/icon/feedback-icon"
import Link from "next/link"
import axios from "axios"
import buildClient from "../../../api/build-client"


const OverviewPage = ({ usersCount, categoriesCount, postsCount }) => {
 

    return (
        <DashboardAdminLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="rounded-lg  h-32 md:h-64">
                    <Link href={'/dashboard/admin/user'} className={`block w-full h-full p-6 bg-red-500 border border-gray-200 rounded-lg shadow hover:bg-red-400 `}>
                        <div className="flex gap-5 items-center h-full">
                            <div className="w-[20%] flex justify-center items-center">
                                <UserIcon width={50} height={50} color={"white"}/>
                            </div>
                            <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">{usersCount} Users</h5>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg  h-32 md:h-64">
                    <Link href={'/dashboard/admin/category'} className={`block w-full h-full p-6 bg-blue-500 border border-gray-200 rounded-lg shadow hover:bg-blue-400 `}>
                        <div className="flex gap-5 items-center h-full">
                            <div className="w-[20%] flex justify-center items-center">
                                <CategoryIcon width={50} height={50} color={"white"}/>
                            </div>
                            <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">{categoriesCount} Categories</h5>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg  h-32 md:h-64">
                    <Link href={'/dashboard/admin/post'} className={`block w-full h-full p-6 bg-orange-500 border border-gray-200 rounded-lg shadow hover:bg-orange-400 `}>
                        <div className="flex gap-5 items-center h-full">
                            <div className="w-[20%] flex justify-center items-center">
                                <PostIcon width={50} height={50} color={"white"}/>
                            </div>
                            <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">{postsCount} Posts</h5>
                        </div>
                    </Link>
                </div>
                <div className="rounded-lg  h-32 md:h-64">
                    <Link href={'/dashboard/admin/user'} className={`block w-full h-full p-6 bg-green-500 border border-gray-200 rounded-lg shadow hover:bg-green-400 `}>
                        <div className="flex gap-5 items-center h-full">
                            <div className="w-[20%] flex justify-center items-center">
                                <FeedbackIcon width={50} height={50} color={"white"}/>
                            </div>
                            <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">5 Feedback</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </DashboardAdminLayout>
    )
}

export async function getServerSideProps({ req }) {
    const client = buildClient(req);

    const { data: posts } = await client.get('/api/posts');
    const { data: users } = await client.get('/api/users');
    const { data: categories } = await client.get('/api/categories');
    
    return {
        props: {
            usersCount: users.data.length,
            categoriesCount: categories.data.length,
            postsCount: posts.data.length
        }
    }
}

export default OverviewPage 