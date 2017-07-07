<?php

// 把PHP数组转成JSON字符串
if(!empty($_POST["name"]))
{
  $openid =$_POST['openid'];
  $name =$_POST['name'];
  $msg =$_POST['msg'];
  $piclist =$_POST['piclist'];

  // $name="啥哈拉";
  // $msg="dfas";
  // $piclist=["./images/05.jpg", "./images/02.jpg", "./images/03.jpg"];
  // 写入文件
  //打开相应JSON文件
  $filename = "../data/data.json";
  $json_string = file_get_contents($filename);
  $data = json_decode($json_string, true);

  //添加数据
  $index = sizeof($data['data']);
  $data['data'][$index]['id']=$index+1;
  $data['data'][$index]['openid']=$openid;
  $data['data'][$index]['name'] =$name;
  $data['data'][$index]['msg'] = $msg;
  $data['data'][$index]['piclist'] =$piclist;
  $data['data'][$index]['lover']=0;


  //写入文件
 $json_string = json_encode($data,JSON_UNESCAPED_UNICODE);
 $res=file_put_contents('../data/data.json', $json_string);


  $num=$index+1001;
    //输出回馈信息
  class Config{
        var $msg;
        var $idnum;
    }

    $config = new Config();
    $config -> msg = $data;
    $config -> idnum =  $num;

    if( $res){
        echo json_encode($config);
    }

}
?>

