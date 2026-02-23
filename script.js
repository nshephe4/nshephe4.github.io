// Global variables
let mangaData = null;
let currentChapter = null;
let currentPage = 0;
let touchStartX = 0;
let touchEndX = 0;

// Load manga configuration data
async function loadMangaData() {
    if (mangaData) return mangaData;
    
    try {
        const response = await fetch('config.json');
        mangaData = await response.json();
        return mangaData;
    } catch (error) {
        console.error('Error loading manga data:', error);
        return null;
    }
}

// Initialize the manga reader
async function initReader(chapterId, startPage = 0) {
    const data = await loadMangaData();
    if (!data) {
        alert('Error loading manga data');
        return;
    }
    
    // Find the chapter
    currentChapter = data.chapters.find(ch => ch.id === chapterId);
    if (!currentChapter) {
        alert('Chapter not found');
        window.location.href = 'index.html';
        return;
    }
    
    currentPage = startPage;
    
    // Set up event listeners
    setupReaderControls();
    setupKeyboardNavigation();
    setupTouchNavigation();
    
    // Display the first page
    displayPage();
}

// Setup reader controls
function setupReaderControls() {
    const homeBtn = document.getElementById('home-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const clickPrev = document.getElementById('click-prev');
    const clickNext = document.getElementById('click-next');
    
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    prevBtn.addEventListener('click', () => {
        goToPreviousPage();
    });
    
    nextBtn.addEventListener('click', () => {
        goToNextPage();
    });
    
    clickPrev.addEventListener('click', () => {
        goToPreviousPage();
    });
    
    clickNext.addEventListener('click', () => {
        goToNextPage();
    });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPreviousPage();
        } else if (e.key === 'ArrowRight') {
            goToNextPage();
        } else if (e.key === 'Home') {
            window.location.href = 'index.html';
        }
    });
}

// Setup touch/swipe navigation
function setupTouchNavigation() {
    const readerContent = document.getElementById('reader-content');
    
    readerContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    readerContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

// Handle swipe gestures
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next page
            goToNextPage();
        } else {
            // Swiped right - go to previous page
            goToPreviousPage();
        }
    }
}

// Display the current page
function displayPage() {
    if (!currentChapter) return;
    
    const pageImg = document.getElementById('manga-page');
    const pageCounter = document.getElementById('page-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // Show loading indicator
    pageImg.classList.add('loading');
    loadingIndicator.classList.add('active');
    
    // Update page counter
    const totalPages = currentChapter.pages.length;
    pageCounter.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    
    // Update navigation buttons
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    // Load the page image
    const pageSrc = currentChapter.pages[currentPage];
    const img = new Image();
    
    img.onload = () => {
        pageImg.src = pageSrc;
        pageImg.classList.remove('loading');
        loadingIndicator.classList.remove('active');
        
        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.set('page', currentPage);
        window.history.pushState({}, '', url);
        
        // Preload next page for faster navigation
        preloadNextPage();
    };
    
    img.onerror = () => {
        console.error('Error loading page:', pageSrc);
        pageImg.classList.remove('loading');
        loadingIndicator.classList.remove('active');
        alert('Error loading page');
    };
    
    img.src = pageSrc;
}

// Go to the next page
function goToNextPage() {
    if (!currentChapter) return;
    
    if (currentPage < currentChapter.pages.length - 1) {
        currentPage++;
        displayPage();
    }
}

// Go to the previous page
function goToPreviousPage() {
    if (!currentChapter) return;
    
    if (currentPage > 0) {
        currentPage--;
        displayPage();
    }
}

// Preload next page for faster navigation
function preloadNextPage() {
    if (!currentChapter) return;
    
    if (currentPage < currentChapter.pages.length - 1) {
        const nextPageSrc = currentChapter.pages[currentPage + 1];
        const img = new Image();
        img.src = nextPageSrc;
    }
}
