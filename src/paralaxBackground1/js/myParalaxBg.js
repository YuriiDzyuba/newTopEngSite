class b_backgroundParallax /* extends parent_class */ {
    constructor(sSelector) {
        this.background = document.querySelector(sSelector)
        this.layers = document.querySelector(".b_backgroundParallax")
        this.offsetX = 0
        this.offsetY = 0
        this.createEvents()

    }
    parallax(event) {
        let layersArray = [...this.layers.children]
        this.offsetX += event.movementX / 50
        this.offsetY += event.movementY / 50
        if (layersArray.length>2) {
        layersArray[0].style.transform = `translateX(${this.offsetX / 4}%)translateY(${this.offsetY / 4}%)`
        layersArray[1].style.transform = `translateX(${this.offsetX / 13}%)translateY(${this.offsetY / 13}%)`
        layersArray[2].style.transform = `translateX(${this.offsetX / 23}%)translateY(${this.offsetY / 22}%)`
        } else {
            layersArray[0].style.transform = `translateX(${this.offsetX / 13}%)translateY(${this.offsetY / 13}%)`
        }
    }
    createEvents() {
        this.background.addEventListener('mousemove', this.parallax.bind(this))
    }
}

