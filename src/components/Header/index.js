import { Component } from "react";
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";

class Header extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">{this.props.data.restaurant_name}</h1>

        <div className="cart">
          <span className="cart-title">My Orders</span>
          <div className="cart-icon-container">
            <AiOutlineShoppingCart size={30} color="#585555" />
            <span className="cart-count">{this.props.cart.length}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
