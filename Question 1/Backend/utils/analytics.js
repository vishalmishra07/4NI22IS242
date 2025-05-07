function getTopUsers(data) {
  const { users, posts, comments } = data;
  const commentCountByPost = {};
  comments.forEach((c) => {
    commentCountByPost[c.postid] = (commentCountByPost[c.postid] || 0) + 1;
  });

  const commentCountByUser = {};
  posts.forEach((p) => {
    const count = commentCountByPost[p.id] || 0;
    commentCountByUser[p.userid] = (commentCountByUser[p.userid] || 0) + count;
  });

  return users
    .map((u) => ({
      id: u.id,
      name: u.name,
      commentCount: commentCountByUser[u.id] || 0,
    }))
    .sort((a, b) => b.commentCount - a.commentCount)
    .slice(0, 5);
}

function getPopularPosts(data) {
  const { posts, comments } = data;
  const commentCountByPost = {};
  comments.forEach((c) => {
    commentCountByPost[c.postid] = (commentCountByPost[c.postid] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(commentCountByPost), 0);
  return posts.filter((p) => commentCountByPost[p.id] === maxCount);
}

function getLatestPosts(data) {
  const { posts } = data;
  return posts
    .sort((a, b) => b.id - a.id) // Assuming post IDs increase with time
    .slice(0, 5);
}

module.exports = {
  getTopUsers,
  getPopularPosts,
  getLatestPosts,
};
