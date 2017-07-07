<?php

// 把PHP数组转成JSON字符串
if(isset($_POST["openid"]))
{
  $openid =$_POST['openid'];
  $loverid =$_POST['loverid'];
  $filename =$_POST['filename'];

  // 写入文件
  //打开相应JSON文件
  $filename = "../data/$filename";
  $json_string = file_get_contents($filename);
  $data = json_decode($json_string, true);

  //添加数据
  $index = sizeof($data['data']);
  $data['data'][$index]['openid']=$openid;
  $data['data'][$index]['loverid']=$loverid;



  //写入文件
 $json_string = json_encode($data,JSON_UNESCAPED_UNICODE);
 $res=file_put_contents($filename, $json_string);


  //输出回馈信息
   if( $res){
        echo json_encode($data);
    }

}else{
    echo json_encode("false");
}
?>

