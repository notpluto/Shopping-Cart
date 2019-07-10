{let sizes = data.products.reduce((acc, val) => {
		return [...acc, ...val.availableSizes]}, [])
		let productSize = [...new Set(sizes)]