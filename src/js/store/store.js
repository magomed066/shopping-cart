class Store {
	constructor() {
		this.products = []
		this.cart = []
		this.subsricers = []
		this.totalPrice = 0
	}

	setProducts(products) {
		this.products = [...this.products, ...products]
		this.subsricers.forEach((cb) => cb())
	}

	setCartProduct(product) {
		const idx = product.id

		const itemExist = this.cart.findIndex((x) => x.id === idx)

		if (itemExist >= 0) {
			const itemInState = this.cart.find((x) => x.id === idx)
			const newProduct = {
				...itemInState,
				qwt: ++itemInState.qwt,
			}

			this.cart = this.cart.map((item) =>
				item.id === itemInState.idx ? newProduct : item,
			)

			this.totalPrice = Number(this.totalPrice) + Number(newProduct.price)
		} else {
			const item = this.products.find((x) => x.id === idx)
			const newItem = {
				...item,
			}

			this.cart = [...this.cart, newItem]

			this.totalPrice = this.totalPrice + newItem.price
		}

		this.subsricers.forEach((cb) => cb())
	}

	removeFromCart(id) {
		// const idx = product.id

		const itemExist = this.cart.find((x) => x.id === Number(id))

		if (itemExist.qwt > 1) {
			const itemInState = this.cart.find((x) => x.id === Number(id))
			const newProduct = {
				...itemInState,
				qwt: --itemInState.qwt,
			}

			this.cart = this.cart.map((x) =>
				x.id === itemInState.id ? newProduct : x,
			)

			this.totalPrice = Number(this.totalPrice) - Number(newProduct.price)
		} else {
			const product = this.cart.find((x) => x.id === Number(id))
			this.totalPrice = this.totalPrice - product.price

			this.cart = this.cart.filter((x) => x.id !== Number(id))
		}

		this.subsricers.forEach((cb) => cb())
	}

	removeEmmidiately(id) {
		const product = this.cart.find((x) => x.id === Number(id))
		this.totalPrice = this.totalPrice - product.price * product.qwt

		this.cart = this.cart.filter((x) => x.id !== Number(id))

		this.subsricers.forEach((cb) => cb())
	}

	clearAllCart() {
		this.cart = []
		this.totalPrice = 0
		this.subsricers.forEach((cb) => cb())
	}

	subscribe(callbacl) {
		this.subsricers.push(callbacl)
	}

	getState(item) {
		return this[item]
	}
}

const store = new Store()

export default store
