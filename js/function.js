$(document).ready(function() {
    //img lazy loaded
    const observer = lozad();
    observer.observe();

    return $(document).on("click", ".has-sub", function () {
        var e = $(this);
        $(this).hasClass("expanded") ? $(".has-sub ul").each(function (s, i) {
            var t = $(this);
            e.find("ul")[0] != i && setTimeout(function () {
                t.attr("style", "")
            }, 300)
        }) : setTimeout(function () {
            e.find("ul").attr("style", "")
        }, 300)
    }), $(".user-info-menu .hidden-sm").click(function () {
        $(".sidebar-menu").hasClass("collapsed") ? $(".has-sub.expanded > ul").attr("style",
            "") : $(".has-sub.expanded > ul").show()
    }), $("#main-menu li ul li").click(function () {
        $(this).siblings("li").removeClass("active"), $(this).addClass("active")
    }), $("a.smooth").click(function (s) {
        s.preventDefault(), public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass(
            "mobile-is-visible"), ps_destroy(), $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 30
        }, {
            duration: 500,
            easing: "swing"
        })
    }), !1
});
var href = "",
    pos = 0;
$("a.smooth").click(function (s) {
    $("#main-menu li").each(function () {
            $(this).removeClass("active")
        }), $(this).parent("li").addClass("active"), s.preventDefault(), href = $(this).attr("href"),
        pos = $(href).position().top - 30
})

function imgerrorfun(){ 
    var img=event.srcElement; 
    img.src="images/browser.svg"; //默认图片
    img.onerror=null; 
} 

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
        icon: 'tabler-icons',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'ti ti-moon-filled',
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
        icon: 'tabler-icons',
        closeOnEscape: 'true',
        transitionOut: 'fadeOutRight',
        displayMode: 'replace',
        layout: '2',
        transitionIn: 'bounceInLeft',
        position: 'topRight',
        icon: 'ti ti-sun-filled',
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
    });
    
(function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() > 18 || new Date().getHours() < 7) {
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

// 星空背景 
function stars() {
    window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;
    var n,e,i,h,t=.05,s=document.getElementById("starfield"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];
    function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}
    function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}
    function y(){
        this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),
        this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),
        this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),
        this.do=l(5e-4,.002)+.001*(this.comet+1-1)},
        this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},
        this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},
        this.draw=function(){
            if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);
            else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);
            for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()
        }else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);
        h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},
        setTimeout(function(){o=!1},50)
    }
    function m(t){return Math.floor(1e3*Math.random())+1<10*t}
    function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),
    function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),
    function t(){document.getElementsByTagName('html')[0]&&u(),window.requestAnimationFrame(t)}()};
stars()

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
版 本 号：2.6.4
更新日期：2023-12-03

WayneのNavigation: https://nav.kong.pub/
Github:  https://github.com/Waynenet/Wayne-Navigation
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)