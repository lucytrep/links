# LINKS — Sustainable Architecture & Living Spaces

This is my fourth webpage project for Typography and Interaction. It’s built with HTML, CSS, and JavaScript, and it pulls live content from the Are.na API to create a dynamic, multi-page reference site.

The project is a curated collection that focuses on sustainable materials in architecture, particularly in residential design. I wanted to explore how low-carbon, renewable, and durable materials influence both the design and performance of living spaces. The site features images, articles, PDFs, videos, and audio content directly sourced from Are.na.

Some of the materials highlighted include bamboo, hempcrete, rammed earth, mass timber, reclaimed wood, cork, straw bale, recycled steel, and newer bio-based systems like mycelium. I was interested in looking at how these materials move from idea to construction, and how they shape real homes.

The goal of the site is to act as a resource for research and inspiration. Each section focuses on a different aspect, materials, built houses, details, finishes- so the content feels organized but still exploratory.

**Structure**

- Home — animated carousel of all blocks displayed as house-shaped cards
- Build — full collection overview with description and modal detail view
- Materials, Houses, Inspirations, Resources, Details, Finishes, keyword-filtered category pages
- About — project description with an image grid pulled from Are.na

**Tools and Techniques Used**

- Connected to the Are.na API (v3) to fetch and render live block content (image, text, link, video, audio, and PDF types)
- Built a keyword-based filtering system using window.location.pathname and includes() to display only relevant blocks on each page
- Used chained ternary operators to assign categories and handle media rendering
- Created a modal using the native HTML <dialog> element, triggered by click events
- Used clip-path: polygon() on the home carousel to shape the cards like houses
- Built a continuously looping carousel animation using @keyframes and translateX
- Used CSS variables for colors, spacing, typography, and borders to keep the system consistent
- Shared global styles through common.css to keep layout and structure unified
- Used aspect-ratio: 1/1 and object-fit: cover to keep all blocks visually consistent

Shoutout to my coding tutors!
