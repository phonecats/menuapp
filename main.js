

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

class Item extends React.Component {
  /*:
    Ex: <ItemComponent item = {element}  addToCart = {() => this.addToCart(dataItems[index].itemID)} />
    element => name, imgURL, price
    addToCart = addToCart()  
  */
  render(){
    return(
    <div className = "col-sm-6">
        <h3> {this.props.item.name}</h3>
      </div>
    )
  }
}



class Appetizers extends React.Component{
	render(){

		//Create array of Components ready for Rendering
		var appetizersArray = []; //blank initially
		this.props.appetizersArray.forEach((element,index) => {
			appetizersArray.push(<Item item={element} />)}) ;
		//

		return( 
				<div> 
					<h2>Appetizers</h2>
					{appetizersArray}				
				 </div>
			)
	}
}

class Menu extends React.Component{


	render(){
		//Code below handles sorting the data and creating
		//new array with only appetizer objects
		var appetizersArray=[];
		this.props.items.forEach((element,index)=>{
			if (element.category=="Appetizer"){
				appetizersArray.push(element)
				console.log(element.name)
				}
		})
		//

		return(
			<div>
				<h1> Menu Component</h1>
				{ <Appetizers appetizersArray={appetizersArray} />}
			</div>
			)
		}
	}

//ITEMS from main data base
class App extends React.Component{
	

	render(){

		var oscar = 1;
			return(
			<div>
				{<Header />}
				{<Menu items={ITEMS}/> } 

			</div>
			)
	}
}

//DATA
const ITEMS = [
    {
  itemID: 1,
  name:"Item 1",
  imgURL: "https://placehold.it/300",
  price: 7.99,
  isFeatured: false,
  category: "Appetizer"
    },
  {
    itemID: 2,
  name: "Item 2",
  imgURL: "https://placehold.it/300",
  featuredImgURL: "https://placehold.it/200",
  price: 19.99,
   isFeatured: true,
   category: "Drink"
},
  {
    itemID: 3,
    name: "Item 3",
    price: 50,
      featuredImgURL: "https://placehold.it/200",
    imgURL: "https://placehold.it/300x300",
    category: "Appetizer"
  },
  {
    itemID: 4,
    name: "Item 4",
    imgURL: "https://placehold.it/300",
    price: 25,
    featuredImgURL: "https://placehold.it/230",
    isFeatured: true,
    category: "Main Dish"
  }
  
]
//END OF DATA.


ReactDOM.render(
  <App />,
  //WHERE TO RENDER VIRTUAL DOM
  document.getElementById('root')
);