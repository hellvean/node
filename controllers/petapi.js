const user = require("../server/pet_action");
const APIError = require("../rest").APIError;

module.exports = {
    "POST /api/getPetlist": async(ctx, next) => {
        var pet_info = await user.getpetlist(ctx.request.body.ownerid, ctx.request.body.page, ctx.request.body.count);
        ctx.rest({ "error": 0, "state": 1, "message": "获取成功", "data": JSON.parse(pet_info[0]), "nums": pet_info[1] });
        await next();
    },
    "POST /api/addPet": async(ctx, next) => {
        var addinfo = await user.addpet(ctx.request.body.ownerid, ctx.request.body.petname);
        if (addinfo == 1) {
            ctx.rest({ "error": 0, "state": 1, "message": "添加成功" });
        } else {
            ctx.rest({ "error": 0, "state": 2, "message": "添加失败" });
        }
        await next();
    },
}