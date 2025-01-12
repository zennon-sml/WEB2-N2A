const bcrypt = require('bcryptjs');
bcrypt.hash('a', 10, (err, hash) => console.log(hash));