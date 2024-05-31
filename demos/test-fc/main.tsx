import { useState } from 'react';
import ReactDOM from 'react-dom/client';

// 对接vite的热更新机制
console.log(import.meta.hot);

function App() {
	const [num, setNum] = useState(100);
	window.setNum = setNum;
	return <div>{num}</div>;
}

function Child() {
	return <span>big react</span>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
