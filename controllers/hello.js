var fn_hello = async(ctx, next) => {
    ctx.render('hello.html', {
        title: 'Welcome'
    });
};

module.exports = {
    'GET /hello/': fn_hello
};