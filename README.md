# Photo Gallery application

## Responsive photo gallery application using Pixabay's API and random background from Unsplash's API.

### Summary

This is a photo gallery app that displays images related to text that the user enters in a search bar.
The app is responsive and adjusts itself according to the screen size.

### Features

The app has several features included in it:

- The search field uses the `debounce-lodash` method, meaning the method waits a second after the user finishes typing, so that not every character the user enters will be searched, meaning there will not be many queries to the API
- Each image has 4 buttons:
  - Delete button - allows you to delete an image.
  - Rotate button - Allowing you to rotate an image, each click rotates the image 90 degrees.
  - Expansion button - Allowing you to view a larger image using a modal.
  - Drag button - Pressing the button allows the user to move any image he wants.
- I used the `react-infinite-scroll-component` so the user can scroll and look until the images run out.
- The app has a loading animation from the website: `loading.io`

### Live site

This project was deployed through the Github pages on the site: https://davidhct.github.io/photo-gallery-react/
