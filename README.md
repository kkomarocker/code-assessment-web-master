# Work & Co Exercise

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
- Total, tax and grand total section updates when the "Update Cart" button is clicked

### Update Cart

- Updates product qty and amount section accordingly.

## TODO / Final thoughts

- Image loading: I tried to set it as relative path inside img tag but couldn't make it. This is a reason why there is a huge (and ugly) gap next to product title..
- Using bootstrap is nice if there is short time to build. I think the downside is it is hard to reproduce styling when the app has to satisfy with multiple devices. (i.e. mobile and tablet)

# Thank you!
