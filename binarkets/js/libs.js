/* ==============================================
 WOW plugin triggers animate.css on scroll
 =============================================== */

jQuery(document).ready(function () {
    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100,
            mobile: true
        }
    );
    wow.init();
});

function getLang() {
    str = window.location.href;

    needle = 'index-';
    index_of_needle = str.indexOf(needle);


    if (index_of_needle < 0) {
        lang = 'ru';
    } else {
        index_of_lang = index_of_needle + needle.length;
        lang = str.substr(index_of_lang, 2);
    }
    return lang;
}

$(document).ready(function() {
    var lang = getLang();
    if( window.location.search ) {
        $('.logo a').attr({href: 'https://finmaxbo.com/' + lang + '/' + window.location.search });
    }
    if( window.location.search ) {
        $('#doenter').attr({href: 'https://finmaxbo.com/registration' + window.location.search });
    }
    if( window.location.search ) {
        $('#gograficbonus').attr({href: 'https://finmaxbo.com/registration' + window.location.search });
    }
    if( window.location.search ) {
        $('#gografic').attr({href: 'https://finmaxbo.com/registration' + window.location.search });
    }
});

/* ==============================================
 Grafic
 =============================================== */

/*(function(i,s,o,g,r,a,m){
    i[r]=i[r]||function(){};
    i[r].l=1*new Date();
    a=s.createElement(a);
    //m=s.getElementsByTagName(p)[0]; - эта строка никогда не отработате, т.к. в функцию не передается переменная p, но даже если бы она передавалась, элемент а только создан (в предыдущей
    //строке, этот элемент не содержит других элементов, в частности р

    //m.parentNode.insertBefore(a,m); - эта строка не отработает, т.к. отсутствует элемент а в вызове функции, получается a.tagName - неизвестный html-объект
})(window,document,'script','','ga');*/