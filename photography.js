const photos = Array.from(
    document.querySelectorAll(".photo-item img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

let currentIndex = 0;


/* ------------------------------
   OPEN PHOTO
------------------------------ */

function openLightbox(index) {

    currentIndex = index;

    const selectedPhoto = photos[currentIndex];

    lightboxImage.src = selectedPhoto.src;
    lightboxImage.alt = selectedPhoto.alt;

    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");

}


/* ------------------------------
   CLOSE PHOTO
------------------------------ */

function closeLightbox() {

    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");

}


/* ------------------------------
   NEXT / PREVIOUS
------------------------------ */

function showNextPhoto() {

    currentIndex++;

    if (currentIndex >= photos.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);

}


function showPreviousPhoto() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = photos.length - 1;
    }

    openLightbox(currentIndex);

}


/* ------------------------------
   CLICK PHOTO
------------------------------ */

photos.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* ------------------------------
   BUTTONS
------------------------------ */

nextButton.addEventListener("click", (event) => {

    event.stopPropagation();

    showNextPhoto();

});


previousButton.addEventListener("click", (event) => {

    event.stopPropagation();

    showPreviousPhoto();

});


/* ------------------------------
   CLICK BACKGROUND TO CLOSE
------------------------------ */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* ------------------------------
   KEYBOARD CONTROLS
------------------------------ */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        showNextPhoto();

    }


    if (event.key === "ArrowLeft") {

        showPreviousPhoto();

    }

});

/* ------------------------------
   MASONRY GRID
------------------------------ */

const photoGrid = document.querySelector(".photo-grid");
const photoItems = document.querySelectorAll(".photo-item");

function resizeMasonryItem(item) {

    const rowHeight = parseInt(
        window.getComputedStyle(photoGrid)
            .getPropertyValue("grid-auto-rows")
    );

    const rowGap = parseInt(
        window.getComputedStyle(photoGrid)
            .getPropertyValue("row-gap")
    ) || 0;

    const image = item.querySelector("img");

    const imageHeight = image.getBoundingClientRect().height;

    const rowSpan = Math.ceil(
        (imageHeight + rowGap + 18) /
        (rowHeight + rowGap)
    );

    item.style.gridRowEnd = `span ${rowSpan}`;
}


function resizeAllMasonryItems() {

    photoItems.forEach(item => {

        const image = item.querySelector("img");

        if (image.complete) {

            resizeMasonryItem(item);

        } else {

            image.addEventListener("load", () => {
                resizeMasonryItem(item);
            });

        }

    });

}


window.addEventListener("load", resizeAllMasonryItems);
window.addEventListener("resize", resizeAllMasonryItems);