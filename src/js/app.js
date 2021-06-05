import '../css/styles.css'

import service from './service/service'
import store from './store/store'
import UI from './components/ui'

window.addEventListener('DOMContentLoaded', () => {
	const products = service.getAllProducts()
	store.setProducts(products)

	const ui = new UI(store, service)
	ui.render()
	ui.declareHandlers()
	ui.onHandler('click', 'addToCart')

	store.subscribe(() => {
		const state = store.getState('cart')
		const price = store.getState('totalPrice')

		ui.renderCart(state)
		ui.$totalPrice.textContent = price
		ui.$cartTotal.textContent = price
	})
})
