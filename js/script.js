$(document).ready(function () {
    // BANNER
    var fadeSlider = $(".fade-slider");
    var header = $("header");
    var logotipo = $("header .logotipo");
    var alturaBanner = fadeSlider.height();
    var barras = $(".fa-bars");
    var menu = $(".menu");
    var categorias = $(".grid figure, .gridFooter figure");

    fadeSlider.jdSlider({
        isSliding: false,
        isAuto: true,
        isLoop: true,
        isDrag: false,
        interval: 5000,
        isCursos: false,
        speed: 3000
    });

    function ajustarAlturaBanner(alturaBanner) {
        //Actualizar altura del Slider para que encaje con el header
        if($(window).width() <= 575) {
            fadeSlider.css("height", header.height());
        } else {
            fadeSlider.removeAttr('style');
        }
        //Actualizar efecto Parallax
        $(".bannerEstatico").css("height", alturaBanner);
    }

    ajustarAlturaBanner(alturaBanner);

    //Animaciones scroll
    $(window).scroll(function() {
        alturaBanner = fadeSlider.height();

        ajustarAlturaBanner(alturaBanner);

        //Cambiar color al header cuando la informacion llegue al hacer scroll
        var posY = window.pageYOffset;
        if(posY > alturaBanner) {
            header.css("background","white");
            $("header .logotipo").css("filter","invert(100%)");
            $(".fa-search, .fa-bars").css("color","black");
        } else {
            header.css("background","rgba(0,0,0,0.5)");
            $("header .logotipo").css("filter","invert(0%)");
            $(".fa-search, .fa-bars").css("color","white");
        }
    });

    //MENU
    barras.click(function () {
        menu.fadeIn("fast");
    });

    $(".btnClose").click(function (e) { 
        e.preventDefault();
        menu.fadeOut("fast");
    });

    //Grid categorias
    categorias.mouseover(function() {
        $(this).css("background-position","right bottom");
    });

    categorias.mouseout(function() {
        $(this).css("background-position","left top");
    });

    categorias.click(function() {
        var vinculo = $(this).attr("vinculo");
        window.location = vinculo;
    })

    //Paginacion
    $(".pagination").twbsPagination({
        totalPages: 10,
        visiblePages: 4,
        first: "Primero",
        last: "Ultimo",
        prev: "<i class='fas fa-angle-left'></i>",
        next: "<i class='fas fa-angle-right'></i>"
    });

    //SCROLLORAMA
    var controller = $.superscrollorama();
    controller.addTween(".contenidoInicio", TweenMax.from(
        $(".contenidoInicio .container"), .5, { css:{ opacity: 0 } }
    ));

    //SCROLL UP
    $.scrollUp({
        scrollText:"",
        scrollSpeed: 2000,
        easingType: "easeOutQuint"
    });

    //PRELOAD

    //Desaparecer scroll
    $("body").css({"overflow-y":"hidden"});
    var cargarImg = $("img");
    var cargarScript = $("script");
    var cargarCSS = $("link");
    var cargarVideos = $("video");
    var cargarAudios = $("audio");
    var totalObjetos = [];
    var numItem = 0;
    var valorPorcentaje = 0;
    var incremento = 0;
    var numCarga = 0;

    totalObjetos.push(cargarImg, cargarScript, cargarCSS, cargarVideos, cargarAudios);
    totalObjetos.forEach(function(item, index) {
        for(var i = 0; i < item.length; i++) {
            numItem++;
            valorPorcentaje = 100/numItem;
        }
        for(var i = 0; i < item.length; i++) {
            preload(i, item);
        }
    });

    function preload(i,item) {
        setTimeout(function() {
            $(item[i]).ready(function() {
                numCarga++;
                incremento = Math.floor(numCarga * valorPorcentaje);
                $("#porcentajeCarga").html(incremento + "%");
                $("#rellenoCarga").css({"width":incremento + "%"})
                if(incremento >= 100) {
                    $("#preload").delay(350).fadeOut("slow");
                    $("body").delay(350).css({"overflow-y":"scroll"});
                }
            });
        },i*100);
    }

});
