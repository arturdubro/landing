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
  origin: 'bqlp.ru',
  playerVars: { 'controls': 0, 'showinfo': 0 },
  events: {
    'onStateChange': onPlayerStateChange
  }
  });
  ship2video = new YT.Player( setvideoplace+'2', {
  width: setvideowidth,
  height: setvideoheight,
  videoId: 'yeS-MUO4SnU',
  origin: 'bqlp.ru',
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