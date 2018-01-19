/**
 * Created by 梓越 on 2018/1/19.
 */
//本页面实现首页的全部功能

$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  //1.动态渲染页面
  //导航的ajax请求
  $.ajax({
    type: "get",
    url: "http://" + ip + ":9090/api/getindexmenu",
    //dataType:'json',
    success: function (info) {
      $('.nav ul').html(template("template_nav", info));

//  2.点击更多显示三行(要在渲染之后进行设置)
//  获取第三行的li  默认隐藏
      $('.nav li:nth-child(n+9)').addClass("hidden");
      $('.nav li:nth-child(8)').on("click", function () {
        $('.nav li:nth-child(n+9)').toggleClass("hidden");
      })
    }
  });

  //推荐的主体内容ajax请求
  $.ajax({
    type: 'get',
    url: 'http://' + ip + ':9090/api/getmoneyctrl',
    dataType: "json",
    success: function (info) {
      $('.content .info').html(template("template_info", info));
      //由于用的是mui的图文列表 所以需要在动态渲染之后给img标签加上这个类
      $('.content .info img').addClass("mui-media-object mui-pull-left");
    }
  });

//3.点击返回顶部
  $('.top').on("click", function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
  })


});
