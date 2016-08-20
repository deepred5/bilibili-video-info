// 初始化app，并进行路由配置

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: './template/home.html',
            controller: 'HomeController'
        })
        .when('/video/:aid', {
            templateUrl: './template/video.html',
            controller: 'VideoController'
        })
        .when('/about', {
            templateUrl: './template/about.html',
            controller: 'AboutController'
        })
        .when('/404.html', {
            templateUrl: './template/404.html',
            controller: 'NotFoundController'
        })
        .otherwise({ redirectTo: '/home' }); // 默认初始加载为home主页
});
