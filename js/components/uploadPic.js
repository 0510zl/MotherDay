define(function(require) {　
    var $ = require('zepto');　
    var Upload = function() {　
        this.fileArr = "";　
    };　

    Upload.prototype = {
        constructor: Upload,
        //读取数据
        UploadImg: function(fileArr) {
            var _this = $(this);
            var fileObj = fileArr;
            var FileController = './php/upload.php';
            return Promise.all(fileObj.map(function(item) {

                var xhr;
                if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } else if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                }
                var form = new FormData();
                form.append("myfile", item);

                return new Promise(function(resolve, reject) {
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200 || xhr.status == 0) {
                                var result = xhr.responseText;
                                var json = eval("(" + result + ")");
                                console.log('图片链接:' + json.file);
                                resolve(json.file);

                            } else {
                                console.log('error')
                                reject("图片提交错误！");

                            }
                        }


                    };
                    xhr.open("post", FileController, true);
                    xhr.send(form);

                })

            }))

            function ajaxUpPic(item) {



            }




        },
        valiPic: function(obj, fileArr) {
            //------------------page3-------------------------
            //图片上传信息提取
            var fileInput = $(".fileinput");
            var fileImage = $(".uppiclist ul");
            var _this = $(obj);
            console.log(fileImage.find("li").length)

            if (fileImage.find("li").length > 3) {
                alert("最多可以选择4张");
                return;
            }
            if (!_this.val()) {
                alert("请选择图片");
                return;
            }
            var file = obj.files[0];

            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                alert('请上传有效的图片文件');
                return;
            }

            if(file.size > (1024*1024*2)){
                alert('您选择的图片过大，请选择小于2M的图片！');
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                var txt = "<li>";
                txt = txt + "<div class='pic'><img src='" + data + "' ></div>";
                txt = txt + "<div class='del'><img src='./images/delete.png' /></di>";
                txt = txt + "</li>"
                fileImage.append(txt);
                fileArr.push(file);
                BinddelUpPic(fileImage.find("li:last"));
            }
            reader.readAsDataURL(file);


            //图片信息删除
            function BinddelUpPic(ele) {
                ele.find(".del").on('tap', function(e) {
                    var _this = $(this);
                    var index = _this.parent().index();
                    fileArr.splice(index, 1);
                    $(this).parent().remove();
                });
            }

        }







    }　　　

    return function() {
        return new Upload();
    }　


    　
});
