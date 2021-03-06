// Create an Array
let links = [{
        label: "Week 1 Notes",
        url: "week1/index.html",
    },
    {
        label: "Week 2 Notes",
        url: "week2/index.html",
    },
    {
        label: "Week 3 Notes",
        url: "week3/index.html",
    },
    {
        label: "Week 4 Notes",
        url: "week4/index.html",
    },
    {
        label: "Week 5 Notes",
        url: "week5/index.html",
    },
    {
        label: "Todo App",
        url: "todo/index.html",
    },
    {
        label: "Week 7 Notes",
        url: "week7/index.html",
    },
    {
        label: "Week 8 Notes",
        url: "week8/index.html",
    },
    {
        label: "Week 9 Notes",
        url: "week9/index.html",
    },
    {
        label: "Week 10 Notes",
        url: "week10/index.html",
    },
    {
        label: "Project 2",
        url: "project2/index.html",
    },
];

function generateTOC(list, id) {
    var orderedList = document.getElementById(id);
    var listItems = [];

    list.forEach(function (i) {
        listItems.push("<li><a href=" + i.url + ">" + i.label + "</a></li>");
    });

    orderedList.innerHTML = listItems.join('');
}

generateTOC(links, "orderedList");