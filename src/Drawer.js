import React from 'react';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';

class Drawer extends React.Component {
	constructor(){
		super()
		this.state= {
			isCartClosed : false,
		}
	}

	handleCheckout = () => {
		alert("Checkout Price: " + this.props.cartItems.reduce(function (acc,obj) { return (acc += obj.products.price* obj.quantity);}, 0))
		// console.log(this.props.cartItems.map(item => console.log(item.products.price)))
	}
	handleCartEvent = () => {
		this.setState({isCartClosed: true})
	}
	handleRemove = (sku) => {
		this.props.dispatch({type: "REMOVE_FROM_CART", id: sku})
	}
	render(){
		var newArr = [...new Set(this.props.cartItems)]
		console.log(this.props)
		return (
			<React.Fragment>
				<div className="drawer-main">
					<div className="drawer-header"><img src="https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/bag-icon.png" className="cart-icon"/></div>
					 <button onClick={() => this.handleCartEvent()} className="close-cart"><span></span></button>
					<div style={{background:"yellow", borderRadius:"50%", color:"black", height:"20px", width:"20px"}} className="cart-length">{this.props.cartItems.quantity}</div>

					<ul className="cart-items">
					{
						this.props.cartItems.map(val => {
							return (
								<React.Fragment>
									<div className="items-parent">
										<div className="item-image"><img src={`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${val.products.sku}_2.jpg`} width="80px" height="100px"/></div>
										<div className="items-info">
											<span onClick={() => this.handleRemove(val.products.id)} className="remove-item">X</span>
											<div>{val.products.title}</div>
											<div style={{color: "#AFAEAE"}}>{val.products.availableSizes[0]} | {val.products.style}</div>
											<div style={{color: "#AFAEAE"}}>Quantity: {val.quantity}</div>
										</div>	
										<div style={{color: "yellow", fontWeight: "bold",}}>${val.products.price}</div>
									</div>
									<hr />
								</React.Fragment>
							)
						})
					}
					</ul>
					
					<div className="checkout">
						<div className="subtotal">
							<div>SUBTOTAL</div>
							<div className="total">${this.props.cartItems.reduce(function (acc,obj) { return (acc += obj.products.price* obj.quantity);}, 0)}</div>
						</div>
						<button className="drawer-btn" onClick={() => this.handleCheckout()}>Checkout</button>
					</div>
				</div>
			</React.Fragment>
			)
	}
}

function mapStateToProps(state) {
	return {
		cartItems: state.cart
	}
}

export default connect(mapStateToProps)(Drawer)