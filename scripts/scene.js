
const urlParams = new URLSearchParams(window.location.search);
const sceneID = decodeURIComponent(urlParams.get('sceneID'));

fetch("./scenes.json")
    .then(response => response.json())
    .then(scenes => {
        const scene = scenes.find(video => video.id === sceneID);
        if (!scene) {
            console.error(scene, 'not found');
            return;
        }

        document.title = `HBO Max | ${scene.title}`;

        const videoContainer = document.getElementById('video');
        videoContainer.innerHTML = `
            <video src="${scene.path}" muted autoplay controls loop></video>
            <h1>${scene.title}</h1>
        `;

        const tagDivision = document.createElement('ul');
        tagDivision.innerHTML = `
                ${scene.tags.map(tag => `<li><a href="scenes.html?category=${encodeURIComponent(tag)}">${tag}</a></li>`).join('')}
        `;
        document.getElementById('detail').appendChild(tagDivision);

        const coverImage = document.createElement('img');
        coverImage.src = scene.cover;
        document.getElementById('misc').appendChild(coverImage)


        fetch('./models.json')
            .then(response => response.json())
            .then(models => {
                const filteredModels = models.filter(model => scene.pornstars.includes(model.name))

                const modelContainer = document.getElementById('models');

                filteredModels.forEach(model => {
                    const modelCard = document.createElement('a');
                    modelCard.href = `model.html?model=${encodeURIComponent(model.name)}`
                    modelCard.className = 'model-card';

                    modelCard.innerHTML = `
                        <img src="${model.portrait}">
                        <p>${model.name}</p>
                    `;
                    modelContainer.appendChild(modelCard);
                });

            })
    })