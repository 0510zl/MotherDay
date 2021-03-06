define(function(require) {
    var $ = require('zepto');
    var dialog = require('dialog');
    var datahandle = require('datahandle');
    var votehandle = require('votehandle');
    var tool = require('tool');
    var loverlist;
    var datalist;
    var datalist1; //保存datalist
    var user;


    function showData(opt) {
        //------------------page1-------------------------
        //数据读取

         var id =(opt&&opt.id)?opt.id:"";
         var data =(opt&&opt.data)?opt.data:"";

        var flag;
       
        if (data) {           
            datalist1 = data;
        };        
        if (sessionStorage.getItem('user')) {
            user = JSON.parse(sessionStorage.getItem('user'));
        } else {
            tool.toreload();
        };
        if (datalist1 && !id) { //解决点赞后页面数据读取不出
            //datalist 有值           
            dataShowlist(datalist1);
        } else {           
            //第一次载入
            votehandle().getDataByOpenid(user.openid).then(function(data) {               
                loverlist = data;
                if (id) {
                    return datahandle().getDataById(id);
                } else {                   
                    return datahandle().getData();
                }

            }).then(function(data) {    
                if(data){               
                    //保证getData与getDataById输出格式一致
                    if (id) {
                        var dataToArry = [];
                        dataToArry.push(data);
                        data = dataToArry;
                     }
                    data.loverlist = loverlist;                    
                    dataShowlist(data);
                    }
                    else{
                            $(".motherslist").empty();
                            $(".page1").show();
                            $(".motherslist").html("<p class='warn'>暂无数据<p>")
                    }
               
            }).catch(function(err) { alert(err) });
         

        }

        function dataShowlist(data) {
            datalist = data;

            $(".motherslist").empty();
            if (!id) {
                $(".page1").show();
            }
            var txt = "<ul class='clearfix'>";
            txt = txt + "</u>";
            $(".motherslist").html(txt);

            //加载更多：分页显示
            var counter = 0; /*计数器*/
            var pageStart = 0; /*offset*/
            var pageSize = 6; /*每页显示数据条数*/
            txt = txt + getDataList(pageStart, pageSize);
           var morebutton = $(".page1").find(".addmore>button");
           morebutton.hide()
            //按钮显示
            if (Math.ceil(datalist.length / pageSize) > 1) {
               
                morebutton.show();
                morebutton.tap(function() {
                    counter++;
                    var _this = $(this);
                    pageStart = counter * pageSize;

                    _this.html("加载中...");
                    var txt = getDataList(pageStart, pageSize);
                    $(".motherslist>ul").append(txt);
                    _this.html("+加载更多");
                    if ((pageStart + pageSize) >= datalist.length) {
                        _this.hide();
                    }
                })

            }
            $(".menu").show();



            //分页
            function getDataList(startpos, size) {
                var item,
                    txt = "";
                var endsize = (startpos + size) > (datalist.length - 1) ? datalist.length : (startpos + size);
              
                for (var i = startpos; i < endsize; i++) {

                    item = datalist[i];
                    var squnum = 1000 + item.id;
                    txt = txt + "<li>" +
                        "<P class='img'><img src=" + item.piclist[0] + " /></P>" +
                        "<p class='title'>" + item.name + "和她妈妈</p>" +
                        "<div class='numinfo clearfix'>" +
                        "<div class='num'>编号:<lable id='idnum'>" + squnum + "</lable></div>";
                    txt = txt + BindLoveStatus(datalist.loverlist, item, item.lover);
                    txt = txt + "</li>";
                }
                $(".motherslist ul").append(txt);
                //绑定lover按钮动作
                var doms = $(".motherslist").find("li");
                for (var i = startpos; i < endsize; i++) {                   
                    BindMotherMoreBtn(doms.eq(i));
                }
            }



            function BindMotherMoreBtn(obj) {
                obj.forEach(function(item) {
                    var idnum = $(item).find("#idnum").html();
                    $(item).tap(function(e) {
                        e.preventDefault();                       
                        //获取数据
                        datahandle().getDataById(idnum).then(function(data) {
                            //数据绑定
                            $(".page").hide();
                            $(".page2").show();
                            var motherinfo = $(".motherinfo");
                            motherinfo.empty();

                            var squnum = 1000 + data.id;
                            var txt = "<h3>" + data.name + "和她妈妈</h3>";                        

                            txt = txt + BindLoveStatus(datalist.loverlist, data, data.lover);
                            txt = txt + "<p class='info'>" + data.msg + "</p>" +
                                "<div class='piclist'>" +
                                "<ul>";
                            data.piclist.forEach(function(itme) {
                                txt = txt + "<li><img src=" + itme + "></li>";
                            })
                            txt = txt + "</lu></div>"
                            motherinfo.html(txt);
                            //绑定点赞
                            BindLoverBtn($(".motherinfo").find(".zan"), squnum);
                        }).catch(function(err) {
                            //数据获取失败
                            alert(err);
                        })
                    })
                    BindLoverBtn($(item).find(".zan"), idnum);
                })
            };

            function BindLoverBtn(obj, id) {
                var lovernum;
                var id = id - 1000;
                obj.tap(function(e) {
                    var data2;
                    var flag = true;
                    e.preventDefault();
                    e.stopPropagation();
                    var _this = $(this);
                    var nowTime = new Date().getTime();
                    var timed = tool.getTimenyr();
                    if (timed === "2017515") {
                        flag = false;
                        alert('活动已结束谢谢你的参与！');
                        return;
                    };

                    var clickTime = _this.attr("ctime");
                    if (clickTime != 'undefined' && (nowTime - clickTime < 8000)) {
                        flag = false;
                        alert('操作过于频繁，稍后再试');
                        return;
                    }
                    if (_this.find('img').attr('class') === 'on') {
                        flag = false;
                        alert("你已经点赞过");
                        return;
                    }

                    _this.attr("ctime", nowTime);
                    if (!user) {
                        user = JSON.parse(sessionStorage.getItem('user'));
                    }                   

                    var count = 0;                   

                    if (datalist.loverlist) {
                        var openid = user.openid;                       
                        datalist.loverlist.forEach(function(item, index) {                          
                            if (item.openid === openid) {
                                count++;                               
                            }
                            if (item.openid === openid && item.loverid == id) {                                
                                flag = false;
                                alert("你已经点赞过");
                                return;
                            }
                            if (count > 3) {
                                flag = false;
                                alert("每天只有4个点赞机会你已经用完了！明天再来吧！");
                                return;

                            }

                        });
                    }
                    if (flag) {
                        datahandle().alertLoverDataById(id).then(function(data) {
                            //id修改后的lover值
                            if (data) {
                                data2 = data;
                                lovernum = parseInt(_this.find(".zannum").html()) + 1;
                                var str = {
                                    "openid": user.openid,
                                    "loverid": id
                                };
                                return votehandle().writeData(str);
                            }else{
                                alert("点赞不成功,请在试试"); 
                            }
                        }).then(function(data) {                           
                            if (data) {
                                datalist = "";
                                data2.loverlist = data;
                                datalist1 = datalist = data2; //保存点赞后的数据                               
                                dialog({
                                    title: "信息提示",
                                    content: "点赞成功"
                                }).show(function() {
                                    _this.find(".zanicon img").attr('src', './images/aixin.png');
                                    _this.find(".zannum").html(lovernum);
                                });
                            }else{
                                 alert("点赞不成功,请再试试");
                            }
                        }).catch(function(err) {
                            alert(err);

                        })
                    }

                });
            }

            function BindLoveStatus(loverlist, item, lover) {
                var txt = "";
                if (loverlist) {
                    flag = false;

                    loverlist.forEach(function(item2) {
                        if (item2.loverid == item.id) {
                            flag = true;
                        }
                    });                  
                    if (flag) {
                        txt = "<div class='zan'>" +
                            "<a class='zanicon'><img src='./images/aixin.png' class='on' /></a><span class='zannum'>" + lover + "</span></div>" +
                            "</div>";

                    } else {
                        txt = "<div class='zan'>" +
                            "<a class='zanicon'><img src='./images/aixin2.png'  /></a><span class='zannum'>" + lover + "</span></div>" +
                            "</div>";
                    }

                } else {
                    txt = "<div class='zan'>" +
                        "<a class='zanicon'><img src='./images/aixin2.png' /></a><span class='zannum'>" + lover + "</span></div>" +
                        "</div>";
                }
                return txt;
            }
        }

    }


    return {
        showdata: showData
    };
})
