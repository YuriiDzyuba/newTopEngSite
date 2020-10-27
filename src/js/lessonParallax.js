class lessonParallax /* extends parent_class */ {
    constructor(sSelector) {
        this.background = document.querySelector(sSelector);
        this.offsetX = 0;
        this.offsetY = 0;
        this.createEvents()
    }
    parallax(event) {
        let elements = [...this.background.children]
        let bgTargetParallax = elements.filter(e=> e.classList.contains("lessonsImgParallax"))
        this.offsetX += event.movementX / 50;
        this.offsetY += event.movementY / 50;
        bgTargetParallax[0].children[0].style.transform = `translateX(${this.offsetX / 22}%)translateY(${(this.offsetY / 28)-50}%)`
        bgTargetParallax[0].children[1].style.transform = `translateX(${this.offsetX / 13}%)translateY(${this.offsetY / 13-50}%)`
        bgTargetParallax[0].children[2].style.transform = `translateX(${this.offsetX / 3}%)translateY(${this.offsetY / 2-50}%)`
    }
    createEvents() {
        this.background.addEventListener('mousemove', this.parallax.bind(this));
    }
}

