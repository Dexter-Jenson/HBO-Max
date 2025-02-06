document.addEventListener('DOMContentLoaded', () => {
    const cover_scene = document.getElementById('cover-scene');
    fetch('json/scenes.json')
        .then(res => res.json())
        .then(scenes => {
            const scene = scenes[0];

            cover_scene.innerHTML = `<a><img src="${scene.cover}" /></a>`;

            const scene_info = document.getElementById('scene-info');

            scene_info.innerHTML = `
                <h1>${scene.title}</h1>
                <div>
                    <a class="button" href="scene.html?sceneID=${encodeURIComponent(scene.id)}">
                        <img src="assets/gotoscene.png" />
                    </a>
                    <p>TV-MA</p>
                    <p>HD</p>
                    <p>${scene.production}</p>
                </div>
                <div id="description">
                    <p>As the soft glow of candlelight flickers across the room, two lovers find themselves drawn into an irresistible moment of passion. Their eyes lock, anticipation thick in the air. Hands explore eagerly and trailing over sensitive skin, sending shivers of pleasure down their spines.</p>
                </div>
            `;

            const tags = document.createElement('ul');
            tags.innerHTML = `
                ${scene.tags.map(tag => `
                    <li><a href="scenes.html?category=${encodeURIComponent(tag)}">${tag}</a></li>
                `).join('')}
            `;

            document.getElementById('description').appendChild(tags);
        })
})

document.addEventListener('DOMContentLoaded', () => {
    fetch('json/scenes.json')
        .then(res => res.json())
        .then(data => {
            const scenes = data.slice(0, 7);
            const recentScenes = document.getElementById('recent-scenes');

            scenes.forEach(scene => {
                const sceneCard = document.createElement("a");
                sceneCard.href = `scene.html?sceneID=${scene.id}`;
                sceneCard.className = "scene-card";
                sceneCard.innerHTML = `
                    <div class="image-container">
                        <img src="${scene.cover}" />
                        <img src="assets/overlay-scene.png" class="overlay" />
                    </div>
                    <p>${scene.production}</p>
                    <h3>${scene.title}</h3>
                `;
                recentScenes.appendChild(sceneCard);
            })
        })
})


document.querySelectorAll('.category').forEach(container => {
    const hoverImage = container.getAttribute('data-hover');
    const originalImage = container.style.backgroundImage;

    container.addEventListener('mouseover', () => {
        container.style.backgroundImage = `url(${hoverImage})`;
    });

    container.addEventListener('mouseout', () => {
        container.style.backgroundImage = originalImage;
    });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('json/models.json')
        .then(res => res.json())
        .then(data => {
            const models = data.slice(0, 10);
            const topmodels = document.getElementById('top-models');

            models.forEach(model => {
                const modelCard = document.createElement("a");
                modelCard.href = `model.html?model=${model.name}`;
                modelCard.className = "model-card";
                modelCard.innerHTML = `
                    <div class="image-container">
                        <img src="${model.portrait}" class="model" />
                        <img src="assets/overlay-model.png" class="overlay" />
                    </div>
                    <h3>${model.name}</h3>
                `;
                topmodels.appendChild(modelCard);
            })
        })
})
