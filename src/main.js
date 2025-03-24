import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { showLoader, hideLoader, clearGallery, renderImages, initializeLightbox, showloadMore, hideloadMore, smoothScroll } from './js/render-functions.js';

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
    smoothScroll();
    currentSearchText = searchText; 
  }
  showLoader();

  try {
    
    const response = await fetchImages(currentSearchText, currentPage);
    
    hideLoader();

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    const images = response.hits;  

    renderImages(images);
    initializeLightbox();
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
      const response = await fetchImages(currentSearchText, currentPage);  
      hideLoader();  

      
      if (!response || !response.hits || response.hits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message: 'Sorry, no more images available.',
        });
        hideloadMore(); 
        return;
      } else {
        showloadMore();  
      }
     
      renderImages(response.hits);

      
      initializeLightbox();
      smoothScroll();  

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