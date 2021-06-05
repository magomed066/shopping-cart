class UI {
	constructor(store, service) {
		this.store = store
		this.service = service

		this.products = store.getState('products')

		this.$totalPrice = document.querySelector('.item__total')
		this.$container = document.querySelector('.product__center')
		this.$cartContainer = document.querySelector('.cart__centent')
		this.$cart = document.querySelector('.cart')
		this.$cartBtn = document.querySelector('.cart__icon')
		this.$carCloseBtn = document.querySelector('.close__cart')
		this.$cartOverlay = document.querySelector('.cart__overlay')
		this.$cartTotal = document.querySelector('.cart__total')
		this.$clearCart = document.querySelector('.clear__cart')

		this.show = this.show.bind(this)
		this.hide = this.hide.bind(this)
		this.onCartHandler = this.onCartHandler.bind(this)
		this.onClearHandler = this.onClearHandler.bind(this)
	}

	show() {
		this.$cart.classList.add('show')
		this.$cartOverlay.classList.add('show')
	}
	hide() {
		this.$cart.classList.remove('show')
		this.$cartOverlay.classList.remove('show')
	}

	render() {
		let fragment = ''

		this.products.forEach(({ title, price, image, id }) => {
			fragment += `
                <div class="product" data-id=${id}>
                    <div class="image__container">
                        <img src=${image} alt="" />
                    </div>
                    <div class="product__footer">
                        <h1>${title}</h1>
                        <div class="rating">
                            <span>
                                <svg>
                                    <use
                                        xlink:href="./images/sprite.svg#icon-star-full"
                                    ></use>
                                </svg>
                            </span>
                            <span>
                                <svg>
                                    <use
                                        xlink:href="./images/sprite.svg#icon-star-full"
                                    ></use>
                                </svg>
                            </span>
                            <span>
                                <svg>
                                    <use
                                        xlink:href="./images/sprite.svg#icon-star-full"
                                    ></use>
                                </svg>
                            </span>
                            <span>
                                <svg>
                                    <use
                                        xlink:href="./images/sprite.svg#icon-star-full"
                                    ></use>
                                </svg>
                            </span>
                            <span>
                                <svg>
                                    <use
                                        xlink:href="./images/sprite.svg#icon-star-empty"
                                    ></use>
                                </svg>
                            </span>
                        </div>
                        <div class="bottom">
                            <div class="btn__group">
                                <a href="#" class="btn addToCart"
                                    >Add to Cart</a
                                >
                                <a href="#" class="btn view">View</a>
                            </div>
                            <div class="price">$${price}</div>
                        </div>
                    </div>
                </div>
            `
		})

		this.$container.insertAdjacentHTML('beforeend', fragment)
	}

	renderCart(cart = []) {
		let fragment = ''
		cart.forEach(({ title, price, image, id, qwt }) => {
			fragment += `
                <div class="cart__item" data-id=${id}>
                    <img src=${image} alt="" />
                    <div>
                        <h3>${title}</h3>
                        <h3 class="price">$${price}</h3>
                    </div>
                    <div>
                        <span>
                            <svg class="addUpProduct">
                                <use
                                    xlink:href="./images/sprite.svg#icon-angle-up"
                                ></use>
                            </svg>
                        </span>
                        <p>${qwt}</p>
                        <span>
                            <svg class="addDownProduct">
                                <use
                                    xlink:href="./images/sprite.svg#icon-angle-down"
                                ></use>
                            </svg>
                        </span>
                    </div>

                    <div>
                        <span>
                            <svg class="remove__item">
                                <use
                                    xlink:href="./images/sprite.svg#icon-trash"
                                ></use>
                            </svg>
                        </span>
                    </div>
                </div>
            `
		})

		this.$cartContainer.innerHTML = ''
		this.$cartContainer.insertAdjacentHTML('beforeend', fragment)
	}

	onCartHandler(e) {
		e.preventDefault()

		const target = e.target

		if (target.classList.contains('addUpProduct')) {
			const parent = target.closest('.cart__item')
			const id = parent.getAttribute('data-id')

			const [product] = this.service.getProductById(id)

			this.store.setCartProduct(product)
		} else if (target.classList.contains('addDownProduct')) {
			const parent = target.closest('.cart__item')
			const id = parent.getAttribute('data-id')

			this.store.removeFromCart(id)
		} else if (target.classList.contains('remove__item')) {
			const parent = target.closest('.cart__item')
			const id = parent.getAttribute('data-id')

			this.store.removeEmmidiately(id)
		}
	}

	onClearHandler(e) {
		e.preventDefault()

		const target = e.target

		if (target.classList.contains('clear__cart')) {
			this.store.clearAllCart()
		}
	}

	declareHandlers() {
		this.$cartBtn.addEventListener('click', this.show)
		this.$carCloseBtn.addEventListener('click', this.hide)
		this.$cartContainer.addEventListener('click', this.onCartHandler)
		this.$clearCart.addEventListener('click', this.onClearHandler)
	}

	onHandler(event, className) {
		this.$container.addEventListener(event, (e) => {
			e.preventDefault()

			const target = e.target

			if (target.classList.contains(className)) {
				const parent = target.closest('.product')
				const id = parent.getAttribute('data-id')

				const [product] = this.service.getProductById(id)

				this.store.setCartProduct(product)
			}
		})
	}
}

export default UI
