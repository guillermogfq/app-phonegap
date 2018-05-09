var $$ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'SmartApp',
  id: 'cl.ubiobio.smartapp',
  theme: "ios", //ios para iPhone, md para android y auto para que detecte el sistema.
  panel: {
    swipe: 'left',
  },
});

var mainView = app.views.create('.view-main');

$$(document).on("deviceready", init_html);

function init_html(){
  switch (document.location.pathname) {
    case "/":
      login();
      break;
    case "/registrarse.html":
      registrarse()
      break;
    case "/main.html":
      main();
      break;
    default:
      console.log(error);
      break;
  }
}

function login(){
  console.log("login");
  $$("#registrar").on("click", goToRegistrarse);
}

function registrarse(){
  console.log("registrar");
  $$("#back-to-login").on("click", goToLogin);
}

function main(){
  console.log("main");
}

function goToRegistrarse(){
  console.log("go");
  document.location = "registrarse.html";
}

function goToLogin(){
  console.log("go");
  document.location = "/";
}
