const urlParams = new URLSearchParams(window.location.search);
const sceneID = decodeURIComponent(urlParams.get('sceneID'));


fetch('json/scenes.json')
    .then(res => res.json())
    .then(scenes => {
        const scene = scenes.find(video => video.id === sceneID);

        document.title = `HBO MAX - ${scene.title}`;

        const cover = document.getElementById('cover');
        cover.src = scene.cover;

        const details = document.getElementById('details');
        details.className = "details";
        details.innerHTML = `
            <h1>${scene.title}</h1>
            <div class="misc">
                <button id="play-button"><img src="assets/play.png" /></button>
                <p>TV-MA</p>
                <p>HD</p>
                <p>${scene.production}</p>
            </div>
            <div id="description">
                <p>As the soft glow of candlelight flickers across the room, two lovers find themselves drawn into an irresistible moment of passion. Their eyes lock, anticipation thick in the air. Hands explore eagerly and trailing over sensitive skin, sending shivers of pleasure down their spines.</p>
            </div>
        `;

        function replaceWithVideo() {
            const img = document.getElementById("cover");
            const video = document.createElement("video");

            video.src = scene.path;
            video.width = img.width;
            video.autoplay = true;
            video.controls = false;
            video.muted = false;
            video.style.maskImage = "linear-gradient(to bottom, #000000ff 25%, #00000000 95%)";

            img.replaceWith(video);

            const spacer = document.getElementById('spacer');
            spacer.style.height = "0px";

            const details = document.getElementById('details');
            details.style.marginLeft = "150px";

            const separator = document.getElementById('separator');
            separator.style.height = "100px";

            const play_button = document.querySelector("#play-button");
            play_button.innerHTML = `<img src="assets/nowplaying.png" />`;
            play_button.style.opacity = "1";

            const fullscreen = document.createElement("button");
            fullscreen.className = "fullscreen";
            fullscreen.innerHTML = `<img src="assets/fullscreen-btn.png" />`;
            fullscreen.style.display = "block";
            video.after(fullscreen);

            function togglePlayPause() {
                video.controls = false;
                if (video.paused) video.play();
                else video.pause();
            }

            video.addEventListener("click", togglePlayPause);

            fullscreen.addEventListener("click", () => {
                if (video.requestFullscreen) {
                    video.requestFullscreen().catch(err => console.error("Fullscreen request failed:", err));
                    video.controls = true;
                    video.removeEventListener("click", togglePlayPause);
                    video.style.maskImage = "none";
                }
            });

            document.addEventListener("fullscreenchange", () => {
                if (!document.fullscreenElement) {
                    video.style.maskImage = "linear-gradient(to bottom, #000000ff 25%, #00000000 95%)";
                    video.addEventListener("click", togglePlayPause);
                }
            });
        }

        document.querySelector("#play-button").addEventListener("click", replaceWithVideo);

        const tags = document.createElement('ul');
        tags.innerHTML = `
            ${scene.tags.map(tag => `
                <li><a href="scenes.html?category=${encodeURIComponent(tag)}">${tag}</a></li>
            `).join('')}
        `;

        document.getElementById('description').appendChild(tags);

        fetch('json/models.json')
            .then(res => res.json())
            .then(pornstars => {
                const models = pornstars.filter(pornstars => scene.pornstars.includes(pornstars.name));

                const modelContainer = document.getElementById('models');
                models.forEach(model => {
                    const modeldiv = document.createElement('div');
                    modeldiv.className = "model"
                    modeldiv.innerHTML = `
                        <a class="image-container" href="model.html?model=${model.name}">
                            <img src="${model.portrait}" class="portrait" />
                        </a>
                        <div class="details">
                            <div class="header">
                                <h2>${model.name}</h2>
                                <a class="profile" href="model.html?model=${model.name}">View profile</a>
                            </div>
                            <div id="model-scenes"></div>
                        </div>
                    `;

                    fetch('json/scenes.json')
                        .then(res => res.json())
                        .then(videos => {
                            const allscenes = videos.filter(video => model.videoID.includes(video.id));
                            scenes = allscenes.slice(0, 2);

                            scenes.forEach(scene => {
                                const modelscenes = modeldiv.querySelector('#model-scenes');
                                const scenediv = document.createElement('div');
                                scenediv.className = "scene";
                                scenediv.innerHTML = `
                                    <a class="image-container" href="scene.html?sceneID=${scene.id}">
                                        <img src="${scene.cover}" class="scene-cover" />
                                        <img src="assets/overlay-scene.png" class="overlay" />
                                    </a>
                                    <div class="scene-details">
                                        <a class="link" href="scene.html?sceneID=${scene.id}">${scene.title}</a>
                                        <p>As the soft glow of candlelight flickers across the room, two lovers find themselves drawn into an irresistible moment of passion. Hands explore eagerly and trailing over sensitive skin, sending shivers of pleasure down their spines.</p>
                                    </div>
                                `;
                                modelscenes.appendChild(scenediv);
                            });
                        })
                    modelContainer.appendChild(modeldiv);
                });
            })
    })
