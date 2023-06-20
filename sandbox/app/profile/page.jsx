'use client';

import { useState, useEffect } from 'react';
import { useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            let userId = session?.user.id;
            const response = await fetch(`/api/users/${userId}/posts/`);
            const data = await response.json();
            console.log(data);

            setMyPosts(data);
        }
    
        if (session?.user.id) fetchPosts();
    }, [])

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile