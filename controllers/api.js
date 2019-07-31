const user = require("../server/user_action");
const APIError = require("../rest").APIError;
module.exports = {
    "GET /api/getuser": async(ctx, next) => {
        ctx.rest({
            data: user.getuser()
        });
    },
    "POST /api/login": async(ctx, next) => {
        var back_info = await user.login(ctx.request.body.username, ctx.request.body.password);
        if (back_info != "null") {
            ctx.rest({ "error": 0, "state": 1, "message": "登录成功", "data": JSON.parse(back_info) });
        } else {
            ctx.rest({ "error": 0, "state": 2, "message": "用户名密码错误!" })
        }
        await next();
    },
    "POST /api/res": async(ctx, next) => {
        var isres = await user.res(ctx.request.body.username, ctx.request.body.password, ctx.request.body.phone);
        console.log(isres);
        if (isres) {
            ctx.rest({ "error": 0, "state": 1, "message": "注册成功", "data": JSON.parse(isres) })
        } else {
            ctx.rest({ "error": 0, "state": 2, "message": "改用户已存在！" })
        }
        await next();
    },
    "POST /api/changePassword": async(ctx, next) => {
        var canChange = await user.changePassword(ctx.request.body.username, ctx.request.body.newpassword, ctx.request.body.phone);
        console.log(canChange);
        if (canChange == 1) {
            ctx.rest({ "error": 0, "state": 2, "message": "不存在改用户！" })
        } else if (canChange == 2) {
            ctx.rest({ "error": 0, "state": 3, "message": "请输入绑定手机号！" });
        } else if (canChange == 3) {
            ctx.rest({ "error": 0, "state": 1, "message": "修改密码成功!" });
        }
    }
}