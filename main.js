var version = '0.2.6 | You can now use our autoloader!';
var startUpMsg = "Welcome to NCS version " + version + "!";
var newFeaturesMsg = "The theme should now be fixed!<br>Chat bugs should be fixed!<br><a href='https://electricgaming.ga/ncs/' target='_blank'>The NCS Website is now online!</a><br><a href='https://github.com/Nuvm/NCS/raw/master/NCS.user.js' target='_blank'>Click here to get our NCS autoloader for Tampermonkey / Greasemonkey!</a>";
var errorMsg = "It seems that you are already running NCS. If that is not the case, please refresh and try again. If it still doesn't work, please report the issue <a href='https://github.com/Nuvm/NCS/issues/new' target='_blank'>here</a>.";
var uname;
var lastSelected;
var prevObj;
var status = 'Not loaded';
var unamestuff;
var unameicon;
var rotateDeg = 0;
var rotateDeg2 = 0;
var checkIfReady;
setTimeout(function() {
  checkIfReady = setInterval(function() {
    if (document.getElementsByClassName('loading').length !== 1) {
      start();
    }
  }, 100)
}, 2000);

function start() {
  $.getScript('https://rawgit.com/Nuvm/NCS/master/CustomNames.js');
  clearInterval(checkIfReady);
  if ($('#NCS-menu')[0] || $('#NCS-btn')[0] || $('#THEME_BUG')[0]) {
    $('#messages').append('<center class="NCSalert cm log mention animated fadeInLeftBig" style="color:whitesmoke;text-align:center;font-weight:150;font-size:30;">' + errorMsg + '</center>')
  } else {
    console.log('[NCS] Started!');
    status = 'ready';
    uname = document.getElementsByClassName('navbar header')[0].getElementsByClassName('nav-form nav-right')[0].getElementsByTagName('p')[0].innerHTML;
    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/daneden/animate.css/master/animate.min.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=IM+Fell+English+SC">');
    setTimeout(API.on(API.events.CHAT, cfnm), 4000);
    NCSinit();
  }
}

function cfnm() {
  if (document.getElementById('messages').lastChild.id !== prevObj) {
    prevObj = document.getElementById('messages').lastChild.id;
    if (document.getElementById('messages').lastChild.getElementsByClassName('msg')[0].innerHTML.slice(0, 4) === '/NCS') {
      NCScommandSorter(document.getElementById('messages').lastChild.getElementsByClassName('msg')[0].innerHTML, document.getElementById('messages').lastChild.getElementsByClassName('uname')[0], document.getElementById('messages').lastChild)
    }
    if (document.getElementById('messages').lastChild.getElementsByClassName('msg')[0].innerHTML.indexOf('@' + uname) !== -1 && $('#NCS-f3').hasClass('enabled') && !document.hasFocus()) {
      var notif = new Notification(document.getElementById('messages').lastChild.getElementsByClassName('uname')[0].innerHTML, {
        icon: 'http://i.imgur.com/5ThdRUd.png',
        body: document.getElementById('messages').lastChild.getElementsByClassName('msg')[0].innerHTML
      });
      notif.onclick = function() {
        window.focus();
        notif.close()
      };
      setTimeout(function() {
        notif.close()
      }, 3000)
    }
    cfun()
  }
}

function NCScommandSorter(msg, user, element) {
  msg = msg.slice(4, 255);
  if (msg === 'updateAlert') {
    if (user.innerHTML === 'Nuvm' || user.innerHTML === 'CSxKING' || user.innerHTML === 'Pixel') {
      $('#messages').append('<center class="NCSalert cm log mention animated fadeInLeftBig" style="color:whitesmoke;text-align:center;font-weight:200;font-size:46;padding:5px;">A new update is available for NCS!<br><span style="font-weight:100;font-size:28">Refresh your page to get the latest update!</span></center>');
      setTimeout(function() {
        $(element).remove()
      }, 50)
    }
  } else if (msg.slice(0, 13) === 'globalMessage') {
    if (user.innerHTML === 'Nuvm' || user.innerHTML === 'CSxKING' || user.innerHTML === 'Pixel') {
      $('#messages').append('<center class="NCSalert cm log mention animated fadeInLeftBig" style="color:whitesmoke;text-align:center;font-weight:150;font-size:30;">[' + user.innerHTML + '] says: ' + msg.slice(13, 255) + '</center>');
      setTimeout(function() {
        $(element).remove()
      }, 50)
    }
  }
}
var NCSsettings = [false, true, false, false];
window.addEventListener('beforeunload', function() {
  localStorage.setItem('NCSlocalSettings', JSON.stringify(NCSsettings))
});
if (typeof(Storage) === "undefined") {
  alert("Unfortunately, your browser does not support local storage. Your NCS settings will not be saved. Please use a modern version of Chrome, Firefox, Safari or Opera.")
}
if (typeof localStorage.NCSlocalSettings !== undefined) {
  var localSettings = JSON.parse(localStorage.NCSlocalSettings);
  NCSsettings[0] = localSettings[0];
  NCSsettings[1] = localSettings[1];
  NCSsettings[2] = localSettings[2];
  NCSsettings[3] = localSettings[3]
}

function NCSinit() {
  $('#chat-button').parent().append('<div id="NCS-btn" class="animated" style="transform:rotate(0deg);background-image:none;height:30px;width:30px;float:right;margin-right:5px;-webkit-user-select: none;"></div>');
  $('#NCS-btn').append('<div id="NCS-name" style="position:absolute;transform:rotate(0deg);font-family:IM Fell English SC;color:black;bottom:10px;text-shadow:0px 0px 2px #FFD700;"><b>NCS</b></div>');
  $('.navbar.header').append('<a href="http://electricgaming.ga/forums/en/forumdisplay.php?fid=24" target="_blank"><button id="THEME_BUG" class="nav-form nav-right">[NCS] Report an Issue</button></a>');
  $('#NCS-btn')[0].style.backgroundImage = "url('http://i.imgur.com/5ThdRUd.png')";
  initialWidth1 = $('#chat-button').css('width').split('px')[0];
  initialWidth2 = $('#users-button').css('width').split('px')[0];
  initialWidth3 = $('#waitlist-button').css('width').split('px')[0];
  $('#chat-button').parent().css('height', '35px');
  $('#chat').css('height', ($('#chat').css('height').split('px')[0] - 5));
  $('#chat-button').css('width', initialWidth1 * 0.9);
  $('#users-button').css('width', initialWidth2 * 0.9).css('left', $('#users-button').css('left').split('px')[0] - ((initialWidth2) - (initialWidth2 * 0.9)));
  $('#waitlist-button').css('width', initialWidth3 * 0.9).css('left', $('#waitlist-button').css('left').split('px')[0] - (((initialWidth3) - (initialWidth3 * 0.9)) + ((initialWidth2) - (initialWidth2 * 0.9))));
  $('#NCS-btn').css('top', '0px').css('right', '0px');
  $('#app-right').append('<div id="NCS-menu" style="display:none;background-color:transparent;box-shadow: inset 0px 0px 10px 4px rgba(255,255,255,0.9);"></div>');
  $('#NCS-menu').css('top', '100%-35').css('height', $('#chat').css('height')).css('width', '100%');
  $('#NCS-menu').append('<div id="NCS-f1" class="disabled animated NCSf">Hide Video Player<span id="NCS-f1c" class="NCS-checkmark" style="display:none"/></div>');
  $('#NCS-menu').append('<div id="NCS-f2" class="disabled animated NCSf" style="top:34px;">Custom Theme<span id="NCS-f2c" class="NCS-checkmark" style="display:none"/></div>');
  $('#NCS-menu').append('<div id="NCS-f3" class="disabled animated NCSf" style="top:68px;">Desktop Notifications<span id="NCS-f3c" class="NCS-checkmark" style="display:none"/></div>');
  $('#NCS-menu').append('<div id="NCS-f4" class="disabled animated NCSf" style="top:102px;">Remove Video Player<span id="NCS-f4c" class="NCS-checkmark" style="display:none"/></div>');
  $('#NCS-btn').on('click', function() {
    if ($('#NCS-menu').css('display') === 'block') {
      $('#' + lastSelected.split('-button')[0]).css('display', 'block');
      $('#NCS-menu').css('display', 'none')
    } else {
      if (document.getElementsByClassName('selected')[0]) {
        lastSelected = document.getElementsByClassName('selected')[0].id
      }
      $('#chat-button,#users-button,#waitlist-button').removeClass('selected');
      $('#chat,#users,#waitlist').css('display', 'none');
      $('#NCS-menu').css('display', 'block')
    }
  });
  $('#chat-button,#users-button,#waitlist-button').on('click', function() {
    if ($('#NCS-menu').css('display') === 'block') {
      $('#NCS-menu').css('display', 'none')
    }
  });
  $('#NCS-f1,#NCS-f2,#NCS-f3,#NCS-f4,#NCS-f5').on('click', NCSfeatures);
  $('head').append('<style type="text/css">#NCS-btn:hover{cursor:pointer;background-color:grey;}.NCS-checkmark{float:right;background-image:url("http://i.imgur.com/rF5fHxr.png");background-repeat:no-repeat;height:15px;width:15px;margin-right:25px;}.NCSf{height:15px;word-wrap:break-word;opacity:0.8;padding-top:9.5px;padding-bottom:9.5px;padding-left:15px;color:white;}.NCSf:hover{cursor:pointer;box-shadow:inset 0px 0px 9px 1px rgba(255,255,255,0.8);}</style>');
  $('#messages').append('<center id="NCS-startupmsg" class="cm log mention animated flip" style="color:whitesmoke;text-align:center;font-weight:200;font-size:120%;padding:30px;">' + startUpMsg + '<br><span style="font-weight:100;font-size:85%">' + newFeaturesMsg + '</span></center>');
  $('#messages')[0].scrollIntoView(false);
  if (NCSsettings[0]) {
    $('#NCS-f1').click()
  }
  if (NCSsettings[1]) {
    $('#NCS-f2').click()
  }
  if (NCSsettings[2]) {
    $('#NCS-f3').click()
  }
  if (NCSsettings[3]) {
    $('#NCS-f4').click()
  }
  window.addEventListener('beforeunload', function() {
    if ($('#NCS-f5').hasClass('enabled')) {
      return '[NCS] Accidental Navigation Prevention'
    }
  })
}

function NCSfeatures(eventData) {
  if (eventData.target.id === 'NCS-f1') {
    if ($('#NCS-f1').hasClass('disabled')) {
      if (document.getElementById('player')) {
        $('#NCS-f1c').css('display', 'block');
        document.getElementById('player').style.display = 'none';
        NCSsettings[0] = true;
        $('#NCS-f1').removeClass('disabled').addClass('enabled')
      }
    } else {
      if (document.getElementById('player')) {
        $('#NCS-f1c').css('display', 'none');
        document.getElementById('player').style.display = 'block';
        NCSsettings[0] = false;
        $('#NCS-f1').removeClass('enabled').addClass('disabled')
      }
    }
  } else if (eventData.target.id === 'NCS-f2') {
    if ($('#NCS-f2').hasClass('disabled')) {
      $('head').append('<link id="CSxKINGtheme" rel="stylesheet" href="https://rawgit.com/Nuvm/NCS/master/NC331_Style.css">');
      $('#NCS-f2c').css('display', 'block');
      NCSsettings[1] = true;
      $('#NCS-f2').removeClass('disabled').addClass('enabled')
    } else {
      $('#NCS-f2c').css('display', 'none');
      $('#CSxKINGtheme').remove();
      NCSsettings[1] = false;
      $('#NCS-f2').removeClass('enabled').addClass('disabled')
    }
  } else if (eventData.target.id === 'NCS-f3') {
    if ($('#NCS-f3').hasClass('disabled')) {
      if (!Notification) {
        alert('Please use a modern version of Chrome, Firefox, Opera or Firefox.')
      } else if (Notification.permission !== "granted") {
        Notification.requestPermission()
      } else {
        $('#NCS-f3c').css('display', 'block');
        NCSsettings[2] = true;
        $('#NCS-f3').removeClass('disabled').addClass('enabled')
      }
    } else {
      $('#NCS-f3c').css('display', 'none');
      NCSsettings[2] = false;
      $('#NCS-f3').removeClass('enabled').addClass('disabled')
    }
  } else if (eventData.target.id === 'NCS-f4') {
    if ($('#NCS-f4').hasClass('disabled')) {
      $('#NCS-f4c').css('display', 'block');
      $('#player').remove();
      $('#messages').append('<center class="NCSalert cm log mention animated fadeInLeftBig" style="color:whitesmoke;text-align:center;font-weight:150;font-size:30;">You will have to disable this option and refresh in order to have the video player back. Sorry, this is how it works currently!</center>');
      $('#messages')[0].scrollIntoView(false);
      NCSsettings[3] = true;
      $('#NCS-f4').removeClass('disabled').addClass('enabled')
    } else {
      $('#NCS-f4c').css('display', 'none');
      $('#messages').append('<center class="NCSalert cm log mention animated fadeInLeftBig" style="color:whitesmoke;text-align:center;font-weight:150;font-size:30;">Refresh the page to get the video player back!</center>');
      $('#messages')[0].scrollIntoView(false);
      NCSsettings[3] = false;
      $('#NCS-f4').removeClass('enabled').addClass('disabled')
    }
  }
}
