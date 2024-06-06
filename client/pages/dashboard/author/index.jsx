import Link from "next/link"
import PostIcon from "../../../components/dashboard/icon/post-icon"
import DashboardAuthorLayout from "./layout"
import buildClient from "../../../api/build-client"

const OverviewPage = ({ postsCount }) => {
    return (
        <DashboardAuthorLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="rounded-lg  h-32 md:h-64">
                    <Link href={'/dashboard/author/post'} className={`block w-full h-full p-6 bg-red-500 border border-gray-200 rounded-lg shadow hover:bg-red-400 `}>
                        <div className="flex gap-5 items-center h-full">
                            <div className="w-[20%] flex justify-center items-center">
                                <PostIcon width={50} height={50} color={"white"}/>
                            </div>
                            <h5 className="flex-2 mb-2 text-2xl font-bold tracking-tight text-white ">{postsCount} Posts</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </DashboardAuthorLayout>
    )
}

export async function getServerSideProps({ req }) {
    const client = buildClient(req);

    const { data: user } = await client.get('/api/users/currentuser');
    const { data: posts } = await client.get(`/api/posts/user/${user.currentUser.id}`);

    return {
        props: {
            postsCount: posts.data.length
        }
    }
}

export default OverviewPage