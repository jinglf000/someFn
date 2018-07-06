var xmlStr = '';

var timeXmlStr = '';
var archiveid = '';
var serialno = '';
var sitecode = '';
var xyUrl = '';
var printVersion = "&flag=0.6";
var showVersion = "&flag=0.5";
var opdisplay = '';

var cy_print = '';

var icon_10 = new Image();
icon_10.src = 'styles/s1/images/icon_19.png';

var icon_10_on = new Image();
icon_10_on.src = 'styles/s1/images/icon_19_on.png';

var a0_currentPage = new Image();
a0_currentPage.src = 'styles/s1/images/print_01.png';

var a0_selectPage = new Image();
a0_selectPage.src = 'styles/s1/images/print_02.png';

var a0_all = new Image();
a0_all.src = 'styles/s1/images/print_03.png';

var print_close = new Image();
print_close.src = 'styles/s1/images/close.png';

var icon_06 = new Image();
icon_06.src = 'styles/s1/images/icon_15.png';

var icon_06_on = new Image();
icon_06_on.src = 'styles/s1/images/icon_15_on.png';


var icon_07 = new Image();
icon_07.src = 'styles/s1/images/icon_16_on.png';

var a0_return_up = new Image();
a0_return_up.src = 'styles/s1/images/return_up.png';

var a0_return_up_on = new Image();
a0_return_up_on.src = 'styles/s1/images/return_up_on.png';

var a1_backbtnheader = new Image();
a1_backbtnheader.src = 'styles/s1/images/back_btn.png';

var a1_backbtnheader_on = new Image();
a1_backbtnheader_on.src = 'styles/s1/images/back_btn_on.png';

var a1_backbtnup = new Image();
a1_backbtnup.src = 'styles/s1/images/back_btn02.png';

var a1_backbtnup_on = new Image();
a1_backbtnup_on.src = 'styles/s1/images/back_btn02_on.png';

var icon_00 = new Image();
icon_00.src = 'styles/s1/images/icon_01.png';

var icon_00_on = new Image();
icon_00_on.src = 'styles/s1/images/icon_01_on.png';

var icon_01 = new Image();
icon_01.src = 'styles/s1/images/icon_02.png';

var icon_01_on = new Image();
icon_01_on.src = 'styles/s1/images/icon_02_on.png';

var icon_05 = new Image();
icon_05.src = 'styles/s1/images/icon_14.png';

var icon_05_on = new Image();
icon_05_on.src = 'styles/s1/images/icon_14_on.png';

var icon_08 = new Image();
icon_05.src = 'styles/s1/images/icon_17.png';

var icon_08_on = new Image();
icon_08_on.src = 'styles/s1/images/icon_17_on.png';

var a0_help = new Image();
a0_help.src = 'styles/s1/images/help.jpg';

var help_close = new Image();
help_close.src = 'styles/s1/images/close.png';

var icon_11 = new Image();
icon_11.src = 'styles/s1/images/icon_20.png';

var icon_11_on = new Image();
icon_11_on.src = 'styles/s1/images/icon_20_on.png';


// document.onkeydown = function(){
// 	//f12键禁掉

// 	if(window.event && window.event.keyCode == 123) {
// 	  event.keyCode=0;
// 	  event.returnValue=false;
// 	}

// 	//ctrl+s保存禁掉
// 	if( window.event.ctrlKey  == true && window.event.keyCode == 83 ){
// 		event.keyCode=0;
// 	  	event.returnValue=false;
// 	}

// 	if(window.event.keyCode == 17){
// 		event.keyCode=0;
// 	  	event.returnValue=false;
// 	}

// }
$(function() {


  document.body.oncontextmenu = function() {
    return false
  } //右菜单禁止

  var urlObj;

  //留给胥阳
  //---------------
  var jsonObj;
  var timeObj;


  $.ajax({
    url: xmlUrl,
    type: "GET",
    success: function(data) {
      // 成功之后
      xmlStr = data;
      jsonObj = createJson(xmlStr);
      menu(createMenu(jsonObj));
    }
  });


  $.ajax({
    url: xmlUrl.replace('getArchiveStructureXml', 'getXmlByVersions'),
    type: "GET",
    success: function(data) {
      //成功之后
      timeXmlStr = data;
      timeObj = createJson(timeXmlStr);
    }
  });

  $.ajax({
    url: printUrl,
    type: "GET",
    success: function(data) {
      //var xmlStr = data.print;
      var xml = $(data);
      //var xml = $($.parseXML(xmlStr));
      var root = xml.children('root');
      var printObj = {
        "check_flag": root.children("check_flag").eq(0).text(),
        "check_message": root.children("check_message").eq(0).text()
      };
      $('.icon_10').data("printObj", printObj);

    }
  });



  //清空剪贴板
  if (window.clipboardData) {
    setInterval('window.clipboardData.setData(\'text\',\'该文档保密，请勿私自下载\')', 1)
  }

  function createJson(xmlStr) {
    var xmlStr = xmlStr;
    var xml = $(xmlStr);
    //var xml = $($.parseXML(xmlStr));
    var root = xml.children('root');
    opdisplay = root.attr('opdisplay');
    var fileCount = root.attr('imgcount');
    var baseUrl = root.attr('url') + '&archiveid=' + root.attr('archiveid') + '&serialno=' + root.attr('serialno') + '&sitecode=' + root.attr('sitecode');

    xyUrl = root.attr('url') + '`archiveid^' + root.attr('archiveid') + '`serialno^' + root.attr('serialno') + '`sitecode^' + root.attr('sitecode');

    urlObj = root.attr('printauthoritycheckurl') + '&archiveid=' + root.attr('archiveid') + '&serialno=' + root.attr('serialno');
    archiveid = root.attr('archiveid');
    serialno = root.attr('serialno');
    sitecode = root.attr('sitecode');
    //		cy_print = root.attr('printurl');
    cy_print = xmlUrl.split('?')[0] + '?method=printController';

    $('body').data("urlObj", urlObj);

    var returnObj = [];

    function recursion(nodeArr, parentArr) {
      var arr = [];
      for (var i = 0; i < nodeArr.length; i++) {
        var node = {};
        node.name = $(nodeArr[i]).attr('clientname');
        node.filePic = '';
        if ($(nodeArr[i]).children('img').length > 0) {
          node.filePic = $(nodeArr[i]).children('img').length;
        }
        node.index = $(nodeArr[i]).attr('index');
        node.url = baseUrl + '&pictureid=' + $(nodeArr[i]).attr('pictureid');
        node.parent = nodeArr[i].parentNode.nodeName;
        node.nodeName = nodeArr[i].nodeName;
        node.imgWidth = $(nodeArr[i]).attr('width');
        node.imgHeight = $(nodeArr[i]).attr('height');
        node.filename = $(nodeArr[i]).attr('filename');
        node.materialindex = $(nodeArr[i]).attr('materialindex');
        node.materialtype = $(nodeArr[i]).attr('materialtype');
        node.materialname = $(nodeArr[i]).attr('materialname');
        node.picstate = $(nodeArr[i]).attr('picstate');

        arr[i] = node;

        parentArr.push(node);
        if ($(nodeArr[i]).children().length > 0) {
          node.children = [];
          recursion($(nodeArr[i]).children(), node.children);
        }
      }
    }

    recursion(root.children('folder'), returnObj);
    return returnObj;
  }





  function createMenu(jsonNode) {
    var htmlStr = '';
    var menuIndex = 0;

    function recusionHtml(nodeArr) {

      htmlStr = htmlStr + "<ul>";

      for (var i = 0; i < nodeArr.length; i++) {
        var name = nodeArr[i].name;
        var filePic = nodeArr[i].filePic;
        var index = nodeArr[i].index;
        var url = nodeArr[i].url;
        var parent = nodeArr[i].parent;
        var nodeName = nodeArr[i].nodeName;


        if (parent == 'root') {

          htmlStr = htmlStr + "<li filePic='" + filePic + "' index='" + index + "' url='" + url + "' name='" + name + "'><div class='level_one' dataid=a" + menuIndex + "><span></span><p>" + name + "</p></div>";

        } else if (nodeArr[i].children != null) {
          if (nodeArr[i].children[0].nodeName == 'img') {

            htmlStr = htmlStr + "<li filePic='" + filePic + "' index='" + index + "' url='" + url + "' name='" + name + "'><div class='level_three' dataid=a" + menuIndex + "><span></span><p>" + name + "</p></div>";

          } else {
            htmlStr = htmlStr + "<li filePic='" + filePic + "' index='" + index + "' url='" + url + "' name='" + name + "'><div  class='level_two' dataid=a" + menuIndex + "><span></span><p>" + name + "</p></div>";
          }
        }
        menuIndex = menuIndex + 1;
        if (nodeArr[i].children && nodeArr[i].children[0].nodeName != 'img') {
          recusionHtml(nodeArr[i].children);
        } else {
          var urlArr = '<ul imgtag="imgtag">';
          for (var j = 0; j < nodeArr[i].children.length; j++) {

            urlArr = urlArr + "<li materialtype='" + nodeArr[i].children[j].materialtype + "' materialname='" + nodeArr[i].children[j].materialname + "' index='" + nodeArr[i].children[j].index + "' filename='" + nodeArr[i].children[j].filename + "'  materialindex='" + nodeArr[i].children[j].materialindex + "' materialtype='" + nodeArr[i].children[j].materialtype + "' picstate='" + nodeArr[i].children[j].picstate + "'><div class='level_four' url='" + nodeArr[i].children[j].url + "' imgwidth='" + nodeArr[i].children[j].imgWidth + "' imgheight='" + nodeArr[i].children[j].imgHeight + "' imgname='" + nodeArr[i].children[j].name + "'><span></span><p>" + nodeArr[i].children[j].name + "</p></div></li>";
          }
          urlArr = urlArr + "</ul>";
          htmlStr = htmlStr + urlArr;
        }
      }
      htmlStr = htmlStr + "</li></ul>";
    }
    recusionHtml(jsonNode);
    return htmlStr;
  }



  function menu(treeStr) {
    //创建左侧树
    $('.a1_menu_wrap').html(treeStr);
    var total = 0;
    $('.a1_menu_wrap ul[imgtag="imgtag"]').each(function(index, element) {
      total = total + $(this).children('li').length;
    });
    $('.totalFifle span').text(total);
    //隐藏所有菜单
    $('.a1_menu_wrap ul ul').css('display', 'none');
    createFile($('.a1_menu_wrap > ul'));
    $('.a0_loc').html('<a>主页</a>');

    $('.a1_backbtn span').hide();
  }



  //创建文件夹
  function createFile(ul) {
    $('.check').removeClass('check');
    if (ul.attr('imgtag')) {
      //创建imgArr
      var imgArr = [];

      ul.children('li').each(function(index, element) {
        //imgArr.push($(this).children('div').attr('url'));
        var imgObj = {};
        imgObj.name = $(this).children('div').attr('imgname');
        imgObj.imgWidth = $(this).children('div').attr('imgwidth');
        imgObj.imgHeight = $(this).children('div').attr('imgheight');
        imgObj.url = $(this).children('div').attr('url');
        imgObj.index = $(this).attr('index');

        //
        imgObj.filename = $(this).attr('filename');
        imgObj.materialname = $(this).attr('materialname');

        imgObj.materialindex = $(this).attr('materialindex');
        imgObj.materialtype = $(this).attr('materialtype');
        imgObj.picstate = $(this).attr('picstate');

        imgArr.push(imgObj);
      });

      $('.a1_picpdf_main').attr('current-data-id', ul.prev('div').attr('dataid'));
      createImgList(imgArr, 5, 500);
      //range设置可用并且还原
      $('.currentNode').removeClass('currentNode');
      ul.children('li').eq(0).children('div').addClass('currentNode');



      $('#txt').val(100);
      $('.a0_slide').css('left', '18px');
      $('.hover_slide').width(18);
      $('.a0_slide').attr('slide', '1');
      $('#txt,#pageNum').removeAttr('disabled');
      $('#pageNum').val('1');
      slide();
      $('.icon_02,.icon_03,.icon_07').addClass('on');

      $('.a1_backbtn span').hide();
      ul.parent('li').parent('ul').slideDown(10);


      ul.find('div').click(function() {
        return false;
      });
      ul.find('div').each(function(index, element) {
        $(this).click(function() {
          setConScrollTop(parseInt(index) + 1);
        });
      });



      if (ul.parent('li').next('li').length > 0) {
        if (!$('.icon_08').hasClass('on')) {
          $('.icon_08').addClass('on');
        }
      } else {
        $('.icon_08').removeClass('on');
      }

      if (ul.parent('li').prev('li').length > 0) {
        if (!$('.icon_05').hasClass('on')) {
          $('.icon_05').addClass('on');
        }
      } else {
        $('.icon_05').removeClass('on');
      }
      $('.a0_return_up').show();

      return false;
    }
    //
    $('.a0_return_up').hide();
    $('#txt,#pageNum').attr('disabled', '');
    $('#pageNum').val('');
    $('.a0_slide').css('left', '18px');
    $('.hover_slide').width(18);
    $('#txt').val(100);
    $('.icon_02,.icon_03,.icon_05,.icon_06,.icon_07,.icon_08,.icon_10').removeClass('on');
    $('.a0_slide').attr('slide', '0');
    $('#totalNum').text('');
    $('.totalFifle_current span').text('0');
    //创建文件夹
    $('.a1_file_content').empty();


    $('.a1_file_wrap').css('display', 'block');
    $('.a1_picpdf_main').css('display', 'none');


    var htmlStr = '<ul>';
    var li = ul.children('li');
    li.each(function(index, ele) {
      htmlStr = htmlStr + '<li dataid="' + $(this).children('div').attr('dataid') + '"><span>' + $(this).attr('name') + '</span></li>'
    });
    htmlStr = htmlStr + '</ul>';
    $('.a1_file_content').html(htmlStr);
    if (ul.prev('div').attr('dataid')) {
      $('.a1_backbtnup').attr('currentid', ul.prev('div').attr('dataid'));
    } else {
      $('.a1_backbtnup').attr('currentid', '');
    }
    currentLoc(ul.prev('div'));

    $('.a1_backbtn span').show();
    //菜单收缩
    ul.find('ul').css('display', 'none');

    //currentNode
    $('.currentNode').removeClass('currentNode');
    ul.prev('div').addClass('currentNode');
    $(document).unbind('keydown', keyCode);
    //$(document).unbind('mouse',mouseGl);
  }

  //当前位置
  function currentLoc(div) {
    $('.a0_loc').empty();
    var locStr = [];
    var currentData = div;

    function recursionLoc(currentDiv) {
      if (currentDiv) {

        if (!currentDiv.next('ul').attr('imgtag')) {
          locStr.push('<a dataid="' + currentDiv.attr('dataid') + '">' + currentDiv.parent('li').attr('name') + '</a>');
        }
        if (currentDiv.parent('li').parent('ul').prev('div').length > 0) {
          recursionLoc(currentDiv.parent('li').parent('ul').prev('div'));
        }
      } else {
        locStr.push('<a>主页</a>');
      }
    }
    recursionLoc(currentData);

    locStr.reverse();
    locStr.unshift('<a>主页</a>');
    $('.a0_loc').html(locStr.join(' &gt; '));

  };

  //左侧树点击事件
  $(document).on('click', '.a1_menu_wrap ul li div', function() {
    var _this = $(this);
    $(this).next('ul').slideToggle(10, function() {
      if ($(this).css('display') == 'none') {
        $(this).find('ul').css('display', 'none');
        _this.parent('li').parent('ul').find('.on').removeClass('on');
      } else {
        _this.addClass('on');
      }
    });
    $(this).parent('li').siblings('li').find('ul').css('display', 'none');
    $(this).parent('li').siblings('li').find('.on').removeClass('on');


    //右边文件夹图标重绘
    var ul = $(this).next('ul');
    createFile(ul);
    currentLoc($(this));


    if ($(this).next('ul').attr('imgTag')) {
      $(this).next('ul').find('div').click(function() {
        return false;
      });
      $(this).next('ul').find('div').each(function(index, element) {
        $(this).click(function() {
          setConScrollTop(parseInt(index) + 1);
        });
      });
    }


  });


  function clickCommon(dataId) {
    var ul = $('.a1_menu_wrap [dataid="' + dataId + '"]').next('ul');
    createFile(ul);


    ul.slideDown(10);
    ul.parent('li').parent('ul').slideDown(10);
    ul.find('ul').css('display', 'none');
    ul.find('.on').removeClass('on');
    ul.prev('div').addClass('on');
    ul.parent('li').siblings('li').find('ul').css('display', 'none');
    ul.parent('li').siblings('li').find('.on').removeClass('on');


  }

  //文件夹点击
  $(document).on('click', '.a1_file_content > ul > li', function() {
    var dataId = $(this).attr('dataid');
    clickCommon(dataId);
  })



  //当前位置点击
  $(document).on('click', '.a0_loc a', function() {
    var dataid = $(this).attr('dataid');
    if (dataid) {
      clickCommon(dataid);
    } else {
      $('.a1_menu_wrap ul ul').css('display', 'none');
      createFile($('.a1_menu_wrap > ul'));
      $('.a0_loc').html('<a>主页</a>');

      $('.a1_menu_wrap .on').removeClass('on');
      $('.a1_backbtn span').hide();
    }
  });

  function createImgList(bigimgArr, num, time) {
    $('.a1_file_wrap').css('display', 'none');
    $('.a1_picpdf_main').empty();
    $('.a1_picpdf_main').css('display', 'block');
    $('.a0_pdfContent').scrollTop(0);
    var i = 0;
    $(document).unbind('keydown', keyCode);
    $(document).bind('keydown', keyCode);
    $('#totalNum').text('/' + bigimgArr.length);
    $('.totalFifle_current span').text(1);
    showVersion = '';
    //$('.icon_10').data('imglen',bigimgArr.length);
    if (bigimgArr.length > 25) {
      showVersion = '&flag=0.6';
    }
    if (bigimgArr.length > 50) {
      showVersion = '&flag=0.4';
    }

    var tem_i = 0;

    function temCreat() {
      var temArr = [];
      for (var m = 0; m < num; m++) {
        temArr.push(bigimgArr[tem_i * num + m])
      }

      downImg(temArr, 600, 840);

      if (bigimgArr.length / num > tem_i) {
        tem_i++;
        setTimeout(temCreat, time)
      } else {
        $('.icon_10').addClass('on');
      }
    }


    temCreat();

    function downImg(imgArr, cWidth, cHeight) {

      for (var i = 0; i < imgArr.length; i++) {
        var content = $('<div></div>');
        content.attr('class', 'a0_content');
        //check
        var a0_check = $('<div class="a0_check"></div>');


        var canvasJ = $('<div class="a0_img"></div>');
        var suiyin = $('<div class="a1_suiyin"></div>');
        if (tem_i * num + i == 0) {
          var picfirst_icon = $('<div class="a1_picfirst"></div>');
          picfirst_icon.appendTo(content);
        }

        if (imgArr[i]) {
          canvasJ.appendTo(content);
          suiyin.appendTo(content);
          if ($('#badge').val() == "true") {
            a0_check.appendTo(content);
          }

          content.attr('index', tem_i * num + i + 1);

          content.appendTo($('.a1_picpdf_main'));
          canvasJ.append('<img src="' + imgArr[i].url + showVersion + '" default_width="' + imgArr[i].imgWidth + '" default_height="' + imgArr[i].imgHeight + '"/>');
          canvasJ.css({
            "width": cWidth + 'px',
            "height": cHeight + 'px',
            "position": "relative",
          });


          var x;
          var y;
          var initWidth;
          var initHeight;
          if (imgArr[i].imgWidth > imgArr[i].imgHeight) {
            initHeight = (cWidth / imgArr[i].imgWidth) * imgArr[i].imgHeight;
            initWidth = cWidth;
            x = 0;
            y = (cHeight - initHeight) / 2;
            canvasJ.children('img').css({
              "position": "absolute",
              "border": "0",
              "display": "block",
              "width": initWidth + "px",
              "left": x + "px",
              "top": y + "px"
            });
          } else {
            initWidth = (cHeight / imgArr[i].imgHeight) * imgArr[i].imgWidth;
            initHeight = cHeight;
            x = (cWidth - initWidth) / 2;
            y = 0;

            canvasJ.children('img').css({
              "position": "absolute",
              "border": "0",
              "display": "block",
              "height": initHeight + "px",
              "left": x + "px",
              "top": y + "px"
            });
          }

          var jsonObj = {};
          jsonObj.url = imgArr[i].url;
          jsonObj.width = imgArr[i].imgWidth;
          jsonObj.height = imgArr[i].imgHeight;
          jsonObj.name = imgArr[i].name;
          jsonObj.index = imgArr[i].index;
          jsonObj.img = {};
          jsonObj.img.deWidth = imgArr[i].imgWidth;
          jsonObj.img.deHeight = imgArr[i].imgHeight;
          jsonObj.img.initWidth = initWidth;
          jsonObj.img.initHeight = initHeight;
          jsonObj.content = content;
          jsonObj.canvas = canvasJ;



          jsonObj.filename = imgArr[i].filename;
          jsonObj.materialname = imgArr[i].materialname;

          jsonObj.materialindex = imgArr[i].materialindex;
          jsonObj.materialtype = imgArr[i].materialtype;
          jsonObj.picstate = imgArr[i].picstate;


          content.data('selfData', jsonObj);
        }

      }

    }

  }






  function setImgSize(size, minSize, maxSize) {
    if ($('.a0_slide').attr('slide') == '1') {
      if (size >= minSize && size <= maxSize) {
        var max_left = $('.a0_range').width() - $('.a0_slide').width();
        var min_value = minSize;
        var max_value = maxSize;
        var value_size = max_value * 10 - (min_value * 10);
        var dw = max_left / value_size;

        var content_width = $('.a1_picpdf_main').attr('content_width');
        var content_height = $('.a1_picpdf_main').attr('content_height');

        $('.a1_picpdf_main .a0_content').css({
          "width": content_width * size + 'px',
          "height": content_height * size + 'px'
        });
        $('.a1_picpdf_main .a1_picfirst').css({
          "height": 75 * size + 'px'
        });

        $('.a1_picpdf_main .a0_content .a0_img').each(function(index, element) {


          $(this).css({
            "width": content_width * size + 'px',
            "height": content_height * size + 'px'
          });


          //图片放大
          var selfData = $(this).parent('.a0_content').data('selfData');

          //图片放大之后宽高
          var imgWidth = selfData.img.initWidth * size;
          var imgHeight = selfData.img.initHeight * size;
          var x, y;
          if (imgWidth > imgHeight) {
            x = 0;
            y = (content_height * size - imgHeight) / 2;
          } else {
            x = (content_width * size - imgWidth) / 2;
            y = 0;
          }


          $(this).children('img').css({
            "width": imgWidth + 'px',
            "height": imgHeight + 'px',
            "left": x + 'px',
            "top": y + 'px'
          });

          $('#txt').val(parseInt(size * 100));

          if ($('.a0_pdfContent')[0].scrollWidth > $('.a0_pdfContent').width()) {
            $('.a0_pdfContent').scrollLeft(($('.a0_pdfContent')[0].scrollWidth - $('.a0_pdfContent').width()) / 2);
          } else {
            $('.a0_pdfContent').scrollLeft(0);
          }


        });

      }
    }

  }

  function slide() {

    $("#slide").draggable({
      containment: "parent",
      axis: "x",
      drag: function(event, ui) {
        $('.check').removeClass('check');
        if ($('.a0_slide').attr('slide') == '1') {
          var max_left = $('.a0_range').width() - $('.a0_slide').width();
          var min_value = 0.4;
          var max_value = 4;
          var value_size = max_value * 10 - (min_value * 10);

          var dw = max_left / value_size;
          var size = min_value + (parseInt(ui.helper.css('left')) / dw * 0.1);
          $('.hover_slide').width(ui.position.left);
          setImgSize(size, min_value, max_value);
        } else {
          return false;
        }

      }
    });
  }
  var cli = null;

  $(document).on('click', '.a1_picpdf_main .a0_content', function() {
    clearTimeout(cli);
    var img = $(this).children('.a0_img').eq(0).children('img').eq(0);
    var src = img.attr('src');
    //alert(src);
    var cli = setTimeout(function() {
      img.attr('src', src + '&random=' + new Date().getTime());
      //alert(img.attr('src'));
    }, 300);
  });

  //点击图片
  $(document).on('dblclick', '.a1_picpdf_main .a0_content', function() {
    //先恢复

    clearTimeout(cli);
    //alert('dblclick');
    $('.a1_bombbox_content').css({
      "transform": "scale(1)",
      "left": "0",
      "top": "0"
    });
    $('.a1_bombbox').css('display', 'block');
    $('.a1_bomb_name').text($(this).data('selfData').name);



    //设值 图片容器 宽高

    $('.a1_bomb_wrap').height($(window).height());
    $('.a1_bomb_wrap').width((($(window).height() - $('.a1_bomb_title').height() - 5) / (parseInt($(this).data('selfData').height)) * (parseInt($(this).data('selfData').width))) + 10);

    $('.a1_canvas_div').height($('.a1_bomb_wrap').height() - 5);

    $('.a1_bombbox_content').height($('.a1_canvas_div').height() - $('.a1_bomb_title').height());
    $('.a1_bombbox_content').width($('.a0_control_canvas').width());

    $('.a1_bombbox_content').attr('initwidth', $('.a1_bombbox_content').width());
    $('.a1_bombbox_content').attr('initheight', $('.a1_bombbox_content').height());
    $('.a1_bombbox_content').attr("size", 1);

    $('.a0_control_canvas').height($('.a1_bombbox_content').height());

    //$('#bombimg')[0].width = $('.a1_bombbox_content').width();
    //$('#bombimg')[0].height = $('.a1_bombbox_content').height();
    var url = $(this).data('selfData').url;
    $('#bombimg').css({
      "width": $('.a1_bombbox_content').width() + 'px',
      "height": $('.a1_bombbox_content').height() + 'px',
      "background": 'url(' + url + ')',
      "background-size": "contain"
    });



  });
  //鼠标滚轮  放大 缩小
  function imgGl(event) {
    var wheelDelta = event.originalEvent.wheelDelta;
    var initWidth = $('.a1_bombbox_content').attr('initwidth');
    var initHeight = $('.a1_bombbox_content').attr('initheight');
    var old_size = parseFloat(parseFloat($('.a1_bombbox_content').attr("size")).toFixed(1));
    var size = parseFloat(parseFloat($('.a1_bombbox_content').attr("size")).toFixed(1));
    if (wheelDelta < 0) {
      //向下 缩小
      size = size - 0.1;
      if (size < 1) {
        return;
      }

    } else {
      //向上 放大
      size = size + 0.1;
      if (size > 10) {
        return;
      }
    }



    var left = parseInt(event.clientX - $('.a0_control_canvas').offset().left);
    var top = parseInt(event.clientY - $('.a0_control_canvas').offset().top);
    $('.a1_bombbox_content').css({
      "transform-origin": left + 'px ' + top + 'px',
      "transform": "scale(" + size + ")",
      "left": 0,
      "top": 0
    });


    var max_left = left * (size - 1);
    var max_top = top * (size - 1);

    var min_left = (initWidth * size - max_left - initWidth) * (-1);
    var min_top = (initHeight * size - max_top - initHeight) * (-1);
    $('.a1_bombbox_content').attr("size", size);
    $(".a1_bombbox_content").draggable({
      "drag": function(event, ui) {
        var ui_left = parseInt(ui.helper.css('left'));
        var ui_top = parseInt(ui.helper.css('top'));

        if (ui_left > max_left) {
          ui.helper.css('left', max_left + 'px');
          return false;
        }
        if (ui_left < min_left) {
          ui.helper.css('left', min_left + 'px');
          return false;
        }
        if (ui_top > max_top) {
          ui.helper.css('top', max_top + 'px');
          return false;
        }
        if (ui_top < min_top) {
          ui.helper.css('top', min_top + 'px');
          return false;
        }
      }
    });
  }

  $(document).on('mousewheel', '.a1_bombbox_content', imgGl);

  //图片拖动

  //关闭
  $('.a1_bomb_close').click(function() {
    $('.a1_bombbox').css('display', 'none');
  });

  //输入框控制大小
  $('#txt').change(function() {
    var size = (Math.min(Math.max(parseInt($(this).val()), 40), 400) || 100) / 100;
    setImgSize(size, 0.4, 4);

    var max_left = $('.a0_range').width() - $('.a0_slide').width();
    var min_value = 0.4;
    var max_value = 4;
    var value_size = max_value * 10 - (min_value * 10);

    var dw = max_left / value_size;
    //alert(size);

    var hoverWidth = (size - min_value) * dw * 10;
    $('.hover_slide').width(hoverWidth);
    $('#slide').css('left', hoverWidth);

  });


  //宽度自适应
  $(document).on('click', '.icon_02.on', function() {
    var contentWidth = $('.a1_picpdf_main').width() - parseInt($('.a0_content').css('padding-left')) - parseInt($('.a0_content').css('padding-right')) - parseInt($('.a0_content').css('border-left-width')) - parseInt($('.a0_content').css('border-right-width'));
    var size = contentWidth / parseInt($('.a1_picpdf_main').attr('content_width'));
    setImgSize(size, 0.4, 4);

    var max_left = $('.a0_range').width() - $('.a0_slide').width();
    var min_value = 0.4;
    var max_value = 4;
    var value_size = max_value * 10 - (min_value * 10);

    var dw = max_left / value_size;
    //alert(size);

    var hoverWidth = (size - min_value) * dw * 10;
    $('.hover_slide').width(hoverWidth);
    $('#slide').css('left', hoverWidth);

    $('.check').removeClass('check');
    $(this).addClass('check');
  });


  //高度自适应
  $(document).on('click', '.icon_03.on', function() {
    var contentHeight = $('.a0_pdfContent').height() - parseInt($('.a0_content').css('padding-bottom')) - parseInt($('.a0_content').css('padding-top')) - parseInt($('.a0_content').css('border-top-width')) - parseInt($('.a0_content').css('border-bottom-width')) - 10;
    var size = contentHeight / parseInt($('.a1_picpdf_main').attr('content_height'));
    var scrollTop = $('.a0_content').eq(0).offset().top - $('.a0_pdfContent').offset().top - 5 > 0 ? $('.a0_content').eq(0).offset().top - $('.a0_pdfContent').offset().top - 5 : 23;
    $('.a0_pdfContent').scrollTop(scrollTop);

    setImgSize(size, 0.4, 4);
    var max_left = $('.a0_range').width() - $('.a0_slide').width();
    var min_value = 0.4;
    var max_value = 4;
    var value_size = max_value * 10 - (min_value * 10);

    var dw = max_left / value_size;
    //alert(size);

    var hoverWidth = (size - min_value) * dw * 10;
    $('.hover_slide').width(hoverWidth);
    $('#slide').css('left', hoverWidth);
    $('.check').removeClass('check');
    $(this).addClass('check');
  });



  $(document).on('click', '.icon_qp.on', function() {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
    myVar = setTimeout(function() {
      $('.a0_pdf').height($(window).height() - 48);
      $('.a0_pdfContent').height($('.a0_pdf').height() - 43);
      $('.a1_file_wrap').css('min-height', $('.a0_pdfContent').height() - 22 + 'px');
      var file_content_height = $('.a1_file_wrap').height() - ($('.a1_location').height() + $('.a1_backbtn').height() + 22);
      $('.a1_file_content').css('min-height', file_content_height);
      $('.a0_side').height($('.a0_pdf').height() - 41);
    }, 300);
  });


  //设值滚动条位置
  function setConScrollTop(pageNum) {

    var pageNum = parseInt(pageNum);
    var maxPageNum = parseInt($('.a1_picpdf_main .a0_content').length);

    if (pageNum > maxPageNum) {
      pageNum = maxPageNum;
    }
    if (pageNum < 1) {
      pageNum = 1;
    }
    //$('.a1_pre,.a1_next').show();
    if (pageNum == 1) {
      $('.icon_06').removeClass('on');
      //$('.a1_pre').hide();
    } else {
      $('.icon_06').addClass('on');
    }

    if (pageNum == maxPageNum) {
      $('.icon_07').removeClass('on');
      //$('.a1_next').hide()

    } else {
      $('.icon_07').addClass('on');
    }


    var scrollTop = ($('.a0_content').height() + 48) * (pageNum - 1);
    $('.a0_pdfContent').scrollTop(scrollTop);
    $('#pageNum').val(pageNum);
    var currentId = $('.a1_picpdf_main').attr('current-data-id');
    var currentPage = $('.a1_menu_wrap div[dataid="' + currentId + '"]').next('ul').children('li').eq(pageNum - 1).attr('index');
    $('.totalFifle_current span').text(currentPage);
  }

  $(document).on('click', '.icon_05.on', function() {
    //第一页
    //setConScrollTop(1);

    //上一文件夹
    var currentId = $('.a1_picpdf_main').attr('current-data-id');
    var ul = $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').prev('li').children('ul');
    if (ul.length > 0) {
      createFile(ul);
      $('.a1_menu_wrap div[dataid="' + currentId + '"]').next('ul').hide();
      ul.show();
    }

  });

  $(document).on('click', '.icon_08.on', function() {
    //末页
    //setConScrollTop(parseInt($('.a1_picpdf_main .a0_content:last').attr('index')));

    //下一文件夹
    var currentId = $('.a1_picpdf_main').attr('current-data-id');
    var ul = $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').next('li').children('ul');
    if (ul.length > 0) {
      createFile(ul);
      $('.a1_menu_wrap div[dataid="' + currentId + '"]').next('ul').hide();
      ul.show();
    }
  });

  $(document).on('click', '.icon_06.on', function() {
    //上一页
    setConScrollTop($('#pageNum').val() - 1);
  });
  $(document).on('click', '.icon_07.on', function() {
    //下一页
    setConScrollTop(parseInt($('#pageNum').val()) + 1);
  });


  function pdfContentScroll() {
    if ($('.a0_slide').attr('slide') == '1') {
      var maxPage = $('.a0_content').length;
      $('.a0_content').each(function(index, element) {
        if ($(this).offset().top > 0) {

          $('#pageNum').val($(this).attr('index'));
          //$('.a1_pre,.a1_next').show();
          if ($(this).attr('index') == maxPage) {
            $('.icon_07').removeClass('on');
            //$('.a1_next').hide();
          } else {
            $('.icon_07').addClass('on');
          }

          if ($(this).attr('index') == 1) {
            //$('.a1_pre').hide()
            $('.icon_06').removeClass('on');
          } else {
            $('.icon_06').addClass('on');
          }
          var parentUl = $('.currentNode').parent('li').parent('ul');
          $('.currentNode').removeClass('currentNode');
          parentUl.children('li').eq($(this).attr('index') - 1).children('div').addClass('currentNode');
          var currentId = $('.a1_picpdf_main').attr('current-data-id');
          var currentPage = $('.a1_menu_wrap div[dataid="' + currentId + '"]').next('ul').children('li').eq($(this).attr('index') - 1).attr('index');
          $('.totalFifle_current span').text(currentPage);
          return false;
        }
      });
    }
  }
  $('.a0_pdfContent').scroll(pdfContentScroll);

  //
  $(document).on('click', '.icon_00', function() {
    menu(createMenu(jsonObj));
    $(this).addClass('on');
    $('.icon_01').removeClass('on');
  });
  //时间
  $(document).on('click', '.icon_01', function() {

    menu(createMenu(timeObj));
    $(this).addClass('on');
    $('.icon_00').removeClass('on');

  });


  //返回首页
  $('.a1_backbtnheader').click(function() {
    $('.a1_menu_wrap ul ul').css('display', 'none');
    createFile($('.a1_menu_wrap > ul'));
    $('.a0_loc').html('<a>主页</a>');
    $('.a1_backbtn span').hide();
  });

  //返回上一级
  $('.a1_backbtnup').click(function() {
    var currentid = $(this).attr('currentid');
    var ul = $('.a1_menu_wrap div[dataid="' + currentid + '"]').parent('li').parent('ul');

    if (currentid) {
      createFile(ul);
      if (ul.parent('div').is('.a1_menu_wrap')) {
        $('.a1_menu_wrap ul ul').css('display', 'none');
        createFile($('.a1_menu_wrap > ul'));
        $('.a0_loc').html('<a>主页</a>');
        $('.a1_backbtn span').hide();
      }
    } else {

      $('.a1_menu_wrap ul ul').css('display', 'none');
      createFile($('.a1_menu_wrap > ul'));
      $('.a0_loc').html('<a>主页</a>');
      $('.a1_backbtn span').hide();
    }

  });

  //点击图片
  $('[imgtag="imgtag"] li').each(function(index, ele) {
    $(this).click(function() {
      setConScrollTop(parseInt(index) + 1);
    });
  });

  function printPage(imgArr) {

    var headstr = "<!DOCTYPE html><html><head><meta http-equiv='Cache-Control' content='no-store'/><title>打印预览</title><link rel='stylesheet' type='text/css' href='styles/s1/css/print.css'/></head>" +
      "<body>";
    var footstr = "</body>";

    var content = '';
    for (var i = 0; i < imgArr.length; i++) {

      var img = imgArr[i];

      var imgAttr;

      if (img.width > img.height) {
        imgAttr = " width=100%";
      } else {
        imgAttr = " height=100%";
      }

      content = content + '<div class="a0_img"><div class="a0_content"><img src="' + img.url + '" ' + imgAttr + '/><div class="a1_suiyin"><img src="styles/s1/images/print.png" ' + imgAttr + '/></div></div></div>';
    }
    var html = headstr + content + footstr;
    var pwin = window.open("", "print");
    pwin.document.write(html);
    pwin.document.write("<scri" + "pt src='common/js/pdf.js'></sc" + "ript>");

    pwin.document.close();
    pwin.focus();
    pwin.print();
    pwin.close();
  }

  function selfPrint(imgArr) {

    if (imgArr.length > 10) {
      alert('因受网络环境等因素影响，单次打印超过10页有可能出现缺页、漏页等现象，我们建议您分次、分批打印。对您工作造成不便请见谅。');
    }
    var temp_page = 0;

    function tem_fun() {

      var tem_img = [];
      for (var i = 0; i < 5; i++) {
        if (imgArr[temp_page * 5 + i]) {
          tem_img.push(imgArr[temp_page * 5 + i]);
        }
      }
      printPage(tem_img);
      temp_page++;
      if (temp_page < imgArr.length / 5) {

        tem_fun(temp_page);
      } else {

      }
    }
    tem_fun();

  }

  $('#pageNum').change(function() {
    setConScrollTop(parseInt($(this).val()) || 1);
  });





  $('.a0_return_up').click(function() {
    var currentId = $('.a1_picpdf_main').attr('current-data-id');
    var ul = $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').parent('ul');
    createFile(ul);

  });

  function setPrevNextIcon(pageNum) {
    var minPage = 1;
    var maxPage = $('.a1_picpdf_main .a0_content').length;
    $('.a1_pre,.a1_next').show();
    if (pageNum == 1) {
      $('.a1_pre').hide();
    }
    if (pageNum == maxPage) {
      $('.a1_next').hide();
    }

  }
  $(document).on('mouseover mousemove', '.a1_picpdf_main .a0_content', function() {
    setPrevNextIcon(parseInt($('#pageNum').val()));
  });

  $(document).on('mouseout', '.a1_picpdf_main .a0_content', function() {
    $('.a1_pre,.a1_next').hide();
  });

  $('.a1_pre,.a1_next').mouseover(function() {
    $(this).show();
  });

  $('.a1_pre').click(function() {
    var pageNum = parseInt($('#pageNum').val()) - 1;
    setConScrollTop(pageNum || 1);
  });
  $('.a1_next').click(function() {
    var pageNum = parseInt($('#pageNum').val()) + 1;
    setConScrollTop(pageNum || 1);
  });

  function mouseGl(event) {
    var wheelDelta = event.originalEvent.wheelDelta;
    $(document).on('keydown', function(ev) {
      if (ev.which == 16) {
        var current_size = $('#txt').val();
        var size;


        if (wheelDelta < 0) {
          //向下 缩小
          size = (Math.min(Math.max(parseInt(parseInt(current_size) - 1), 40), 400) || 100) / 100;

        } else {
          //向上 放大
          size = (Math.min(Math.max(parseInt(parseInt(current_size) + 1), 40), 400) || 100) / 100;
        }

        setImgSize(size, 0.4, 4);

        var max_left = $('.a0_range').width() - $('.a0_slide').width();
        var min_value = 0.4;
        var max_value = 4;
        var value_size = max_value * 10 - (min_value * 10);

        var dw = max_left / value_size;
        //alert(size);

        var hoverWidth = (size - min_value) * dw * 10;
        $('.hover_slide').width(hoverWidth);
        $('#slide').css('left', hoverWidth);
      }


    })
  }

  function keyCode(event) {

    var page;

    //上
    if (event.which == 87) {
      //上一个文件夹
      var currentId = $('.a1_picpdf_main').attr('current-data-id');
      var ul = $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').prev('li').children('ul');
      if (ul.length > 0) {
        createFile(ul);
        $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').children('ul').hide();
        ul.show();

        //icon_05
        if (ul.parent('li').prev('li').length > 0) {
          if (!$('.icon_05').hasClass('on')) {
            $('.icon_05').addClass('on');
          }
        } else {
          $('.icon_05').removeClass('on');
        }

      } else {

      }

    }

    //下
    if (event.which == 83) {
      //下一个文件夹
      var currentId = $('.a1_picpdf_main').attr('current-data-id');
      var ul = $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').next('li').children('ul');

      if (ul.length > 0) {
        createFile(ul);
        $('.a1_menu_wrap div[dataid="' + currentId + '"]').parent('li').children('ul').hide();
        ul.show();
        if (ul.parent('li').next('li').length > 0) {
          if (!$('.icon_08').hasClass('on')) {
            $('.icon_08').addClass('on');
          }
        } else {
          $('.icon_08').removeClass('on');
        }
      } else {

      }

    }

    //左
    if (event.which == 65) {

      setConScrollTop(parseInt($('#pageNum').val()) - 1);

    }

    //右
    if (event.which == 68) {

      setConScrollTop(parseInt($('#pageNum').val()) + 1);

    }

  }


  //帮助
  $(document).on('click', '.icon_11.on', function() {
    $('.a0_hlep').show();
    $(this).removeClass('on');
  });

  $('.a0_hlep_after').click(function() {
    $('.a0_hlep').hide();
    $('.icon_11').addClass('on');
  });

  //打印
  $(document).on('click', '.icon_10.on', function() {

    var printObj = $(this).data('printObj');
    if (!printObj) {
      alert('连接超时，稍后再试');
    } else {
      if (printObj.check_flag == 'false') {
        alert(printObj.check_message);
        return false;
      }
      if (printObj.check_flag == 'true') {
        $('.a0_wrap_print').show();
        $('#printFrom').val($('#pageNum').val());
        $('#printTo').val($('.a1_picpdf_main .a0_content').length)
      }
    }
    //$('.a0_wrap_print').show();

  });
  $('.print_close').click(function() {
    $('.a0_wrap_print').hide();
    $('#printFrom').val('');
    $('#printTo').val('');
    $('.flex_print').hide();
    //$('.flex_print').remove();

  });

  //打印当前页
  $('.a0_currentPage > div').click(function() {
    var fromIndex = $('.a1_picpdf_main .a0_content').eq(parseInt($('#pageNum').val()) - 1).data('selfData').index;
    var toIndex = '';
    creatFlexPrint(fromIndex, toIndex);

  });

  //打印所有
  $('.a0_all > div').click(function() {
    var fromIndex = $('.a1_picpdf_main .a0_content').eq(0).data('selfData').index;
    var toIndex = $('.a1_picpdf_main .a0_content').eq($('.a1_picpdf_main .a0_content').length - 1).data('selfData').index;

    if ($('.a1_picpdf_main .a0_content').length > 30 && $('.a1_picpdf_main .a0_content').length <= 60) {
      if ((parseInt(toIndex) - parseInt(fromIndex) + 1) > 20) {
        alert("因页数过多，受浏览器内存限制，建议您分次打印，每次不超过20张。");
        return false;
      }


    }
    if ($('.a1_picpdf_main .a0_content').length > 60) {
      if ((parseInt(toIndex) - parseInt(fromIndex) + 1) > 15) {
        alert("因页数过多，受浏览器内存限制，建议您分次打印，每次不超过15张。");
        return false;
      }

    }
    creatFlexPrint(fromIndex, toIndex);

  });

  //选定页
  $('.a0_selectPage > div').click(function() {
    var from = parseInt($('#printFrom').val());
    var to = parseInt($('#printTo').val());


    var minPage = 1;
    var maxPage = $('.a1_picpdf_main .a0_content').length;
    if (!/^[1-9][0-9]*$/.test(from)) {
      alert('开始页码请填写整数页码,范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }

    if (!/^[1-9][0-9]*$/.test(to)) {
      alert('结束页码请填写整数页码,范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }
    if (!from) {
      alert('请填写开始页码,范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }
    if (!to) {
      alert('请填写结束页码,范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }
    if (from < 1) {
      alert('最小页码为' + minPage + ',范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }
    if (to > maxPage) {
      alert('最大页码为' + maxPage + ',范围为' + '(' + minPage + '-' + maxPage + ')');
      return false;
    }
    if (from > to) {
      alert('开始页码应小于等于结束页码');
      return false;
    }


    var fromIndex = $('.a1_picpdf_main .a0_content').eq(from - 1).data('selfData').index;
    var toIndex = $('.a1_picpdf_main .a0_content').eq(to - 1).data('selfData').index;



    if ($('.a1_picpdf_main .a0_content').length > 30 && $('.a1_picpdf_main .a0_content').length <= 60) {
      if ((parseInt(toIndex) - parseInt(fromIndex) + 1) > 20) {
        alert("因页数过多，受浏览器内存限制，建议您分次打印，每次不超过20张。");
        return false;
      }


    }
    if ($('.a1_picpdf_main .a0_content').length > 60) {
      if ((parseInt(toIndex) - parseInt(fromIndex) + 1) > 15) {
        alert("因页数过多，受浏览器内存限制，建议您分次打印，每次不超过15张。");
        return false;
      }

    }

    creatFlexPrint(fromIndex, toIndex);



  });



  function creatFlexPrint(pageFrom, pageTo) {

    $('.flex_print').show();
    $('.flex_print').empty();
    $('.flex_print').append('<div id="flex_print"></div>')
    var dirUrl = xmlUrl.split('?')[0] + '?method^getPrintXml`printMethod^' + $('.printMethod.on').attr('printMethod') + '`printLabelEffect^null`version^`archiveid^' + archiveid + '`serialno^' + serialno + '`sitecode^' + sitecode;
    var flashvars = {
      "from": pageFrom,
      "to": pageTo,
      "dirurl": dirUrl,
      "picurl": xyUrl,
      "effect": xy_printEffect,
      "time": printTime,
      "op": opdisplay
    };
    var params = {};
    var attributes = {};
    //var swfUrl = flashUrl.replace(/\/digitalarchive\/\/digitalarchive\//igm,'/digitalarchive/');
    swfobject.embedSWF(xmlUrl.split('digitalarchive')[0] + "digitalarchive/imageview/pdf/ImageViewer.swf", "flex_print", "100%", "20", "9.0.0", "expressInstall.swf", flashvars, params, attributes);

    $('.flex_print').append('<div><a href="' + getFlash + '" style="color:red" target="_blank">点击此处</a>下载安装最新版Flash插件，并关闭浏览器重新打开该应用程序。</div>');
    //var swfUrl =  xmlUrl.split('digitalarchive')[0]+"digitalarchive/imageview/pdf/ImageViewer.swf";
    //http://130.10.8.246:7051/digitalarchive/imageview/pdf/ImageViewer.swf

  }

  var checkUrl = xmlUrl.split('?')[0] + '?method=markController';
  $(document).on('click', '.a0_check', function() {

    $(this).toggleClass('on');
    var d = $(this).parent('.a0_content').data('selfData');
    var flag;
    if ($(this).hasClass('on')) {
      flag = 1;
    } else {
      flag = 0;
    }
    var _this = $(this);

    var qqUrl = checkUrl + '&archiveid=' + archiveid + '&serialno=' + serialno + '&materialtype=' + d.materialtype + '&materialname=' + d.materialname + '&materialindex=' + d.materialindex + '&index=' + d.index + '&filename=' + d.filename + '&flag=' + flag + '&picstate=' + d.picstate;
    $.ajax({
      url: qqUrl,
      type: "get",
      success: function(data) {
        //成功之后
        var x = $(data);
        if (x.find('check_flag').text() == 'false') {
          _this.removeClass('on');
          alert(x.find('check_message').text());
        }
      }
    });
  });


});
