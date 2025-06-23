// ===== IMAGE OPTIMIZATION & LAZY LOADING (ID 11) =====

/**
 * Image Optimization Manager
 * Handles lazy loading, responsive images, and performance optimizations
 */
class ImageOptimization {
  constructor() {
    this.lazyImages = [];
    this.imageObserver = null;
    this.init();
  }

  init() {
    // Setup lazy loading observer
    this.setupLazyLoading();

    // Setup responsive image handlers
    this.setupResponsiveImages();

    // Setup WebP support detection
    this.detectWebPSupport();

    // Setup image error handling
    this.setupImageErrorHandling();
  }

  /**
   * Setup Intersection Observer for lazy loading
   */
  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      this.imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              this.loadImage(img);
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.01,
        },
      );

      // Observe all lazy images
      this.observeLazyImages();
    } else {
      // Fallback for older browsers
      this.loadAllImages();
    }
  }

  /**
   * Observe images with lazy loading
   */
  observeLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      this.imageObserver.observe(img);
    });
  }

  /**
   * Load individual image
   */
  loadImage(img) {
    // Add loading class
    img.classList.add("image-loading");

    // Create a new image to preload
    const imageLoader = new Image();

    imageLoader.onload = () => {
      // Image loaded successfully
      img.classList.remove("image-loading");
      img.classList.add("loaded");
      img.style.opacity = "1";
    };

    imageLoader.onerror = () => {
      // Handle image load error
      this.handleImageError(img);
    };

    // Start loading
    if (img.dataset.src) {
      img.src = img.dataset.src;
      imageLoader.src = img.dataset.src;
    } else if (img.src) {
      imageLoader.src = img.src;
    }
  }

  /**
   * Handle image loading errors
   */
  handleImageError(img) {
    img.classList.remove("image-loading");
    img.classList.add("image-error");

    // Set fallback image or placeholder
    if (!img.dataset.fallback) {
      img.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuP28gZGlzcG9uw612ZWw8L3RleHQ+Cjwvc3ZnPgo=";
      img.alt = "Imagem não disponível";
    }
  }

  /**
   * Setup responsive image handling
   */
  setupResponsiveImages() {
    // Handle picture elements
    const pictures = document.querySelectorAll("picture");
    pictures.forEach((picture) => {
      this.optimizePicture(picture);
    });

    // Handle srcset images
    const srcsetImages = document.querySelectorAll("img[srcset]");
    srcsetImages.forEach((img) => {
      this.optimizeSrcsetImage(img);
    });
  }

  /**
   * Optimize picture elements
   */
  optimizePicture(picture) {
    const sources = picture.querySelectorAll("source");
    const img = picture.querySelector("img");

    if (sources.length > 0 && img) {
      // Add responsive behavior
      picture.classList.add("responsive-picture");
      img.classList.add("responsive-image");
    }
  }

  /**
   * Optimize srcset images
   */
  optimizeSrcsetImage(img) {
    // Add responsive class
    img.classList.add("responsive-image");

    // Optimize loading
    if (!img.loading) {
      img.loading = "lazy";
    }
  }

  /**
   * Detect WebP support
   */
  async detectWebPSupport() {
    const webpSupported = await this.supportsWebP();

    if (webpSupported) {
      document.documentElement.classList.add("webp-supported");
    } else {
      document.documentElement.classList.add("webp-not-supported");
    }
  }

  /**
   * Check if browser supports WebP
   */
  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }

  /**
   * Setup global image error handling
   */
  setupImageErrorHandling() {
    document.addEventListener(
      "error",
      (e) => {
        if (e.target.tagName === "IMG") {
          this.handleImageError(e.target);
        }
      },
      true,
    );
  }

  /**
   * Load all images (fallback for older browsers)
   */
  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      this.loadImage(img);
    });
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages() {
    const criticalImages = [
      "assets/images/favicon.svg",
      "assets/images/hero-task-preview.svg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize image based on device capabilities
   */
  optimizeForDevice() {
    const pixelRatio = window.devicePixelRatio || 1;
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    // For high DPI displays
    if (pixelRatio > 1.5) {
      document.documentElement.classList.add("high-dpi");
    }

    // For slow connections
    if (connection && connection.effectiveType === "slow-2g") {
      document.documentElement.classList.add("slow-connection");
    }
  }

  /**
   * Update lazy loading for dynamically added images
   */
  updateLazyLoading() {
    this.observeLazyImages();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.imageOptimization = new ImageOptimization();
});

// Update when new content is added
document.addEventListener("contentLoaded", () => {
  if (window.imageOptimization) {
    window.imageOptimization.updateLazyLoading();
  }
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = ImageOptimization;
}
