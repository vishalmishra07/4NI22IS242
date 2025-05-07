import { useEffect, useState } from "react";
import { fetchTrendingPosts } from "../api/api";

function TrendingPosts() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await fetchTrendingPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Popular Posts</Typography>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Container>
  );
  }
  export default TrendingPosts;