var weekNum = document.getElementById("orderedList");

let weekLinks = [
    {
        label: "Week 1 Notes",
        url: "facebook.com",
    },
];

weekNum.innerHTML = weekLinks[0]['label'];