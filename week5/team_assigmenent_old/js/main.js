import {
  Hike,
  HikeManager
} from './hikes.js';

// Create an instance of Hikes
let allHikes = [
  new Hike(
    'Bechler Falls',
    'falls.jpg',
    'Image of Bechler Falls',
    '3 Miles',
    'Easy',
    'Beautiful short hike along the Bechler river to Bechler Falls',
    'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
  ),
  new Hike(
    'Teton Canyon',
    'falls.jpg',
    'Image of Teton Canyon',
    '5 Miles',
    'Moderate',
    'Beautiful short hike up Teton Canyon',
    'Take Highway 33 to Driggs. Turn right into the town and continue through. Follow that road for a few miles then turn right up Teton Canyon. Drive to the end of the road. There is a parking area at the trailhead.'
  ),
  new Hike(
    'Denanda Falls',
    'falls.jpg',
    'Image of Denanda Falls',
    '12 Miles',
    'Moderate',
    'Beautiful hike through Bechler Meadows to Denanda Falls',
    'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for several miles then turn left again at the sign for the Bechler Meadows ranger station. There is a parking area at the trailhead.'
  ),
];

const hikeManager = new HikeManager();
hikeManager.renderHikeList(allHikes);