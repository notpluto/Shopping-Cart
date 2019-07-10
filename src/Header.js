import React from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import Drawer from './Drawer';
import {connect} from 'react-redux';

const Head = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0;
	cursor: pointer;
`
class Header extends React.Component {
	constructor(){
		super()
		this.state= {
			isCartOpen : false,
		}
	}
	handleCartButton = () => {
		console.log(this)
		this.setState({isCartOpen: !this.state.isCartOpen})
	}
	render() {
		return (
			<React.Fragment>
				<Head>
				<FontAwesome className= "fab fa-github" size="3x" style={{}} name="icon"/>
				<button onClick={() =>this.handleCartButton()}><FontAwesome className= "fas fa-cart-arrow-down" size="4x" style={{}} name="shop-icon"/></button>
				{
					this.state.isCartOpen ? <Drawer /> : ""
				}
				</Head>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		cartItems: state.cart
	}
}

export default connect(mapStateToProps)(Header)