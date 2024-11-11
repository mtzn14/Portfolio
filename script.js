.slideshow {
    position: relative;
    width: 100%;  /* Set your desired width */
    max-width: 400px;  /* Adjust the max width as needed */
    height: 300px;  /* Set your desired height */
    overflow: hidden;
}

.slideshow img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;  /* Hide all images by default */
}