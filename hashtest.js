const bcrypt = require('bcryptjs');
bcrypt.hash('teste', 10, (err, hash) => console.log(hash));