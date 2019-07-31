//数据库配置
const model = require('../model');
//引入文件处理模块
const formidable = require('formidable')
const path = require('path');
const fs = require('mz/fs');

module.exports = {
    "uploadimg": (ctx) => {
        const form = new formidable.IncomingForm(); //创建form对象
        form.uploadDir = __dirname.substring(0,__dirname.length-7) + "/uploadsave/imgsave"; //设置上传文件存放的文件夹，默认为系统的临时文件夹
        form.keepExtensions = true; //设置该属性为true可以使得上传的文件保持原来的文件的扩展名
        form.maxFieldsSize = 2 * 1024 * 1024; //限制所有存储表单字段域的大小（除去file字段），如果超出，则会触发error事件，默认为2M
        console.log(form.uploadDir);
        var result = form.parse(ctx.req, function(err, fields, files) {
            console.log(JSON.stringify(files))
            let extName = ''; //后缀名
            switch (files.imgdata.type) {
                case 'image/jpg':
                    extName = 'png';
                    break;
                case 'image/pjpeg':
                    extName = 'png';
                    break;
                case 'image/jpeg':
                    extName = 'png';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            };
            if (extName == "") {
                let tempPath = files.imgdata.path;
                fs.unlink(tempPath, function(err) {
                    if (err) throw err;
                    console.log('删除缓存区图片成功')
                });
                return;
            };
            if (err) {

            } else {
                let userPhotoFolderPath = path.resolve(__dirname, '..') + "\\uploadsave\\imgsave\\" + "125";
                fs.access(userPhotoFolderPath,function(err){
                    console.log("判断文件名是否存在的参数："+err)
                //    文件和目录不存在的情况下；
                    if(err != null && err != 'null'){
                        if(err.code == "ENOENT"){
                            console.log("文件和目录不存在");
                            fs.mkdir(userPhotoFolderPath, function(err) {
                                if (err) console.error(err);
                                console.log('创建目录成功');
                            });
                        }
                    }else{
                        console.log('文件夹存在');
                    };
                    let newPath = __dirname.substring(0,__dirname.length-7) + "/uploadsave/imgsave/" + "125/" + Math.random().toString().substr(2, 12) + '.' + extName;
                    console.log("重命名："+newPath);
                    fs.renameSync(files.imgdata.path, newPath);
                });
                // fs.exists(userPhotoFolderPath, function(exists) {
                //     console.log(userPhotoFolderPath);
                //     console.log(exists);
                //     if (!exists) {
                //         console.log('文件夹不存在');
                //         fs.mkdir(userPhotoFolderPath, function(err) {
                //             if (err) console.error(err);
                //             console.log('创建目录成功');
                //         });
                //     } else {
                //         console.log('文件夹存在');
                //     }
                //     //保存到对应的文件夹
                //     let newPath = "/node/uploadsave/imgsave/" + "125/" + Math.random().toString().substr(2, 12) + '.' + extName;
                //     fs.renameSync(files.imgdata.path, newPath);
                // });
            }
        })
        //console.log(result)
        return result;
    },
    "uploadimg2": (data) => {
        //图片64位编码存为图片
        let userPhotoFolderPath = path.resolve(__dirname, '..') + "\\uploadsave\\imgsave\\" + "125";
        fs.exists(userPhotoFolderPath, function(exists) {
            console.log(userPhotoFolderPath)
            if (!exists) {
                console.log('文件夹不存在');
                fs.mkdir(userPhotoFolderPath, function(err) {
                    if (err) console.error(err);
                    console.log('创建目录成功');
                });
            } else {
                console.log('文件夹存在');
            }
            var base64 = data.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64, 'base64');
            let newPath = "/nodetest/uploadsave/imgsave/" + "125/" + Math.random().toString().substr(2, 12) + '.png';
            //保存到对应的文件夹
            fs.writeFile(newPath, dataBuffer, function(err) { //用fs写入文件
                if (err) {
                    console.log(err);
                } else {
                    console.log('写入成功！');
                    return 1;
                }
            })
        });
    }
}