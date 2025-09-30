document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".who-we-are, .our-story, .team, .mission");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }, { threshold: 0.5 }); // Trigger when 10% of the element is visible

    elements.forEach(element => observer.observe(element));
});