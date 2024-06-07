import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

import { getImages } from './js/pixabay-api.js';
import { imageTamplate } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const loader = document.querySelector('.loader');
const imageGallery = document.querySelector('.gallery');

let imageName = '';

form.addEventListener('input', (event) => {
    imageName = event.target.value.trim();
});

form.addEventListener('submit', onSubmit);
async function onSubmit(event) {
    event.preventDefault();
    showLoader();

    if (imageName === '') {
    return;
    }


    try{
        const data = await getImages(imageName);
        if (data.hits.length === 0) {
        imageGallery.innerHTML = '';
        return iziToast.error({ ...errorParams });

        const markup = imageTamplate(data.hits);
        imageGallery.innerHTML = markup;
        lightbox.refresh();
    }
} catch (error){
    console.log(error)
} finally {
    hideLoader();
}
}

//     getImages(imageName)
//     .then(data => {
//         if (data.hits.length === 0) {
//         imageGallery.innerHTML = '';
//         return iziToast.error({ ...errorParams });
//         }

//         const markup = imageTamplate(data.hits);
//         imageGallery.innerHTML = markup;
//         lightbox.refresh();
//     })
//     .catch(error => console.log(error))
//     .finally(() => {
//         hideLoader();
//     });
//     return event.target.reset();
// }



//---------------------Loader-----------------------

function showLoader() {
    loader.style.display = 'inline-block';
}

function hideLoader() {
    loader.style.display = 'none';
}

//------------------iziToast params----------------

const errorParams = {
    position: 'topRight',
    timeout: 1800,
    maxWidth: 300,
    icon: 'none',
    message: 'Sorry, there are no images matching your search query. Please try again!',
}

//------------------Simple Light box----------------

let lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });