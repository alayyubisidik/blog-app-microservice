import React, { useState } from 'react';
import axios from 'axios';
import buildClient from "../api/build-client";
import Link from 'next/link'
import formatDate from '../utils/format-date'
import truncateContent from '../utils/truncate-content';

const LandingPage = ({ currentUser, posts, categories, users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const [loading, setLoading] = useState(false);

  console.log(searchResults)

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: searchedPosts } = await axios.get(`/api/posts`, {
        params: { search: searchTerm }
      });
      setSearchResults(searchedPosts.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status == 404) {
        setSearchResults([]);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 flex flex-col gap-5 pt-[5rem]">
        <div className=" max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <div className="relative bg-white shadow-md sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center" onSubmit={handleSearch}>
                  <label htmlFor="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" id="simple-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required="" />
                  </div>
                  <button type="submit" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Search</button>
                </form>
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <form onSubmit={handleSearch}>
                  <div className="flex gap-5 items-end">
                    <div className="">
                      <label htmlFor="category" className="mb-3 text-sm font-medium text-gray-900 ">Category</label>
                      <select id="category" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option value="">All</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.name} className='text-black'>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <label htmlFor="user" className="mb-3 text-sm font-medium text-gray-900 ">Author</label>
                      <select id="user" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option value="">All</option>
                        {users.map(user => (
                          <option key={user.id} value={user.full_name} className='text-black'>{user.full_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none">
                          Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 mx-auto  lg:px-12 w-full pb-10">
          <div className="mt-6 flow-root ">
            <div className="-my-6 divide-y divide-gray-200 ">

              {searchResults.length > 0 ? (
                searchResults.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="space-y-4 py-6 px-7 md:py-8 border-b-2 hover:bg-gray-200  ">
                      <div className="grid gap-4">
                        <div>
                          <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800  md:mb-0">{post.category.name}</span>
                        </div>
                        <p className="text-xl inline-block font-semibold  text-gray-900 hover:underline ">{post.title}</p>
                      </div>
                      <p className="text-base font-normal text-gray-500 ">{truncateContent(post.content, 20)}</p>
                      <div className="text-sm font-medium text-gray-500 ">
                        {formatDate(post.created_at)} by
                        <p className="ml-1 text-gray-900 inline-block">{post.user.full_name}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className='text-xl font-semibold m-5'>Blog not found</p>
              )}
            </div>

          </div>

        </div>
      </section>

      <section  id="about" class="bg-white h-[50vh] mt-[2rem] pt-[5rem]">
        <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 ">About Our Blogging Platform</h2>
            <div class=" text-gray-800 text-center">
              <p className='text-xl'>Welcome to our blogging platform! My name is Ayyub, a tech enthusiast and freelance writer dedicated to creating a space where individuals can share their knowledge, experiences, and stories. With a background in Computer Science from XYZ University and over 5 years in the IT industry, I've developed this platform to empower users to create and publish their own blogs with ease. Here, you'll find a community of like-minded individuals passionate about various topics, from technology and programming to lifestyle and more. Whether you're here to read, write, or connect with others, our goal is to provide a seamless and inspiring blogging experience. If you have any questions or need support, feel free to contact me at andi@example.com or follow me on [Twitter](https://twitter.com/andi). Thank you for being a part of our community!
              </p>
            </div>
        </div>
      </section>

    </>
  );
};

export async function getServerSideProps(context) {
  const client = buildClient(context.req);

  const { data: posts } = await client.get('/api/posts');
  const { data: categories } = await client.get('/api/categories');
  const { data: users } = await client.get('/api/users');

  return {
    props: {
      posts: posts.data,
      categories: categories.data,
      users: users.data,
    }
  };
}

export default LandingPage;
