import React from 'react';
import Products from './Products';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
	display: flex;
	margin-left: 40px;
	`
const SideMain = styled.div`
	margin-left: 60px;
	`
const Size = styled.span`
	border-radius: 50%;
	height: 18px;
	width: 18px;
	background: #ECECEC;
	display: inline-block;
	padding: 10px;
	font-size: 10px;
	text-align: center;
	margin-right: 10px;
	margin-top: 10px;
	`
class Sizes extends React.Component {

	componentDidMount = () => {
		fetch('https://react-shopping-cart-67954.firebaseio.com/products.json')
		.then(res => res.json())
		.then(data => {let sizes = data.products.reduce((acc, val) => {
		return [...acc, ...val.availableSizes]}, [])
		let productSize = [...new Set(sizes)]
		// console.log(productSize);
		this.props.dispatch({
			type: "ADD_SIZES", 
			sizes: productSize.map(s => ({
				size: s,
				isClicked: false,
			})
		)
	})
		})	
	}

	handleClick = (size) => {
			this.props.dispatch({type: 'TOGGLE_SIZES', currentSize: size})
		}

	render(){
		return(
			<React.Fragment>
				<Wrapper>
					<SideMain>
						<div><strong>Sizes:</strong></div><br />
						{
							this.props.sizes.map((d, i) => <div key={i} className="size-container"><button className="btn-size" onClick={() => this.handleClick(d.size)} className="product-size">{d.size}</button></div>)
						}
					</SideMain>
					<Products />
				</Wrapper>
			</React.Fragment>
		)
	}
}

function sizefunc(state) {
	return {
		sizes: state.sizes
	}
}

export default connect(sizefunc)(Sizes)