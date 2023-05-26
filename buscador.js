new Vue({
    el  : '#app-consulta', // Elemento HTML asociado al componente Vue
    data: {
      consultaBusqueda: '', // Variable para almacenar la consulta del usuario
      albums: [] // Arreglo para almacenar los resultados de la API
    },
    methods: {
      buscarArtista() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "get",
          headers: myHeaders,
          redirect: "follow",
        };
        
        // Realizar la petición a la API de Spotify (nocodeapi) con la consulta del usuario
        fetch(`https://v1.nocodeapi.com/cggmax/spotify/iONiMBHWMQLVtrjd/search?q=${this.consultaBusqueda}&type=album`, requestOptions)
          .then(response => response.json()) // Convertir la respuesta a formato JSON
          .then(result => {
            // Mapear los resultados obtenidos de la API y asignarlos a la propiedad 'albums'
            this.albums = result.albums.items.map(item => ({
              id: item.id,
              artist: item.artists[0].name,
              title: item.name,
              releaseDate: item.release_date,
              image: item.images[0].url
            }));
          })
          .catch(error => console.log('error', error));
      }
    }
  });