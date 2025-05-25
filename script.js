// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save the preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
}

// Check localStorage for mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Add click handlers for week cards
    document.querySelectorAll('.week-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // Initialize assignment week toggles
    document.querySelectorAll('.assignment-week-header').forEach(header => {
        header.addEventListener('click', () => {
            const weekNum = header.getAttribute('data-week');
            toggleAssignmentWeek(weekNum);
        });
    });

    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Toggle assignment week content
function toggleAssignmentWeek(weekNum) {
    const content = document.getElementById(`assignment-week-${weekNum}`);
    const arrow = document.getElementById(`assignment-arrow-${weekNum}`);
    
    content.classList.toggle('collapsed');
    arrow.classList.toggle('rotate');
}

// Handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    
    // Basic form validation
    if (!formValues.name || !formValues.email || !formValues.message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}

// Simulate file upload (for assignments section)
function simulateUpload(weekNum) {
    const fileTypes = ['PDF', 'DOCX', 'PPTX', 'ZIP'];
    const fileNames = [
        'Assignment_Report', 
        'Project_Submission', 
        'Research_Paper', 
        'Lab_Exercise', 
        'Reflection_Document'
    ];
    
    const randomFile = `${fileNames[Math.floor(Math.random() * fileNames.length)]}_Week${weekNum}.${fileTypes[Math.floor(Math.random() * fileTypes.length)]}`;
    
    const assignmentsDiv = document.getElementById(`week${weekNum}-assignments`);
    
    // Clear "no assignments" message if it exists
    if (assignmentsDiv.innerHTML.includes('No assignments uploaded yet')) {
        assignmentsDiv.innerHTML = '<ul class="assignment-list"></ul>';
    }
    
    const assignmentsList = assignmentsDiv.querySelector('.assignment-list');
    
    const newAssignment = document.createElement('li');
    newAssignment.className = 'assignment-item';
    newAssignment.innerHTML = `
        <div>
            <span class="file-icon">📄</span>
            ${randomFile}
        </div>
        <div class="file-actions">
            <button onclick="alert('Viewing file: ${randomFile}')">👁️ View</button>
            <button onclick="alert('Downloading file: ${randomFile}')">⬇️ Download</button>
            <button onclick="this.parentElement.parentElement.remove()">🗑️ Delete</button>
        </div>
    `;
    
    assignmentsList.appendChild(newAssignment);
} 