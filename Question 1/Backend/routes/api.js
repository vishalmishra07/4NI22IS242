const express = require('express');
const router = express.Router();
const { getTopUsers, getPopularPosts, getLatestPosts } = require('../utils/analytics');
const { fetchAllData } = require('../services/fetchService');

router.get('/users', async (req, res) => {
  try {
    const data = await fetchAllData();
    console.log('data:', data)
    const topUsers = getTopUsers(data);
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/posts', async (req, res) => {
  const type = req.query.type;
  if (!type || !['popular', 'latest'].includes(type)) {
    return res.status(400).json({ error: "Query param 'type' must be 'popular' or 'latest'" });
  }

  try {
    const data = await fetchAllData();
    const result = type === 'popular' ? getPopularPosts(data) : getLatestPosts(data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
