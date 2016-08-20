// 从字符串中提取aid
// http://www.bilibili.com/video/av5874411/

function getAid(str) {

    if (!str) {
        return -1;
    }
    str = str.trim();
    if (parseInt(str)) {
        return parseInt(str);
    }

    var reg = /av\d+/g;
    var av = str.match(reg);
    if (av) {
        return parseInt(av[0].substring(2));
    }
    return -1;
}

// 根据aid获取视频信息
// api: http://api.bilibili.com/view?type=json&appkey=8e9fc618fbd41e28&id=102279
// jsonp跨域

function getVideoInfo(aid, success, failed, page) {
    page = page || 1;
    var url = 'http://api.bilibili.com/view?type=jsonp&appkey=8e9fc618fbd41e28';
    $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                id: aid,
                page: page
            }
        })
        .done(function(data) {
            console.log("success");
            if (data.title) {
                success(data);
            } else {
                failed();
            }
        })
        .fail(function() {
            console.log("error");
            failed();
        });


}

// 根据aid获取视频下载地址
// api: http://www.bilibili.com/m/html5?aid=5865702&page=1
// 服务器代理跨域: video.php

function getVideoUrl(aid, pages, success, failed) {
    var argument = 'aid=' + aid + '&page=' + pages;
    argument = escape(argument);
    $.ajax({
        type: "GET",
        url: 'video.php',
        dataType: "json",
        data: {
            argument: argument
        }
    }).done(function(data) {
        success(data);
    }).fail(function() {
        console.log("error");
        failed();
    });
}
