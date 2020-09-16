var weekNum = document.getElementById("orderedList");

let weekLinks = [
    {
        label: "Week 1 Notes",
        url: "week1/index.html",
    },
];

weekNum.innerHTML = weekLinks[0]['label'];