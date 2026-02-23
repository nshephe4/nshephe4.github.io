# Manga Reader Website

A mobile-friendly manga reader website designed for GitHub Pages hosting.

## Features

### Homepage
- Displays manga title and cover image
- Lists all available chapters with thumbnails
- Mobile-responsive grid layout
- Clean, dark theme design

### Reader Interface
- Page-by-page navigation with previous/next buttons
- Click/tap navigation (left side = previous, right side = next)
- Page counter (e.g., "Page 1 of 5")
- Return to homepage button
- Keyboard navigation support (arrow keys)
- Mobile swipe support (swipe left/right to navigate)
- Full-width image display optimized for reading
- Loading indicators for smooth transitions

## File Structure

```
/
├── index.html          # Homepage with chapter list
├── reader.html         # Manga reader interface
├── styles.css          # Responsive dark theme styling
├── script.js           # Navigation and functionality
├── config.json         # Manga configuration (chapters, pages)
└── manga/              # Manga images directory
    └── chapter-1/      # Chapter directory
        ├── page-1.svg
        ├── page-2.svg
        ├── page-3.svg
        ├── page-4.svg
        └── page-5.svg
```

## Adding New Chapters

1. Create a new folder in the `manga/` directory (e.g., `manga/chapter-2/`)
2. Add your manga page images to the folder (JPG, PNG, or SVG)
3. Update `config.json` to include the new chapter:

```json
{
  "mangaTitle": "Your Manga Title",
  "mangaCover": "manga/chapter-1/page-1.svg",
  "chapters": [
    {
      "id": 1,
      "title": "Chapter 1: Title",
      "thumbnail": "manga/chapter-1/page-1.svg",
      "pages": [
        "manga/chapter-1/page-1.svg",
        "manga/chapter-1/page-2.svg"
      ]
    },
    {
      "id": 2,
      "title": "Chapter 2: Title",
      "thumbnail": "manga/chapter-2/page-1.svg",
      "pages": [
        "manga/chapter-2/page-1.svg",
        "manga/chapter-2/page-2.svg"
      ]
    }
  ]
}
```

## Navigation Controls

### Desktop
- **Arrow Keys**: Left/Right to navigate between pages
- **Mouse Click**: Click left side of page to go back, right side to go forward
- **Buttons**: Use Previous/Next buttons in the navigation bar

### Mobile
- **Swipe**: Swipe left/right to navigate between pages
- **Tap**: Tap left side to go back, right side to go forward
- **Buttons**: Use Previous/Next buttons in the navigation bar

## Deployment

This website is designed for GitHub Pages. To deploy:

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the branch to deploy (usually `main`)
4. Your manga reader will be available at `https://username.github.io/repository-name/`

## Customization

- **Colors**: Edit `styles.css` to change the color scheme
- **Title**: Update `config.json` to change the manga title
- **Cover**: Set `mangaCover` in `config.json` to your cover image
- **Layout**: Modify CSS grid settings in `styles.css` for different chapter card layouts

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Feel free to use and modify this manga reader for your own projects.