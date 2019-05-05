const express = require('express')
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongoURI, {
    auth: {
        user: keys.mongoUserName,
        password: keys.mongoPassword
    }
});

mongoose.connection.once('open', () => {
    console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(keys.port, () => {
    console.log(`now listing for requests on port ${keys.port}`);
});