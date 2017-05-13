//Oscar Chavez April 2017
//ReactJS, Bootstrap CSS, Stripe.

var React = require('react');
var ReactDOM = require('react-dom');


``

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
      <a className="navbar-brand" href="#">Jalisco's</a>
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
  	var order={};


  	function order(){

  	}
  
  	//////////////////////////////////////////////////i left off here.
  	//still trying to submit order details in order processing.
    return(
    <div className = "col-sm-6">
        <h3> {this.props.item.name}</h3>
        
        Quantity <input type="text" name="name"></input>
        

        <button onClick={() =>this.props.addToCart()}> Add to Cart </button>
      </div>
    )
  }
}

class ShoppingCart extends React.Component{


	render(){
		var totalPrice = 0;
		
		return(
			<div> 
				<h2> Shopping Cart </h2>
				{console.log(this.props.items[0].name)}
				<h3> Total : </h3>
			</div>

`	`			)
	}
}

class Menu extends React.Component{
	constructor(){
		super();
		this.state = {
			virtualShoppingCart: []
		}
	}

	//belongs to itemObject to handle click21
	addToCart(element){
		console.log(element)
	}


	render(){

		//*Current Order

		//*Appetizers
		//Code below handles sorting the data and creating
		//new array with only appetizer objects
		var appetizersArray=[];
		this.props.items.forEach( (element,index)=>{
			if (element.category=="Appetizer"){
				appetizersArray.push(
					<Item item={element}
				   			addToCart = {
				   					()=> this.addToCart(element)
				   					}
				   			 />);

				   			}

			});
		//
		//*Main Dishes
		var mainDishArray = [];
		this.props.items.forEach((element, index) => {
			if(element.category=="Main Dish"){
				mainDishArray.push(<Item item={element} />)
			}
		})
		//
		//*Drinks
		var drinksArray = [];
		this.props.items.forEach((element,index) =>{
			if (element.category=="Drink"){
				drinksArray.push(<Item item={element} />)
			}
		})

		return(
			<div>
				<h1> Menu Component</h1>
				{/*Conditional rendering of shopping Cart*/}
				{this.state.virtualShoppingCart.length > 0 ? (
					<ShoppingCart items={this.state.virtualShoppingCart} />
					) : ("")}

				<h2> Appetizers </h2>
				{appetizersArray}
				<h2> Main Dishes </h2>
				{mainDishArray} 
				<h2> Drinks </h2>
				{drinksArray}
				<h2> Order Details </h2>
			</div>
			)
		}
	}

//ITEMS from main data base
class App extends React.Component{
	

	render(){
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
  itemID: 1001,
  name:"Item 1",
  imgURL: "https://placehold.it/300",
  price: 7.99,
  isFeatured: false,
  category: "Appetizer"
    },
  {
    itemID: 1002,
  name: "Item 2",
  imgURL: "https://placehold.it/300",
  featuredImgURL: "https://placehold.it/200",
  price: 19.99,
   isFeatured: true,
   category: "Drink"
},
  {
    itemID: 1003,
    name: "Item 3",
    price: 50,
      featuredImgURL: "https://placehold.it/200",
    imgURL: "https://placehold.it/300x300",
    category: "Appetizer"
  },
  {
    itemID: 1004,
    name: "Item 4",
    imgURL: "https://placehold.it/300",
    price: 25,
    featuredImgURL: "https://placehold.it/230",
    isFeatured: true,
    category: "Main Dish"
  },
  {
  	itemID: 1005,
  	name: "Beef Fajitas",
  	price: 11.99,
  	category: "Main Dish"
  }
  
]
//END OF DATA.


ReactDOM.render(
  <App />,
  //WHERE TO RENDER VIRTUAL DOM
  document.getElementById('root')
);