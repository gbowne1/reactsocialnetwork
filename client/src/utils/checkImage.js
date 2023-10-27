/**
 * Checks if an imageUrl points to a valid image.
 * If it does it sets that image as state using hook as callback function.
 * If it does not it defaults to setting a placeholder image instead.
 *
 * @param {string} image url of the image to check
 * @param {function} callback hooks used to set imageUrl as a state.
 * @param {string} image url for a placeholder image to fallback on in case image.onerror is called.
 * @returns {void}
 */

const checkImage = (
    imageUrl,
    setImageUrl,
    placeholderImageUrl,
    logs = false
) => {
    if (!imageUrl) imageUrl = placeholderImageUrl;

    logs && console.log(`Calling checkImage on imageUrl ${imageUrl}`);

    var image = new Image();
    image.src = imageUrl || placeholderImageUrl;

    image.onload = function () {
        if (this.width > 0) {
            logs && console.log("image exists");
            setImageUrl(imageUrl);
        }
    };
    image.onerror = function () {
        logs && console.log("image doesn't exist");
        setImageUrl(placeholderImageUrl);
    };
};

export default checkImage;
