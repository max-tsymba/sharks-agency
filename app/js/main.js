
window.addEventListener('DOMContentLoaded', ()=>{

    preLoader();
    // smoothScroll();
});

var globalId = 0;

$(function(){

    setTimeout(()=>{
        $('.header').ripples({
            dropRadius: 10,
            perturbance: 0.01,
        });
    }, 4500)


//     // $('.team__content-slider').slick({
//     //     arrows: false,
//     //     slidesToShow: 3,
//     //     slidesToScroll: 1,
//     //     prevArrow: '<button class="slider-btn slider-btn__left"><img src="./img/arrow-left.png" alt=""></button>',
//     //     nextArrow: '<button class="slider-btn slider-btn__right"><img src="./img/arrow-right.png" alt=""></button>'
//     // });

});

// -------------------------------------------------------------------------------------------------------------------------
// PreLoader
function preLoader() {
    let intro = document.querySelector('.intro');
    let logo = document.querySelector('.intro__logo');
    let logoSpan = document.querySelectorAll('.intro__logo-elem');
    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx+1) * 400);
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{

                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);

            });
        }, 2000);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        }, 2300);

        setTimeout(()=>{
            fullpageScroll();
        },4600);

    });
}


// -------------------------------------------------------------------------------------------------------------------------
// FullPage Scroll
function fullpageScroll() {

        var pnls = document.querySelectorAll('.fullpage__item').length,
        scdir, hold = false;

        var num = 1;

    function _scrollY(obj) {
            var slength, plength, pan, step = 100,
            vh = window.innerHeight / 100,
            vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
                

                if ((this !== undefined && this.id === 'fullpage') || (obj !== undefined && obj.id === 'fullpage')) {
                    pan = this || obj;
                    plength = parseInt(pan.offsetHeight / vh);
                }
                if (pan === undefined) {
                    return;
                }
                plength = plength || parseInt(pan.offsetHeight / vmin);
                slength = parseInt(pan.style.transform.replace('translateY(', ''));
                if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls) ) {
                        slength = slength - step;
                } else if (scdir === 'down' && slength < 0) {
                        slength = slength + step;
                    
                } else if (scdir === 'top') {
                    slength = 0;
                }

            if (hold === false) {

                hold = true;
                pan.style.transform = 'translateY(' + slength + 'vh)';
                setTimeout(function() {
                    hold = false;
                }, 1000);
            }
            console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
    }
    /*[swipe detection on touchscreen devices]*/
    // function _swipe(obj) {
    //     var swdir,
    //         sX,
    //         sY,
    //         dX,
    //         dY,
    //         threshold = 100,
    //         /*[min distance traveled to be considered swipe]*/
    //         slack = 50,
    //         /*[max distance allowed at the same time in perpendicular direction]*/
    //         alT = 500,
    //         /*[max time allowed to travel that distance]*/
    //         elT, /*[elapsed time]*/
    //         stT; /*[start time]*/
    //     obj.addEventListener('touchstart', function(e) {
    //         var tchs = e.changedTouches[0];
    //         swdir = 'none';
    //         sX = tchs.pageX;
    //         sY = tchs.pageY;
    //         stT = new Date().getTime();
    //         //e.preventDefault();
    //     }, false);

    //     obj.addEventListener('touchmove', function(e) {
    //         e.preventDefault(); /*[prevent scrolling when inside DIV]*/
    //     }, false);

    //     obj.addEventListener('touchend', function(e) {
    //         var tchs = e.changedTouches[0];
    //         dX = tchs.pageX - sX;
    //         dY = tchs.pageY - sY;
    //         elT = new Date().getTime() - stT;
    //         if (elT <= alT) {
    //             if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
    //                 swdir = (dX < 0) ? 'left' : 'right';
    //             } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
    //                 swdir = (dY < 0) ? 'up' : 'down';
    //             }
    //             if (obj.id === 'well') {
    //                 if (swdir === 'up') {
    //                     scdir = swdir;
    //                     _scrollY(obj);
    //                 } else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
    //                     scdir = swdir;
    //                     _scrollY(obj);

    //                 }
    //                 e.stopPropagation();
    //             }
    //         }
    //     }, false);
    // }
    /*[assignments]*/
    var well = document.getElementById('fullpage');

    well.style.transform = 'translateY(0)';

    $('a[id^=btn]').on('click', function (e) {
        e.preventDefault();
        switch (this.id) {
            case "btn-home":
                well.style.transform = 'translateY(0vh)';
                break;
            case "btn-about":
                well.style.transform = 'translateY(-100vh)';
                break;
            case "btn-services":
                well.style.transform = 'translateY(-200vh)';
                break;
            case "btn-team":
                well.style.transform = 'translateY(-300vh)';
                break;
            case "btn-contact":
                well.style.transform = 'translateY(-400vh)';
                break;
            default: 
                well.style.transform = 'translateY(0)';
                break;
        }
    });


    well.addEventListener('wheel', function(e) {
        if (e.deltaY < 0) {
            scdir = 'down';
        }
        if (e.deltaY > 0) {
            scdir = 'up';
        }
        e.stopPropagation();
    });
    well.addEventListener('wheel', _scrollY);
    // _swipe(well);
    var tops = document.querySelectorAll('.top');
    for (var i = 0; i < tops.length; i++) {
        tops[i].addEventListener('click', function() {
            scdir = 'top';
            _scrollY(well);
        });
    }
}

// -------------------------------------------------------------------------------------------------------------------------
// Smooth Scroll to Anchor
function smoothScroll() {
    document.querySelectorAll('.menu__list-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
