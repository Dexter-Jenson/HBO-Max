const urlParams = new URLSearchParams(window.location.search);
const modelname = decodeURIComponent(urlParams.get('model'));

fetch('./models.json')
    .then(response => response.json())
    .then(models => {
        const model = models.find(pornstar => pornstar.name === modelname);
        if (!model) {
            console.error(modelname, 'not found');
            return;
        }

        document.title = `HBO Max | ${model.name}'s Scenes`;

        const modelContainer = document.getElementById('cover');
        modelContainer.innerHTML = `
            <h1>${model.name}</h1>
            <img src="${model.landscape}">
        `;

        const scenesContainer = document.getElementById('scenes');
        fetch('./scenes.json')
        .then(response => response.json())
        .then(videos => {
            const filteredVideos = videos.filter(video => model.videoID.includes(video.id));
    
            filteredVideos.forEach(video => {
                const sceneCard = document.createElement('a');
                sceneCard.className = 'video-card';
                sceneCard.href = `scene.html?sceneID=${video.id}`;
                sceneCard.addEventListener('click', () => {
                    window.location.href = `scene.html?sceneID=${encodeURIComponent(video.id)}`;
                });
    
                sceneCard.innerHTML = `
                    <img src="${video.cover}">
                    <h2>${video.title}</h2>
                `;
                scenesContainer.appendChild(sceneCard);
            });
        })
    
    })