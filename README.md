# week-3-game

Super Hero Hangman!

Play hangman with your favorite superheros!!

Screenshots:

File Structure
--------------

![File Structure](/readme_images/file_structure.JPG?raw=true"file_structure.JPG") 

Login/Signup | Landing Page Nav Bar
-------------|---------------------
![Login/Signup Form Image](/readme_images/sign-in.jpg?raw=true"sign-in.jpg") | ![Landing Page Nav Bar](/readme_images/landing.jpg?raw=true"landing.jpg")

Pantry Page | Recipe Maker
-------------|---------------------
![Pantry Image](/readme_images/pantry.jpg?raw=true"pantry.jpg") | ![Recipe Maker](/readme_images/recipemaker.JPG?raw=true"recipemaker.JPG")


Technologies used:

HTML5
CSS3
Jquery
React.js
Express
Node
MySQL

Getting Started

Prerequisities:

What to install and how for local development and testing purposes

- node.js: visited node.js and downloaded
- mysql: npm install mysql
- express: visited express.js and downloaded
- react: visited react.js and downloaded
- react-bootstrap-select: visited npm package documentation and downloaded
- react-dom: visited npm package documentation and downloaded


Running the tests:

We created testing branches throughout our project for the API. 


Interesting Snippets of Code:

(For our Recipe maker page- React)

import React from 'react';

//import { Input } from 'react-bootstrap';
import Result from './Results';

class Form extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			term: "",
			results:[]
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);

	}
	setResults(results){
		this.setState({
			results: results
		})
	}
	setTerm(term){
		this.setState({
			term: term
		})
	}
	getSearchResults(){
		console.log("getSearchResults: ", this.state.term);

		this.props.setTerm(this.state.term);
		var self = this;
		var currentURL = window.location.origin;
		console.log(currentURL+ "/recipe/" + this.state.term)

		$.get( currentURL + "/recipe/" + this.state.term, function( data ) {
			console.log('data', data);
			if(data == false){
				$("#name").text(" No Recipes Found ");
				$("#stats").hide();
			}
			else {
				$("#stats").show();
				self.setState({
              		results: data
            	})
            	console.log('self.state.results', self.state.results);
			}
			
		})
	}
	handleChange(event){
		var newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
		
	}
	handleKeyDown(e) {
		if (e.key === 'Enter'){
			e.preventDefault()
			if (this.state.term){
      			this.getSearchResults();
      		}
    	}
  	}
	
	handleClick(){
		console.log("CLICK");
		if (this.state.term){
      			this.getSearchResults();
      		}	
	}	

	render(){
		return(
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title text-center"><strong>Ingredient</strong></h2>
					</div>
					<div className="panel-body text-center">

							<form id="form-recipe">

								<div className="form-group">
									<h4 className="text-center">
										<em>
											Enter an ingredient to search for a recipe (ex: "banana").
										</em>
									</h4>
					
									<input type="text" className="form-control text-center" id="term" 
										onKeyDown={this.handleKeyDown} 
										onChange= {this.handleChange} 
									required/>
									<br />
									<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
								</div>

							</form>
					</div>
				</div>

				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title"><strong>Recipe Result</strong></h2>
					</div>
					<div className="panel-body">
						<div id="stats">

							<ul>
								{this.state.results.map(function(result){
									return(
										<Result key={result.id} article={result} />
									)
								})}
							</ul>

						</div>
						
					</div>
				</div>

			</div>

		)
	}
}

export default Form;


Authors:

Padmaja Kondeti
Amreeta Choudhury
Stefanie Centi
Sudharshana Chavan

License:

This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments:

To our love for food and friendship

Black Rock Digital Business Casual Template- Bootstrap
