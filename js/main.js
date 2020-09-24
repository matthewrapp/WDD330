// Create an Array
let links = [
    {
        label: "Week 1 Notes",
        url: "week1/index.html",
    },
    {
        label: "Week 2 Notes",
        url: "week2/index.html",
    },
];

function generateTOC(list, id) {
    var orderedList = document.getElementById(id);
    var listItems = [];

    list.forEach( function(i) {
        listItems.push("<li><a href=" + i.url + ">" + i.label + "</a></li>");
    });

    orderedList.innerHTML = listItems.join('');
}

generateTOC(links, "orderedList");