import markupCard from '../templates/markupCard.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250
});

export const resultOfMarkup = (array, container) => {
    const markup = markupCard(array);
    container.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}