import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
const Post = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState('');
  const {postId} = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data.post); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch post');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchPost();
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
    </div>
  );
};

export default Post;