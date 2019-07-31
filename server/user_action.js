//数据库配置
const model = require('../model');
let User = model.user;

module.exports = {
    "getuser": () => {
        return userinfo;
    },
    "login": (username, password) => {
        var data = (async() => {
            var info = await User.findOne({
                where: {
                    nickname: username,
                    password: password
                }
            });
            return JSON.stringify(info)
        })();
        return data;
    },
    "res": (username, password, phone) => {
        var data = (async() => {
            var user = await User.findOne({
                where: {
                    nickname: username
                }
            });
            if (!user) {
                //注册
                var newUser = await User.create({
                    nickname: username,
                    password: password,
                    phone: phone
                });
                return JSON.stringify(newUser);
            } else {
                //用户已存在
                return "";
            }
        })()
        return data;
    },
    "changePassword": (username, newpassword, phone) => {
        var data = (async() => {
            var user = await User.findOne({
                where: {
                    nickname: username
                }
            });
            console.log(user)
            if (!user) {
                //不存在用户
                return 1;
            } else {
                //存在用户可以修改
                //判断上传的手机号是否与用户在数据库的手机号相同
                var userinfo = JSON.parse(JSON.stringify(user));
                if (userinfo.phone == phone) {
                    //手机号相同可以修改密码
                    user.password = newpassword;
                    await user.save();
                    return 3;
                } else {
                    //手机号不同无法修改
                    return 2;
                }
            }
        })();
        return data;
    }
}