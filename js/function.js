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

//鼠标在左边菜单的时候，禁用body的滚动条，防止滚动左边的时候右边也一起滚动
//function IsPC() {
//    var userAgentInfo = navigator.userAgent;
//    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPad", "iPod"];
//    var flag = true;
//    for (var v = 0; v < Agents.length; v++) {
//        if (userAgentInfo.indexOf(Agents[v]) > 0) {
//            flag = false;
//            break;
//        }
//    }
//    return flag;
//};
//$(document).ready(function(){
//    var isPC=IsPC();
//    if(isPC){
//        $('.sidebar-menu-inner').mousemove(function () {
//            document.body.style.overflow = 'hidden';
//        }).mouseleave(function () {
//            document.body.style.overflow = 'auto';
//        });
//    }
//});

//星空背景
var canvas;
var stars_count;
var stars;
ini();
makeStars();
var interval=setInterval(function(){drawStars();},50);//定时刷新星星数据

function ini(){//初始化
    canvas = document.getElementById("starfield");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    stars = Array();//数组存放随机生成的星星数据（x,y,大小，颜色，速度）
    stars_count = 300;//星星数量
    clearInterval(interval);
}

function makeStars(){//随机生成星星数据
    for(var i=0;i<stars_count;i++)
    {
        let x=Math.random() * canvas.offsetWidth;
        let y = Math.random() * canvas.offsetHeight;
        let radius = Math.random()*0.8;
        let color="rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",0.8)";
        let speed=Math.random()*0.5;
        let arr={'x':x,'y':y,'radius':radius,'color':color,'speed':speed};//（x,y,大小，颜色，速度）
        stars.push(arr);//随机生成的星星数据存在这里
    }
}

function drawStars(){//把星星画到画布上
    context.fillStyle = "#0e1729";
    context.fillRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < stars.length; i++) {
        var x = stars[i]['x'] - stars[i]['speed'];
        if(x<-2*stars[i]['radius']) x=canvas.width;
        stars[i]['x']=x;
        var y = stars[i]['y'];
        var radius = stars[i]['radius'];
        context.beginPath();
        context.arc(x, y, radius*2, 0, 2*Math.PI);
        context.fillStyle = "rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+",0.8)";
        context.fill();
    }
}

window.onresize = function(){//窗口大小发生变化时重新随机生成星星数据
    ini();
    makeStars();
    interval=setInterval(function(){drawStars();},50);
}

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
版 本 号：2.3.0
更新日期：2022-08-13

WayneのNavigation: https://3301.ml/
Github:  https://github.com/Waynenet/Wayne-Navigation
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)