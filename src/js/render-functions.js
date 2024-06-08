export { postsTamplate };
//----------------------------------

function createMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
        <ul class="info">
        <li class="info-item"> <h3 class="info-title">Likes</h3><p class="info-text">${likes}</p></li>
        <li class="info-item"> <h3 class="info-title">Views</h3><p class="info-text">${views}</p></li>
        <li class="info-item"> <h3 class="info-title">Comments</h3><p class="info-text">${comments}</p></li>
        <li class="info-item"> <h3 class="info-title">Downloads</h3><p class="info-text">${downloads}</p></li>
        </ul>
        </a>
    </li>
    `;
}

function postsTamplate(arr) {
    return arr.map(createMarkup).join('');
}