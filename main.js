
//Oscar Chavez April 2017
//ReactJS, Bootstrap, jQuery, Babel, Webpack, 
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
      <a className="navbar-brand" href="#">The Ranch House Cafe</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li><a  href="#">Menu </a></li>
        <li><a href="#"></a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#"></a></li>
      </ul>
    </div>
  </div>
</nav>
			)
	};
} // end of header component

class ItemShoppingCart extends React.Component{
	render(){

		return(
			 <div className = "col-sm-4">
        	<h3 className="text-center"> {this.props.item.name}</h3>
        	<img className="img-fluid" src={this.props.item.imgURL}/> 

        	<h3> Qty:{this.props.item.quantity}</h3>
        </div>
			)
	}
}
class Item extends React.Component {
  
  /*:
    Ex: <ItemComponent item = {element}  addToCart = {() => this.addToCart(dataItems[index].itemID)} />
    element => name, imgURL, price
    addToCart = addToCart()  
  */
  constructor(props){
  	super(props);
  	this.handleQuantityButton = this.handleQuantityButton.bind(this)
  	this.state = this.props.item;
 
  }//end constructor

  handleQuantityButton(n){
  	this.setState({
  		quantity: n
  	})
  }

  //this bad boy lifts state up to menu component
  handleAddToCart(){
  	if (this.state.quantity > 0){
  		this.props.addToCart(this.state);	
  	}
  }

  render(){
    return(
    <div className = "col-sm-4">
        <h3> {this.props.item.name}</h3>
        <img className="img-fluid" src={this.props.item.imgURL}/> 
        <div className="dropdown">
	  		<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 
	  			Quantity
	    		<span className="caret"></span>
	  		</button>
			  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
			    <li><button className="btn btn-default" onClick={()=>this.handleQuantityButton(1)} > 1 </button></li>
			    <li> <button className="btn btn-default" onClick={()=>this.handleQuantityButton(2)} > 2 </button> </li>
			    <li><button className="btn btn-default" onClick={()=>this.handleQuantityButton(3)} > 3 </button>   </li>  
			  </ul>
		</div>
		<button onClick={()=>this.handleAddToCart()}> Add to Cart</button>
   		
    </div>
   )//end of return
  }
}

class Payment extends React.Component{
	render(){
		return(
			<div>
				<h2> Billing Info</h2>
				First Name: <input type="text" />
				Last Name: <input type="text" />
				CC: <input type="text" />
			</div>
			)
	}
}

class ShoppingCart extends React.Component{
	//ShoppingCart is responsible for rendering the items
	//in the shopping cart, with the ability to remove from it.
	//it also has a button that when pressed,
	//the payment collection component is renderered

	constructor(props){
		super();
		this.state ={
			paymentToggle: false,
		}
	}

	calculateSum(){
		var sum=0;
		for (var i =0 ; i <this.props.order.length; i++){
			sum = sum + this.props.order[i].price
			}
		return sum
	}


	paymentToggleController(){
		console.log("checkout button pressed")
		if (this.state.paymentToggle == false){
			this.setState({
				paymentToggle: true,
			})
		} else {
			this.setState({
				paymentToggle: false,
			}) 
		}

	}

	paymentRender(){
		return <Payment />
	}

	render(){
		//get local copy of order
		var Order = this.props.order;
		//array will contain ItemShoppingCart components
		var orderList = []
		Order.forEach((element,index) => {
			orderList.push(<ItemShoppingCart item={element} />)
		})

		//the sum of the total order
		var sum = this.calculateSum();

		return(
			<div className="container">
				<div className="row">
					<h1>ShoppingCart</h1>
					{orderList}
				</div>
				<div className="row">
					<h2> Total: {sum}</h2>

					<button onClick={()=>this.paymentToggleController()}> Checkout </button>
					{this.state.paymentToggle ? this.paymentRender(): ""}
					
				</div>
				</div>
			)
	}
}

class Menu extends React.Component{
	constructor(props){
		super();
		this.state = {
			virtualOrder: []
		}
	}

	addToCart(item){
		this.setState((prevState) => ({
			virtualOrder: prevState.virtualOrder.concat([item])
		}))
	}

	render(){
	
		var activeOrder = this.state.virtualOrder;


		//*Current Order
		//*Appetizers
		//*MainDishes
		//*Drinks
		//Code below handles sorting the data and creating
		//new array with only appetizer objects
		var appetizersArray=[];
		this.props.items.forEach( (element,index)=>{
			if (element.category=="Breakfast"){
				appetizersArray.push(
					<Item item={element}
				   			addToCart = {(item)=> this.addToCart(item)}
				   			 />);

				   			}

			});
		//
		//*Category 2
		var mainDishArray = [];
		this.props.items.forEach((element, index) => {
			if(element.category=="Sandwich"){
				mainDishArray.push(<Item item={element} 
									addToCart = {(item)=> this.addToCart(item)}
									/>)
			}
		})
		//
		//*Category 3 . check the condition to know what kind of cateogry
		var drinksArray = [];
		this.props.items.forEach((element,index) =>{
			if (element.category=="Dinners"){
				drinksArray.push(<Item item={element}
									addToCart = {(item)=> this.addToCart(item)}
									 />)
			}
		})

		function shoppingCartRender(){
			//render sC when it's not empty
			//feed activeOrder to ShoppingCart component to render
			//only after user has added >0 products to cart
			
			if (activeOrder.length > 0){
				return <div> {<ShoppingCart order={activeOrder} />} </div>

			}
		}

		return(
			<div className="container" id="menu">
				<h1 className="text-center"> Menu</h1>
				{/*checkoutRender()*/}
				<div className="row">
					<h2 className="text-center"> Breakfast </h2>
					{appetizersArray}
				</div>
				<div className="row">
				<h2 className="text-center"> Sandwiches </h2>
				{mainDishArray} 
				</div>
				<div>
				<h2 className="text-center"> Dinners </h2>
				{drinksArray}
				{/*Conditional rendering of shopping Cart*/}
				{shoppingCartRender()}
				</div>
			</div>

			)
		}
	}

//ITEMS from main data base
class App extends React.Component{
	

	render(){
			return(
			<div className="container-fluid" id="app">
				{<Header />}
				{<Menu items={ITEMS}/> } 

			</div>
			)
	}
}

//DATA
const ITEMS = [
{"itemID":1001,"name":"Ranch House Combo","imgURL":"https://placehold.it/200","price":8,"category":"Breakfast"},{"itemID":1002,"name":"Huevos Ranch House","imgURL":"https://placehold.it/200","price":7,"category":"Breakfast"},{"itemID":1003,"name":"Steak & Eggs","imgURL":"https://placehold.it/200","price":11,"category":"Breakfast"},
{"itemID":1004,"name":"Hamburger","imgURL":"https://placehold.it/200","price":8,"category":"Sandwich"},{"itemID":1005,"name":"Hot Ham & Cheese","imgURL":"https://placehold.it/200","price":8,"category":"Sandwich"},{"itemID":1006,"name":"BLT","imgURL":"https://placehold.it/200","price":8,"category":"Sandwich"},
{"itemID":1007,"name":"Chicken Fried Steak","imgURL":"https://placehold.it/200","price":10,"category":"Dinners"},{"itemID":1008,"name":"Chopped Steak","imgURL":"https://placehold.it/200","price":10,"category":"Dinners"},{"itemID":1009,"name":"Tilapia","imgURL":"https://placehold.it/200","price":10,"category":"Dinners"},


  
]
//END OF DATA.


ReactDOM.render(
  <App />,
  //WHERE TO RENDER VIRTUAL DOM
  document.getElementById('root')
);

/*
{this.state.virtualOrder.length > 0 ? (
					<ShoppingCart items={this.state.virtualOrder} />
					) : ("")}
					*/