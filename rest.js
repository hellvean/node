module.exports = {
    APIError: function(code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        pathPrefix = pathPrefix || '/api/';
        return async(ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`请求接口 ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    console.log('请求的参数：' + JSON.stringify(data));
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next();
                } catch (e) {
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    // ctx.response.body = {
                    //     code: e.code || 'internal:unknown_error',
                    //     message: e.message || ''
                    // };
                    ctx.response.body = {
                        message: e
                    };
                }
            } else {
                await next();
            }
        };
    }
};