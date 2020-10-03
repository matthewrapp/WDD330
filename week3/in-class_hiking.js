// Array of objects
// Contains a database of hikes
const hikeList = [
    {
      name: 'Bechler Falls',
      imgSrc: 'falls.jpg',
      imgAlt: 'Image of Bechler Falls',
      distance: '3 miles',
      difficulty: 'Easy',
      description:
        'Beautiful short hike along the Bechler river to Bechler Falls',
      directions:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
    },
    {
      name: 'Teton Canyon',
      imgSrc: 'falls.jpg',
      imgAlt: 'Image of Teton Canyon',
      distance: '5 miles',
      difficulty: 'Moderate',
      description: 'Beautiful short hike up Teton Canyon',
      directions:
        'Take Highway 33 to Driggs. Turn right into the town and continue through. Follow that road for a few miles then turn right up Teton Canyon. Drive to the end of the road. There is a parking area at the trailhead.'
    },
    {
      name: 'Denanda Falls',
      imgSrc: 'falls.jpg',
      imgAlt: 'Image of Denanda Falls',
      distance: '12 miles',
      difficulty: 'Moderate',
      description:
        'Beautiful hike through Bechler Meadows to Denanda Falls',
      directions:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for several miles then turn left again at the sign for the Bechler Meadows ranger station. There is a parking area at the trailhead.'
    }
  ];


// Loop through the array of objects
// For each (foreach) item in the array, need to create a new 'li' element
// Create all the elements we need to hold hike information
// Insert the new element into the DOM

// Create a function that creates the 'li' (HTML) element
function renderHikeList(list) {
    const listElement = document.querySelector('#hikes');
    listElement.innerHTML = "";
    // each of the hikes in the list
    list.forEach(hike => {
        const newLi = document.createElement('li');
        newLi.innerHTML = renderOneHike(hike);
        listElement.appendChild(newLi);
    })
}

// Returns HTML string
function renderOneHike(hike) {
    // interprelation
    let hikeHTML = `<img
    src="https://byui-cit.github.io/cit261/examples/${hike.imgSrc}"
    alt="${hike.imgAlt}"/>
    <h2>${hike.name}</h2>
    <div>
        <h3>Distance</h3>
        <p>${hike.distance}</p>
    </div>
    <div>
        <h3>Difficulty</h3>
        <p>${hike.difficulty}</p>
    </div>
    <div>
        <h3>Description</h3>
        <p>${hike.description}</p>
    </div>
    <div>
        <h3>How to get there</h3>
        <p>
        ${hike.directions}
        </p>
    </div>`

  return hikeHTML;
}

renderHikeList(hikeList);