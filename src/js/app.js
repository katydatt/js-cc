import Cart from './cart'
import menu from '../data/menu.json'
import PopupModal from './popupModal'

window.addEventListener('load', () => {
    // variables
    let popup = false
    let isModalOpen = false
    let itemSelected = false
    let itemsData = menu.items

    // html elements
    let cartHTML = document.getElementById('cart')
    let listWrapper = document.querySelector('.list-items')
    let modalContainer = document.getElementById('modal')
    let modalContent = modalContainer.querySelector('.modal-content')
    let wrapper = document.querySelector('.wrapper-view')

    // creating the cart
    let cart = new Cart(cartHTML)

    // ===============================

    // event listeners
    listWrapper.addEventListener('click', (evt) => {
        let itemsHtml = Array.from(listWrapper.children)
        let elementSelected = findAncestor(evt.target, '.item-container')
        let index = itemsHtml.indexOf(elementSelected)
        openModal(itemsData[index])
    })

    modalContainer.addEventListener('click', (evt) => {
        evt.preventDefault()
        if (evt.target.tagName.toLowerCase() === 'button') {
            let action = evt.target.getAttribute('data-action')
            return action === 'cancel'
                ? closeModal()
                : addToBasket(itemSelected)
        }
    })
    // ===============================

    const openModal = (item) => {
        isModalOpen = true
        itemSelected = item
        let options = {
            parent: modalContainer,
            selector: modalContent,
            item: itemSelected,
        }
        popup = new PopupModal(options)
        wrapper.classList.add('-disable')
        modalContainer.classList.add('-open')
    }

    const closeModal = () => {
        if (isModalOpen) {
            isModalOpen = false
            itemSelected = false
            wrapper.classList.remove('-disable')
            popup.destroy()
        }
    }

    const addToBasket = (item) => {
        let checkedItems
        if (popup) {
            checkedItems = popup.getCheckedItems()
        }
        item.optionsSelected = checkedItems
        let quantityDropDown = document.getElementById('quantity')
        let quantitySelected =
            quantityDropDown.options[quantityDropDown.selectedIndex].value
        cart.addItem(item, quantitySelected)
        closeModal()
    }

    // ===============================

    // helpers
    const findAncestor = (el, sel) => {
        while (
            (el = el.parentElement) &&
            !(el.matches || el.matchesSelector).call(el, sel)
        );
        return el
    }
})
