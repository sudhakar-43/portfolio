# Minimalistic Data Science Portfolio

A clean, professional, and modern data science portfolio built with vanilla HTML, CSS, and JavaScript. Features a beautiful light/dark theme toggle and responsive design optimized for recruiters and hiring managers.

## ✨ Features

### Design Principles
- **Minimalistic & Clean**: Ample white space and uncluttered design
- **Professional**: Polished appearance suitable for big recruiters
- **Typography**: Large, clean Inter font for excellent readability
- **Color Palette**: Neutral base with blue accent color
- **Responsive**: Mobile-first design that works on all devices

### Interactive Elements
- **🌙 Light/Dark Theme Toggle**: Seamless switching with localStorage persistence
- **📱 Responsive Navigation**: Smooth scrolling with active link highlighting
- **✨ Subtle Animations**: Scroll-triggered animations and hover effects
- **🎨 Modern UI**: Glass morphism effects and smooth transitions

### Portfolio Sections
1. **Hero Section**: Eye-catching introduction with gradient background
2. **About**: Concise personal bio with key highlights
3. **Skills**: Organized technology stack by categories
4. **Projects**: Featured projects with images, descriptions, and links
5. **Experience**: Timeline-based work and education history
6. **Contact**: Easy-to-access contact information and social links

## 🚀 Quick Start

1. **Clone or download** the repository
2. **Open `index.html`** in your web browser
3. **Customize** the content with your information
4. **Deploy** to your preferred hosting platform

## 🎨 Customization Guide

### Personal Information
Update the following in `index.html`:

```html
<!-- Hero Section -->
<h1 class="hero-title">Your Name</h1>
<p class="hero-subtitle">Your Title</p>
<p class="hero-description">Your personal tagline and description</p>

<!-- Profile Image -->
<img src="your-image-url" alt="Your Name" />

<!-- Contact Information -->
<a href="mailto:your-email@example.com" class="contact-item">
<a href="https://linkedin.com/in/yourprofile" class="contact-item">
<a href="https://github.com/yourusername" class="contact-item">
```

### Skills & Technologies
Modify the skills grid in the Skills section:

```html
<div class="skill-category">
    <h3>Your Category</h3>
    <div class="skill-items">
        <span class="skill-item">Your Skill</span>
        <!-- Add more skills -->
    </div>
</div>
```

### Projects
Update project cards with your work:

```html
<div class="project-card">
    <div class="project-image">
        <img src="your-project-image.jpg" alt="Project Name" />
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description highlighting problem, solution, and results</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
        </div>
        <div class="project-links">
            <a href="github-link" class="project-link">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="demo-link" class="project-link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
        </div>
    </div>
</div>
```

### Experience Timeline
Update your work and education history:

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Position Title</h3>
        <p class="company">Company Name</p>
        <p class="duration">Start Date - End Date</p>
        <p class="description">Brief description of role and achievements</p>
    </div>
</div>
```

## 🎨 Theme Customization

### Colors
Modify CSS custom properties in `styles.css`:

```css
:root {
  --accent-primary: #3b82f6;     /* Primary accent color */
  --accent-secondary: #10b981;   /* Secondary accent color */
  --accent-hover: #2563eb;       /* Hover state color */
}
```

### Fonts
Change the font family:

```css
body {
  font-family: 'Your-Font', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

Don't forget to update the Google Fonts link in `index.html`.

### Layout
Adjust spacing and sizing:

```css
.container {
  max-width: 1200px;  /* Maximum content width */
}

section {
  padding: 6rem 0;    /* Section vertical padding */
}
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- **768px**: Tablet layout adjustments
- **480px**: Mobile layout with simplified navigation

Mobile-specific features:
- Simplified navigation (hidden menu on very small screens)
- Stacked layout for hero section
- Single-column grids for skills and projects
- Adjusted timeline layout

## 🌟 Performance Features

- **Lightweight**: No heavy frameworks or libraries
- **Fast Loading**: Optimized images and minimal dependencies
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Debounced Scroll**: Optimized scroll event handling
- **Intersection Observer**: Efficient scroll-triggered animations

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch (usually `main`)
4. Your portfolio will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be live instantly with a custom URL

### Vercel
1. Import your GitHub repository to [Vercel](https://vercel.com)
2. Deploy with zero configuration

## 📋 Browser Support

- ✅ Chrome (60+)
- ✅ Firefox (60+)
- ✅ Safari (12+)
- ✅ Edge (79+)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and Custom Properties
- **JavaScript ES6+**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you have questions or need help customizing your portfolio, feel free to reach out or open an issue.

---

**Made with ❤️ for data scientists who want to showcase their work professionally.**