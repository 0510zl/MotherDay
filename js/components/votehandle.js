define(function(require) {　
    var $ = require('zepto');　
    var time = require('tool');
    var Votehandle = function() {　　};　

    Votehandle.prototype = {
        constructor: Votehandle,
        //读取数据
        getData: function() {
            var _this = this;
            var timed = time.getTimenyr();
            var url = './data/vote' + timed + '.json';

            return new Promise(function(resolve, reject) {
                console.log(timed + url);
                try {
                    $.getJSON(url + '?ran=' + new Date(), function(data) {
                        if (data) {
                            data.data.forEach(function(item) {
                                console.log(item)
                            });
                            return resolve(data.data);
                        } else {
                            console.log("no data");
                            return reject(false);
                        }

                    });

                }catch(e){
                    console.log("no data!")
                    return reject(false);
                }
            })

        },
        //存入数据
        writeData: function(obj) {
            var _this = this;
            var FileController = './php/writevotedata.php';
            return new Promise(function(resolve, reject) {
                if (obj) {
                    var timed = time.getTimenyr();
                    var url = 'vote' + timed + '.json';
                    obj.filename = url;
                    $.post(FileController, obj, function(data) {
                        var data = JSON.parse(data)
                            // process response
                        if (data) {
                            return resolve(data.data);
                        } else {
                            return reject(data);
                        }
                    })
                } else {
                    return reject(data);
                }

            });



        },
        getDataByOpenid: function(openid) {
            var _this = this;
            console.log("Votehandle-getDataByOpenid-user-openid" + openid);
            var arrVoteId = [];

            return new Promise(function(resolve, reject) {
                if (openid) {
                    _this.getData().then(function(data) {

                        if (data) {
                            data.forEach(function(item, index) {
                                if (item.openid === openid) {
                                    arrVoteId.push(item)
                                }

                            })
                            console.log("Votehandle-getDataByOpenid-35-arrVoteId" + arrVoteId);
                            resolve(arrVoteId);
                        } else {
                            reject(false);
                        }

                    }, function(data) {
                        reject(false);

                    }).catch(function(err) {
                        console.log(err);

                    });

                } else {
                    return reject(false)
                }


            })

        },
        checkDataByopenid: function(openid, id) {
            var _this = this;
            var flag = false;
            var count = 0;
            return new Promise(function(resolve, reject) {
                var timed = time.getTimenyr();
                if (timed === "201755") {
                    return reject("end");
                };
                if (!openid || !id) {
                    return reject(false);
                };
                _this.getData().then(function(data) {

                    if (data) {
                        data.forEach(function(item, index) {
                            console.log(item.openid + "-----" + id + "------" + openid);
                            if (item.openid === openid) {
                                count++;
                                console.log("count" + count);
                            }
                            if (item.openid === openid && item.loverid == id) {
                                console.log("Votehandle——checkDataByopenid-reject");

                                flag = true;
                                return reject("has");
                            }

                        })
                        if (count > 3) {
                            console.log("countmore" + count);
                            return reject("more");

                        }
                        if (!flag) {
                            console.log("Votehandle——checkDataByopenid-resolve1");
                            return resolve(true);
                        }


                    }



                }, function(data) {
                    return resolve(true);

                }).catch(function(err) {
                    console.log(err);

                });



            })


        }




    }　　　
    return function() {
        return new Votehandle();
    }　

    　
});
