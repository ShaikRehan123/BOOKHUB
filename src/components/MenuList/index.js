import { Component } from "react";
import "./index.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

class MenuList extends Component {
  render() {
    const { data, activeMenuId, cart, onRemoveClick, onAddClick } = this.props;
    const menu = data?.table_menu_list?.find(
      (menu) => menu.menu_category_id === activeMenuId
    );

    if (menu) {
      console.log(menu);

      return (
        <div className="menu-list-container">
          {menu?.category_dishes?.map((item) => {
            // length of this items dish_id in cart
            const cartCount = cart.filter((id) => id === item.dish_id).length;

            return (
              <div className="menu-list-item" key={item.dish_id}>
                <div className="menu-list-item-details">
                  <div
                    className={`menu-list-item-vlabel-outer-line-${
                      item.dish_Type == 2 ? "nonveg" : "veg"
                    }`}
                  >
                    <div
                      className={`menu-list-item-vlabel-inner-line-${
                        item.dish_Type == 2 ? "nonveg" : "veg"
                      }`}
                    ></div>
                  </div>
                  <div className="menu-list-item-name">{item.dish_name}</div>
                  <div className="menu-list-item-price">
                    {item.dish_currency} {item.dish_price}
                  </div>
                  <div className="menu-list-item-description">
                    {item.dish_description}
                  </div>

                  <div className="menu-list-item-calories">
                    {item.dish_calories} calories
                  </div>

                  {item.dish_Availability && (
                    <div className="menu-list-item-action-buttons">
                      <AiOutlinePlus
                        color="#ffffff"
                        size={20}
                        className="menu-list-item-action-button"
                        onClick={() => onAddClick(item.dish_id)}
                      />
                      <div className="menu-list-item-cart-count">
                        {cartCount}
                      </div>

                      <AiOutlineMinus
                        color="#ffffff"
                        size={20}
                        className="menu-list-item-action-button"
                        onClick={() => onRemoveClick(item.dish_id)}
                      />
                    </div>
                  )}

                  {item.addonCat.length > 0 && item.dish_Availability && (
                    <p className="menu-list-item-addoncat">
                      Customizations available
                    </p>
                  )}

                  {!item.dish_Availability && (
                    <p className="menu-list-item-unavailable">Not available</p>
                  )}
                </div>
                <div className="menu-list-item-image-container">
                  <img
                    src={item.dish_image}
                    alt={item.dish_name}
                    className="menu-list-item-image"
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default MenuList;
