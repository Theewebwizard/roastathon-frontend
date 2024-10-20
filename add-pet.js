const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  const addPetForm = document.getElementById('add-pet-form');

  addPetForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addPetForm);
    const petData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error('Failed to add pet');
      }

      alert('Pet added successfully!');
      addPetForm.reset();
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('Failed to add pet. Please try again.');
    }
  });
});