function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
}

const API_URL = 'http://localhost:3000/api';

async function fetchPets() {
  try {
    const response = await fetch(`${API_URL}/pets`);
    if (!response.ok) {
      throw new Error('Failed to fetch pets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
}

async function addPetCards() {
  const petsList = document.getElementById('pets-list');
  const pets = await fetchPets();

  petsList.innerHTML = ''; // Clear existing cards

  pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.className = 'pet-card';
    petCard.setAttribute('data-type', pet.type.toLowerCase());
    petCard.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <h4>${pet.name}</h4>
      <p>${pet.breed}</p>
      <p>${pet.age}</p>
            <div class="info-box">
                <strong>Owner: </strong>${pet.info.Owner}<br>
                <strong>Address: </strong>${pet.info.Address}<br>
                <strong>Contact: </strong>${pet.info.Contact}<br>
                <strong>Availability: </strong>${pet.info.Availability}<br>
            </div>
      <button class="delete-button" onclick="deletePet(${pet.id})">Delete</button>
    `;
    petsList.appendChild(petCard);
  });
}

async function deletePet(petId) {
    console.log('Pet ID to delete:', petId); // Log pet ID

    const password = prompt('Enter the password to delete this pet:');
    if (!password) return;
  
    try {
      const response = await fetch(`${API_URL}/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      alert('Pet deleted successfully!');
      addPetCards(); 
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert(error.message || 'Failed to delete pet. Please check your password and try again.');
    }
  }

function filterPets() {
  const animalType = document.getElementById('animal-type').value;
  const petCards = document.querySelectorAll('.pet-card');

  petCards.forEach(card => {
    const petType = card.getAttribute('data-type');
    if (animalType === '' || petType === animalType) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function addFeaturedPets() {
  const carouselContainer = document.querySelector('.carousel-container');
  fetchPets().then(pets => {
    const featuredPets = pets.slice(0, 5); // Get first 5 pets as featured
    featuredPets.forEach(pet => {
      const petCard = document.createElement('div');
      petCard.className = 'pet-card ';
      petCard.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}">
        <h4>${pet.name}</h4>
        <p>${pet.breed}</p>
        <p>${pet.age}</p>
      `;
      carouselContainer.appendChild(petCard);
    });

    // Clone the pet cards to create the infinite scroll effect
    const petCards = carouselContainer.innerHTML;
    carouselContainer.innerHTML += petCards;
  });
}

// Call these functions when the page loads
window.addEventListener('load', () => {
  addPetCards();
  addFeaturedPets();
});

// Your existing functions (scrollToSection, toggleMenu, etc.) remain unchanged

function adoptPet(petName) {
    alert(`Thank you for your interest in adopting ${petName}! Please contact us to proceed with the adoption process.`);
}

function adoptPet(petName) {
    alert(`Thank you for your interest in adopting ${petName}! Please contact us to proceed with the adoption process.`);
}

// Call the function to add pet cards when the page loads
window.onload = addPetCards;

function donate(amount) {
    alert(`Thank you for your donation of ₹${amount}! Your support makes a huge difference.`);
    // Here you would typically integrate with a payment gateway
}

function donateCustom() {
    const amount = document.getElementById('custom-amount').value;
    if (amount && !isNaN(amount)) {
        alert(`Thank you for your custom donation of ₹${amount}! Your generosity is appreciated.`);
        // Here you would typically integrate with a payment gateway
    } else {
        alert('Please enter a valid amount.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.testimonial-gallery');
    const cards = document.querySelectorAll('.testimonial-card');
    
    // Clone the testimonial cards
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        gallery.appendChild(clone);
    });

    // Adjust the animation duration based on the number of cards
    const totalCards = gallery.children.length;
    const cardWidth = 300; // width of each card
    const gapWidth = 20; // gap between cards
    const totalWidth = totalCards * (cardWidth + gapWidth);
    const animationDuration = totalWidth / 50; // Adjust speed as needed

    gallery.style.animationDuration = `${animationDuration}s`;
});