import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NewsList from './NewsList';
import NewsDetails from './NewsDetails';

class Routes extends Component {
	render() {
		const getNews = props => {
			let id = props.match.params.id;
			let newsDetail = this.props.news.find(n => n.id == id);
			return <NewsDetails {...props} newsDetail={newsDetail} />;
		};

		return (
			<Switch>
				<Route exact path='/news' render={() => <NewsList newsItems={this.props.news} />} />
				<Route exact path='/news/:id' render={getNews} />
				<Redirect to='/news'/>
			</Switch>
		);
	}
}

export default Routes;