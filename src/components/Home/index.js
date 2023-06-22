import { Component } from "react";
import "./index.css";
import Header from "../Header";
import MenuCategory from "../MenuCategory";
import Loader from "../Loader";
import MenuList from "../MenuList";

class Home extends Component {
  state = {
    data: [],
    cart: [],
    activeMenuId: 0,
    isLoading: true,
  };

  componentDidMount() {
    const url = "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099";
    fetch(url).then((response) => {
      response
        .json()
        .then((result) => {
          this.setState({
            data: result[0],
            activeMenuId: result[0].table_menu_list[0].menu_category_id,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <Header data={this.state.data} cart={this.state.cart} />
        <MenuCategory
          data={this.state.data}
          activeMenuId={this.state.activeMenuId}
          onClick={(menuId) => {
            this.setState({ activeMenuId: menuId });
          }}
        />
        <MenuList
          data={this.state.data}
          activeMenuId={this.state.activeMenuId}
          onAddClick={(dishId) => {
            // add item to cart with dishId
            const cart = [...this.state.cart];
            cart.push(dishId);
            this.setState({ cart });
          }}
          onRemoveClick={(dishId) => {
            // remove first item from cart with dishId
            const cart = [...this.state.cart];
            const index = cart.findIndex((item) => item === dishId);
            if (index !== -1) {
              cart.splice(index, 1);
            }
            this.setState({ cart });
          }}
          cart={this.state.cart}
        />
      </div>
    );
  }
}

export default Home;
