require('dotenv').config();
const express = require('express');

const verifyRoute = require('./routes/verify');
const issueRoute = require('./routes/issue');
const revokeRoute = require('./routes/revoke');
const activateRoute = require('./routes/activate')
const tokenRoute = require('./routes/tokens')

const app = express();
app.use(express.json());

app.use('/lock', verifyRoute);
app.use('/lock/admin', issueRoute);
app.use('/lock/admin', revokeRoute);
app.use('/lock/admin', tokenRoute)
app.use('/lock', activateRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`));
