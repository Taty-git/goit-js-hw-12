import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { showLoader, hideLoader, clearGallery, renderImages, initializeLightbox, showloadMore, hideloadMore } from './js/render-functions.js';

const form = document.querySelector('.form');
let currentPage = 1;
let currentSearchText = '';

hideLoader();
hideloadMore();


form.addEventListener('submit', async function (event) {
  event.preventDefault(); 
  const searchText = form.querySelector('input[name="search-text"]').value.trim();

  if (!searchText) {
    iziToast.error({
      title: 'Error',
      message: 'Please, enter the text for search!',
    });
    return;
  }
  if (searchText !== currentSearchText) {
    currentPage = 1; 
    clearGallery();
    currentSearchText = searchText; 
  }
  showLoader();

   try {
    const response = await fetchImages(currentSearchText, currentPage); // Додаємо параметр сторінки
    hideLoader();

    const images = response.data.hits;

    if (images.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderImages(images);
    initializeLightbox();

    // Показуємо кнопку "Load more", якщо зображення є
    showloadMore();

  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation.',
    });
    console.error(error);
  }
});


const loadMoreButton = document.querySelector('.load-more');
if (loadMoreButton) {
  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();

    try {
      const response = await fetchImages(currentSearchText, currentPage); // Додаємо параметр сторінки
      hideLoader();

      const images = response.data.hits;

      if (images.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message: 'Sorry, no more images available.',
        });
        hideloadMore(); 
        return;
      }

      renderImages(images);
      initializeLightbox();
    } catch (error) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Error loading more images.',
      });
      console.error(error);
    }
  });
}