define(function(require) {　
    var $ = require('zepto');　
    var Datahandle = function() {　
        this.title = "ceshi Hello";

        　
    };　

    Datahandle.prototype = {
        constructor: Datahandle,
        //读取数据：
        getData: function() {
            var _this = this;            

            return new Promise(function(resolve, reject) {
                $.getJSON('./data/data.json?ran=' + new Date(), function(data, status) {
                    if (data) {
                        data.data.forEach(function(item, index) {
                            item.lover = item.lover + 3000;
                        })
                        resolve(data.data);
                    } else {
                        reject("获取数据出错，请联系管理员");

                    }
                });

            })


        },
        //存入数据
        writeData: function(obj) {
            var _this = this;
            var FileController = './php/writedata.php';
            return new Promise(function(resolve, reject) {
                //数据处理
                //var transferData="name="+ obj.name +"&msg="+ obj.msg +"&piclist="+ obj.piclist;
                //var transferData=JSON.stringify(obj);
               
                $.post(FileController, obj, function(data, status) {
                    // process response
                    if (status == "success" && data) {

                        var data = JSON.parse(data)
                          data.msg.data.forEach(function(item, index) {
                            item.lover = item.lover + 3000;
                        });
                        resolve(data);
                    } else {
                        reject("上传数据出错，请联系管理员");
                    }
                })

            });




        },
        //修改lover数据，返回json文件的全部data值
        alertLoverDataById: function(id) {
            var _this = this;
            var FileController = './php/alertdata.php';
            return new Promise(function(resolve, reject) {               
                if (id) {
                    var obj = { 'id': id };
                    $.post(FileController, obj, function(data, status) {
                        // process response
                        if (data) {
                            var data = JSON.parse(data)
                            data.data.forEach(function(item, index) {
                                item.lover = item.lover + 3000;
                            })
                            resolve(data.data);
                        } else {
                            reject("获取数据出错，请联系管理员");
                        }
                    })
                } else {
                    reject("Id值不存在，请联系管理员")
                }

            })

        },
        getDataById: function(id) {
            var _this = this;
            id = id - 1000;
            return new Promise(function(resolve, reject) {
                _this.getData().then(function(data) {
                    data.forEach(function(item) {
                        if (item.id === id) {
                            resolve(item);

                        }
                    })
                    reject("获取数据出错，请联系管理员");

                }).catch(function(err) {
                    reject(err);


                })


            })

        },
        getDataByopenId: function(openid) {
            var _this = this;

            return new Promise(function(resolve, reject) {
                _this.getData().then(function(data) {
                    var flag = false;
                    data.forEach(function(item) {
                        if (item.openid === openid) {                            
                            flag = true;
                            resolve(item);
                        }
                    })
                    if (!flag) {                       
                        reject("获取数据出错，请联系管理员");
                    }
                     

                }).catch(function(err) {
                    reject(err);
                })


            })

        }




    }　　　
    return function() {
        return new Datahandle();
    }　

    　
});
