<?php
if(isset($_FILES["myfile"]))
{
  $ret = array();

       $uploadDir ='../images/upload'.DIRECTORY_SEPARATOR.date("Ymd").DIRECTORY_SEPARATOR;
       $uploadDir1 ='images/upload'.DIRECTORY_SEPARATOR.date("Ymd").DIRECTORY_SEPARATOR;


  $dir = dirname(__FILE__).DIRECTORY_SEPARATOR.$uploadDir;
  file_exists($dir) || (mkdir($dir,0777,true) && chmod($dir,0777));

  if(!is_array($_FILES["myfile"]["name"])) //single file
  {
    $fileName = time().uniqid().'.'.pathinfo($_FILES["myfile"]["name"])['extension'];
    move_uploaded_file($_FILES["myfile"]["tmp_name"],$dir.$fileName);
    $ret['file'] = $uploadDir1.$fileName;
  }
  echo json_encode($ret);
}
?>
