import { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { fetchFeedPosts } from '../api/api';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await fetchFeedPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Latest Posts</Typography>
      {loading ? (
      <CircularProgress />
    ) :(
      posts.map((post) => <PostCard key={post.id} post={post} />)
    )}
    </Container>
  );
};

export default Feed;