if('serviceWorker' in navigator) {
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('sw.js')
    .then(function(registration){
        console.log('ServiceWorker registrado correctamente, alcance: ', registration.scope);
    }, function(err) {
        console.log('No se pude hacer registro del ServiceWorker: ', err);
    });


    if(window.Notification && Notification.permission !== 'denied'){ 
        setTimeout('Notification.requestPermission()', 2000);

        console.log(Notification.permission);

    }

    (function (){

        let nav = document.querySelector("nav")
        
        function estado(e){
         console.log(e.type)
         if(navigator.onLine)
         {
           nav.className = "navbar navbar-expand-lg navbar-dark bg-primary sticky-top";
         }
         else
         {
            nav.className = "navbar navbar-expand-lg bg-secondary navbar-dark sticky-top";
           alert("Estás navegando en modo offline");
         }
       }
       
       if(!navigator.onLine){
           estado(this)
       }
       
       window.addEventListener("online" , estado);
       window.addEventListener("offline" , estado);
       
       })();

       (function (){
        document.querySelector('.share').addEventListener('click', function() {
           if(navigator.share) {
                navigator.share({
                  title: 'PWA APIS',
                  text: 'Compartir PWA Desarrollo Tools ',
                  url: 'http://localhost/pwa/tp2/',
                })
                .then(function(){
                    console.log("Se compartió")
                })      
                .catch(function(error){
                  console.log(error)
                })
          }
        });
      })() 

    });

}

function registrar_tecnologia(){
    let valor = document.querySelector("#tecnologia").value;
        localStorage.tecnologia = valor;
        let valoreslocalhost = localStorage.tecnologia;
    let mostrar = document.querySelector("#mostrar")
    mostrar.innerHTML = `<li class="list-group-item">${valoreslocalhost}</li>`;
}

function mostrar_tecnologia(){
let valoreslocalhost = localStorage.tecnologia;
let mostrar = document.querySelector("#mostrar")
mostrar.innerHTML = `<li class="list-group-item">${valoreslocalhost}</li>`;
}