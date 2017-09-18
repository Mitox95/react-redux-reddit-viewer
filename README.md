# Reddit Viewer
This is a Single Page Application built with [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/react-redux) that allows you to view content from [Reddit](http://reddit.com).  The application styling uses [Google's Material Design Lite](https://getmdl.io/) with [MaterializesCSS](http://materializecss.com/).

[You can view the online version of this application here](https://jamesives.github.io/react-redux-reddit-viewer/).

### Getting Started
This application can be installed via npm by running `npm install`. Once installed you're able to launch the application in a local server by running `npm start`.

### Navigating
Once initialized the application can be accesed via port `8080` on `localhost`. The application is driven primarily by react-router, allowing you to access routes to get directly to the content you want. For example `http://localhost:8080/#/r/wow/hot?_k=5j0xwu` or `http://localhost:8080/#/r/teslamotors/new/?_k=l90l7q`.


## browserHistory vs hashHistory
If you'd like to deploy your own version of this application you can change the way the routing works to remove the hash if you'd like. Within `index.js` you need to modify props passed into the Route component from `hashHistory` to `browserHistory` and adjust the import at the top. This will allow you to access routes via `http://localhost:8080/r/teslamotors/`, without the hash.


![Example](assets/application_example.gif)