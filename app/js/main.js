
window.addEventListener('DOMContentLoaded', ()=>{
    preLoader();
    circleText();
    fileUpload();
    validatorForm();
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

    // Contact Block
    $('.box-btnLeft').on('click', function(){
        $('.box-btnRight').removeClass('arrowed');
        $('.box-btnLeft').addClass('arrowed');
        $('.footer__box').removeClass('active-2');
        $('.footer__box').addClass('active-1');
    }); 

    $('.box-btnRight').on('click', function(){
        $('.box-btnLeft').removeClass('arrowed');
        $('.box-btnRight').addClass('arrowed');
        $('.footer__box').removeClass('active-1');
        $('.footer__box').addClass('active-2');
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

// -------------------------------------------------------------------------------------------------------------------------
// File Upload
function fileUpload() {
    
    const realFileBtn = document.getElementById('real-file');
    const customFileBtn = document.getElementById('uploadBtn');
    const realDoc = document.getElementById('real-file__doc');
    const customDoc = document.getElementById('uploadBtn-doc');

    customFileBtn.addEventListener('click',()=>{
        realFileBtn.click();
    });

    customDoc.addEventListener('click',()=>{
        realDoc.click();
    });
}

// -------------------------------------------------------------------------------------------------------------------------
// Form Validator

function validatorForm() {

    const filePHP = '../sendmail.php';

    const formContact = document.getElementById('contact-form');
    const formWork = document.getElementById('work-form');
    const right = document.getElementById('footer-right');

    if($('.footer__box').hasClass('active-2')) {
        formContact.addEventListener('submit',formSend);
        console.log(2);
    } else {
        formWork.addEventListener('submit',formSend);
        console.log(1);
    }

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(formContact);

        let formData = new FormData(formContact);
        formData.append('documents', formFile.files[0]);


        if(error===0) {
            right.classList.add('_sending');

            let response = await fetch(filePHP, {
                method: 'POST',
                body: formData
            });

            console.log(response);

            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                right.classList.remove('_sending');
            } else {
                alert('Ошибка');
                right.classList.remove('_sending');
            }
        } else {
           alert('Заполните обязательные поля!');   
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._reg');
        let formLabel = document.querySelectorAll('._label');

        for(let index=0; index<formReq.length; index++) {
            const input = formReq[index];
            const label = formLabel[index];

            formRemoveError(input);
            formRemoveLabel(label);


            if(input.classList.contains('_email') || label.classList.contains('._label')) {
                if(emailTest(input)) {
                    formAddError(input);
                    formAddLabel(label);
                    error++;
                }
            } else if(input.classList.contains('_phone') || label.classList.contains('._label')) {
                if(phoneTest(input)) {
                    formAddError(input);
                    formAddLabel(label);
                    error++;
                }
            } else {

                if(input.value === '') {
                    formAddError(input);
                    formAddLabel(label);
                    error++;
                }
            }

        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function formAddLabel(label) {
        label.parentElement.classList.add('_error');
        label.classList.add('_error');
    }

    function formRemoveLabel(label) {
        label.parentElement.classList.remove('_error');
        label.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function phoneTest(input) {
        return !/^\d+$/.test(input.value);
    }

    const formFile = document.getElementById('real-file');

    formFile.addEventListener('change', ()=>{
        uploadFile(formFile.files[0]);
    });

    function uploadFile(file) {
         
        let reader = new FileReader();
        reader.onload = function(e) {
           
        };
        reader.onerror = function(e) {
            alert('Ошибка!');
        };
        reader.readAsDataURL(file);
    }


}