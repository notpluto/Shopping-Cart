import { combineReducers } from 'redux';
import {reducer, sizes, sortProducts, cart} from './reducers/redux';

export const root = combineReducers({
	products: reducer,
	sizes,
	cart
})