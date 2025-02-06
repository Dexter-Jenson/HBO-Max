const urlParams = new URLSearchParams(window.location.search);
const modelname = decodeURIComponent(urlParams.get('model'));

fetch('json/models.json')
    .then(response => response.json())
    .then(models => {
        const model = models.find(pornstar => pornstar.name === modelname);

        document.title = `HBO Max - ${model.name}'s Favourite Scenes`;

        const landscape = document.getElementById('landscape');
        landscape.innerHTML = `<img src="assets/models/landscape/${model.name}.png">`;

        const details = document.getElementById('details');
        details.innerHTML = `
            <h1>${model.name}</h1>
            <p>Filled with stunning visuals that showcase her versatility—whether it’s the bold attitude of an editorial spread or the soft, intimate glow of a boudoir session. Get to know ${model.name} beyond the lens, from behind-the-scenes moments to personal favorites and upcoming projects.</p>
        `;

        const sceneContainer = document.getElementById('scene-container');

        const sceneIDs = model.videoID;

        fetch('json/scenes.json')
            .then(res => res.json())
            .then(data => {
                const scenes = data.filter(scene => sceneIDs.includes(scene.id));
                let sceneCount = 1;
                scenes.forEach(scene => {
                    const sceneElement = document.createElement('a');
                    sceneElement.href = `scene.html?sceneID=${encodeURIComponent(scene.id)}`;
                    sceneElement.className = "scene";
                    sceneElement.innerHTML = `
                        <p class="count">${sceneCount++}</p>
                        <div class="image-container">
                            <img src="${scene.cover}" />
                            <img class="overlay" src="assets/overlay-scene.png" />
                        </div>
                        <div class="detail">
                            <h2>${scene.title}</h2>
                            <div class="misc">
                                <span>TV-MA</span>
                                <span>HD</span>
                                <span>${scene.production}</span>
                            </div>
                            <p>With each breathless whisper and lingering caress, they surrender completely, riding the waves of passion until nothing else in the world exists—just them, lost in pure, uninhibited pleasure.</p>
                        </div>
                    `;
                    sceneContainer.appendChild(sceneElement);
                });
            })
    })