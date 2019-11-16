import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NewsList.css'

class NewsList extends Component {
	render() {
		const NewsItems = this.props.newsItems.map(n => (
			<div className='NewsList-newsitem col-lg-12 justify-content-center mt-3' key={n.id}>
				<div className="card mb-3" >
					<div className="row no-gutters" >
						<div className="col-md-4" >
							<img src={n.image} className="card-img" alt={n.headline} style={{marginTop: '10px'}}/>
						</div>
						<div className="col-md-8" >
							<div className="card-body" >
							<h3 className="card-title"><Link style={{color: 'black'}} to={`/news/${n.id}`}>{n.headline}</Link></h3>
							<p className='card-subtitle text-muted'> <span>Source: <a href={n.source}>{n.source}</a></span> <span>Author: {n.author}</span> <span>Date: {n.date}</span></p>
							<hr/>
							<p className="card-text">{n.content}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)); 
		return(
			<div className='NewsList' style={{marginBottom: "100px", paddingBottom: "50px"}}>
				<div className='row'  style={{marginBottom: "100px", paddingBottom: "50px"}}>
					{NewsItems}
				</div>
			</div>
		);
	}
}

export default NewsList;