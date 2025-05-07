import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardHeader, Avatar, CircularProgress } from '@mui/material';
import { fetchTopUsers } from '../api/api';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTopUsers = async () => {
    try {
      const res = await fetchTopUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch top users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top 5 Users by Posts
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card>
                <CardHeader
                  avatar={<Avatar src={user.avatarUrl || `https://randomuser.me/api/portraits/men/${user.id}.jpg`} />}
                  title={user.name}
                  subheader={`Posts: ${user.postCount}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TopUsers;
