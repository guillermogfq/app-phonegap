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
  $$("#iniciar-sesion").on("click", loginUser);
}

function registrarse(){
  console.log("registrar");
  $$("#back-to-login").on("click", goToLogin);
  $$("#registar-user").on("click", registerUser);
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

function registerUser(){
  app.dialog.preloader("Registrando...")
  var name = $$("#name").val();
  var lastname = $$("#lastname").val();
  var run = $$("#run").val();
  var nickname = $$("#nickname").val();
  var email = $$("#email").val();
  var password = $$("#password").val();

  run = run.replace("-","").replace(".","").replace(".","");
  run = run.substring(0, run.length - 1);

  app.request.post(
    'http://servicioswebmoviles.hol.es/index.php/REGISTER_UBB',
    {
      nombres: name,
      apellidos: lastname,
      run: run,
      email: email,
      pass: password,
      nickname: nickname
    },
    function (data) {
      app.dialog.close();
      if(data.resp){
        app.dialog.confirm(data.info,"SmartApp", function () {
          document.location = "/";
        });
      }else{
        app.dialog.alert(data.info, "SmartApp");
      }
    },
    function (){
      app.dialog.alert("Ha ocurrido un error, intente nuevamente.", "SmartApp");
    },
    "json"
  );
}

function loginUser(){

}
