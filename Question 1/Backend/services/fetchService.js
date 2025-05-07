const axios = require("axios");

const BASE_URL = "http://20.244.56.144/evaluation-service";
const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2NjI3NzQ0LCJpYXQiOjE3NDY2Mjc0NDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIxYjhjZWEzLTcxN2QtNGQzNy05YTRlLThjYTk1OGIwNzQ1MCIsInN1YiI6InZpc2hhbG1pc2hyYTc4MjhAZ21haWwuY29tIn0sImVtYWlsIjoidmlzaGFsbWlzaHJhNzgyOEBnbWFpbC5jb20iLCJuYW1lIjoidmlzaGFsIG1pc2hyYSIsInJvbGxObyI6IjRuaTIyaXMyNDIiLCJhY2Nlc3NDb2RlIjoiRFJZc2NFIiwiY2xpZW50SUQiOiJiMWI4Y2VhMy03MTdkLTRkMzctOWE0ZS04Y2E5NThiMDc0NTAiLCJjbGllbnRTZWNyZXQiOiJhSlVHTU5LenFzZW5DVEhCIn0.Z2ULvSY1xkeKLHdL0_QVI9fBWQdxTKpgubTrfc79L3w`;
const HEADERS = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

async function fetchUsers() {
  const res = await axios.get(`${BASE_URL}/users`, { headers: HEADERS });
  const usersMap = res.data.users;
  return Object.entries(usersMap).map(([id, name]) => ({
    id: parseInt(id),
    name,
  }));
}

async function fetchPostsByUser(userId) {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: HEADERS,
  });
  return res.data.posts;
}

async function fetchCommentsByPost(postId) {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
    headers: HEADERS,
  });
  return res.data.comments;
}

async function fetchAllData() {
  const users = await fetchUsers();
  console.log('users:', users)
  const allPosts = [];
  const allComments = [];

  for (const user of users) {
    const posts = await fetchPostsByUser(user.id);
    allPosts.push(...posts);

    for (const post of posts) {
      const comments = await fetchCommentsByPost(post.id);
      allComments.push(...comments);
    }
  }

  return { users, posts: allPosts, comments: allComments };
}

module.exports = {
  fetchAllData,
};
