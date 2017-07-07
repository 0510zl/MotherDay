<?php

// 把PHP数组转成JSON字符串
if(!empty($_POST["id"]))
{

  $id =$_POST['id']-1;


  // 写入文件
  //打开相应JSON文件
  $filename = "../data/data.json";
  $json_string = file_get_contents($filename);
  $data = json_decode($json_string, true);

  //修改对应的LOVER数据
  $data['data'][$id]['lover']=$data['data'][$id]['lover']+1;
  $lover=$data['data'][$id]['lover'];


  //写入文件
 $json_string = json_encode($data,JSON_UNESCAPED_UNICODE);
  $res=file_put_contents('../data/data.json', $json_string);


    if($res){
       echo json_encode($data);
    }

}else{

   echo "点赞错误";
}
?>

