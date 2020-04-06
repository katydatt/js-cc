class Cart {
    constructor(el, currency) {
        this.container = el
        this.cart = {}
        this.cart.items = []
        this.cart.total = 0
        this.cart.currency = currency || 'HK$'
        this.itemWrapper = false
        this.totalDisplay = false
        this.checkoutBtn = false
        this.init()

        return this
    }

    init() {
        this.itemWrapper = document.createElement('div')
        this.itemWrapper.classList.add('cart-wrapper-items')
        this.container.appendChild(this.itemWrapper)

        this.totalDisplay = document.createElement('div')
        this.totalDisplay.classList.add('total-cart')
        this.container.appendChild(this.totalDisplay)

        let btnContainer = document.createElement('button')
        btnContainer.classList.add('button-container')

        this.checkoutBtn = document.createElement('button')
        this.checkoutBtn.classList.add('btn')
        this.checkoutBtn.innerText = 'Checkout'

        btnContainer.appendChild(this.checkoutBtn)
        this.container.appendChild(btnContainer)

        this._fillCart()
        this._addEventListener()
        return this
    }

    addItem(item, quantity) {
        item.quantityItemInCart = Number(quantity)
        this.cart.items.push(item)
        this.cart.total += item.price * quantity
        this._fillCart(item)
        return this
    }

    // updateItem(item) {
    // }

    // removeItem(item) {
    // }

    destroy() {
        this.container.removeChild(this.itemWrapper)
        this.cart = false
        this.cart.items = []
        this.cart.total = 0
        this.itemWrapper = false
        return this
    }

    // PRIVATE methods

    _fillCart(item) {
        if (item && item.quantityItemInCart > 0) {
            // as soon as I insert an element I make sure the initial state "empty" of the cart is updated
            let description = this.itemWrapper.querySelector('.cart-caption')
            let string = ''
            if (description) {
                this.itemWrapper.removeChild(description)
            }
            if (item.optionsSelected) {
                item.optionsSelected.forEach((opt, index) => {
                    let final =
                        index < item.optionsSelected.length - 1 ? ', ' : ')'
                    let init = index === 0 ? '(' : ''
                    string += `${init}${opt.description}${final}`
                })
            }
            // add actual item
            let itemLink = document.createElement('div')
            itemLink.innerHTML = `
                ${item.quantityItemInCart} x ${item.name} ${this.cart.currency} ${item.price}
            `
            itemLink.classList.add('item-added')

            let details = document.createElement('div')
            details.classList.add('details')
            details.innerText = string

            this.itemWrapper.appendChild(itemLink)
            this.itemWrapper.appendChild(details)
            this.checkoutBtn.removeAttribute('disabled')
            this._updateTotalCart()
        } else {
            // initial state of cart
            let description = document.createElement('P')
            description.classList.add('cart-caption')
            description.innerText = 'Your cart is empty...'
            this.itemWrapper.append(description)
            this.cart.total = 0
            this.checkoutBtn.setAttribute('disabled', true)
        }
        return this
    }

    _updateTotalCart() {
        this.totalDisplay.innerHTML = `Total: ${this.cart.currency} ${this.cart.total}`
        return this
    }

    _addEventListener() {
        this.checkoutBtn.addEventListener('click', (evt) => {
            evt.preventDefault()
            console.log('Ready to place the order')
        })
    }
}

export default Cart
