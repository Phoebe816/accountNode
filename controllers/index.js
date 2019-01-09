var fn_index = async(ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

/* var fn_signin = async(ctx, next) => {
    var name = ctx.request.body.name || '',
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        console.log('signin ok!');
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        console.log('signin failed!');
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
}; */

module.exports = {
    'GET /': fn_index,
    // 'POST /signin': fn_signin
};