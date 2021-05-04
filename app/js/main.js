
window.addEventListener('DOMContentLoaded', ()=>{
    preLoader();
    circleText();
});

var globalId = 0;

$(function(){

    setTimeout(()=>{
        $('.header').ripples({
            dropRadius: 10,
            perturbance: 0.01,
        });
    }, 4500);

    // Popup Team
     $('.team__info-btn').on('click', function(e){
        e.preventDefault();
        
        $('.team__info-btn').addClass('active');
        let popupId = $(this).attr('data-tab');
        $('#' + popupId).fadeIn();

        $('.team__popup-close').on('click', function() {
            
            $(this).parents('.team__popup-wrap').fadeOut();
            $('.team__info-btn').removeClass('active');
        });
    });

    $('.slider-center').slick({

        autoplay: true,
        speed: 2000,
        dots: false,
        infinite: false,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,

        responsive: [{

            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                infinite: true
            }
        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                dots: true
            }
        }, {

            breakpoint: 300,
            settings: "unslick"
        }]
    });

});

// -------------------------------------------------------------------------------------------------------------------------
// PreLoader
function preLoader() {

    const intro = document.querySelector('.intro');
    const down = document.querySelector('.down');
    const logo = document.querySelector('.intro__logo');
    const logoSpan = document.querySelectorAll('.intro__logo-elem');
    const block = document.getElementById('first-block');
    const itemBlock = document.querySelectorAll('.fullpage__item');

    const mobileMedia = window.matchMedia("(max-width: 768px)");

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
            if(!mobileMedia.matches) {
                fullPageScrolling();
            }
        },4600);

    });


}


// -------------------------------------------------------------------------------------------------------------------------
// FullPage Scroll
function fullPageScrolling() {

    const PAGE_LENGTH = document.querySelectorAll('.full').length;
    let scdir, hold = false;
    const WRAPPER = document.getElementById('fullpage');

    function _scrollY(obj) {

        let slength, plength, pan, step = 100,
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

            if (scdir === 'up' && Math.abs(slength) < (plength - plength / PAGE_LENGTH) ) {
                    slength = slength - step;     
            } else if (scdir === 'down' && slength < 0) {
                    slength = slength + step;  
            } else if (scdir === 'top') {
                slength = 0;
            }
        
        if (hold === false) {

            if(!($('.team__info-btn').hasClass('active'))) {

                hold = true;
                pan.style.transform = 'translateY(' + slength + 'vh)';
                setTimeout(function() {
                    hold = false;
                }, 1000);

            }  
        }

        // console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / PAGE_LENGTH)); 
    }



    WRAPPER.style.transform = 'translateY(0)';

    linkPageTranslating(WRAPPER);

    WRAPPER.addEventListener('wheel', (e)=>{

        if(e.deltaY < 0) scdir = 'down';
        if(e.deltaY > 0) scdir = 'up';

        e.stopPropagation();
    });

    WRAPPER.addEventListener('wheel', _scrollY);

}

// -------------------------------------------------------------------------------------------------------------------------
// Circle Text
function circleText() {

    const TEXT = document.querySelector('.circle__text');
    TEXT.innerHTML = TEXT.textContent.replace(/\S/g, "<span class='circle__span'>$&</span>");

    const Element = document.querySelectorAll('.circle__span');

    for(let i = 0; i<Element.length; i++) {
        Element[i].style.transform = "rotate("+i*22+"deg)"; 
    }
}


// MODULES-----------------------------------------------------------------------------------------------------------------
function linkPageTranslating(WRAPPER) {

    $('a[id^=btn]').on('click', function (e) {

        e.preventDefault();

        switch (this.id) {
            case "btn-home":
                    WRAPPER.style.transform = 'translateY(0vh)';
                break;
            case "btn-about":
                    WRAPPER.style.transform = 'translateY(-100vh)';
                break;
            case "btn-services":
                    WRAPPER.style.transform = 'translateY(-200vh)';
                break;
            case "btn-team":
                WRAPPER.style.transform = 'translateY(-300vh)';
                break;
            case "btn-contact":
                WRAPPER.style.transform = 'translateY(-400vh)';
                break;
            default: 
                WRAPPER.style.transform = 'translateY(0)';
                break;
        }
    });

}

