const slideShow = {
    images: [...document.querySelectorAll('.slider .images img')],
    indicators: [...document.querySelectorAll('.slider .indicators li')],
    activeImage: 0,
    autoPlayer: null,

    clearAllImages() {
        this.images.forEach((image, index) => {
            image.classList.remove('active');
            this.indicators[index].classList.remove('active');
        })
    },

    changeImage(index) {
        this.clearAllImages();
        this.activeImage = index;

        this.images[index].classList.add('active');
        this.indicators[index].classList.add('active');
    },

    handleClicks() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', e => {
                this.resetAutoPlay();
                this.changeImage(index);   
            })
        });
    },

    initAutoPlay() {
        this.autoPlayer = setInterval(() => {
            let nextImage;
            if(this.activeImage < this.images.length - 1) {
                nextImage = this.activeImage + 1;
            } else if(this.activeImage === this.images.length - 1) {
                nextImage = 0;
            } 
            this.changeImage(nextImage);
        }, 3000);
    },

    resetAutoPlay() {
        window.clearInterval(this.autoPlayer);
        this.initAutoPlay();
    },

    init() {
        this.handleClicks();
        this.initAutoPlay();
    }
};

slideShow.init();
