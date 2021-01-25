import './App.css';
import { useEffect, useState } from 'react';
import {
	initSocket,
	disconnectSocket,
	sendColor,
	subscribeToColor,
	subscribeInitColor,
} from './socketService';

function App() {
	const [color, setColor] = useState('#6495ED');

	const submitHandler = (e) => {
		e.preventDefault();
		sendColor(color);
	};

	useEffect(() => {
		initSocket();

		subscribeInitColor((data) => {
			console.log('color from redis logged in react', data);
			setColor(data);
		});

		subscribeToColor((color) => {
			setColor(color);
		});
		return () => disconnectSocket();
	}, []);

	return (
		<div style={{ backgroundColor: `${color}` }} className="App">
			<form onSubmit={submitHandler}>
				<input onChange={(e) => setColor(e.target.value)} type="color" value={color} name="color" />
				<button>Change color</button>
				<p>Selected color is: {color}</p>
			</form>
		</div>
	);
}

export default App;
