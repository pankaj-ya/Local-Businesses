import {businesses} from '../business/businesses.js'

document.addEventListener('DOMContentLoaded', () => {
    // Populate dropdowns
    populateDropdown('businessType', getUniqueValues('type'));
    populateDropdown('location', getUniqueValues('location'));

    // Load businesses
    loadBusinesses();

    // Add event listeners
    document.getElementById('businessType').addEventListener('change', filterBusinesses);
    document.getElementById('location').addEventListener('change', filterBusinesses);
    document.getElementById('sort').addEventListener('change', filterBusinesses);
});

function loadBusinesses() {
    const businessList = document.querySelector('.business-list');
    businessList.innerHTML = '';

    const sortedBusinesses = sortBusinesses(businesses, 'lowToHigh'); // Default sorting

    sortedBusinesses.forEach(business => {
        const card = createBusinessCard(business);
        businessList.appendChild(card);
    });
}

function filterBusinesses() {
    const businessType = document.getElementById('businessType').value;
    const location = document.getElementById('location').value;
    const sortOption = document.getElementById('sort').value;

    let filteredBusinesses = businesses.filter(business => 
        (businessType === 'all' || business.type === businessType) &&
        (location === 'all' || business.location === location)
    );

    filteredBusinesses = sortBusinesses(filteredBusinesses, sortOption);

    const businessList = document.querySelector('.business-list');
    businessList.innerHTML = '';

    filteredBusinesses.forEach(business => {
        const card = createBusinessCard(business);
        businessList.appendChild(card);
    });
}

function sortBusinesses(businesses, sortOption) {
    return businesses.sort((a, b) => {
        if (sortOption === 'lowToHigh') {
            return a.reviews - b.reviews;
        } else {
            return b.reviews - a.reviews;
        }
    });
}

function createBusinessCard(business) {
    const card = document.createElement('div');
    card.classList.add('business-card');

    const image = document.createElement('img');
    image.src = business.image;
    image.alt = business.type;
    
    const name = document.createElement('h2');
    name.textContent = business.name;

    const type = document.createElement('p');
    type.textContent = `Type: ${business.type}`;

    const location = document.createElement('p');
    location.textContent = `Location: ${business.location}`;

    const reviews = document.createElement('p');
    reviews.textContent = `Reviews: ${business.reviews}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(location);
    card.appendChild(reviews);

    return card;
}

function populateDropdown(id, options) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'All';
    dropdown.appendChild(defaultOption);

    options.forEach(option => {
        const element = document.createElement('option');
        element.value = option;
        element.textContent = option;
        dropdown.appendChild(element);
    });
}

function getUniqueValues(property) {
    const values = new Set();
    businesses.forEach(business => values.add(business[property]));
    return Array.from(values);
}


