/**
 * Created by 梓越 on 2018/1/19.
 */
//本页面实现首页的全部功能
//url: "http://" + ip + ":9090/api/getindexmenu",

$(function () {
  //初始化滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

//2.点击返回顶部
  $('.top').on("click", function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
  })

  //// 监听tap事件，解决 a标签 不能跳转页面问题!---------------------------------------
  mui('body').on('tap','a',function(){document.location.href=this.href;});

//  3.动态渲染 ajax
  $.ajax({
    type: 'get',
    url: 'http://' + ip + ':9090/api/getbrandtitle',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.category .title').html(template("template_title", info))
    }
  })

});
