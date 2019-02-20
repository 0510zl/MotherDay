requirejs.config({
    baseUrl: './js',
    paths: {
        'zepto': 'libs/zepto',
        'datahandle': 'components/datahandle',
        'votehandle': 'components/votehandle',
        'form': 'components/form',
        'page1': 'page/page1',
        'uploadpic': 'components/uploadPic',
        'dialog': 'components/dialog',
        'button': 'tool/button',
        'weixintool': 'tool/jweixin-1.0.0',
        'weixin': 'tool/weixin',
        'tool': 'tool/tool'
    },
    shim: { //引入没有使用requirejs模块写法的类库。
        'zepto': {
            exports: '$'
        }
    }

})


require(['zepto', 'form', 'uploadpic', 'page1', 'button', 'weixin', 'tool'], function($, form, uploadpic, page1, button, weixin, tool) {



    var fileArr = new Array();
    $(function() {
        var isPc = /macintosh|window/.test(navigator.userAgent.toLowerCase());
        if (isPc) {
            $('body').html('<P class="notphone">请在手机端查看效果更佳!(∩_∩)</p>');
        } else {

            //----------------accept user weixin info----------------------------
            if (!tool.getquerystring('code')) { getWeinxi(); }

            function getWeinxi() {
                tool.toreload();
            }
            //------------------page3-------------------------
            //图片上传验证1~4
            $(".fileinput").on("change", function(e) {
                    e.preventDefault();
                    uploadpic().valiPic(this, fileArr);
                })
                //form 表单提交
            $("form").submit(function(e) {
                e.preventDefault();                
                var _this = $(this);
                var but = _this.find('button[type=submit]');
                but.html("正在提交...");
                but.attr("disabled", "true");
                form.form(_this, fileArr);


            })

        }






    })



})
