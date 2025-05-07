import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const PostCard = ({ post }) => (
  <Card sx={{ mb: 2 }}>
    <CardMedia component="img" height="200" image={post.imageUrl} />
    <CardContent>
      <Typography variant="h6">{post.title}</Typography>
      <Typography variant="body2">By {post.author} | Comments: {post.commentCount}</Typography>
    </CardContent>
  </Card>
);

export default PostCard;
