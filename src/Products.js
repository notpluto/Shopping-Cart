import React from 'react'; import styled from 'styled-components'; 
import {connect } from 'react-redux';
import Loading from './Loading';

const Wrapper = styled.div `
	margin: 0 auto;
	max-width: 1000px;
`
const ItemCard = styled.div`
	display: grid;
	margin-top: 1rem;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(4, 1fr);
	grid-gap: 20px;
	padding: 10px;
`
const ItemImage = styled.img`
	width: 220px;
	height: 300px;
	`
const Button = styled.button`
	margin: 20px;
	padding: 10px;
	background: black;
	width: 12rem;
	font-size: 1rem;
	font-weight: bold;
	color: #fff;
	outline: 0;
	border: none;
	cursor: pointer;
	`
class Products extends React.Component {
	state = {
		isLoading: true,
	}
	componentDidMount = () => {
		this.state.isLoading = false
		fetch('https://react-shopping-cart-67954.firebaseio.com/products.json')
		.then(res => res.json())
		.then(data => {
			this.props.dispatch({type: "ADD_PRODUCTS", products: data.products})
		})
		// .then(({products}) => this.setState({shop: products}))
	}

	handleChange = (e) => {
		(e.target.value === "ascending") ? this.props.dispatch({type: "LOW_TO_HIGH"}) : this.props.dispatch({type: "HIGH_TO_LOW"})
	}

	handleCart = (products) => {
		this.props.dispatch({type:"ADD_TO_CART", products})
	}
	render() {
		let filterSizes = this.props.sizes.filter(size => size.isClicked === true).map(val => val.size)
		let filteredProd = this.props.products.filter((product, i) => {
			return product.availableSizes.some(size => filterSizes.includes(size)) 
		})
		// console.log(filterSizes)
		// console.log(filteredProd)
		return (
			<React.Fragment>
			{ this.state.isLoading ? <Loading /> : 
				<Wrapper>
					<div className="sort-list">
						<div>{this.props.products.length} Product(s) found</div>
						<div style={{marginRight: "40px"}}>
							<label>Order by </label>
							<select id="item-sort" onChange={(e) => this.handleChange(e)}>
			    			<option value="">Select</option>
			   				<option value="ascending">Lowest to highest</option>
			    			<option>Highest to lowest</option>
			    		</select>
			    	</div>
			    </div>
					<ItemCard>
						{ 
							(filteredProd.length) ?
								filteredProd.map((v, i) => { 
									return(
										<div className="light" key={i}>
										<span>{v.isFreeShipping ? <button className="shipping">Free Shipping</button> : null}</span>
										<ItemImage src= {`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${v.sku}_1.jpg`} /> 
										<div className="title">{v.title}</div>
										<hr style={{width: "10%", background: "red"}}/>
										<div style={{textAlign:"center"}}>${(v.price).toFixed(2)}</div>
										<div style={{color: "#9c9b9b", fontSize: "14px", fontWeight: "bold", textAlign: "center", padding: "10px"}}>or ${v.installments} x {(v.price/v.installments).toFixed(2)}</div>
										<Button onClick={()=>this.handleCart(v)} className="addCart"> Add to cart </Button>
										</div>
									)}
								)
							:
							this.props.products.map((v, i) => { 
								return(
										<div className="light" key={i}>
										<span>{v.isFreeShipping ? <button className="shipping">Free Shipping</button> : null}</span>
										<ItemImage style={{marginTop: "10px"}} src= {`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${v.sku}_1.jpg`} /> 
										<div className="title">{v.title}</div>
										<hr style={{width: "10%", background: "red"}}/>
										<div style={{textAlign:"center"}}>${(v.price).toFixed(2)}</div>
										<div style={{color: "#9c9b9b", fontSize: "14px", fontWeight: "bold", textAlign: "center", padding: "10px"}}>or ${v.installments} x {(v.price/v.installments).toFixed(2)}</div>
										<Button onClick={()=>this.handleCart(v)} className="addCart"> Add to cart </Button>
										</div>			
								)}
							)
							}	
					</ItemCard>
				</Wrapper> 
			}
			</React.Fragment>
		)
	}
}

function mapStateToProps (state) {
	return {
		products: state.products,
		sizes: state.sizes,
	}
}


export default connect(mapStateToProps)(Products);