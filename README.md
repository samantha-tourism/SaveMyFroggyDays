# Welcome to SaveMyFroggyDays

This project let you know where you can go or what you can do even if it's raining.

## Different step to use this website localy

### 1 - Npm
Once you clone this repo github, type on your terminal 'npm i' to get all the modules you need for this project

### 2 - Get the two differents API Keys

#### -For the Meteo API : Go to this website https://openweathermap.org/api, create an account and then you can get your API key
Create a file ApiKeyMeteo.js in the component repository, like this :\
const ApiKey = {yourApiKey}\
export default ApiKey;\
Then you're ready for that one

#### -For the Tourism API : Go to this website https://opentripmap.io/product then create an account and request an API key
Create a file ApiKeyTourism.js in the component repository, like this :\
const APIKEY = {yourApiKey}\
export default APIKEY;\
And now, you have all you need 

### 3 - Start the server
After following the 2 previous step, you're ready to see what you can do for your sunny or rainy day, just write 'npm start' on your terminal and enjoy !


FroggyDevs
