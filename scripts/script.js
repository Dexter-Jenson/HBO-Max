const container = document.getElementById("slide-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentIndex = 0;
const images = document.querySelectorAll("#slide-container img");
const totalImages = images.length - 1;

function updateSlide() {
    container.style.transform = `translateX(-${currentIndex * 110}%)`;
}

function goToNext() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlide();
}

function goToPrev() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlide();
}

let autoSlide = setInterval(() => {
    goToNext();
}, 10000);



document.addEventListener("DOMContentLoaded", () => {
    const pornList = document.getElementById("porn-list");

    fetch("./scenes.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch videos.json");
            }
            return response.json();
        })
        .then((data) => {
            const videos = data.slice(0, 7);
            videos.forEach((video) => {
                const videoCard = document.createElement("a");
                videoCard.href = `scene.html?sceneID=${video.id}`
                videoCard.addEventListener('click', () => {
                    window.location.href = `scene.html?sceneID=${encodeURIComponent(video.id)}`;
                })
                videoCard.className = "video-card";

                videoCard.innerHTML = `
                <img src="${video.cover}">
                <h2>${video.title}</h2>
            `;

                pornList.appendChild(videoCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching or displaying videos:", error);
        });
});


document.querySelectorAll('.image').forEach(container => {
    const hoverImage = container.getAttribute('data-hover');
    const originalImage = container.style.backgroundImage;

    container.addEventListener('mouseover', () => {
        container.style.backgroundImage = `url(${hoverImage})`;
    });

    container.addEventListener('mouseout', () => {
        container.style.backgroundImage = originalImage;
    });
});

function navigateCategory(button) {
    const category = button.getAttribute('data-category');
    window.location.href = `scenes.html?category=${category}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const modelList = document.getElementById("model-list");

    fetch("./models.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch models.json");
            }
            return response.json();
        })
        .then((data) => {
            const models = data.slice(0, 7);
            models.forEach((model) => {
                const modelCard = document.createElement("a");
                modelCard.href = `model.html?model=${(model.name)}`;
                modelCard.className = "model-card";
                modelCard.addEventListener('click', () => window.location.href = `model.html?model=${encodeURIComponent(model.name)}`);

                modelCard.innerHTML = `
                <img src="${model.portrait}">
                <h2>${model.name}</h2>
            `;

                modelList.appendChild(modelCard);
            });
        })
        .catch((error) => {
            console.error("Error fetching or displaying videos:", error);
        });
});
