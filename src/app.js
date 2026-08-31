require('dotenv').config();
const express = require('express');

const verifyRoute = require('./routes/verify');
const issueRoute = require('./routes/issue');
const revokeRoute = require('./routes/revoke');
const activateRoute = require('./routes/activate')

const app = express();
app.use(express.json());

app.use('/lock', verifyRoute);
app.use('/lock', issueRoute);
app.use('/lock', revokeRoute);
app.use('/lock', activateRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`));
