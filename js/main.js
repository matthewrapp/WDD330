// Create an Array
let links = [
    {
        label: "Week 1 Notes",
        url: "week1/index.html",
    },
    {
        label: "Week 2 Notes",
        url: "week1/index.html",
    },
];

var orderedList = document.getElementById("orderedList");
var listItems = [];

links.forEach( function(i) {
    listItems.push("<li><a href=" + i.url + ">" + i.label + "</a></li>");
});

orderedList.innerHTML = listItems.join('');
