document.addEventListener('DOMContentLoaded', () => {
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progress-bar');

    let currentStepIndex = 0;
    const totalSteps = formSteps.length;

    // Function to update the UI based on currentStepIndex
    function updateFormState() {
        // 1. Update Progress Bar
        const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // 2. Update Step Classes for Animation
        formSteps.forEach((step, index) => {
            // Reset classes first
            step.classList.remove('active-step', 'next-step', 'prev-step');

            if (index === currentStepIndex) {
                // The step currently ON screen
                step.classList.add('active-step');
            } else if (index > currentStepIndex) {
                // Steps waiting OFF screen to the RIGHT
                step.classList.add('next-step');
            } else {
                // Steps gone OFF screen to the LEFT
                step.classList.add('prev-step');
            }
        });

        // 3. Update Button States
        // Disable "Previous" if on first step
        prevBtn.disabled = currentStepIndex === 0;

        // Change "Next" to "Submit" on last step
        if (currentStepIndex === totalSteps - 1) {
            nextBtn.textContent = 'Submit Application';
            nextBtn.classList.add('btn-submit-mode'); // Optional: add class for different styling
        } else {
            nextBtn.textContent = 'Next Step';
            nextBtn.classList.remove('btn-submit-mode');
        }
    }

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', () => {
        if (currentStepIndex < totalSteps - 1) {
            currentStepIndex++;
            updateFormState();
        } else {
            // Handle final submission here
            // For demo: just show an alert and reset
            alert("Application Submitted successfully! (Demo)");
            // Optional: Reset to start
            // currentStepIndex = 0;
            // updateFormState();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updateFormState();
        }
    });

    // Initialize the form on load
    updateFormState();
});