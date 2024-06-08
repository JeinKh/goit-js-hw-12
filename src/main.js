import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//------------------Simple Light box----------------

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, captionsData: "alt" });

import { getPosts } from './js/pixabay-api.js';
import { postsTemplate } from './js/render-functions.js';

const selectors = {
form: document.querySelector('#search-form'),
input: document.querySelector('#search-input'),
loader: document.querySelector('.loader'),
imageGallery: document.querySelector('.gallery'),
loadMoreBtn: document.querySelector('#load-more-btn'),
};

selectors.loader.classList.add("hidden");
selectors.loadMoreBtn.classList.add("hidden");

let page = 1;
let totalHits = 0;
let query = "";


async function handleSubmit(event) {

    event.preventDefault();
    selectors.postsGallery.innerHTML = "";
    page = 1;

    query = event.target.elements.searchQuery.value.trim();

    if (!query) {
        iziToast.info({
            title: "No data",
            message: "Please enter a search query"
        });
        return;
    }

    selectors.loader.classList.remove("hidden");
    
    try {
        
        const data = await getPosts(query, page);
        totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.warning({
                title: "No result",
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            selectors.loadMoreBtn.classList.add("hidden");
        }

        const markup = postsTemplate(data.hits);
        selectors.postsGallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();

        if (totalHits > 15) {
            selectors.loadMoreBtn.classList.remove("hidden");
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        })
    } finally {
        selectors.loader.classList.add("hidden");
        event.target.reset();
    }
}

selectors.form.addEventListener("submit", handleSubmit);




async function handleLoadMore() {
    
    page += 1;
    selectors.loader.classList.remove("hidden");


    try {
        const data = await getPosts(query, page);
        const markup = postsTemplate(data.hits);
        selectors.postsGallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();

        const item = document.querySelector(".gallery-item");
        const itemHeight = item.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: itemHeight * 2,
            behavior: "smooth"
        })

        totalHits = data.totalHits;

        if (totalHits <= page * 15) {
            selectors.loadMoreBtn.classList.add("hidden");
            iziToast.info({
                title: 'End of results',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

    } catch (error) {
        iziToast.error({
            title: "Error",
            message: `Something went wrong. ${error.message}`
        });
    } finally {
        selectors.loader.classList.add('hidden');
    }

}

selectors.loadMoreBtn.addEventListener("click", handleLoadMore);

// let imageName = '';


// form.addEventListener('input', async (event) => {
//     imageName = event.target.value.trim();
// });

// form.addEventListener('submit', onSubmit);
// async function onSubmit(event) {
//     event.preventDefault();
//     imageGallery.innerHTML = '';
//     showLoader();

//     if (imageName === '') {
//     return;
//     }

//     getImages(imageName)
//     .then(data => {
//         if (data.hits.length === 0) {
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

// //---------------------Loader-----------------------

// async function showLoader() {
//     loader.style.display = 'inline-block';
// }

// function hideLoader() {
//     loader.style.display = 'none';
// }

// //------------------iziToast params----------------

// const errorParams = {
//     position: 'topRight',
//     timeout: 1800,
//     maxWidth: 300,
//     icon: 'none',
//     message: 'Sorry, there are no images matching your search query. Please try again!',
// }