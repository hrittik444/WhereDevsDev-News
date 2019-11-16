import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NewsDetails.css';

class NewsDetails extends Component {
	render() {
		const {newsDetail} = this.props;
		return(
			<div className='NewsDetails row justify-content-center mt-5'>
				<div className='col-11 col-5-lg'>
					<div className='NewsDetails-card card'>
						<div className='card-body'>
							<h2 className='card-title'>{newsDetail.headline}</h2>
							<p className='card-subtitle text-muted'> <span>Source:<a href={newsDetail.source}>{newsDetail.source}</a></span> <span>Author: {newsDetail.author}</span> <span>Date: {newsDetail.date}</span></p>
							<hr/>
							<p>{newsDetail.content}</p>
						</div>
						<div className='card-body'>
							<Link className='btn btn-info' to='/news'>Go Back</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NewsDetails;