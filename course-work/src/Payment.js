import React, {useEffect, useState} from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link, useNavigate} from 'react-router-dom';
import {CardElement,useElements, useStripe} from "@stripe/react-stripe-js";
import {getBasketTotal} from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();


	const history = useNavigate();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState();

	useEffect(()=>{
		const getClientSecret = async () => {
			const response = await axios({
				method:'post',
				url:`/payments/create?total=${(getBasketTotal(basket)*100)}`
			});
			setClientSecret(response.data.clientSecret)

		};
		getClientSecret();
	},[basket])

	console.log('THE SECRET IS>>>', clientSecret)
	console.log('👨', user)

	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);
		console.log("here");
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		}).then(({ paymentIntent }) => {
			
			db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

			setSucceeded(true);
			setError(null);
			setProcessing(false);
			history('/orders');
			
			dispatch({
				type: 'EMPTY_BASKET'
			})


			// history('/payment', { replace: true })
			//history.replace('/orders')
		})

	}




	const handleChange = e => {

		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");



	}

	return (
		<div className='payment'>
			<div className='payment_container'>
			<h1>
				Checkout (
					<Link to="/checkout">{basket?.length} items </Link>
				)
			</h1>
				<div className='payment_section'>
					<div className='payment_title'>
						<h3>Review items and delivery</h3>
					</div>
					<div className='payment_items'>
						{basket.map(item => (<CheckoutProduct
							id = {item.id}
							title = {item.title}
							image = {item.image}
							price = {item.price}
							rating = {item.rating}
						/>
						))}
					</div>
				</div>
				<div className='payment_section'>
					<div className='payment_title'>
						<h3>Payment Method</h3>
					</div>
					<div className='payment_details'>
						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange}/>

							<div className='payment_priceContainer'>
								<CurrencyFormat
									renderText={(value)=>(
											<h3>Order Total: {value}</h3>
									)}
									decoimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>

							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Payment;