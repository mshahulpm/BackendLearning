const express = require('express');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const app = express();
// app.use(passport.initialize());

/** @type {import('passport-jwt').StrategyOptionsWithoutRequest} */
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret_key',
    ignoreExpiration: true, // For testing purposes, ignore token expiration
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {

    // Here you would typically look up the user in your database
    // For this example, we'll just return the payload as the user object
    return done(null, jwtPayload);
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user);

    res.send('This is a protected route. You are authenticated!');
});

app.get('/login', (req, res) => {
    // In a real application, you would verify the user's credentials and generate a JWT
    const user = { id: 1, username: 'testuser' }; // Example user
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(user, jwtOptions.secretOrKey);
    res.json({ token });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
