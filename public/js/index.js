let $map = document.querySelector('#map')

class LeafletMap{
    constructor(){
        this.map = null
        this.bounds = []
    }
    

   async load(element){
       return new Promise ((resolve, reject) => {
        $script('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js', () => {
            this.map = L.map(element).setView([48.852969, 2.349903], 11);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiZ2Fib3VycyIsImEiOiJja213M3B5eWowOW92MnBwZnk4YXFmNHVtIn0.4m-mXQzLUatCPAM9YbAHmg'
            }).addTo(this.map);
            resolve()
        })
       })  
    }

    addMarker (lat, lon, prix, cat){
        let point = [lat, lon]
        this.bounds.push(point)
        return new LeafletMarker(point, prix, cat, this.map)
        
    }

    center(){
        this.map.fitBounds(this.bounds)
    }

}

class LeafletMarker{
    constructor(point, prix, cat, map){
        this.prix = prix
        this.popup = L.popup({
            autoClose : false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            maxWidth: 400
        })
        .setLatLng(point)
        .setContent(prix + "" + cat)
        .openOn(map)
    }

    setActive(){
        this.popup.getElement().classList.add('is-active')

    }

    unsetActive(){
        this.popup.getElement().classList.remove('is-active')
    }

    addEventListener(event, cb){
        this.popup.addEventListener('add', () => {
            this.popup.getElement().addEventListener(event, cb)
        })  
    }

    setContent(prix){
        this.popup.setContent(prix)
        this.popup.getElement().classList.add('is-expanded')
        this.popup.update()
    }
    
    resetContent(){
        this.popup.setContent(this.prix)
        this.popup.getElement().classList.remove('is-expanded')
        this.popup.update()
    }
}


const initMap = async function(){
    let map = new LeafletMap()
    let hoverMarker = null
    let activeMarker = null
    await map.load($map)
    Array.from(document.querySelectorAll('.js-marker')).forEach((item) =>{
       let marker = map.addMarker(item.dataset.lat, item.dataset.lon, item.dataset.prix + '€', item.dataset.cat)
        item.addEventListener('mouseover', function(){
            if(hoverMarker !== null){
                hoverMarker.unsetActive()
                
            }
            marker.setActive()
            hoverMarker = marker
        })
        item.addEventListener('mouseleave', function(){
            if(hoverMarker !== null){
                hoverMarker.unsetActive()
            }
        })
        marker.addEventListener('click', function (){
            if(activeMarker !== null){
                activeMarker.resetContent()
            }
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
    })
    map.center()
}

if($map !== null){
    initMap()
}
    
    