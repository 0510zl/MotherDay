define(function(require) {
    var $ = require('zepto');
    var wx = require('weixintool')
    var tool = require('tool');
    var page1_dataShow = require('page1');
    var url = tool.getLoacalUrl();
    $(function() {

        if (tool.getquerystring("code")) {
            var FileController = "./php/weixin/oauth2.php";
            var code = tool.getquerystring("code");
            var obj = { 'code': code };
            $.ajax({
                url: FileController,
                type: "post",
                data: obj,
                success: function(data) {
                    var data = JSON.parse(data);
                    if (data === 0) {
                        //没有关注
                        window.location.href = url + 'fllow.html?time=' + ((new Date()).getTime());

                    } else {                     
                        if (data.errcode) {
                            tool.toreload();                           
                        } else {
                            var userobj = {
                                'openid': data.openid,
                                'nickname': data.nickname
                            };
                            sessionStorage.setItem('user', JSON.stringify(userobj));                            
                            $(".menu").show();
                            page1_dataShow.showdata();

                        }

                    }
                },
                error: function(err) {
                   alert(new Error(err))                  
                }

            })
        } else {
           alert("没有获取到code值,请联系管理员")
        }

        weinxinJDK();

        function weinxinJDK() {

            $.ajax({
                url: "./php/weixin/weixin.php",
                type: "get",
                success: function(data) {
                    var data = JSON.parse(data);
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                    });

                },
                error: function(data) {
                      alert("微信权限获取失败，请联系管理员")
                }
            })

        }



    })



    wx.ready(function() { //检测api是否生效

        wx.onMenuShareAppMessage({
            title: '母亲节，勿忘初心', // 分享标题
            desc: '母亲节，一个感恩母亲的节日。感谢母亲10月怀胎生育了我们，感谢母亲不辞辛劳养育了我们。', // 分享描述
            link: url, // 分享链接
            imgUrl: url + 'images/2307.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareTimeline({
            title: '母亲节，勿忘初心', // 分享标题
            // link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf166b3a749aaf36f&redirect_uri='+url+'&response_type=code&scope=snsapi_base#wechat_redirect', // 分享链接
            link: url, // 分享链接
            imgUrl: url + 'images/2307.jpg', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数

            }
        });


    })



})
