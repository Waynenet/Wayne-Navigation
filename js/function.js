function autoFillSearch() {
    var strdomin = $("#searchText").val();

    if (strdomin == null || strdomin == "") {
        hideDiv($("#autoFillInput"));
        return;
    }
  
    window.status = "请求中";

    var qsData = {'wd': strdomin, 'p': '3', 'cb': 'ShowDiv', 't': new Date().getMilliseconds().toString()};
    $.ajax({
        async: false,
        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        type: "GET",
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: qsData,
        timeout: 5000,
        success: function (json) {
        },
        error: function (xhr) {
        }
    });
}

function hideDiv(element) {
    element.empty();
    element.hide(); 
}
function searchTextOnblur(){
    // hideDiv($("#autoFillInput"));
    // $("#autoFillInput").hide();
}
function ShowDiv(strurls) {
    autoDisplay(strurls);
    window.status = "请求结束";
}

var highlightindex = -1;   //高亮
function autoDisplay(autoStr) {
    var Info = autoStr['s'];   //拿到关键字提示

    var wordText = $("#searchText").val();
    var autoNode = $("#autoFillInput");   

    if (Info.length == 0) {
        autoNode.hide();
        return false;
    }

    autoNode.empty();  //清空上次
    for (var i = 0; i < Info.length; i++) {
        var wordNode = Info[i];   //弹出框里的每一条内容

        var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
        newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer; text-align:left");

        newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框

        //鼠标移入高亮，移开不高亮
        newDivNode.mouseover(function () {
            if (highlightindex != -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
                autoNode.children("div").eq(highlightindex).css("background-color", "white");
            }
            //记录新的高亮节点索引
            highlightindex = $(this).attr("id");
            $(this).css("background-color", "#ebebeb");
        });
        newDivNode.mouseout(function () {
            $(this).css("background-color", "white");
        });

        //鼠标点击文字上屏
        newDivNode.click(function () {
            //取出高亮节点的文本内容
            var comText = autoNode.hide().children("div").eq(highlightindex).text();
            highlightindex = -1;
            //文本框中的内容变成高亮节点的内容
            $("#searchText").val(comText);
        });
        if (Info.length > 0) {    //如果返回值有内容就显示出来
            autoNode.show();
        } else {               //服务器端无内容返回 那么隐藏弹出框
            autoNode.hide();
            //弹出框隐藏的同时，高亮节点索引值也变成-1
            highlightindex = -1;
        }

    }

}

function search_click(engine){
    hideDiv($("#autoFillInput"));
	 var v = document.getElementById("searchText").value;
    if (v != '') {

        if (engine == '') {
            search('https://fsoufsou.com/search?q=' + v)
        } else {
            if (engine === 'fsou') {
                search('https://fsoufsou.com/search?q=' + v)
            } else if (engine === 'bing') {
                search("https://cn.bing.com/search?q=" + v)
            } else if (engine === 'google') {
                search("https://www.google.com.hk/search?q=" + v)
            } else if (engine === 'github') {
            	search('https://github.com/search?q=' + v)
            } else if (engine === 'baidu') {
                search("https://www.baidu.com/s?wd=" + v)
            } else if (engine === 'sogou') {
                search("https://www.sogou.com/web?query=" + v)
            } else if (engine === 'zhihu') {
                search("https://www.zhihu.com/search?type=content&q=" + v)
            } else if (engine === 'bilibili') {
                search("https://search.bilibili.com/all?keyword=" + v)
            } else if (engine === 'google-image') {
            	search('https://www.googlebridge.com/search?q=' + v )
            }
        }
    }
}



function search(url) {
    window.open(url)
}

$(function () {
     $("#searchText").keyup(function (event) {
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;

        if (keyCode == 38 || keyCode == 40) {
            if (keyCode == 38) {       //向上
                var autoNodes = $("#autoFillInput").children("div");
                if (highlightindex != -1) {
                    //如果原来存在高亮节点，则将背景色改称白色
                    autoNodes.eq(highlightindex).css("background-color", "white");
                    highlightindex--;
                } else {
                    highlightindex = autoNodes.length - 1;
                }
                if (highlightindex == -1) {
                    //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                    highlightindex = autoNodes.length - 1;
                }
                //让现在高亮的内容变成红色
                autoNodes.eq(highlightindex).css("background-color", "#ebebeb");

                //取出当前选中的项 赋值到输入框内
                var comText = autoNodes.eq(highlightindex).text();
                $("#searchText").val(comText);
            }
            if (keyCode == 40) {    //向下
                var autoNodes = $("#autoFillInput").children("div");
                if (highlightindex != -1) {
                    //如果原来存在高亮节点，则将背景色改称白色
                    autoNodes.eq(highlightindex).css("background-color", "white");
                }
                highlightindex++;
                if (highlightindex == autoNodes.length) {
                    //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                    highlightindex = 0;
                }
                //让现在高亮的内容变成红色
                autoNodes.eq(highlightindex).css("background-color", "#ebebeb");

                var comText = autoNodes.eq(highlightindex).text();
                $("#searchText").val(comText);
            }
        } else if (keyCode == 13) {     //回车
            //下拉框有高亮内容
            if (highlightindex != -1) {
                //取出高亮节点的文本内容
                var comText = $("#autoFillInput").hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#searchText").val(comText);
            } 
            search_click("baidu");
        } else if (keyCode == 27) {    //按下Esc 隐藏弹出层
            if ($("#autoFillInput").is(":visible")) {
                $("#autoFillInput").hide();
            }
        }

     });
    //点击页面隐藏自动补全提示框
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != "searchText") {
            if ($("#autoFillInput").is(":visible")) {
                $("#autoFillInput").css("display", "none")
            }
        }
    }
});

//回到顶部
window.onscroll = function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        $("#topup").css({
            display: 'block',
            transform: 'translateX(0px)',
            transition: '0.3s',
        });
    } else {
        $("#topup").css({
            transform: 'translateX(60px)',
            transition: '0.3s',
        });
    }
}

//夜间模式切换
function dark() {
    document.body.classList.add('night');
    document.cookie = "night=1;path=/";
    document.getElementById("suspension_text").innerHTML = "切换日间模式";
    iziToast.info({
        timeout: 2000,
        icon: 'Fontawesome',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'fa-solid fa-moon',
        backgroundColor: '#fff',
        title: '夜间模式切换',
        message: '已切换为夜间模式'
    });
}

function light() {
    document.body.classList.remove('night');
    document.cookie = "night=0;path=/";
    document.getElementById("suspension_text").innerHTML = "切换夜间模式";
    iziToast.info({
        timeout: 2000,
        icon: 'Fontawesome',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'fa-solid fa-sun',
        backgroundColor: '#fff',
        title: '日间模式切换',
        message: '已切换为日间模式'
    });
}

function switchNightMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        dark();
    } else {
        light();
    }
}

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        if (event.matches) {
            dark();
        } else {
            light();
        }
    })
    
$(document).ready(function () {
    //img lazy loaded
    const observer = lozad();
    observer.observe();
    
    $(document).on('click', '.has-sub', function () {
        var _this = $(this)
        if (!$(this).hasClass('expanded')) {
        setTimeout(function () {
            _this.find('ul').attr("style", "")
        }, 300);
    
        } else {
        $('.has-sub ul').each(function (id, ele) {
            var _that = $(this)
            if (_this.find('ul')[0] != ele && !expandAll) {
            setTimeout(function () {
                _that.attr("style", "")
            }, 300);
            }
        })
        }
    })
    $('.user-info-menu .hidden-sm').click(function () {
        if ($('.sidebar-menu').hasClass('collapsed')) {
        $('.has-sub.expanded > ul').attr("style", "")
        } else {
        $('.has-sub.expanded > ul').show()
        }
    })
    $("#main-menu li ul li").click(function () {
        $(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
        $(this).addClass('active'); // 添加当前元素的样式
    });
    $("a.smooth").click(function (ev) {
        ev.preventDefault();
    
        public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
        ps_destroy();
        $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top - 30
        }, {
        duration: 500,
        easing: "swing"
        });
    });
    return false;
    });
    
    var href = "";
    var pos = 0;
    $("a.smooth").click(function (e) {
    $("#main-menu li").each(function () {
        $(this).removeClass("active");
    });
    $(this).parent("li").addClass("active");
    e.preventDefault();
    href = $(this).attr("href");
    pos = $(href).position().top - 30;
    });
    (function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() > 22 || new Date().getHours() < 6) {
        document.body.classList.add('night');
        document.cookie = "night=1;path=/";
        } else {
        document.body.classList.remove('night');
        document.cookie = "night=0;path=/";
        }
    } else {
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
        document.body.classList.remove('night');
        } else if (night == '1') {
        document.body.classList.add('night');
        }
    }
})();

//控制台输出
console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
let styleTitle2 = `
font-size:16px;
color: rgb(244,167,89);
`
let styleContent = `
color: rgb(30,152,255);
`
let title1 = 'WayneのNavigation'
let title2 = `
==============================
#   #    #   #   # #   # #####
#   #   # #   # #  ##  # #
# # #  #####   #   # # # #####
## ##  #   #   #   #  ## #
#   #  #   #   #   #   # #####
==============================
`
let content = `
版 本 号：1.1.2
更新日期：2022-08-07

WayneのNavigation: https://3301.ml/
Github:  https://github.com/Waynenet/Wayne-Navigation
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

