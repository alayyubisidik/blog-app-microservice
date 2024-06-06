import React from 'react'
import buildClient from '../../api/build-client';
import formatDate from '../../utils/format-date';
import truncateContent from '../../utils/truncate-content';
import Link from 'next/link';

const BlogDetailPage = ({ post, relatedPosts }) => {
    return (
        <main className=" bg-white  antialiased pt-[5rem] ">
            <div className="flex justify-between px-4 mx-auto max-w-screen-lg rounded-md pb-28 pt-5 shadow-md mb-[10rem]">
                <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue ">
                    <header className="mb-4 lg:mb-6 not-format">
                        <address className="flex items-center mb-6 not-italic">
                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                                <img className="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos"/>
                                <div>
                                    <Link href="#" rel="author" className="text-xl font-bold text-gray-900 ">{post.user.full_name}</Link>
                                    <p className="text-base text-gray-500 ">{post.user.username}</p>
                                    <p className="text-base text-gray-500 ">{formatDate(post.created_at)}</p>
                                </div>
                            </div>
                        </address>
                        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 mb-3 lg:text-4xl ">{post.title}</h1>
                        <div>
                            <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800  md:mb-0">{post.category.name}</span>
                        </div>
                    </header>
                    <p className="lead">{post.content}</p>
                </article>
            </div>
            <aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-100 ">
                    <div className="px-4 mx-auto max-w-screen-xl">
                        <h2 className="mb-8 text-2xl font-bold text-gray-900 ">Related articles</h2>
                        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 ">
                            {relatedPosts.map(post => (
                                    <article className="bg-white rounded-lg">
                                        <Link href={`/blog/${post.slug}`}>
                                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" className="mb-5 " alt="Image 1"/>
                                        </Link>
                                        <div className="px-7 pb-7 ">
                                            <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 ">
                                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h2>
                                            <p className="mb-4 text-gray-500 ">{truncateContent(post.content, 15)}</p>
                                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-medium underline-offset-4 text-primary-600  hover:underline">
                                                Read more
                                            </Link>
                                        </div>
                                    </article>
                            ))}
                        </div>
                    </div>
            </aside>
        </main>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context.req);
    const slug = context.query.slug;

    const { data: post } = await client.get(`/api/posts/${slug}`);
    const { data: relatedPosts } = await client.get(`/api/posts/related-posts/${post.data.id}/${post.data.user.id}/${post.data.category.id}`);

    return {
        props: {
            post: post.data,
            relatedPosts: relatedPosts.data
        }
    };
}


export default BlogDetailPage