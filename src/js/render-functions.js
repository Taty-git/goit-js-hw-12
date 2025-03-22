import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'inline-block'; 
    }
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none'; 
    }
};

export const clearGallery = () => {
  let gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';
  }
};

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(image => {
        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery-item');

        galleryItem.innerHTML = `
            <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}"></a>
            <div class="info">
                <p><b>Likes</b><br>${image.likes}</p>
                <p><b>Views</b><br>${image.views}</p>
                <p><b>Comments</b><br>${image.comments}</p>
                <p><b>Downloads</b><br>${image.downloads}</p>
            </div>
        `;

        gallery.appendChild(galleryItem);
    });
}

export function initializeLightbox() {
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });

    lightbox.refresh(); 
}
export function showloadMore() {
    const loadMore = document.querySelector('.load-more');
    if (loadMore) {
        loadMore.style.display = 'inline-block'; 
    }
}
export function hideloadMore() {
    const loadMore = document.querySelector('.load-more');
    if (loadMore) {
        loadMore.style.display = 'none'; 
    }
};