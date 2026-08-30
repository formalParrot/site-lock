require('dotenv').config();
const express = require('express');

const verifyRoute = require('./routes/verify');
const issueRoute = require('./routes/issue');
const revokeRoute = require('./routes/revoke');

const app = express();
app.use(express.json());

app.use('/lock', verifyRoute);
app.use('/lock', issueRoute);
app.use('/lock', revokeRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`));
