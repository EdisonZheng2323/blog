import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/posts', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <div>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <br></br>
          </div>
        ))}
      </ul>
      {localStorage.getItem('token') &&
        <button onClick = {logout}> Log out</button>
      }
    </div>
  );
};

export default Posts;