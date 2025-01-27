fetch('./models.json')
    .then(response => response.json())
    .then(models => {
        const modelsContainer = document.getElementById('models');

        models.forEach(model => {

            const modelCard = document.createElement('a');
            modelCard.href = `model.html?model=${model.name}`;
            modelCard.className = 'model-card';
            modelCard.addEventListener('click', () => {
                window.location.href = `model.html?model=${encodeURIComponent(model.name)}`;
            });

            modelCard.innerHTML = `
                <img src="${model.portrait}">
                <h2>${model.name}</h2>
            `;
            modelsContainer.appendChild(modelCard);
        });
    })
    .catch(error => console.error('Error loading models:', error));