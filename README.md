# Work & Co Exercise

## Running application

```
yarn install // added axios and react router dom for api request and custom route.
yarn start
```

## Decision Making

The example consists of mainly two parts; Cart and Products.
I figured out that Cart and Product shares same component (Product), it was hard to maintain different styling while keeping one another.
Also, since cart component has different functionalities with product component, (i.e. remove item, update qty) I decided to build separate component which provide view and dedicated functions for added item in the cart (CartItem).

## Components and Functions Overview

### Product

- The only function for this component is "Add To Cart". It simply adds product into cart when clicked.
- Stock remainder indicates how many of them left.
- "Add To Cart" button disables when the stock marked as 0.

### Cart

- It has two main functions; Remove and Update Qty.
- "Remove" button simply removes whole item from cart and updates stock in the product.
- Users can update qty in cart by pressing either "+" or "-" to increment or decrement the qty. Both buttons disables when the value between these buttons is reached to max stock or 1.
- Total, tax and grand total section updates on decrement / increment of qty.

### Update Cart

- Alerts user that cart has been updated.

## TODO / Final thoughts

- Using bootstrap is nice if there is short time to build. I think the downside is it is hard to reproduce styling when the app has to satisfy with multiple devices. (i.e. mobile and tablet)
- Create test module for CartItem component.

# Thank you!
