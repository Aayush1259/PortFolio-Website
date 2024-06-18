document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .nav-link');
    const backToTop = document.createElement('button');

    // Create back-to-top button
    backToTop.id = 'back-to-top';
    backToTop.innerText = '↑';
    document.body.appendChild(backToTop);

    // Intersection Observer for section animations
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-scroll-to');
            scrollToSection(sectionId);
        });
    });

    // Show/hide back-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Smooth scroll for back-to-top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Highlight current section in navigation
    const highlightNav = () => {
        let index = sections.length;

        while (--index && window.scrollY + window.innerHeight / 2 < sections[index].offsetTop + sections[index].offsetHeight / 2) {}

        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();
});

// Handle resume download button
const downloadButton = document.getElementById("download-resume");

downloadButton.addEventListener("click", function () {
    const downloadLink = document.createElement("a");
    downloadLink.href = "https://drive.google.com/file/d/1-NMuWnKHwZkZoFSqgz8Ip2Gq32eW4yd7/view?usp=sharing";
    downloadLink.download = "Aayush_Modi_Resume.pdf";
    downloadLink.click();
});

// Smooth scrolling function with improved centering
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = sectionTop - (windowHeight - sectionHeight) / 2;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
}

function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
}
