<?php
if (isset($_POST['code'])){
    $code= $_POST['code'];
     require_once "configdata.php";
     $jssdk = new JSSDK($code,"wxf166b3a749aaf36f", "40a852e2d2f1ffbc4d89eb367a73c149");
     $res = $jssdk->getOpenIdByOatuthAccessToken();
     echo json_encode($res);
  }
?>
