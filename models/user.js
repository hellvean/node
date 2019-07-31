const db = require('../db');

module.exports = db.defineModel('user', {
    id: db.ID,
    password: db.STRING(100),
    nickname: db.STRING(100),
    phone: db.STRING(100)
}, {
    timestamps: false
});