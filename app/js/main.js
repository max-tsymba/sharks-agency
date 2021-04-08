// Preloader Screen

let intro = document.querySelector('.intro');
let logo = document.querySelector('.intro__logo');
let logoSpan = document.querySelectorAll('.intro__logo-elem');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{

        document.documentElement.style.overflowY = 'hidden';
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
            document.documentElement.style.overflowY = 'scroll';
        }, 5000);
    });

});


$(function(){

    $('.header').ripples({
        dropRadius: 10,
        perturbance: 0.01,
    });


    // $('.team__content-slider').slick({
    //     arrows: false,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     prevArrow: '<button class="slider-btn slider-btn__left"><img src="./img/arrow-left.png" alt=""></button>',
    //     nextArrow: '<button class="slider-btn slider-btn__right"><img src="./img/arrow-right.png" alt=""></button>'
    // });

});