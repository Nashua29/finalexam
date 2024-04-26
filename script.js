document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const mealResults = document.getElementById('mealResults');
  const showAllButton = document.getElementById('showAllButton');

  searchButton.addEventListener('click', function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
          searchMeal(searchTerm);
      }
  });

  showAllButton.addEventListener('click', function () {
      showAllMeals();
  });

  function searchMeal(term) {
    clearResults(); // Clear previous results
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            if (meals) {
                meals.slice(0, 5).forEach(meal => {
                    displayMeal(meal);
                });
                if (meals.length > 5) {
                    showAllButton.style.display = 'block';
                } else {
                    showAllButton.style.display = 'none';
                }
            } else {
                mealResults.innerHTML = '<p>No meals found. Please try another search term.</p>';
                showAllButton.style.display = 'none';
            }
            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


  function showAllMeals() {
      const searchTerm = searchInput.value.trim();
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
          .then(response => response.json())
          .then(data => {
              const meals = data.meals;
              clearResults();
              meals.forEach(meal => {
                  displayMeal(meal);
              });
              showAllButton.style.display = 'none';
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }

  function displayMeal(meal) {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal');

      mealDiv.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h2>${meal.strMeal}</h2>
          <p>${meal.strCategory}</p>
          <p>${meal.strInstructions}</p>
      `;

      mealResults.appendChild(mealDiv);
  }

  function clearResults() {
      mealResults.innerHTML = '';
  }
});
