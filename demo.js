    var colnames = ['1','2','3','4','5','6','7','8','9','10'];
    var rownames = ['А','Б','В','Г','Д','Е','Ж','З','И','К'];
    function table(rows, cols) {
    	var tablecontent = '<table>';
    	for (var row = 0; row < rows; row++) {
    		tablecontent += "<tr>";
    		for (var col = 0; col < cols; col++) {
    			tablecontent += '<td id='+rownames[row]+colnames[col]+' style="width:'+450/cols+'px; height:'+450/rows+'px;"></td>';
    		};
    		tablecontent += "</tr>";
    	};
    	tablecontent += "</table>";
    	var numbers = '<ul class="numbers">';
    	var letters = '<ul class="letters">';
    	for (var row = 0; row < rows; row++) {
    		letters += '<li style="line-height:'+((451/rows)+1)+'px;">'+rownames[row]+'</li>';
    	};
    	letters += '</ul>';
    	for (var col = 0; col < cols; col++) {
    		numbers += '<li style="width:'+((451/cols)+1)+'px;">'+colnames[col]+'</li>';
    	}
    	numbers += '</ul>';
    	document.write('<div class="gamefield">' + numbers + letters + tablecontent + '</div>');
        totalrows = rows;
        totalcols = cols;
        return totalrows;
        return totalcols;
    };
    var h = 0;
    var m = 0;
    var s = 0;
    function startTime() {
        s++;
        if (s == 60) {
            m++; s = 0;
        }
        if (m == 60) {
            h++; m = 0;
        }
        if (s < 10) secs = '0' + s;
        else secs = s;
        if (m < 10) mins = '0' + m;
        else mins = m;
        document.getElementById("timer").innerHTML = h+":"+mins+":"+secs;
        setTimeout(startTime, 1000);
    };
    var reefsecs = 60;
    var reefcell = '';
    var counts = 0;
    var exportcellid = '';
    function reefTime() {
        if (reefcell) {
        if (reefsecs > 0) reefsecs--;
        else {
            reefsecs = 0;
            $(reefcell).removeClass('opened').addClass('reef fail');
            $('.reefquestion').hide();
            if (reefcell == exportcellid) {
                $('.submit').hide();
                $('.fail').show();
            };
            reefcell = '';
        };
        document.getElementById("reeftimer").innerHTML = reefsecs;
        setTimeout(reefTime, 1000);
        };
    };
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        iPad: function(){
            return navigator.userAgent.match(/iPad/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        var setvideowidth = '365';
        var setvideoheight = '205';
        var setvideoplace = 'videomin';
    } else {
        var setvideowidth = '987';
        var setvideoheight = '555';
        var setvideoplace = 'videomax';
    };

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var ship1video;
    var ship2video;
    function onYouTubeIframeAPIReady() {
        ship1video = new YT.Player( setvideoplace+'1', {
          width: setvideowidth,
          height: setvideoheight,
          videoId: '9KmRakiUPRs',
          origin: 'demo.bqbs.ru/land/',
          playerVars: { 'controls': 0, 'showinfo': 0 },
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
        ship2video = new YT.Player( setvideoplace+'2', {
          width: setvideowidth,
          height: setvideoheight,
          videoId: 'yeS-MUO4SnU',
          origin: 'demo.bqbs.ru/land/',
          playerVars: { 'controls': 0, 'showinfo': 0 },
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
    };
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED || event.data == YT.PlayerState.PAUSED) {
            if (ship1video.getPlayerState() == 0 || ship1video.getPlayerState() == 2) $('#videomax1').hide();
            if (ship2video.getPlayerState() == 0 || ship2video.getPlayerState() == 2) $('#videomax2').hide();
            $('.main').show();
        };
    };

$(document).ready(function(){
    var cell = '';
    var currentcellid = '';
    var currentcellclass = '';
    var shiptype = '';
    var notfirsttime = '1';
    var stages = 1;

    $(document).bind('startgametimer', startTime);
    $(document).on('vclick', '#startdemo', function(){
        $('#startplug').hide().trigger('startgametimer');
    });

    function thislayerwidth(layername){
        var c = 0;
        for (var l = 1; l <= $('.'+layername+' :first-child li').length; l++) {
                c = c + $('.'+layername+' :first-child li:nth-child('+l+') img').width() + 10;
            };
        return c;
    };

    $(window).load(function(){
        $('.teamwork').show().css('width', thislayerwidth('teamwork')+'px');
        $('.emotions').show().css('width', thislayerwidth('emotions')+'px');
    });

    $(document).on('vclick', '.one-icon', function(){
        for (var i = 1; i <= 5; i++) {
            if ($(this).attr('id') !== 'icon'+i) {
                $('#icon'+i).children('img').attr('src', './img/'+$('#icon'+i).children('img').attr('id')+'.png');
            } else {
                var icontype = $(this).children('img').attr('src');
                $('.photoset').children('.showroom').children().hide();
                var photolayer = $(this).children('img').attr('id');
                $('.'+photolayer).show().css('width', thislayerwidth(photolayer)+'px');
                if (icontype.indexOf('red') < 0) {
                    var output = icontype.substr(0, icontype.length-4) + '-red' + icontype.substr(icontype.length-4);
                    $(this).children('img').attr('src', output);
                };
            };
        };
    });
	
    $('.rightarrowgallery, .leftarrowgallery, .rightarrowemotion, .leftarrowemotion').mouseover(function(){
        $(this).addClass('over');
    });
    $('.rightarrowgallery, .leftarrowgallery, .rightarrowemotion, .leftarrowemotion').mouseleave(function(){
        $(this).removeClass('over');
    });
    $(document).on('vclick','.rightarrowgallery, .leftarrowgallery', function(){
        if ($(this).attr('class').indexOf('right') >= 0) var list = +1
        else var list = -1;
        for (var i = 1; i <= 5; i++) {
            var input = $('#icon'+i).children('img').attr('src');
            if (input.indexOf('red') > 0) {
                var actualphotos = $('#icon'+i).children('img').attr('id');
                var marginleft = $('.'+actualphotos).css('margin-left');
                marginleft = marginleft.substr(0,marginleft.length-2).valueOf();
                var width = $('.'+actualphotos).css('width');
                width = width.substr(0,width.length-2).valueOf();
                if (marginleft-(list)*1130 <= 0 && marginleft-(list)*1130 >= width*(-1)) {
                    var val = marginleft-(list)*1130+'px';
                    $('.'+actualphotos).animate({ "margin-left": val }, "slow" );
                } else {
                $('.'+actualphotos).css('margin-left', '-10px');
                    var num = i + list;
                    if (num < 1) num = 5;
                    if (num > 5) num = 1;
                    if (num > 0 && num < 6) {
                        $('#icon'+i).children('img').attr('src', './img/'+$('#icon'+i).children('img').attr('id')+'.png');
                        $('.photoset').children('.showroom').children().hide();
                        var photolayer = $('#icon'+num).children('img').attr('id');
                        $('.'+photolayer).show().css('width', thislayerwidth(photolayer)+'px');;
                        var icontype = $('#icon'+num).children('img').attr('src');
                        var output = icontype.substr(0, icontype.length-4) + '-red' + icontype.substr(icontype.length-4);
                        $('#icon'+num).children('img').attr('src', output);
                        break;
                    };
                };
            };
        };
    });

    $(document).on('vclick','.rightarrowemotion, .leftarrowemotion', function(){
        if ($(this).attr('class').indexOf('right') >= 0) var list = +1
        else var list = -1;
        var marginleft = $('.emotions').css('margin-left');
        marginleft = marginleft.substr(0,marginleft.length-2).valueOf();
        var width = $('.emotions').css('width');
        width = width.substr(0,width.length-2).valueOf();
        if (marginleft-(list)*1280 <= 0 && marginleft-(list)*1280 >= width*(-1)) {
            var val = marginleft-(list)*1280+'px';
            $('.emotions').animate({ "margin-left": val }, "slow" );
        } else {
            if (marginleft-(list)*1280 <= 0) event.preventDefault();
            if (marginleft-(list)*1280 <= width*(-1)) $('.emotions').css('margin-left', '-10px');
        };
    });

    $(document).on('vclick', '.finishdemo', function(){
        if (stages < 5) event.preventDefault();
    });
    $(document).on('vclick', '.info > a', function(){
        event.preventDefault();
    });

    $('.main td').addClass('new');
    $('#alert').children().hide();
    $('.hello').show();
    $('.reefquestion').bind('isVisible', reefTime);
    $('#videomax1').hide();
    $('#videomax2').hide();
    
    function mermaid(cell){
        var mermaid = '';
        col = jQuery.inArray(cell.charAt(2), colnames);
        row = jQuery.inArray(cell.charAt(1), rownames);
        around = [
            rownames[row-1]+colnames[col], 
            rownames[row+1]+colnames[col], 
            rownames[row]+colnames[col+1], 
            rownames[row]+colnames[col-1],        
            rownames[row-1]+colnames[col-1],
            rownames[row+1]+colnames[col-1],
            rownames[row+1]+colnames[col+1],
            rownames[row-1]+colnames[col+1]
        ];
        cross = [
            rownames[row-1]+colnames[col], 
            rownames[row+1]+colnames[col], 
            rownames[row]+colnames[col+1], 
            rownames[row]+colnames[col-1] 
        ];
        if (row-1 < 0) {
            cross[0] = '';
            around[0] = '';
            around[4] = '';
            around[7] = '';
        };
        if (row+2 > totalrows) {
            cross[1] = '';
            around[1] = '';
            around[5] = '';
            around[6] = '';
        };
        if (col-1 < 0) {
            cross[3] = '';
            around[3] = '';
            around[4] = '';
            around[5] = '';
        };
        if (col+2 > totalcols) {
            cross[2] = '';
            around[2] = '';
            around[6] = '';
            around[7] = '';
        };
        for (var l = 0; l < 8; l++) {
            if (around[l] == '') {
                around.splice(l, 1);
                cross.splice(l, 1);
            };
        };
        for (var i = 0; i < around.length; i++) {
            if (around[i] != '') {
                $('#mermaid').text(around[i]);
                break;
            };
        };
    };
    function nearCells(cell){
        var goodcells = '';
        col = jQuery.inArray(cell.charAt(2), colnames);
        row = jQuery.inArray(cell.charAt(1), rownames);
        times = [        
            rownames[row-1]+colnames[col-1],
            rownames[row+1]+colnames[col-1],
            rownames[row+1]+colnames[col+1],
            rownames[row-1]+colnames[col+1]
        ];
        cross = [
            rownames[row-1]+colnames[col], 
            rownames[row+1]+colnames[col], 
            rownames[row]+colnames[col+1], 
            rownames[row]+colnames[col-1] 
        ];
        if (row-1 < 0) {
            cross[0] = '';
            times[0] = '';
            times[3] = '';
        };
        if (row+2 > totalrows) {
            cross[1] = '';
            times[1] = '';
            times[2] = '';
        };
        if (col-1 < 0) {
            cross[3] = '';
            times[0] = '';
            times[1] = '';
        };
        if (col+2 > totalcols) {
            cross[2] = '';
            times[2] = '';
            times[3] = '';
        };
        for (var l = 0; l < 4; l++) {
            if (times[l] == '') {
                times.splice(l, 1);
            };
        };
        for (var l = 0; l < 4; l++) {
            if (cross[l] == '') {
                cross.splice(l, 1);
            };
        };
        for (var i = 0; i < 4; i++) {
            var timesclass = $('#'+times[i]).attr('class');
            var crossclass = $('#'+cross[i]).attr('class');
            if (timesclass == 'ship1'|| timesclass == 'sink2'|| timesclass == 'ship2a') { goodcells = 'miss'; break; };
            if (crossclass == 'ship1'|| crossclass == 'sink2') { goodcells = 'miss'; break; };
        };
        if (goodcells !== 'miss') {
            for (var k = 0; k < 4; k++) {
                if ($('#'+cross[k]).attr('class') == 'ship2a') { goodcells = 'ship2b'; break; }
            };
            if (goodcells !== 'ship2b') {
                for (var k = 0; k < 4; k++) {
                if ($('#'+cross[k]).attr('class') == 'new') { goodcells = 'ship2a'; break; }
                };
            };
        };
        if (goodcells == '') goodcells = 'miss';
        return goodcells;
    };
    
    $('.submit').on('submit', function(){
        event.preventDefault();
        var finishedbg = (stages*2)+'0% 100%';
        var input = $('#simple').val();
        if (currentcellclass == 'ship1') {
            if (input == 'победа' || input == 'Победа') {
                $('#alert').children().hide();
                $(currentcellid).removeClass('ship1').addClass('sink1');
                $('.sink1').show();
                shiptype = '';
                stages++;
                $('.finishdemo').css({'background-size' : finishedbg});
            } else $('#simple').val(null);
        }
        if (currentcellclass == 'ship2b') {
            if (input == 'цель' || input == 'Цель') {
                $('#alert').children().hide();
                var a = [];
                $('td.ship2b').each(function(){
                    a[a.length] = $(this).attr('id');
                });
                if (a[0].charAt(1) == a[1].charAt(1)) var rotation = 'vert';
                else var rotation = '';
                $("#"+a[0]).removeClass().addClass('first'+rotation);
                $("#"+a[1]).removeClass().addClass('second'+rotation);
                $('.sink2').show();
                $('.complete').show();
                shiptype = 'ship2b';
                stages++;
                $('.finishdemo').css({'background-size' : finishedbg});
            } else $('#simple').val(null);
        }
        else {
            if (input == '') {
                $('#simple').val(null);
            }
            else if (input > -1 && input < 10) {
                if (reefcell == currentcellid) counts--;
                if (counts == 0) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('mermaid');
                    mermaid(currentcellid);
                    $('.mermaid').show();
                }
                else if (counts == 1) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('ship1');
                    shiptype = 'ship1';
                    currentcellclass = 'ship1';
                    $('.ship1').show();
                    stages++;
                    $('.finishdemo').css({'background-size' : finishedbg});
                }
                else if ((counts == 2) && (reefcell !== '')) {
                    $('#alert').children().hide();
                    $(reefcell).removeClass().addClass('reef ok');
                    reefcell='';
                    $("div[class='reef ok']").show();
                }
                else if (counts == 3) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('inn');
                    $('.inn').show();
                }
                else if (counts == 4) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('mine');
                    m++;
                    $('.mine').show();
                }
                else if (counts == 5) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('treasure');
                    m--;
                    $('.treasure').show();
                }
                else if ((counts > 5) && (shiptype !== 'ship2b')) {
                    var temp = nearCells(currentcellid);
                    if (temp == 'miss') {
                        $('#alert').children().hide();
                        $(currentcellid).addClass(temp);
                        $('.'+temp).show();
                    }
                    else if (temp == 'ship2a') {
                        $('#alert').children().hide();
                        $(currentcellid).addClass(temp);
                        $('.'+temp).show();
                        stages++;
                        $('.finishdemo').css({'background-size' : finishedbg});
                    }
                    else if (temp == 'ship2b') {
                        $('#alert').children().hide();
                        $(currentcellid).addClass(temp);
                        $('td.ship2a').removeClass().addClass('ship2b');
                        $('.'+temp).show();
                        shiptype = 'ship2b';
                        currentcellclass = 'ship2b';
                        stages++;
                        $('.finishdemo').css({'background-size' : finishedbg});
                    };
                }
                else if ((counts > 5) && (shiptype == 'ship2b')) {
                    $('#alert').children().hide();
                    $(currentcellid).addClass('miss');
                    $('.complete').show();
                }
                else { $('#simple').val(null); return false; };
                m = m - 3; 
                $(currentcellid).removeClass('opened');
                counts++;
            }
            else $('#simple').val(null);
        };
        $('#simple').val(null);
        if (stages == 5) $('.finishdemo').attr('href', 'http://best-quest.ru');
    });
    $(document).on('vclick', 'td', function(){
        event.preventDefault();
        currentcellid = '#' + $(this).attr('id');
        exportcellid = currentcellid;
        currentcellclass = $(this).attr('class');
        if ($(cell).attr('class') == 'selected') {
            $(cell).removeClass('selected').addClass('new');
        };
        $('#alert').children().hide();
        
        if (currentcellclass == 'new') {
            $(this).removeClass('new').addClass('selected');
            if(!notfirsttime) $('.sure').show();
            else $('.firsttimesure').show();
            cell = currentcellid;
        }
        if (currentcellclass == 'selected') {
            $('.sure').show();
            cell = currentcellid;
        }
        if (currentcellclass == 'opened') {
            if (counts == 2 | reefcell == currentcellid) $('.reefquestion').show();
            else $('.question').show();
            $('.submit').show();
        }
        if (currentcellclass == 'ship1' || currentcellclass == 'ship2b') {
            shiptype = currentcellclass;
            $('.submit').show();
            $('.'+currentcellclass).show();
        }
        if (currentcellclass == 'first' || currentcellclass == 'second') {
            $('.sink2').show();
        }
        else {
            $("div[class='"+currentcellclass+"']").show();
        };
    });
    $('.yes').click(function(){
        event.preventDefault();
        $(currentcellid).removeClass('selected').addClass('opened');
        $('#alert').children().hide();
        notfirsttime = undefined;
        m = m + 3;
        if (counts == 2) {
            reefcell = currentcellid;
            $('.reefquestion').show().trigger('isVisible');
            counts++;
        }
        else $('.question').show();
        $('.submit').show();
    });
    $('.no').click(function(){
        event.preventDefault();
        $(currentcellid).removeClass('selected').addClass('new');
        $('#alert').children().hide();
        $('.selectcell').show();
    });
    $(document).on('vclick', '#goahead', function(){
        event.preventDefault();
        if (isMobile.any()) {
            $(this).prev().fadeIn();
            $(this).prev().prev().hide();
            $('.submit').show();
            $(this).hide();
        } else {
            if ($(this).parent().attr('class') == 'ship1') {
                ship1video.setPlaybackQuality('hd720');
                if (!isMobile.iPad()) ship1video.playVideo();
                $('.main').hide();
                $('#videomax1').show();
            }
            if ($(this).parent().attr('class') == 'ship2b') {
                ship2video.setPlaybackQuality('hd720');
                if (!isMobile.iPad()) ship2video.playVideo();
                $('.main').hide();
                $('#videomax2').show();
            };
            $(this).prev().fadeIn();
            $(this).prev().prev().hide();
            $('.submit').show();
            $(this).hide();
        };
    });
    $(document).on('vclick', '.videoframe > img', function(){
        if ($(this).parent().parent().attr('class') == 'ship2b') {
            ship2video.playVideo();
            $('.main').hide();
            $('#videomax2').show() 
        } else {
            ship1video.playVideo();
            $('.main').hide();
            $('#videomax1').show()
        };
    });
});