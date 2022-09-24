# Ecommerce website with vue js and firebase
<div align="center"> 
<img src="https://github.com/ranizouaoui/E-commerce/blob/main/src/assets/thumbnail.jpg" alt="" />
 </div>  
 
## Preface
This is my first web project which is an online store. I created the site with vuejs and firebase. In addition, the project is a practical application to the training I followed on the "<a href="https://vueschool.io/">Vue school</a>" site.

<h4> Why I chose vuejs framework? </h4>

Simply, vuejs has a big community, especially vuejs and laravel. Vue js is widely used all over the world. Do you know that Nentendre website, Gitlab, Laracast, Laravel Vapor and other well-known sites are developed with vuejs.

This is definitely the framework I recommend for frontend development.

## Install

Perform the following steps:

1- Download and install <a href="https://nodejs.org/en/">Node.js</a>.<br/>
2- Download and install <a href="https://nodejs.org/en/">Visual Studio Code(VS Code)</a>.<br/>
3- Install vetur extension for VS Code.<br/>
4- Clone this repository.<br/>
5- Download and install npm packages.<br/>
```
npm install
```
6- configurer Firebase.js.<br/>

 
```
//  just connect to Firebase then create a project and copy the configuration function
const firebaseConfig = {
...
};
```
<a href="https://firebase.google.com/docs/projects/learn-more">Setting up a Firebase project and registering apps</a>
### Starting Server
```
npm run serve
```

### Creating a Production Build
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Project Map
```
- myprojectvuejs
  + public          … Contains resouces of this project.
  - src
    + assets        … Contains source codes that Webpack doesn't need to build.
    + components    … Contains components of Vue.
    + router        … Define Vue Router.
    + store         … Define Vuex
    + views         … Define views of this project.
    - App.vue       … Define a base view of this project.
    - main.js       … start an instance of the application.
    - Firebase.js   … Initialize Firebase.
  - babel.config    … Babel Configuration.
  - package.json    … Define npm packages.
  - vue.config.js   … Vue CLI Configuration.
  
  ```

  ## Views
  There are the following views in this project.
  
  <table>
<thead>
<tr>
<th align="left">View Name</th>
<th align="left">File Name</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Login View</td>
<td align="left"><code>LoginView.vue </code></td>
<td align="left">The view for session authentication with email and password or account creation. </td>
</tr>
<tr>
<td align="left">Home View</td>
<td align="left"><code>HomeView.vue</code></td>
<td align="left">The view displays the products on sale.</td>
</tr>
<tr>
<td align="left">Products View</td>
<td align="left"><code>ProductsView.vue</code></td>
<td align="left">The view displays the products list.</td>
</tr>
<tr>
<td align="left">MyProducts View</td>
<td align="left"><code>MyProductsView.vue</code></td>
<td align="left">The view to manage the products.</td>
</tr>
<tr>
<td align="left">Cart View</td>
<td align="left"><code>Cart.vue</code></td>
<td align="left">The view shows the ordered products.</td>
</tr>
<tr>
<td align="left">Orders View</td>
<td align="left"><code>Orders.vue</code></td>
<td align="left">The view showing the orders table.</td>
</tr>

</tbody>
</table>

## Libraries

This sample uses the following library.
<table>
<thead>
<tr>
<th align="left">Library Name</th>
<th align="center">Version</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">vue-cli</td>
<td align="center">5.0.0</td>
<td align="left">The tool for Vue.js Development.</td>
</tr>
<tr>
<td align="left">vue.js</td>
<td align="center">3.2.13</td>
<td align="left">JavaScript Framework</td>
</tr>
<tr>
<td align="left">vue-router</td>
<td align="center">4.0.3</td>
<td align="left">Library for Routing.</td>
</tr>
<tr>
<td align="left">vuex</td>
<td align="center">4.0.0</td>
<td align="left">Flux library for Vue.js</td>
</tr>
<tr>
<td align="left">firebase</td>
<td align="center">9.9.1</td>
<td align="left">library for Ajax.</td>
</tr>
<tr>
<td align="left">bootstrap</td>
<td align="center">5.2.0</td>
<td align="left">CSS Framework</td>
</tr>
</tbody>
</table>

# YouTube video for the website


[![Everything Is AWESOME](https://img.youtube.com/vi/yjawzRhKpOs/0.jpg)](https://www.youtube.com/watch?v=yjawzRhKpOs "Vue.Js Website")

