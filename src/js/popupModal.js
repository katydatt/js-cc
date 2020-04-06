class PopupModal {
    constructor(options) {
        this.popup = options.parent
        this.container = options.selector
        this.item = options.item
        this.checkedItems = []

        this.init()

        return this
    }

    init() {
        let contentModal = document.createElement('div')
        contentModal.classList.add('menu-modal')

        let imageContainer = document.createElement('div')
        imageContainer.classList.add('image-item')

        let content = document.createElement('div')
        content.classList.add('content')

        let name = document.createElement('h3')
        name.classList = 'heading -m'
        name.innerText = this.item.name

        let description = document.createElement('p')
        description.classList.add('item-description')
        description.innerText = this.item.description

        content.appendChild(name)
        content.appendChild(description)

        contentModal.appendChild(imageContainer)
        contentModal.appendChild(content)

        this._createDropDown(contentModal)

        this._createInputBoxes({
            type: 'radio',
            options: this.item.optionsRadio,
            parent: contentModal,
        })

        this._createInputBoxes({
            type: 'checkbox',
            options: this.item.optionsCheck,
            parent: contentModal,
        })

        this.container.appendChild(contentModal)
        this.popup.classList.add('-open')

        return this
    }

    getCheckedItems() {
        let allChecked = Array.from(
            this.container.querySelectorAll('input:checked')
        )
        allChecked.forEach((el) => {
            this.checkedItems.push({
                value: el.value,
                description: el.getAttribute('data-description'),
            })
        })
        return this.checkedItems
    }

    destroy() {
        this.popup.classList.remove('-open')
        this.container.innerHTML = ''
        this.container = false
        this.checkedItems = []
        return this
    }

    // PRIVATE methods

    _createDropDown(parent) {
        let maxQuantity = 20
        let ddContainer = document.createElement('div')
        ddContainer.classList.add('dd-menu')
        let selectContainer = document.createElement('select')
        selectContainer.setAttribute('id', 'quantity')
        selectContainer.setAttribute('required', true)

        for (let i = 1; i <= maxQuantity; i++) {
            let dd = document.createElement('option')
            dd.setAttribute.value = i
            dd.innerText = i
            selectContainer.appendChild(dd)
        }
        ddContainer.innerText = 'Quantity: '
        ddContainer.appendChild(selectContainer)
        parent.appendChild(ddContainer)
    }

    _createInputBoxes(payload) {
        let options = payload.options
        if (options.length) {
            let container = document.createElement('div')
            container.classList = `${payload.type}-container`
            options.forEach((option) => {
                let el = document.createElement('div')
                el.classList = 'input'

                // create input element
                let inputElement = document.createElement('INPUT')
                inputElement.setAttribute('type', payload.type)
                inputElement.setAttribute('name', option.value)
                inputElement.setAttribute('value', option.value)
                inputElement.setAttribute('id', option.value)
                inputElement.setAttribute(
                    'data-description',
                    option.description
                )
                inputElement.checked = false
                inputElement.classList = payload.type

                // create its label
                let labelElement = document.createElement('label')
                labelElement.setAttribute('for', option.value)
                labelElement.classList = 'label'
                labelElement.innerText = option.description

                el.appendChild(inputElement)
                el.appendChild(labelElement)

                container.appendChild(el)
            })

            container.addEventListener('click', (evt) => {
                this._toggleCheckOfInput(evt, payload.type)
            })
            payload.parent.appendChild(container)
        }
    }

    _toggleCheckOfInput(evt, elType) {
        let boxSelected
        if (evt.target.tagName.toLowerCase() === 'input') {
            boxSelected = evt.target
        } else {
            let ancestor = this._findAncestor(evt.target, '.input')
            boxSelected = ancestor.querySelector(`.${elType}`)
        }
        if (elType === 'radio') {
            this._uncheckAllRadioButtons()
        }
        boxSelected.checked = !boxSelected.checked
        return boxSelected
    }

    _uncheckAllRadioButtons() {
        let radioButtons = Array.from(this.popup.querySelectorAll('.radio'))
        radioButtons.forEach((btn) => {
            btn.checked = false
        })

        return radioButtons
    }

    _findAncestor(el, sel) {
        while (
            (el = el.parentElement) &&
            !(el.matches || el.matchesSelector).call(el, sel)
        );
        return el
    }
}

export default PopupModal
