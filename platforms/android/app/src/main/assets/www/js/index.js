var $$ = Dom7;

var texto_prueba = "hola";

var app = new Framework7({
  root: '#app',
  name: 'SmartApp',
  id: 'cl.ubiobio.smartapp',
  theme: "auto", //ios para iPhone, md para android y auto para que detecte el sistema.
  panel: {
    swipe: 'left',
  },
});

var mainView = app.views.create('.view-main');

$$(document).on("deviceready", init_html);

function init_html(){
  var path = document.location.pathname;
  path = path.split("/")[path.split("/").length - 1];
  console.log(path);
  switch (path) {
    case "":
      login();
      break;
    case "index.html":
      login();
      break;
    case "registrarse.html":
      registrarse();
      break;
    case "main.html":
      main();
      break;
    default:
      console.log("error");
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
  var nombre = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
  var email = localStorage.getItem("email");
  $$("#nombre").html(nombre);
  $$("#email").html(email);
  $$("#tomar-foto").on("click",tomarFoto);
}

function goToRegistrarse(){
  console.log("go");
  document.location = "registrarse.html";
}

function goToLogin(){
  console.log("go");
  document.location = "index.html";
}

function tomarFoto(){
  var options = {
    sourceType: Camera.PictureSourceType.CAMERA,
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: false,
    correctOrientation: true
  }
  function onSuccess(imageURI) {
    $$('#foto').attr('src',imageURI);
  }
  function onFail(message) {
    console.log('Failed because: ' + message);
  }
  navigator.camera.getPicture(onSuccess, onFail, options);
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
    function (data) {//función de éxito
      app.dialog.close();
      if(data.resp){
        app.dialog.confirm(data.info,"SmartApp", function () {
          document.location = "index.html";
        });
      }else{
        app.dialog.alert(data.info, "SmartApp");
      }
    },
    function (){//función error
      app.dialog.close();
      app.dialog.alert("Ha ocurrido un error, intente nuevamente.", "SmartApp");
    },
    "json"
  );
}

function loginUser(){
  app.dialog.preloader("Iniciando Sesión...");
  var login = $$("#user").val();
  var password = $$("#password").val();

  app.request.post(
    'http://servicioswebmoviles.hol.es/index.php/LOGIN_UBB',
    {
      login: login, //Datos para login
      pass: password
    },
    function (data) {//función de éxito
      app.dialog.close();
      console.log(data);
      if(data.resp){
        console.log("nombre es: " + data.data.nombres);
        console.log("apellido es: " + data.data.apellidos);
        console.log("run es: " + data.data.run);
        console.log("email es: " + data.data.email);
        localStorage.setItem("nombre",data.data.nombres);
        localStorage.setItem("apellido",data.data.apellidos);
        localStorage.setItem("run",data.data.run);
        localStorage.setItem("email",data.data.email);
        document.location = "main.html";
      }else{
        app.dialog.alert(data.info, "SmartApp");
      }
    },
    function (){//función error
      app.dialog.close();
      app.dialog.alert("Ha ocurrido un error, intente nuevamente.", "SmartApp");
    },
    "json"
  );
}
