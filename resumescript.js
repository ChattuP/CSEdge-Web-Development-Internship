document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const livePreview = document.getElementById('livePreview');

    form.addEventListener('input', () => {
        updateLivePreview();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });

    function updateLivePreview() {
        const formData = new FormData(form);
        let previewHTML = '';

        formData.forEach((value, key) => {
            if (key !== 'template' && key !== 'format') {
                previewHTML += `<h3>${capitalizeFirstLetter(key)}</h3><p>${value}</p>`;
            }
        });

        livePreview.innerHTML = previewHTML;
    }

    function generateResume() {
        const formData = new FormData(form);
        const format = formData.get('format');
        const data = {};

        formData.forEach((value, key) => {
            if (key !== 'template' && key !== 'format') {
                data[key] = value;
            }
        });

        if (format === 'txt') {
            generateTXT(data);
        } else {
            alert(`${format} generation is not implemented yet.`);
        }
    }

    function generateTXT(data) {
        let txtContent = '';
        for (const key in data) {
            txtContent += `${capitalizeFirstLetter(key)}:\n${data[key]}\n\n`;
        }
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.txt';
        link.click();
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
