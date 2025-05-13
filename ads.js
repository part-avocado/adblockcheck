// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load dynamic ads
    loadDynamicAds();
    
    // Set up tracking pixels
    setupTrackingPixels();
    
    // Display sticky ad after scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300 && !document.querySelector('.sticky-ad')) {
            createStickyAd();
        }
    });
    
    // Set cookie tracking
    setCookies();
});

// Function to load dynamic ads
function loadDynamicAds() {
    // Create in-content ads every 2 paragraphs
    const paragraphs = document.querySelectorAll('.content p');
    
    for (let i = 1; i < paragraphs.length; i += 2) {
        if (i < paragraphs.length) {
            const adDiv = document.createElement('div');
            adDiv.className = 'ad-unit dynamic-ad';
            adDiv.innerHTML = `
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                     data-ad-slot="XXXXXXXXXX"
                     data-ad-format="auto"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            `;
            paragraphs[i].parentNode.insertBefore(adDiv, paragraphs[i].nextSibling);
        }
    }
    
    // Create pop-under ad
    setTimeout(function() {
        createPopUnderAd();
    }, 5000);
    
    // Create video ad
    createVideoAd();
}

// Function to create sticky ad at the bottom of the page
function createStickyAd() {
    const stickyAd = document.createElement('div');
    stickyAd.className = 'sticky-ad';
    stickyAd.innerHTML = `
        <div class="sticky-ad-close" onclick="this.parentNode.remove()">×</div>
        <div class="sticky-ad-content">
            <p>Special Offer! Limited Time Only!</p>
            <a href="#" class="sticky-cta">Click Here</a>
        </div>
    `;
    document.body.appendChild(stickyAd);
    
    // Add styles for sticky ad
    const style = document.createElement('style');
    style.textContent = `
        .sticky-ad {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #e74c3c;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
        }
        .sticky-ad-close {
            position: absolute;
            top: 5px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
        }
        .sticky-ad-content {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .sticky-cta {
            background: white;
            color: #e74c3c;
            padding: 8px 15px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Function to create pop-under ad
function createPopUnderAd() {
    // Only on first user interaction
    function openPopUnder() {
        const popunderWindow = window.open('https://example.com', 'popunder', 'width=1000,height=800');
        if (popunderWindow) {
            popunderWindow.blur();
            window.focus();
        }
        // Remove event listener after first click
        document.removeEventListener('click', openPopUnder);
    }
    
    document.addEventListener('click', openPopUnder);
}

// Function to create video ad
function createVideoAd() {
    const videoAdContainer = document.createElement('div');
    videoAdContainer.className = 'video-ad-container';
    videoAdContainer.innerHTML = `
        <div class="video-ad-title">Sponsored Video</div>
        <div class="video-ad">
            <video width="100%" autoplay muted loop>
                <source src="https://example.com/video-ad.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="video-ad-overlay">
                <a href="#" class="video-cta">Learn More</a>
            </div>
        </div>
    `;
    
    // Add to the page after first content section
    const contentSection = document.querySelector('.content');
    contentSection.appendChild(videoAdContainer);
    
    // Add styles for video ad
    const style = document.createElement('style');
    style.textContent = `
        .video-ad-container {
            margin: 30px 0;
            position: relative;
        }
        .video-ad-title {
            background: #444;
            color: white;
            padding: 5px 10px;
            font-size: 12px;
        }
        .video-ad {
            position: relative;
        }
        .video-ad-overlay {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        .video-cta {
            background: rgba(231, 76, 60, 0.9);
            color: white;
            padding: 8px 20px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Function to setup various tracking pixels
function setupTrackingPixels() {
    // Create and append invisible tracking pixels
    const trackingPixels = [
        'https://example.com/tracking1.gif',
        'https://example.com/tracking2.gif',
        'https://analytics-service.com/pixel.gif',
        'https://ad-network.com/conversion.gif'
    ];
    
    trackingPixels.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.position = 'absolute';
        img.style.width = '1px';
        img.style.height = '1px';
        img.style.opacity = '0';
        document.body.appendChild(img);
    });
    
    // Send beacon data
    if (navigator.sendBeacon) {
        navigator.sendBeacon('https://analytics.example.com/collect', JSON.stringify({
            page: window.location.href,
            referrer: document.referrer,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent
        }));
    }
}

// Function to set tracking cookies
function setCookies() {
    // Set various tracking cookies
    document.cookie = "user_id=123456789; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
    document.cookie = "session_id=" + Math.random().toString(36).substring(2) + "; path=/";
    document.cookie = "visited=true; path=/";
    document.cookie = "ad_shown=true; path=/";
    document.cookie = "referrer=" + document.referrer + "; path=/";
    
    // Store data in localStorage as well
    localStorage.setItem('user_preferences', JSON.stringify({
        ads: true,
        tracking: true,
        personalizedAds: true
    }));
    
    // Store data in sessionStorage
    sessionStorage.setItem('session_start', new Date().toString());
    sessionStorage.setItem('ads_viewed', '0');
} 