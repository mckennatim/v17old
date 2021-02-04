



## bootstrapping authorization
If you have an token, or can copy one in, use it. This app is bootstrapped to a timecards/RRCLLC/tim token.

## howto build an app

### check your credentials
Get some quick meta data  from the server at the startup of the app. render the opening page or direct user to sign in. Meanwhile wait for the table data displaying some blank. Same process for any route. Each route should make a call to back to control for auth.
### sharing data by props betweeen pages
Display an array of pages where only the one selected owns the route. Displaying multiple pages means that all are rendered and will re-render when the props change. a change in one page proagates back up to control where it gets rerendered to the other pages and sent to the server. The server comes back with data that modifies the pages props causing rerenders.
### fetches in services or right out of control? 
### how do route pages send data back to control?
throught a function you sent with a link 

## log
### 2/5/21 3-ablank_context