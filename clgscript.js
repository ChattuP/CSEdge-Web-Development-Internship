document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;

        if (name && email && message) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
