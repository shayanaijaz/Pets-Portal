# Pets-Portal

Link to app: https://pets-portal.herokuapp.com/pets

This is the front-end for the Pets application and it communicates with te Pets API to retrieve and display information. There are 3 pages in this web application. 

**Pets Page -** This is the main page of the application and displays the index of pets curerntly stored in the database. It displays their name, type, and breed and also has a link to view additional details about each pet. 

**New Pets Page -** This is the page used for adding a new pet. All the fields on this page are required. The user enters a name for the pet as well as a type which can either be a dog or a cat. Upon selection of a type, a request is send to eithe the Dog API or Cat API and a list of breeds for the selected animal is retrieved and populated in the Breeds dropdown which the user can choose from. The user can then enter a location into the location field. Clicking out of the location field will auto populate the latitude and longitude fields using the OpenCage geocoder API. Lastly, the user also uploads an image of the pet. 

**Pet Details Page -** This page displays weather a pet would need an umbrella or not based on the forecast of the location entered by the user when registering the pet. The page also displays the image of the pet that was uploaded by the user. 

# Technologies Used 

- React
- React Bootstrap
- Typescript