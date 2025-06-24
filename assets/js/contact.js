// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value,
                timestamp: new Date().toISOString()
            };

            // Store in localStorage (for demo purposes)
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide success message after 3 seconds and show form again
            setTimeout(() => {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'block';
            }, 3000);
        });
    }
}); 