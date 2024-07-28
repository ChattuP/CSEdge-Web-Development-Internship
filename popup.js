document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const wallpaperList = document.getElementById('wallpaper-list');
    const randomizeButton = document.getElementById('randomize');

    const wallpapers = [
        // List of wallpaper URLs
        'https://example.com/wallpaper1.jpg',
        'https://example.com/wallpaper2.jpg',
        'https://example.com/wallpaper3.jpg'
    ];

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        displayWallpapers(query);
    });

    randomizeButton.addEventListener('click', function () {
        const randomIndex = Math.floor(Math.random() * wallpapers.length);
        setWallpaper(wallpapers[randomIndex]);
    });

    function displayWallpapers(query) {
        wallpaperList.innerHTML = '';
        wallpapers.forEach(url => {
            if (url.toLowerCase().includes(query)) {
                const item = document.createElement('div');
                item.classList.add('wallpaper-item');
                item.innerHTML = `<img src="${url}" alt="Wallpaper">`;
                item.addEventListener('click', () => setWallpaper(url));
                wallpaperList.appendChild(item);
            }
        });
    }

    function setWallpaper(url) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `document.body.style.backgroundImage = "url('${url}')";`
            });
        });
    }

    displayWallpapers('');
});
