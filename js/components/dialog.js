define(function(require) {

    // 利用闭包的特性，判断是否已经存在实例
    var instance;

    function Dialog(config) {

        this.title = config.title ? config.title : '这是标题';
        this.content = config.content ? config.content : '这是提示内容';
        this.action = config.action || "";
        this.dom = config.dom || "";

        this.html = '<div class="dialog-dropback">' +
            '<div class="container">' +
            '<div class="head">' + this.title + '</div>' +
            '<div class="content">' + this.content + '</div>' +
            '<div class="footer">' +
            '<button class="confirm">确定</button>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    Dialog.prototype = {
        constructor: Dialog,
        show: function(fn) {
            var _this = this;
            if (instance) {
                this.destory();
            }
            $(this.html).appendTo($(document.body));
            instance = this;


            $('.dialog-dropback .confirm').on('click', function(e) {

                _this.hide();
                fn();

            });
        },

        destory: function() {
            instance = null;
            $('.dialog-dropback .confirm').off('click');
            $('.dialog-dropback').remove();
        },

        hide: function() {
            this.destory();
        }
    }

    return function(config) {
        return new Dialog(config);
    }
})
