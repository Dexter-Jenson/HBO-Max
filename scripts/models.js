const lettersArray = ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

fetch('json/models.json')
    .then(response => response.json())
    .then(models => {
        const lettersContainer = document.getElementById('letters');
        const modelContainer = document.getElementById('model-container');
        const defaultLetter = 'All';

        function renderLetters() {
            lettersArray.forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.dataset.letter = letter;
                button.addEventListener('click', () => {
                    document.querySelectorAll('.letters button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    filterModels(letter);
                });

                if (letter === defaultLetter) button.classList.add('active');
                lettersContainer.appendChild(button);
            });
        }

        function renderModels(models) {
            modelContainer.innerHTML = `<p class="absolute-text">Showing ${models.length} model${models.length !== 1 ? "s" : ""}</p>`;
            models.forEach(model => {
                const modelCard = document.createElement('a');
                modelCard.className = 'model-card';
                modelCard.href = `model.html?model=${model.name}`;
                
                modelCard.innerHTML = `
                    <img src="${model.portrait}" class="model" />
                    <h3>${model.name}</3>
                `;
                modelContainer.appendChild(modelCard);
            });
        }

        function filterModels(letter) {
            if (letter === 'All') {
                renderModels(models);
            } else {
                const filteredModels = models.filter(model => model.name.startsWith(letter));
                renderModels(filteredModels);
            }
        }

        renderLetters();
        filterModels(defaultLetter);
    })
    .catch(error => console.error('Error loading models:', error));
