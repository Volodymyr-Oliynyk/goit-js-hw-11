import './sass/main.scss';
import Notiflix from 'notiflix';
import Axios from 'axios';

import { imageParams, fetchCard } from './js/fetchCard.js';
import { resultOfMarkup } from './js/resultOfMarkup.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const sentinel = document.querySelector('.sentinel');

const observer = new IntersectionObserver(onEntry, { rootMargin: '200px' });

const onSearchImages = e => {
  observer.disconnect();
  e.preventDefault();
  imageParams.q = '';
  imageParams.page = 1;
  gallery.innerHTML = '';
  eventHandler(e);
};

const eventHandler = e => {
  if (e.target.elements.searchQuery.value === '') {
    Notiflix.Notify.info('Please, enter a word for search!');
  } else {
    imageParams.q = e.target.elements.searchQuery.value;
    fetchCard(imageParams).then(r => {
      createGallery(r.data);
      observer.observe(sentinel);
    });
  }
};

const createGallery = object => {
  const totalHits = object.totalHits;
  const hitsArray = object.hits;
  if (hitsArray.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
  } else {
    if (imageParams.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    }
    resultOfMarkup(hitsArray, gallery);
    imageParams.page += 1;
  }
};

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchCard(imageParams).then(r => {
        createGallery(r.data);
      });
    }
  });
}

form.addEventListener('submit', onSearchImages);
