// 注册控制器

app.controller('MyCtrl', MyCtrl);
app.controller('HomeController', HomeController);
app.controller('VideoController', VideoController);
app.controller('NotFoundController', NotFoundController);
app.controller('AboutController', AboutController);

// 全局Page 
// 用于各控制器与主控制器之间数据通讯
app.factory('Page', function() {
    var factory = {};
    var title = 'default';
    var index = 0;

    factory.setTitle = function(newTitle) {
        title = newTitle;
    }
    factory.setIndex = function(newIndex) {
        index = newIndex;
    }
    factory.getTitle = function() {
        return title;
    }
    factory.getIndex = function() {
        return index;
    }
    return factory;
});

// 主控制器 注入了Page
function MyCtrl($scope, Page) {
    $scope.Page = Page;
}

function HomeController($scope, Page) {
    Page.setIndex(0);
    Page.setTitle('首页');
    $scope.parse = function() {
        var aid = getAid($scope.url);
        $scope.url = '';
        if (aid === -1) {
            console.log('获取aid失败');
            $('#myModal').modal('show');
            return;
        }
        console.log('获取aid', aid);
        window.location.href = '#/video/' + aid; // 跳转到video页面
    };
    $scope.enter = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            $scope.parse();
        }
    };
}

function VideoController($scope, Page, $routeParams) {
    Page.setTitle('视频解析');
    Page.setIndex(1);
    $scope.videoInfo = {};
    $scope.specialInfo = {};
    $scope.specialInfo.aid = $routeParams.aid;
    $scope.videoInfoString = {
        coins: '硬币',
        created_at: '发布时间',
        title: '标题',
        description: '简介',
        favorites: '收藏',
        tag: '标签',
        typename: '分区',
        play: '播放数',
        pages: '分P'
    };
    $scope.videoInfoArr = ['coins', 'created_at', 'title', 'description', 
                            'favorites', 'tag', 'typename', 'play', 'pages'];
    $scope.specialInfoArr = ['cid', 'mid', 'pic', 'author', 'face', 'offsite'];

    getVideoInfo($scope.specialInfo.aid, success, failed);


    // 部分属性拷贝
    function copy(obj, arrKey, copy) {
        copy = copy || {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if ($.inArray(key, arrKey) !== -1) {

                    copy[key] = obj[key];

                }
            }
        }
        return copy;
    }

    // 获取成功的回调函数
    function success(data) {
        console.log(data);
        $scope.$apply(function() {
            // success函数在AngularJS上下文之外的地方修改了model
            // 要手动触发$scope.$apply提醒更新view
            $scope.videoInfo = copy(data, $scope.videoInfoArr, $scope.videoInfo);
            $scope.specialInfo = copy(data, $scope.specialInfoArr, $scope.specialInfo);
            console.log($scope.videoInfo);
            console.log($scope.specialInfo);

        });

        getVideoUrl($scope.specialInfo.aid, $scope.videoInfo.pages, function(data) {
            $scope.$apply(function() {
                $scope.specialInfo.videoUrl = data.src;
                console.log($scope.specialInfo.videoUrl);
            });
        }, function() {
            $scope.specialInfo.videoUrl = "#/404.html";
        })
    }

    // 获取失败的回调函数
    function failed() {
        window.location.href = "#/404.html";
    }
}


function NotFoundController($scope, Page) {
    Page.setTitle('404');
    Page.setIndex(-1);
}

function AboutController($scope, Page) {
    Page.setTitle('关于')
    Page.setIndex(2);
}
