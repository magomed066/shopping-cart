import db from '../../assets/products.json'

class Service {
	constructor(db) {
		this.db = db
	}

	getAllProducts() {
		return this.db.items
	}

	getProductById(id) {
		return this.db.items.filter((item) => item.id === Number(id))
	}
}

const service = new Service(db)

export default service
