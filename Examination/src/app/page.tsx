
import React from "react";
import Features from '../components/features';
import Footer from '../components/footer';
import Header from "../components/header";	
import Background from '../components/background';

const App = () => {
	return (
		
	
		<div className="relative min-h-screen">
		  <Background />
		  <div className="relative z-10 flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">
			  <Features />
			</main>
			<Footer />
		  </div>
		</div>
	);
};

export default App;
