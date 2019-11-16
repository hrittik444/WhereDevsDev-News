import React, {Component} from 'react';
import Routes from './Routes';
import Navbar from './Navbar';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [
				{
					id: 1,
					headline: '',
					image: '',
					source: '',
					author: '',
					date: '',
					content: ''
				}
			]
		}
	}
	static defaultProps = {
		news: []
	}

	componentDidMount(){
		// default port for server: 3001
		const SERVER_PORT = 3001;
		const serverUrl = `http://localhost:${SERVER_PORT}/news/postreview`;
		fetch(serverUrl)
		.then(res => res.json())
		.then(news => news.forEach(n => (
			this.setState({news})
		)))
	}

	render() {
		const {news} = this.state;
		let stories = news.map(n => {
			return {
				id: n._id, 
				headline: n.title, 
				image: n.urlToImage, 
				source: n.url, 
				author: n. author, 
				date: n.updatedAt , 
				content: n.content
			}
		})
		return(
			<div>
				<Navbar />
				{/* container */}
				<div className='container mt-5'>
					<Routes news={stories}/>
				</div>
				{/* container */}
			</div>
		);
	}
}

export default App;

