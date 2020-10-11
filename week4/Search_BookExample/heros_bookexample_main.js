const heroForm = document.forms['hero'];
heroForm.addEventListener('submit', makeHero, false);
function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = heroForm.heroName.value; // create a name property based on the input field's value
    hero.realName = heroForm.realName.value; // create a real name property based on the input field's value

    hero.powers = []; // create an empty array of powers, operated by the checkboxes in the HTML
    // create a for loop to see if each checkbox was checked
    // if it is checked, we add the 'value' property of the checkbox to the powers array using the push method
    for (let i = 0; i < heroForm.powers.length; i++) {
        if (heroForm.powers[i].checked) {
            hero.powers.push(heroForm.powers[i].value);
        }
    }
    // Can refacter this code using array literals
    // hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);

    // Assign a category property to our hero object
    hero.category = heroForm.category.value;

    // Assign an age property to our hero object
    hero.age = heroForm.age.value;

    // Assign a base of operations to our hero object
    hero.city = heroForm.city.value;

    // Access the value of the textarea for orgin
    hero.orgin = heroForm.orgin.value;

    console.log(hero);

    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}

// A checkbox can be set to true
heroForm.powers[0].checked = true;
heroForm.category[2].checked = true;

// Find the index of the option that has been selected
// document.getElementsByTagName('h6')[0].innerHTML = heroForm.city.options[heroForm.city.selectedIndex].text;

// Custom Validation
// Could add eventListener right to the input field so you don't have to wait for the form to be submitted to get the error.
// heroForm.addEventListener('submit', validate, false);
// function validate(event) {
//     const firstLetter = heroForm.heroName.value[0];
//     if (firstLetter.toUpperCase() === 'X') {
//         event.preventDefault();
//         alert('Your name is not allowed to start with X!');
//     }
// }