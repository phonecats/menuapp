
//Oscar Chavez April 2017
//ReactJS, Bootstrap, jQuery, Babel, Webpack, 
var React = require('react');
var ReactDOM = require('react-dom');


//Variables for app
const RESTAURANT_NAME ="The Ranch House Cafe";
const TITLE = "Menu";
const CATEGORY1 ="Breakfast";
const CATEGORY2 = "Sandwich";
const CATEGORY3 ="Dinners";

class Header extends React.Component{
	render(){
		var style = {
			backgroundColor: "blue",
			height: "100px",
		}
		return(
<nav >
  <div className="container-fluid" style={style}>
  	<h1 className="text-center"> {RESTAURANT_NAME} </h1>
  </div>
</nav>
			)
	};
} // end of header component

class Footer extends React.Component{
	
	render(){
		var style ={
			backgroundColor: "blue",
			height: "200px",
		}
		return(
			<div className="container-fluid" style={style}>
			

				</div>)
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
  	var style = {
  		backgroundColor: "gray",
  	}
    return(
    <div className="col-sm-4" >
    <div className="container-fluid" style={style} >
        <h3 className="text-center"> {this.props.item.name}</h3>
        <img className="img-fluid" src={this.props.item.imgURL}/> 

        <div className="row">
        <div className="col-sm-6">
        <div className="dropdown">
	  		<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> 
	  			Qty: {this.state.quantity}
	    		<span className="caret"></span>
	  		</button>
			  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
			    <li><button className="btn btn-default" onClick={()=>this.handleQuantityButton(1)} > 1 </button></li>
			    <li> <button className="btn btn-default" onClick={()=>this.handleQuantityButton(2)} > 2 </button> </li>
			    <li><button className="btn btn-default" onClick={()=>this.handleQuantityButton(3)} > 3 </button>   </li>  
			  </ul>
		</div>
		</div>
		<div className="col-sm-6">
		<button onClick={()=>this.handleAddToCart()}> Add to Cart</button>
   		</div>
   		</div>
   	</div>

   	</div>
    
   )//end of return
  }
}

class Payment extends React.Component{
	render(){
		return(
			<div className="row">
				<h2 className="col-sm-6"> Billing Info</h2>
				First Name: <input type="text" />
				Last Name: <input type="text" />
				CC: <input type="text" />
			</div>
			)
	}
}

class SubShoppingCartItem extends React.Component{
	render(){
		var style = {
			backgroundColor: "red",
			borderColor: "black",
			border: "solid",
			borderWidth: "5px",
			minHeight: "200px",
			minWidth: "250px"
		}
		return(
			 <div className = "col-sm-2" style={style}>
        		<h1> {this.props.item.name} </h1>
        	</div>
			)
	}
}
class SubShoppingCart extends React.Component{
	render(){
		var style = {
			backgroundColor: "pink",
		}
		var Order = this.props.order;
		var orderItemized = [];

		Order.forEach((object,index) => {
			orderItemized.push(<SubShoppingCartItem item={object} /> )
		})
		return(

			<div  className="container-fluid" style={style}>
				<div className="row">
					
					{orderItemized}
				</div>
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
			orderList.push(<Item item={element} />)
		})

		//the sum of the total order
		var sum = this.calculateSum();

		//css
		var style = {
			"backgroundColor": "green",
		}
		//end css
		return(
			<div  className="container-fluid" style={style}>
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
		var category1 = this.props.category1;
		var category2 = this.props.category2;
		var category3 = this.props.category3;

		//*Current Order
		//*Appetizers
		//*MainDishes
		//*Drinks
		//Code below handles sorting the data and creating
		//new array with only appetizer objects
		var category1Array =[];
		this.props.items.forEach( (element,index)=>{
			if (element.category== category1 ){
				category1Array.push(
					<Item item={element}
				   			addToCart = {(item)=> this.addToCart(item)}
				   			 />);

				   			}

			});
		//
		//*Category 2
		var category2Array = [];
		this.props.items.forEach((element, index) => {
			if(element.category==category2){
				category2Array.push(<Item item={element} 
									addToCart = {(item)=> this.addToCart(item)}
									/>)
			}
		})
		//
		//*Category 3 . check the condition to know what kind of cateogry
		var category3Array = [];
		this.props.items.forEach((element,index) =>{
			if (element.category== category3){
				category3Array.push(<Item item={element}
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

		function subShoppingCartRender(){
			if (activeOrder.length > 0 ){
				return <div> {<SubShoppingCart order={activeOrder} /> } </div>
			}
		}

		var style = {
			"backgroundColor": "yellow",
		}
		return(
			<div className="container" style={style}>
				<h1 className="text-center"> {TITLE}</h1>
				{subShoppingCartRender()}
				<div className="row" >
				<h2 className="text-center"> {this.props.category1}</h2>
				{category1Array}
				</div>
				<div className="row">
				<h2 className="text-center"> {this.props.category2} </h2>
				{category2Array} 
				</div>
				<div className="row">
				<h2 className="text-center"> {this.props.category3} </h2>
				{category3Array}
				</div>
				<div className="row">
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
		var style = {
			backgroundColor: 'red',
		}
			return(
			<div className="container-fluid" style={style} >
				{<Header />}
				{<Menu items={ITEMS} category1={CATEGORY1} category2={CATEGORY2} category3={CATEGORY3}/> } 
				{<Footer />}

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