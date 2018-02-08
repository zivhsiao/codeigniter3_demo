///**
// * Created by SONY on 2017/7/15.
// */
//window.onload = function(){
//    var slider = document.querySelectorAll('.slider')[0];
//    var viewer = slider.querySelectorAll('.slider_viewer')[0];
//    var group = slider.querySelectorAll('.slider_group')[0];
//    var slides = slider.querySelectorAll('.slide');
//    var slidesL = slides.length;
//    var buttons =slider.querySelectorAll('.slider_buttons')[0];
//    var next = slider.querySelectorAll('.next')[0];
//    var previous = slider.querySelectorAll('.previous')[0];
//    var currentIndex = 0;
//    var bulletArray=[];
//    var timeout;
//
//    for(var i=0;i<slidesL;i++){
//        //底下的圖
//        var imgDiv = document.createElement('div');
//        imgDiv.setAttribute('data-id',i);
//        imgDiv.appendChild(slides[i].querySelectorAll('img')[0].cloneNode());
//        imgDiv.onclick=function(){
//            move(this.getAttribute('data-id'));
//        }
//        bulletArray.push(imgDiv);
//        buttons.appendChild(imgDiv);
//    }
//    function init(){
//        var viewerW = viewer.offsetWidth;
//        //slides寬度
//        for(var i=0;i<slidesL;i++){
//            slides[i].style.width = viewerW+'px';
//        }
//        viewer.style.height = viewerW+'px';
//        group.style.width = viewerW * slidesL+'px';
//        move(0)
//    }
//
//    next.onclick=function(){
//        currentIndexfn(1);
//    }
//    previous.onclick=function(){
//        currentIndexfn(-1);
//    }
//    window.onresize=function(){
//        init();
//    }
//    init();
//    advance();
//
//    function currentIndexfn(d){
//        currentIndex = (currentIndex+d+slidesL)%slidesL;
//        move(currentIndex);
//    }
//
//    function move(newIndex){
//        //底下的圖active
//        bulletArray.map(function(index){
//            index.classList.remove('active');
//        });
//        bulletArray[newIndex].classList.add('active');
//        //group移動
//        group.style.left = -(slides[0].offsetWidth*newIndex)+'px';
//        currentIndex=newIndex;
//        advance();
//    }
//
//    function advance() {
//        clearTimeout(timeout);
//        timeout = setTimeout(function() {
//            currentIndexfn(1);
//        }, 4000);
//    }
//
//}

$(document).ready(function(){
    var slider = $('.slider'),
        viewer = $('.slider_viewer'),
        group = $('.slider_group'),
        slider_btn = $('.slider_group'),
        slides = $('.slide'),
        slidesL = slides.length,
        buttons = $('.slider_buttons'),
        next = $('.next'),
        previous = $('.previous'),
        currentIndex = 0,
        autoSlideTimeout,
        timeout,
        viewerW;

    for(var i = 0;i<slidesL;i++){
        var pagi;
        if(i==0){
            pagi = $('<div class="pagi active"></div>')
        }else{
            pagi = $('<div class="pagi"></div>')
        }
        buttons.append(pagi.append(slides.eq(i).find('img').clone()).data('page',i));
    }

    function init(){
        viewerW = viewer.width();
        for(var i=0;i<slidesL;i++){
            slides.eq(i).width(viewerW);
        }
        viewer.height(slides.height());
        group.width(viewerW * slidesL);
    };
    $(window).resize(function(){
        init();
    });
    init();

    $(document).on('click','.slider_btn',function(){
        if($(this).hasClass('previous')){
            currentIndexfn(-1)
        }else{
            currentIndexfn(1)
        }
    })
    $(document).on('click','.pagi',function(){
        move($(this).data('page'));
    })
    $(document).on('mouseover','.slider',function(){
        window.clearTimeout(autoSlideTimeout);
    })

    function autoslide(){
        autoSlideTimeout = setTimeout(function(){
            currentIndexfn(1);
        },3000)
    }
    autoslide();

    function currentIndexfn(d){
        currentIndex = (currentIndex+d+slidesL)%slidesL;
        move(currentIndex);
    }
    function move(newIndex){
        window.clearTimeout(autoSlideTimeout);
        $('.pagi').removeClass('active').eq(newIndex).addClass('active');
        //group移動
        group.css({
            'left': -(slides.width()*newIndex)
        });
        currentIndex = newIndex;
        autoslide();
    }
});