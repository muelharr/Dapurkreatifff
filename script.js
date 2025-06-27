document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipe-form');
  const recipesContainer = document.getElementById('recipes');
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  function renderRecipes() {
    recipesContainer.innerHTML = '';
    recipes.forEach((r, i) => {
      const card = document.createElement('div');
      card.classList.add('recipe');
      card.innerHTML = `
        <h3>${r.title}</h3>
        <p><strong>Bahan:</strong> ${r.ingredients.join(', ')}</p>
        <p><strong>Langkah:</strong><br>${r.instructions
          .map((step, idx) => `${idx + 1}. ${step}`)
          .join('<br>')}</p>
        <button data-index="${i}" class="delete-btn">Hapus</button>
      `;
      recipesContainer.appendChild(card);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        recipes.splice(e.target.dataset.index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        renderRecipes();
      });
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const ingredients = document
      .getElementById('ingredients')
      .value.split(',')
      .map(s => s.trim());
    const instructions = document
      .getElementById('instructions')
      .value.split('\n')
      .map(s => s.trim());
    recipes.push({ title, ingredients, instructions });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    form.reset();
    renderRecipes();
  });

  renderRecipes();
});
