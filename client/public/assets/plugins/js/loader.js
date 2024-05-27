/*--------------------------------------------------------------------
 *JAVASCRIPT "FakeLoader.js"
 *Version:    1.1.0 - 2014
 *author:     João Pereira
 *website:    http://www.joaopereira.pt
 *Licensed MIT 
-----------------------------------------------------------------------*/
(function ($) {
 
    $.fn.fakeLoader = function(options) {

        //Defaults
        var settings = $.extend({
            timeToHide:1200, // Default Time to hide fakeLoader
            pos:'fixed',// Default Position
            top:'0px',  // Default Top value
            left:'0px', // Default Left value
            width:'100%', // Default width 
            height:'100%', // Default Height
            zIndex: '999',  // Default zIndex 
            bgColor: '#ff569c', // Default background color
            spinner:'spinner7', // Default Spinner
            imagePath:'' // Default Path custom image
        }, options);

        //Customized Spinners
        var spinner01 = '<div className="fl spinner1"><div className="double-bounce1"></div><div className="double-bounce2"></div></div>';
        var spinner02 = '<div className="fl spinner2"><div className="spinner-container container1"><div className="circle1"></div><div className="circle2"></div><div className="circle3"></div><div className="circle4"></div></div><div className="spinner-container container2"><div className="circle1"></div><div className="circle2"></div><div className="circle3"></div><div className="circle4"></div></div><div className="spinner-container container3"><div className="circle1"></div><div className="circle2"></div><div className="circle3"></div><div className="circle4"></div></div></div>';
        var spinner03 = '<div className="fl spinner3"><div className="dot1"></div><div className="dot2"></div></div>';
        var spinner04 = '<div className="fl spinner4"></div>'; 
        var spinner05 = '<div className="fl spinner5"><div className="cube1"></div><div className="cube2"></div></div>'; 
        var spinner06 = '<div className="fl spinner6"><div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div></div>'; 
        var spinner07 = '<div className="fl spinner7"><div className="circ1"></div><div className="circ2"></div><div className="circ3"></div><div className="circ4"></div></div>'; 

        //The target
        var el = $(this);

        //Init styles
        var initStyles = {
            'position':settings.pos,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left
        };

        //Apply styles
        el.css(initStyles);

        //Each 
        el.each(function() {
            var a = settings.spinner;
            //console.log(a)
                switch (a) {
                    case 'spinner1':
                            el.html(spinner01);
                        break;
                    case 'spinner2':
                            el.html(spinner02);
                        break;
                    case 'spinner3':
                            el.html(spinner03);
                        break;
                    case 'spinner4':
                            el.html(spinner04);
                        break;
                    case 'spinner5':
                            el.html(spinner05);
                        break;
                    case 'spinner6':
                            el.html(spinner06);
                        break;
                    case 'spinner7':
                            el.html(spinner07);
                        break;
                    default:
                        el.html(spinner01);
                    }

                //Add customized loader image

                if (settings.imagePath !='') {
                    el.html('<div className="fl"><img src="'+settings.imagePath+'"></div>');
                }
                centerLoader();
        });

        //Time to hide fakeLoader
        setTimeout(function(){
            $(el).fadeOut();
        }, settings.timeToHide);

        //Return Styles 
        return this.css({
            'backgroundColor':settings.bgColor,
            'zIndex':settings.zIndex
        });

 
    }; // End Fake Loader
 

        //Center Spinner
        function centerLoader() {

            var winW = $(window).width();
            var winH = $(window).height();

            var spinnerW = $('.fl').outerWidth();
            var spinnerH = $('.fl').outerHeight();

            $('.fl').css({
                'position':'absolute',
                'left':(winW/2)-(spinnerW/2),
                'top':(winH/2)-(spinnerH/2)
            });

        }

        $(window).load(function(){
                centerLoader();
              $(window).resize(function(){
                centerLoader();
              });
        });


}(jQuery));



