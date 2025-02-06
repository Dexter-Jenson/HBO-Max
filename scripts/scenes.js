const categories = ["none", "anal", "anal creampie", "facial", "creampie", "cum swap", "cumshot", "dp", "fmf", "foursome", "gangbang", "mfm", "orgy", "squirt", "straight", "threesome"];

const urlParams = new URLSearchParams(window.location.search);
const defaultLetter = urlParams.get('category') || 'none';

fetch('json/scenes.json')
    .then(response => response.json())
    .then(scenes => {
        const categoriesContainer = document.getElementById('categories');
        const sceneContainer = document.getElementById('scene-container');

        function renderCategories() {
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.dataset.category = category;
                button.addEventListener('click', () => {
                    document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    filterScenes(category);
                });

                if (category === defaultLetter) button.classList.add('active');
                categoriesContainer.appendChild(button);
            });
        }

        function renderScenes(scenes) {
            sceneContainer.innerHTML = `<p class="absolute-text">Showing ${scenes.length} scene${scenes.length > 1 ? "s" : ""}</p>`;
            scenes.forEach(scene => {
                const sceneCard = document.createElement('a');
                sceneCard.className = 'scene-card';
                sceneCard.href = `scene.html?sceneID=${scene.id}`;
                sceneCard.addEventListener('click', () => {
                    window.location.href = `scene.html?sceneID=${encodeURIComponent(scene.id)}`;
                });

                sceneCard.innerHTML = `
                    <div class="image-container">
                        <img src="${scene.cover}" class="scene" />
                        <img src="assets/overlay-scene.png" class="overlay" />
                    </div>
                    <p>${scene.production}</p>
                    <h3>${scene.title}</h3>
                `;
                sceneContainer.appendChild(sceneCard);
            });
        }

        function filterScenes(category) {
            if (category === 'none') {
                renderScenes(scenes);
            } else {
                const filteredScenes = scenes.filter(scene => scene.tags.includes(category));
                renderScenes(filteredScenes);
            }
        }
        renderCategories();
        filterScenes(defaultLetter);
    })
    .catch(error => console.error('Error loading scenes:', error));
