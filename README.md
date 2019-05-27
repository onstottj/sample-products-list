Sample store / products list
============================

![](https://lh6.googleusercontent.com/LQ8anw-4dNVNm5oTRz3doutvVgpqPwb_dli5nKxw0M1ZFG5XV-sEWMwR1cCg44aOmwipd6L82OtM5g=w1918-h1654 "Product list")

Running 
-------

1. Clone this repo
2. Run `npm install` on the command line in the root folder
3. Run `npm start`
4. The website should be up and running at http://localhost:3000
5. If products don't load shortly, you may need a CORS bypass extension. "Moesif Origin & CORS Changer" 
   for Chrome works well (you just have to install it and click the icon to enable it). 

To execute the unit tests, run `npm test`.

Features
--------

 * Product list with infinite scrolling
 * Full product details in a dialog
 * This is mobile friendly using responsive design 

Tech & tools
------------

 * The basics for this React app was set up with create-react-app
 * TypeScript is used
 * Ant Design is the UI library

Future enhancements
-------------------

 * Add list sorting & filtering (would need backend support)
 * Add shopping cart functionality
 * Setup routing
 * Add more unit tests (there's not much logic to test so far)
 * Do more separation of presentational vs container components
 * Redux could be added when the app grows more complex