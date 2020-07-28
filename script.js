const imageContainer = document.getElementById( 'image-container' );
const loader = document.getElementById( 'loader' );

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let count = 5;

// Unsplash API
const apiKey = 'tiE25JB-Z9vusuYEvHYUZy34cO__37dXWpVUONadC94';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    
    if ( imagesLoaded === totalImages ) {
        loader.hidden = true;
        ready = true;
        count = 30;
    }
}

// Helper function to set attributes on DOM Elements
function setAttributes( element, attributes ) {
    for( const key in attributes ){
        element.setAttribute( key, attributes[key] );
    }
}


// Create Elements For links & Photos, add to DOM
function displayPhotos() {
    // Run function for each object in photos array.
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach( ( photo ) => {
        // Create <a> to link to splash
        const item = document.createElement( 'a' );
        setAttributes( item, {
            href:photo.links.html,
            target: '_blank',
        } );

        // Create <img> for photo
        const img = document.createElement( 'img' );
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        // Event Listener
        img.addEventListener( 'load', imageLoaded );    
        // put image inside <a>, then pu both inside imageContainer Element
        item.appendChild( img );
        imageContainer.appendChild( item );
    });
    
}


// Get Photos From Splash API
async function getPhotos(){

    try {
        const responde = await fetch( apiUrl );
        photosArray = await responde.json();
        displayPhotos();     
    } catch( error ) {
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener( 'scroll', () => {
    if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
    }
} );

getPhotos();
