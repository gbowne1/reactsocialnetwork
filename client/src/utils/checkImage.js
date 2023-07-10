/**
 * Checks if an imageUrl points to a valid image.
 * If it does it sets that image as state using hook as callback function.
 * If it does not it defaults to setting a placeholder image instead.
 *
 * @param imageUrl
 * @param setImageUrl
 * @param placeholderImageUrl
 * @param logs
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
