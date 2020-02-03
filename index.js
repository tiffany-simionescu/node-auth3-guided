require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));


// === NOTES === //

// Downsides to sessions / cookies
//    - scalability, storage in db, managaing sessions, slow, 
// Scalling horizontally - scalling out on multiple servers
// Vertical Scalling - changing resources within the server (memory, processing power, etc.)

// JWT - stateless and self contained - industry standard
// Stateless means no db is needed to store data
// There's no way to log out with JWT, can't trust client to log out

// JWT - Header (Type: JWT, Algorithm: HS256), Payload (Data - sub, iat), Signature (headers + payload + secret signature)
// Don't hold sensitive info in payload, because user can decrypt this information

// If JWT secret signature is found out, anyone can recreate the JWT
// Sessions - memory, JWT - signature

