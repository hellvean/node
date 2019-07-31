const model = require('../model');
let User = model.user;
let Pet = model.pet;
User.hasOne(Pet);

module.exports = {
    "getpetlist": (ownerid, page, nums) => {
        var data = (async() => {
            var start = (parseInt(page) - 1) * 10;
            var info = await Pet.findAll({
                // include: [Pet],
                where: {
                    userid: ownerid
                },
                limit: [start, parseInt(nums)]
            });
            //console.log(JSON.stringify(info));
            var allnums = await Pet.count({
                // include: [Pet],
                where: {
                    userid: ownerid
                }
            });
            if (JSON.stringify(info) != "null") {
                return [JSON.stringify(info), allnums];
            } else {
                return [];
            }
        })();
        return data;
    },
    "addpet": (ownerid, petname) => {
        var data = (async() => {
            var newPet = await Pet.create({
                userid: ownerid,
                name: petname,
            });
            return 1;
        })();
        return data;
    }
}