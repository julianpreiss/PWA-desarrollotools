let cacheName = 'archivosdinamicosPWA';

self.addEventListener('activate', function (event) {
	console.log('SW activado', event); 
});

self.addEventListener('install', function(event) {
	self.skipWaiting();
	event.waitUntil(	
		caches.open(cacheName).then(function (archivosdinamicosPWAObjeto)
			{
            archivosdinamicosPWAObjeto.addAll(
			 		['css/bootstrap.css',
			 		'index.html',
			 		'js/script.js',
					'img/portada-mobile.jpg',
					'img/portada-tablet.jpg',
					'img/portada-web.jpg',
					'img/imagen2-mobile.jpg',
					'img/imagen2-tablet.jpg',
					'img/imagen2-web.jpg',
					'img/coursera.png',
					'img/edteam.png',
					'img/edx.png',
					'img/freecodecamp.png',
					'img/linkedin.png',
					'img/pildoras.png',
					'img/udemy.png',
					'img/yoney.png',]
			 		)
			})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		//Verifico si lo solicitado se encuentra en el caché
		caches.match(event.request).then(function(response) {
			console.log('Solicitud Original',event.request);
			if (response) 
			{
				//Si lo encuentro, doy una respuesta positiva por consola
				console.log('Ya está en caché');
				return response;
			}
            //Si no lo encuentro, doy respuesta negativa
			console.log('No está en caché');

			let requestToCache = event.request.clone(); 
			// Hago la solicitud HTTP
			return fetch(requestToCache).then( function(response) {
					if(!response || response.status !== 200) { 
						return response;
					}
					// Hago la clonación para agregar la respuesta al caché
					let responseToCache = response.clone(); 
					// Abro el cache.
					caches.open(cacheName).then(function(cache) { 
						//Añado la respuesta
						console.log('Se agrega al caché');
						cache.put(requestToCache, responseToCache); 
						});
					return response;
			});
		})
	);
});

self.addEventListener("push", function(e){
    console.log(e);
    var  title = "Buffet diario de cursos gratis";
    options={
        body:"Nuevos cursitos gratisss, querés ver que hay hoy?",
        icon: "manifesto/icon-192x192.png",
        vibrate: [200, 100, 50],
        data: { id: 1},
        actions: [{'action': 'Si', 'title': 'Quiero cursitos GRATY'
        },
        {'action': 'No', 'title': 'Hoy paso'
        },
		]       
      }
  e.waitUntil(self.registration.showNotification(title,options))
})

self.addEventListener("notificationclick", function(event){
    console.log(event);
    if(event.action === "Si"){
      clients.openWindow('https://real.discount')
    }
    event.notification.close();
})