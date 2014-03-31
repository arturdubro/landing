$(document).ready(function(){
    $(window).load(function(){
        $('.teamwork').show().css('width', thislayerwidth('teamwork')+'px');
        $('.emotions').show().css('width', emotionslayerwidth()).css('marginLeft', firstemotionsmargin());
    });

    function thislayerwidth(layername){
        var c = $('.'+layername+' :first-child li:nth-child(1)').width();
        for (var l = 2; l <= $('.'+layername+' :first-child li').length; l++) {
                c = c + $('.'+layername+' :first-child li:nth-child('+l+')').width() + 10;
            };
        return c;
    };
    function emotionslayerwidth(){
        var b = $('.emotions li:nth-child(1)').width() + 20;
        for (var l = 2; l <= $('.emotions li').length; l++) {
            for (var i = 1; i <= 3; i++) {
                b = b + $('.emotions li:nth-of-type('+l+') img:nth-of-type('+i+')').width() + 10;
            };
        };
        if (isMobile.any() || isMobile.iPad()) b = b + 180;
        b = b + 'px';
        return b;
    };
    function firstemotionsmargin() {
        var width = $('.emotionset').width();
        var thiswidth = $('.emotions li:nth-of-type(1)').width();
        var c = 0-(thiswidth-width)/2+'px';
        $('.leftarrowemotion').hide();
        return c;
    };

    $(document).on('vclick', '.one-icon', function(){
        for (var i = 1; i <= 5; i++) {
            if ($(this).attr('id') !== 'icon'+i) {
                $('#icon'+i).children('img').attr('src', './img/'+$('#icon'+i).children('img').attr('id')+'.png');
                $('#icon'+i).removeClass('actual');
            } else {
                var icontype = $(this).children('img').attr('src');
                $('.photoset').children('.showroom').children().css('marginLeft','0px').hide();
                var photolayer = $(this).children('img').attr('id');
                $('.'+photolayer).show().css('width', thislayerwidth(photolayer)+'px');
                $(this).addClass('actual');
            };
        };
    });
	
    $('.rightarrowgallery, .leftarrowgallery, .rightarrowemotion, .leftarrowemotion').hover(function(){
        $(this).addClass('over'); 
    }, function(){
        $(this).removeClass('over');
    });
    $('.one-icon').hover(function(){
        var val = $(this).children('img').attr('src');
        if (val.indexOf('red') < 0) $(this).children('img').attr('src', val.substr(0, val.length-4)+'-red'+val.substr(val.length-4));
    }, function(){
        if ($(this).attr('class').indexOf('actual') < 0) $(this).children('img').attr('src', './img/'+$(this).children('img').attr('id')+'.png');
    });

    $(document).on('vclick','.rightarrowgallery, .leftarrowgallery', function(){
        if ($(this).attr('class').indexOf('right') >= 0) var list = -1
            else var list = +1;
        for (var i = 1; i <= 5; i++) {
            var input = $('#icon'+i).children('img').attr('src');
            if (input.indexOf('red') > 0) {
                $('#icon'+i).addClass('actual');
                var actualphotos = $('#icon'+i).children('img').attr('id');
                var marginleft = $('.'+actualphotos).css('marginLeft');
                mrgnleft = parseInt(marginleft.substr(0,marginleft.length-2).valueOf());
                var width1 = $('.showroom').width();
                var width2 = $('.'+actualphotos).width();
                if (mrgnleft == 0 && list > 0 || mrgnleft+(list)*width1 <= (list)*width2 && list < 0) {
                    var num = i - list;
                    if (num < 1) num = 5;
                    if (num > 5) num = 1;
                    if (num > 0 && num < 6) {
                        $('#icon'+i).removeClass('actual');
                        $('#icon'+i).children('img').attr('src', './img/'+$('#icon'+i).children('img').attr('id')+'.png');
                        $('.photoset').children('.showroom').children().css('marginLeft','0px').hide();
                        var photolayer = $('#icon'+num).children('img').attr('id');
                        $('.'+photolayer).show().css('width', thislayerwidth(photolayer)+'px');
                        var icontype = $('#icon'+num).children('img').attr('src');
                        var output = icontype.substr(0, icontype.length-4) + '-red' + icontype.substr(icontype.length-4);
                        $('#icon'+num).addClass('actual');
                        $('#icon'+num).children('img').attr('src', output);
                        break;
                    };
                } else {
                    if (list > 0) {
                        var val = (marginleft+width1)/-width1;
                        if (val > 1) val = marginleft+width1+'px'
                        else val = '0px';
                    }
                    if (list < 0) {
                        var val = (width2 - width1 + marginleft)/width1;
                        if (val > 1) val = marginleft-width1+'px'
                        else val = 0-(width2-width1)+'px';
                    }
                    $('.'+actualphotos).animate({ "marginLeft": val }, "slow" );
                };
            };
        };
    });
    $(document).on('vclick','.rightarrowemotion, .leftarrowemotion', function(){
        if ($(this).attr('class').indexOf('right') >= 0) var list = +1 
            else var list = -1;
        var marginleft = $('.emotions').css('margin-left');
        marginleft = marginleft.substr(0,marginleft.length-2).valueOf();
        var width1 = $('.emotions').width();
        var width2 = $('.emotionset').width();
        var thiswidth = $('.emotions li:nth-of-type('+currentphotoset+')').width();
        var nextwidth = $('.emotions li:nth-of-type('+(currentphotoset+list)+')').width();
        var centers = (thiswidth+nextwidth)/2+10;
        currentphotoset = currentphotoset+list;
        if (currentphotoset == $('.emotions li').length) $('.rightarrowemotion').hide()
            else $('.rightarrowemotion').show();
        if (currentphotoset == 1) $('.leftarrowemotion').hide()
            else $('.leftarrowemotion').show();
        var val = marginleft-list*centers+'px';
        $('.emotions').animate({ "margin-left": val}, "slow" );
    });
});