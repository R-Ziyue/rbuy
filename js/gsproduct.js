/**
 * Created by 梓越 on 2018/1/19.
 */
//本页面实现首页的全部功能
//url: "http://" + ip + ":9090/api/getindexmenu",

$(function () {
  //初始化滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

//2.点击返回顶部
  $('.top').on("click", function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);//100毫秒滚动到顶
  })

  //1.动态渲染第一个标题
  $.ajax({
    type: 'get',
    url: "http://" + ip + ":9090/api/getgsshop",
    success: function (info) {
      console.log(info);
      $('.title .one').html(template("template_one", info));
    }
  })

  //2.动态渲染第二个标题
  $.ajax({
    type: 'get',
    url: "http://" + ip + ":9090/api/getgsshoparea",
    success: function (info) {
      console.log(info);
      $('.title .two').html(template("template_two", info));
    }
  });

  //3.渲染主体内容
  var shopId = 0;
  var areaId = 0;
  render(shopId,areaId);



  //二级菜单显示与隐藏功能
  $('.first li').on("click", function () {
    //获取需要排他的类
    var o = $(this).data('other');
    //console.log(o);
    //排他
    $(o).addClass('yin');

    //获取需要显示的对应的类型
    var c = $(this).data("class");
    //console.log(c);
    $(c).toggleClass('yin');
  });


  //点击添加类    mui-icon mui-icon mui-icon mui-icon-checkmarkempty

  $('.er').on('click', 'li', function (e) {
    //首先排他
    $(e.target).siblings().find('span').removeClass('mui-icon mui-icon mui-icon mui-icon-checkmarkempty');

    $(e.target).find('span').addClass('mui-icon mui-icon mui-icon mui-icon-checkmarkempty');
  })

  //  注册事件动态渲染
  //第一标题
  $('.title .one').on('click',function (e) {
    shopId=$(e.target).data('id');
    render(shopId,areaId);
  })
  //第一标题
  $('.title .two').on('click',function (e) {
    areaId=$(e.target).data('id');
    render(shopId,areaId);
  })








  //渲染主体部分的函数
  function render(shopId, areaId) {
    $.ajax({
      type: 'get',
      url: "http://" + ip + ":9090/api/getgsproduct",
      data: {
        shopid: shopId,
        areaid: areaId
      },
      success: function (info) {
        console.log(info);
        $('.main ul').html(template('template_main', info))
      }
    });
  }


  //老师之前写的过去url中的数据的代码
  /*获取地址栏所有的参数，返回一个对象*/
  function getSearchObj() {
    //1. 获取地址栏的参数
    var search = location.search;
    //2. 对地址进行解码
    search = decodeURI(search);
    //3. 干掉? slice sutstr substring
    search = search.slice(1);//支持负数
    //search = search.substr(1, search.length -1);
    //search = search.substring(1);//不支持负数
    //search = search.slice(0, -1);//支持负数
    //4. 字符串切割
    var arr = search.split("&");
    //5. 把数据变成对象
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split("=")[0];
      var value = arr[i].split("=")[1];
      obj[key] = value;
    }
    return obj;
  }

  /*获取地址栏指定的参数，返回值*/
  function getSearch(key) {
    return +getSearchObj()[key];
  }


});
