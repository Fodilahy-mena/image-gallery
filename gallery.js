console.log("let's code our gallery!");
function Gallery(gallery) {
    // thrown you new Error('No Gallery Found');
    if(!gallery) {
        throw Error('No Gallery Found');
    }

    // Select the elements we need
    const images = Array.from(gallery.querySelectorAll('img'));
    console.log(images);

    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function handleClickOutside(e) {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

    function openModal() {
        console.info('Open modal...');
        if(modal.matches('.open')) {
            console.info('Modal alredy open...');
            return;
        }
        modal.classList.add('open');
        // event listeners to be bound when we want to open the modal
        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        // 
        // event listener to be bound when we want to open modal
        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function handleKeyUp(e) {
        if(e.key === 'Escape') return closeModal();
        if(e.key === "ArrowLeft") return showNextImage();
        if(e.key === "ArrowRight") return showPrevImage();
    }

    
    function showNextImage(e) {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    };

    function showPrevImage(e) {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    };

    function showImage(el) {
        if(!el) {
            console.info('no image to show');
            return;
        }
        // update the modal with this info
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        // store the reference of the current image
        currentImage = el;
        openModal();
    }
    // loop

    images.forEach(image => {
        image.addEventListener('click', e => showImage(e.currentTarget));
    });
    modal.addEventListener('click',handleClickOutside); 
    

    images.forEach(image => {
        //
        image.addEventListener('keyup', e => {
            //
            if(e.key === 'Enter') {
                showImage(e.currentTarget);
            }
        });
        
    });

}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));