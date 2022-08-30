import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { loginRoute, postRoute, updatepostRoute, detailpostRoute } from '../../../utils/APIRoutes';
import Header from './../../../components/Header';

import {
    FacebookShareButton,
    FacebookIcon,
} from 'next-share';


function Detail() {
    const [currentPost, setCurrentPost] = useState({});

    const router = useRouter();
    console.log("routerr", router.query.id);
    const idRoute = router.query.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${detailpostRoute}/${router.query.id}`);
            const data1 = await axios.patch(`${detailpostRoute}/${router.query.id}`, data);
            console.log(data1);
            setCurrentPost(data1.data);
        }
        fetchData();
    }, [idRoute]);


    console.log("currentPost", currentPost);

    const handleIncrementLike = async () => {
        const data = await axios.get(`${detailpostRoute}/${router.query.id}`);
        const data2 = await axios.put(`${detailpostRoute}/${router.query.id}`, data);
        console.log(data);
        setCurrentPost(data2.data);
    }

    const d = new Date(currentPost.updatedAt);
    const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
    return (
        <div>
            <Header />
            <div
                className='w-full p-8 flex flex-col justify-between h-auto overflow-auto lg:h-auto'
            >
                <div className="flex gap-1">
                    <h1 class='text-left text-3xl font-bold leading-normal'>
                        {currentPost.title}
                    </h1>
                    <tag className="text-emerald-300 bg-green-600 h-8 rounded-md">{currentPost.category}</tag>
                </div>
                <div className='text-sm gap-4 flex'>
                    {currentPost.content}
                </div>
                <span className='text-gray-800 font-bold'>{currentPost?.author?.name} <span className='text-gray-600 font-normal'>{" "}{date}</span></span>

                <div className='flex gap-4'>
                    <div className="text-red-600 text-xl flex items-center gap-2">
                        <div className="cursor-pointer" onClick={() => handleIncrementLike()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                        </div>
                        {currentPost.likes}
                    </div>
                    <div className="text-gray-800 flex text-xl items-center gap-2">
                        <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        {currentPost.views}
                    </div>

                    <div className="text-gray-800 flex text-xl items-center gap-2">
                        <div className="cursor-pointer">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                            </svg> */}

                            <FacebookShareButton
                                url={`https://github.com/posts/detail/${currentPost.id}`}
                                quote={'next-share is a social share buttons for your next React apps.'}
                                hashtag={'#nextshare'}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;