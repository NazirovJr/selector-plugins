const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? 'Choose'
    const selectorItems = data.map(item => {
        let cls = ""
        if (item.id === selectedId) {
            text = item.value
            cls = "selected"
        }
        return `
                <li class="select__item ${cls}" data-type="item" data-id = "${item.id}">${item.value}</li>
        `
    })
    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
              <span data-type="chose">${text}</span>
              <i class="fa fa-chevron-down" data-type="arrow"></i>
            </div>
         <div class="select__dropdown">
              <ul class="select__list">
                  ${selectorItems.join('')}
              </ul>
         </div>
        `
}

export class Select {
    constructor(selector, options) {
        this.$element = document.querySelector(selector)
        this.options = options
        this.selectedId = this.options.selectedId
        this.#render()
        this.#setup()
    }

    #render() {
        const {data, placeholder} = this.options
        this.$element.classList.add('select')
        this.$element.innerHTML = getTemplate(data, placeholder, this.selectedId)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$element.addEventListener('click', this.clickHandler)
        this.$arrow = this.$element.querySelector('[data-type="arrow"]')
        this.$value = this.$element.querySelector('[data-type="chose"]')
    }

    clickHandler(event) {
        const {type} = event.target.dataset
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.selected(id)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    selected(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.$element.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('selected'))
        this.$element.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.close()
    }

    get isOpen() {
        return this.$element.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$element.classList.add("open")
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')

    }

    close() {
        this.$element.classList.remove("open")
        this.$arrow.classList.remove('fa-chevron-up')
        this.$arrow.classList.add('fa-chevron-down')
    }
    destroy(){
        this.$element.innerHTML = ``
    }
}