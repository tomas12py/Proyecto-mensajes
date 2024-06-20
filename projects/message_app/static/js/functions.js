// constantes para la validacion del formulario
const nombre = document.getElementById("name")
const email = document.getElementById("email")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")
const message = document.getElementById("message")

// obtencion de cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
// obtencion del crsftoken para interaccion con los formularios
const csrftoken = getCookie('csrftoken');
//validacion del formulario
form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value == "" || nombre.value.length < 3){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }   
    if(message.value == ""){
        warnings += `El mensaje no es valido <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
        form.submit()
    }
})

  // fetch para controlar las peticiones get
fetch('http://localhost:8000/info', {
    method: 'GET', 
  })
    .then(response => {
      if (response.ok) {
        console.log('La solicitud fue exitosa (código 200)');
      } else {
        console.error('La solicitud falló (código ' + response.status + ')');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
// fetch para controlar las peticiones post
const data = new FormData(document.getElementById('form'));
fetch('http://localhost:8000/form', {
       method: 'POST',
       body: JSON.stringify(data),
       mode: 'cors',
       credentials: 'same-origin',
       headers: {
        'Content_Type':'application/json',
        'X-CSRFToken': csrftoken
       }
    })
    .then(function(response) {
       if(response.ok) {
           return response.text()
       } else {
           throw "Error al utilizar el metodo post";
       }
    
    })
    .then(function(texto) {
       console.log(texto);
    })
    .catch(function(error) {
       console.log("Error");
    });

