define(function(require) {
    var $ = require('zepto');
    var uploadpic = require('uploadpic');
    var datahandle = require('datahandle');
    var votehandle = require('votehandle');
    var dialog = require('dialog');
    var time = require('tool');
    var page1_dataShow = require('page1');

    var Form = function(obj, fileArr) {
        var Reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        var _this = obj;
        var name,
            msg,
            piclist = [],
            formobj;
        var redata;
        var timed = time.getTimenyr();
        if (timed === "2017515") {
            alert('活动已结束谢谢你的参与！');
            return;

        };

        name = _this.find("lable[name=name]").text();
        msg = _this.find("textarea[name=msg]").val();
        var lilist = _this.find(".uppiclist li")
        lilist.forEach(function(item, index) {
            piclist.push($(item).find("img").eq(0).attr('src'));

        })

        if (!name) {
            alert("请填入您的姓名！")
            return
        } else if (!Reg.test(name)) {
            alert("请输入有效的姓名可包括数字、英文字符、中文字符！");
            return
        }

        if (!msg) {
            alert("请写几句你要说给妈妈的话！")
            return
        }

        if (lilist.length == 0) {
            alert("请至少上传一张妈妈的照片！")
            return
        };

        if (fileArr) {
            setTimeout(function() {
                uploadpic().UploadImg(fileArr)
                    .then(function(rdata) {

                        formobj = {
                            'openid': JSON.parse(sessionStorage.getItem('user')).openid,
                            'name': name,
                            'msg': msg,
                            'piclist': rdata
                        };

                        datahandle().writeData(formobj).then(function(data) {
                            console.log("data.msg.data" + data.msg);
                            redata = data;
                            return votehandle().getData();

                        }, function(data) {
                            console.log("error");
                        }).then(function(data) {
                            console.log("has data");
                            formSubmitAfter(data);

                        }, function(data) {
                             console.log("no data");
                            formSubmitAfter();

                        }).catch(function(err) {
                            console.log(err);
                        });

                        function formSubmitAfter(data) {
                             console.log("formSubmitAfter");
                            var datalist = redata.msg.data;
                            if (data) {
                                datalist.loverlist = "";
                            } else {
                                datalist.loverlist = data;
                            }

                            var msg = "<p>" +
                                "恭喜,您已经成功参加我们的母亲节活动，<em>您的编号是：" + redata.idnum + "</em>。</p>" +
                                "<p>点击右上角的按钮分享到朋友圈，让妈妈获得更多人的爱吧!</p>"
                            setTimeout(function() {
                                dialog({
                                    title: "提交成功",
                                    content: msg
                                }).show(function() {

                                    //显示首页
                                    $(".page").hide();
                                    $(".page1").show();
                                    page1_dataShow.showdata({ "data": datalist });

                                });
                            }, 1000)

                        }


                    }, function(data) {

                    }).catch(function(err) {
                        console.log(err)

                    });


            }, 1000)

        } else {
            console.log('fileArr is not exist!')
            return false;
        }
    };

    return {
        form: Form
    };

})
