let vegetarianBtn = document.querySelector('.vegetarian');
let porkBtn = document.querySelector('.pork');
let chickenBtn = document.querySelector('.chicken');
let saladBtn = document.querySelector('.salad');
let dessertBtn = document.querySelector('.dessert');

vegetarianBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#018371';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

porkBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#018371';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

chickenBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#018371';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

saladBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#018371';
    dessertBtn.style.backgroundColor = '#00d3b7';
});

dessertBtn.addEventListener('click', function() {
    vegetarianBtn.style.backgroundColor = '#00d3b7';
    porkBtn.style.backgroundColor = '#00d3b7';
    chickenBtn.style.backgroundColor = '#00d3b7';
    saladBtn.style.backgroundColor = '#00d3b7';
    dessertBtn.style.backgroundColor = '#018371';
});