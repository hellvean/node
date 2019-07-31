const db = require('../db');

module.exports = db.defineModel('pets', {
    id: db.ID,
    name: { type: db.STRING(100), comment: '宠物名称' },
    userid: db.BIGINT,
}, {
    timestamps: false
});