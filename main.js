

import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component{
	render(){
		return(
<nav className="navbar navbar-default">
  <div className="container-fluid">
  
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Menu App</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><a href="#">Appetizers <span className="sr-only">(current)</span></a></li>
        <li><a href="#">Shopping Cart</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#">Sign In</a></li>
      </ul>
    </div>
  </div>
</nav>
			)
	};
} // end of header component


class Appetizers extends React.Component{
	render(){
		return( 
				<div> 
					<h2>Appetizers</h2>
				 </div>
			)
	}
}

class Menu extends React.Component{
	render(){
		return(
			<div>
				<h1> Menu </h1>
				{<Appetizers />}
				
			</div>
			)
		}
	}

class App extends React.Component{
	render(){
		return(
			<div>
				{<Header />}
				{<Menu />}
			</div>
			)
	}
}

ReactDOM.render(
  <App />,
  //WHERE TO RENDER VIRTUAL DOM
  document.getElementById('root')
);