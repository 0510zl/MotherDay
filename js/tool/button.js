define(function(require) {
    var $ = require('zepto');
    var dialog = require('dialog');
    var page1_dataShow = require('page1');
    var datahandle = require('datahandle');
    var tool = require('tool');


    //导航控制
    $(".menu li").tap(function() {

        var _this = $(this);
        // $_this.off('tap');
        var mname = _this.attr("class")
        if (mname === "topage1") {
            $(".page").hide();
            page1_dataShow.showdata();
            //   $_this.on('tap');

        } else if (mname === "topage3") {
            var user = JSON.parse(sessionStorage.getItem('user'));
            if (!user) {
                tool.toreload();
            }
            $(".page").hide();
            $(".page3").show();
            $(".page3 form").hide();
            //accord to openid judge is taken
           
            datahandle().getDataByopenId(user.openid).then(function(data) {
                if(data){  
                //不相关的不显示
                $(".page3").find(".chosebut").css('display', 'none');
                $(".page3").find("button[type=submit]").css('display', 'none');
                //相关的显示
                $(".page3").find(".name").html(data.name);
                $(".page3").find(".msg").html(data.msg);
                var txt = "";
                $.each(data.piclist, function(index, item) {
                    txt = txt + "<li><div class='pic'><img src='" + item + "' ></div></li>";
                })
                $(".page3").find(".uppiclist ul").html(txt);
                
                 }else{
                    $(".page3").find(".name").html(user.nickname);
                    $(".page3").find(".msg").html("");
                    $(".uppiclist ul").empty();               
                 }
                 $(".page3 form").show();
            }).catch(function(err) {
                alert(err);
            });
           
        } else if (mname === "topage4") {
            var txt = "",
                num = 0;
            $(".page").hide();
             $(".page4 .ranklist").empty();
            datahandle().getData().then(function(data) {
                if(data){ 
                data=tool.sortDate(data);                
                txt = "<table><thead><tr><th>名次</th><th>排名</th><th>票数</th></tr></thead><tbody>";
                data.forEach(function(item, index) {
                    num++;
                    txt = txt + "<tr>" +
                        "<td>" + num + "</td>" +
                        "<td><img src=" + item.piclist[0] + " />" + item.name + "</td>" +
                        "<td>" + item.lover + "</td>" +
                        " </tr>";
                })
                txt = txt + "</tbody></table>";
                $(".page4 .ranklist").html(txt);
                $(".page4").show();
             }else{
                  txt="<p class='warn'>暂无数据</p>";
                $(".page4 .ranklist").html(txt);
                $(".page4").show();
             }

            }).catch(function(err) {
                alert(err);
            })

        } else if (mname === "topage5") {
            $(".page").hide();
            $(".page5").show()
        }

    })

    //page1 按钮绑定
    $(".searchbox button").tap(function(e) {      
        e.preventDefault();       
        var _this = $(this);
        var id = _this.parent().find("input[type=text]").val();
        if (!id) {
            alert("请输入查询编号");
            return;
        };
      
        datahandle().getDataById(id).then(function(data) {
           if(data){ 
            page1_dataShow.showdata({'id':id});
        }else{
            
            $(".motherslist").empty();
            $(".motherslist").html("<p class='warn'>没有你查询的数据，请确认你的编号的数据正确性</p>");
        }


        }).catch(function(err) { alert(err); })

    })

   



})
