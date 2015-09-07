custom-dashboard
================

Template for customer dashboards on the Infinity Platform which can be used as a prototype for building new dashboard projects.

### Development Environment

The template runs in a small [Angular](https://angularjs.org/) based application. It simulates a real dashboard by using a JSON file containing 'fake' data, a live dashboard could potentially be made using this template with minimal work by maintaining the data structure in the JSON file and serving the live data into the template.

### Installation

To install the template and view it on your local machine you must have [NodeJs](http://nodejs.org/) and [GruntJs](http://gruntjs.com/) installed on your machine, once these are installed follow these steps from within a CLI:

```
cd path/to/containing/project/folder/custom-dashboard
npm install
grunt
```

After running the `grunt` command the local NodeJs server will be running and you can open the template by accessing `http://localhost:3005/` in your web browser

### TASK

This project is only partly done, making use of the data in the `app/data` folder and the view files in `app/views` we need you to make the router and controllers to load the correct data and display it in the views. There are three views to display, all of which are in the app's menu:

- "Breakfast Cereals"
- "On The Go"
- "Non Dairy Milk"

#### Notes:

- The Angular app in contained withing the `app/index.js` file, this is the only file you should need to update to complete the task
- You will only need the default Angular router, no other libraries are necessary

=======
# PP
