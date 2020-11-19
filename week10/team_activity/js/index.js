import QuakesController from './QuakesController.js';

// create an instance
const quakesController = new QuakesController('#quakeList');
quakesController.init();

// getLocation().then((response) => {
//     quake.getEarthQuakesByRadius(response);
// }).catch((error) => {
//     console.log(error)
// })