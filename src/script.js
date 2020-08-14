"use strict";
import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightbox__image = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__content");
const closeModalButton = document.querySelector(
  `button[data-action="close-lightbox"]`
);

gallery.addEventListener("click", handleImgClick);
closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", handleOverlayClick);

const galleryList = galleryItems.map((item) => {
  const galleryItem = document.createElement("li");
  galleryItem.insertAdjacentHTML(
    "beforeend",
    `<a
  class="gallery__link"
  href="${item.original}"
>
  <img
    class="gallery__image"
    src=${item.preview}
    data-source="${item.original}"
    alt=${item.description}
  />
</a>`
  );
  return galleryItem;
});

gallery.prepend(...galleryList);

function handleImgClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  lightbox__image.src = event.target.dataset.source;
  lightbox__image.alt = event.target.getAttribute("alt");

  lightbox.classList.add("is-open");
  window.addEventListener("keydown", handleCloseModalEsc);
}

//close modal

function closeModal() {
  lightbox.classList.remove("is-open");
  lightbox__image.src = " ";
  lightbox__image.alt = " ";

  window.removeEventListener("keydown", handleCloseModalEsc);
}

function handleOverlayClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closeModal();
}

function handleCloseModalEsc(event) {
  if (event.code !== "Escape") {
    return;
  }
  console.log("eded");
  closeModal();
}
