function navshow(){
    var navul = document.getElementById('navul');
    if(navul.offsetHeight){
        navul.className='list-inline';
    }else{
        navul.className='list-inline active';
    }
}
function btntop(){
    var timer;
    var istop = true;
    window.onscroll = function(){
        if(!istop){
            clearInterval(timer);
        }
        istop = false;
    }
    timer = setInterval(function(){
        var ostop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-ostop/6);
        document.documentElement.scrollTop = document.body.scrollTop = ostop+ispeed;
        istop = true;
        //console.log(ostop-ispeed);
        //console.log(document.documentElement.scrollTop);
        if(ostop == 0){
            clearInterval(timer);
        }
    },30);
}
//showslider
var slideIndex = 1;
showslidesinit();
function showslidesinit(){
    var slideshow = document.getElementById('slideshow');
    var dots = document.getElementsByClassName("dot");
    //prev
    var prev = document.createElement('a');
    prev.className='prev';
    prev.setAttribute('href','javascript:plusSlides(-1);');
    prev.innerHTML = '&#10094';
    slideshow.appendChild(prev);
    //next
    var next = document.createElement('a');
    next.className='next';
    next.setAttribute('href','javascript:plusSlides(+1);');
    next.innerHTML = '&#10095;';
    slideshow.appendChild(next);
    //dot
    for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute("onclick","currentSlide(" + (i+1) + ")");
    }
    showSlides(slideIndex);
}
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

