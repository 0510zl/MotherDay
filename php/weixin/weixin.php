<?php

    require_once "configdata.php";
    $jssdk = new JSSDK("noneed","wxf166b3a749aaf36f", "40a852e2d2f1ffbc4d89eb367a73c149");
    $signPackage = $jssdk->GetSignPackage();

    class Config{
        var $appId;
        var $timestamp;
        var $nonceStr;
        var $signature;
        var $url;
    }

    $config = new Config();

    $config -> appId = $signPackage["appId"];
    $config -> timestamp = $signPackage["timestamp"];
    $config -> nonceStr = $signPackage["nonceStr"];
    $config -> signature = $signPackage["signature"];
    $config -> url = $signPackage["url"];

    echo json_encode($config);
?>
