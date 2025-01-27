const categories = ["none", "anal", "anal creampie", "facial", "creampie", "cum swap", "cumshot", "dp", "fmf", "foursome", "gangbang", "mfm", "orgy", "squirt", "straight", "threesome"];

const urlParams = new URLSearchParams(window.location.search);
const defaultCategory = urlParams.get('category') || 'none';

fetch('./scenes.json')
    .then(response => response.json())
    .then(videos => {
        const categoriesContainer = document.getElementById('categories');
        const videosContainer = document.getElementById('videos');

        function renderCategories() {
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = category;
                button.dataset.category = category;
                button.addEventListener('click', () => {
                    document.querySelectorAll('.categories button').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    filterVideos(category);
                });

                if (category === defaultCategory) button.classList.add('active');
                categoriesContainer.appendChild(button);
            });
        }

        function renderVideos(filteredVideos) {
            videosContainer.innerHTML = `<p class="absolute-text">Showing ${filteredVideos.length} scene${filteredVideos.length > 1 ? "s" : ""}</p>`;
            filteredVideos.forEach(video => {
                const videoCard = document.createElement('a');
                videoCard.className = 'video-card';
                videoCard.href = `scene.html?sceneID=${video.id}`;
                videoCard.addEventListener('click', () => {
                    window.location.href = `scene.html?sceneID=${encodeURIComponent(video.id)}`;
                });

                videoCard.innerHTML = `
                    <img src="${video.cover}">
                    <h3>${video.title}</h3>
                `;

                videosContainer.appendChild(videoCard);
            });
        }

        function filterVideos(category) {
            if (category === 'none') {
                renderVideos(videos);
            } else {
                const filteredVideos = videos.filter(video => video.tags.includes(category));
                renderVideos(filteredVideos);
            }
        }
        renderCategories();
        filterVideos(defaultCategory);
    })
    .catch(error => console.error('Error loading videos:', error));
