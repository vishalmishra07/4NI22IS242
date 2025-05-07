import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { fetchFeedPosts } from '../api/api';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await fetchFeedPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    // loadPosts();
    // const interval = setInterval(loadPosts, 5000); // Poll every 5 sec
    // return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Live Feed</Typography>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Container>
  );
};

export default Feed;
