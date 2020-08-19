console.log("let's code our gallery!");
function Gallery(gallery) {
    // thrown you new Error('No Gallery Found');
    if(!gallery) {
        throw Error('No Gallery Found');
    }
    this.gallery = gallery;
    // Select the elements we need
    this.images = Array.from(gallery.querySelectorAll('img'));
    console.log(this.images);

    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');
    

    // loop

    this.images.forEach(image => {
        image.addEventListener('click', e => this.showImage(e.currentTarget));
    });

    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.modal.addEventListener('click', this.handleClickOutside); 
    
    this.images.forEach(image => {
        //
        image.addEventListener('keyup', e => {
            //
            if(e.key === 'Enter') {
                this.showImage(e.currentTarget);
            }
        });
        
    });

}

Gallery.prototype.handleClickOutside = function(e) {
    if (e.currentTarget === e.target) {
        this.closeModal();
    }
}

Gallery.prototype.openModal = function() {
    console.info('Open modal...');
    if(this.modal.matches('.open')) {
        console.info('Modal alredy open...');
        return;
    }
    this.modal.classList.add('open');
    // event listeners to be bound when we want to open the modal
    window.addEventListener('keyup', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    // 
    // event listener to be bound when we want to open modal
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.handleKeyUp = function(e) {
    if(e.key === 'Escape') return this.closeModal();
    if(e.key === "ArrowLeft") return this.showNextImage();
    if(e.key === "ArrowRight") return this.showPrevImage();
}


Gallery.prototype.showNextImage = function(e) {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};

Gallery.prototype.showPrevImage = function(e) {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
};

Gallery.prototype.showImage = function(el) {
    if(!el) {
        console.info('no image to show');
        return;
    }
    // update the modal with this info
    console.log(el);
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    // store the reference of the current image
    this.currentImage = el;
    this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const gallery3 = new Gallery(document.querySelector('.gallery3'));

console.log('Gallery1',gallery1,'Gallery2', gallery2);