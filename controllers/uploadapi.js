const uploadform = require("../server/uploadform");
const APIError = require("../rest").APIError;

module.exports = {
    "POST /api/uploadimg": async(ctx, next) => {
        var back_info = await uploadform.uploadimg(ctx);
        ctx.rest({ "error": 0, "state": 1, "message": "保存成功" });
        await next();
    },
    "POST /api/uploadimg2": async(ctx, next) => {
        var back_info = await uploadform.uploadimg2(ctx.request.body.pic);
        ctx.rest({ "error": 0, "state": 1, "message": "保存成功" });
        await next();
    }
    // "POST /api/uploadimg": async(ctx, next) => {
    //     console.log(ctx.request.body);
    //     var back_info = await uploadform.uploadimg(ctx.request.body.imgdata);
    //     console.log(back_info);
    //     if (back_info != "null") {
    //         ctx.rest({ "error": 0, "state": 1, "message": "上传成功" });
    //     } else {
    //         ctx.rest({ "error": 0, "state": 2, "message": "上传失败!" })
    //     }
    //     await next();
    // }
}