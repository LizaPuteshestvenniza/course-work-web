import React from 'react';
import './Home.css';
import fone from './backgr.png';
import Product from "./Product";
import photo1 from './iphone_case1.png';
import photo2 from './airpods.jpeg';
import photo3 from './magSafe.jpeg';
import photo4 from './photo4.jpeg';
import photo5 from './photo5.jpeg';
import photo6 from './photo6.jpeg';

function Home() {
	return (
		<div className='home'>
			<div className='home_container'>
				<img className='home_image' src={fone} alt="" />
				<div className='home_row'>
					<Product 
						title="Case for iPhone 12 & iPhone 12 Pro. Display size: 6.1 inches.Compatible with iPhone 12 & iPhone 12 Pro."
						price={3.5}
						image={photo1}
						rating={5}
					/>
					<Product 
						title="Apple AirPods (2nd Generation) Wireless Earbuds with Lightning Charging Case Included. Over 24 Hours of Battery Life, Effortless Setup. Bluetooth Headphones for iPhone"
						price={250}
						image={photo2}
						rating={5}
					/>
				</div>
				<div className='home_row'>
					<Product 
						title="Apple MagSafe Charger - Wireless Charger with Fast Charging Capability, Type C Wall Charger, Compatible with iPhone and AirPods"
						price={154.5}
						image={photo3}
						rating={5}
					/>
					<Product 
						title="Apple USB-C to Lightning Cable (1 m). Connect your iPhone, iPad, or iPod with Lightning connector to your USB-C or Thunderbolt 3 (USB-C) enabled Mac for syncing and charging, or to your USB-C enabled iPad for charging."
						price={17.95}
						image={photo4}
						rating={5}
					/>
					<Product 
						title="TALK WORKS Adjustable Cell Phone Desk Mount Compatible w/ iPhone 13/13 Pro/13 Pro Max/14/14 Plus/14 Pro/14 Pro Max - Flexible Stand for Office, Home, Tabletop (White)"
						price={10.7}
						image={photo5}
						rating={5}
					/>
				</div>
				<div className='home_row'>
					<Product 
						title="Razer Kishi Mobile Game Controller / Gamepad for iPhone iOS: Works with most iPhones – X, 11, 12, 13, 13 Max - Apple Arcade, Amazon Luna, Google Stadia - Lightning Port Passthrough - MFi Certified"
						price={89.97}
						image={photo6}
						rating={5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;