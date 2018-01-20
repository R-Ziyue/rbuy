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
  });


//  3.动态渲染页面
//  (1)动态渲染面包屑导航
  var categoryId = getSearch('categoryid');
  $.ajax({
    type: 'get',
    url: 'http://' + ip + ':9090/api/getcategorybyid',
    data: {categoryid: categoryId},
    success: function (info) {
      $('.nav .left').html(template('template_nav', info))
    }
  });
  //(2)动态渲染商品列表
  var pageId = getSearch('pageid');
  //总页数
  var numPage = 0;
  $.ajax({
    type: 'get',
    url: 'http://' + ip + ':9090/api/getproductlist',
    dataType: 'json',
    data: {
      categoryid: categoryId,
      pageid: pageId

    },
    success: function (info) {
      $('.mui-table-view').html(template('template_content', info));
      //将页码传进去 好显示分类
      info.pageid = pageId;
      //  动态渲染分页按钮
      $('#page').html(template('template_page', info));


      //  获取总页数
      numPage = info.totalCount / info.pagesize;
    }
  });


  //4.分页功能
  //上下翻页按钮功能实现
  //上翻页
  $('.prev').on('click', function () {
    var url = location.search;
    //拼接字符串的方式  产生一个新的地址
    if (pageId <= numPage && pageId > 1) {
      var newUrl = url.substr(0, url.length - 1) + (pageId - 1);
      //点击的时候跳转
      location.href = newUrl;
    }
  });
  //下一页翻页
  $('.next').on('click', function () {
    var url = location.search;
    //拼接字符串的方式  产生一个新的地址
    if (pageId < numPage && pageId >= 1) {
      var newUrl = url.substr(0, url.length - 1) + (pageId + 1);
      //点击的时候跳转
      location.href = newUrl;
    }
  });
  //中间select选择翻页
  $('#page').on('change',function () {
    var url=location.search;
    //拼接字符串的方式  产生一个新的地址
    var id=$(this).val();

    //??为什么val和attr不能共用
    //console.log(id);
    //console.log($(this).attr('value'));
    location.href=url.substr(0,url.length-1)+id;
  });


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
