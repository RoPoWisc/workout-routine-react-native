# workout-routine-react-native
![alt text](https://github.com/RoPoWisc/workout-routine-react-native/blob/88498f87d18b569380865c56ff889b16fb4c7f35/assets/logo1.png "Workout routine builder logo")

## Current UI
![alt text](https://github.com/RoPoWisc/workout-routine-react-native/blob/0ca57e7c5827e3d2623dd11b10f64ea1f8e77941/assets/workout_UI.png "Workout routine builder logo")
## Project Abstract
While researching different strength training programs, we’ve found that many recommended routines have weight progression schemes that are a bit math intensive to conveniently do on the fly. To solve this problem, some have made excel spreadsheets that calculate the weight progression scheme for the next period of workout training, generally around 6-8 weeks. While this is easy to use on the computer,manipulating excel spreadsheets on a mobile device is not very convenient, and requires separately inputting exercises performed and weights done in a separate tracking app to track progress with more metrics than simply weights and reps done over a specific training period. We would like to build a mobile app that users can build workout routines in, inputting any formulas needed to calculate each day’s workout automatically, that also tracks metrics more inline with conventional workout planner apps, such as bodyweight graphs over time.

Our application will use NodeJS backend, REST APIs, Expo and React Native Kitten.

### Security Requirements
The application will have the user create an account so they will be able to access their workout routine and history from anywhere in the world they have access to the internet. By default the workout routines will be stored on their device, but they will be given the option to have it be available in the cloud.The only real information that will need to be salted/encrypted will be the password and reset and confirmation tokens. Although, we might be able to use google/apple ids, via OAuth, for this and little will be required on our end to store things securely. We may possibly add in a way for users to opt in and out if they would like to “show off” their maxes and current progress. We will also sanitize users’ inputs that will be hitting a REST APIs. (This is mainly to reduce the impact of malicious users attempting to do nosql injections attacks and other malicious behaviors.) We will also limit the exposure of the REST API. We have implemented a Bearer token for some of our endpoints to provide a more secure access to the end user.

### Server Requirements
    -> The deployment of the web application will be on Heroku Cloud Application Platform.
    -> The backend will run on NodeJS, which will require npm for some additional packages. 

    -> We will primarily rely on the following npm packages: mongoose, express, bcrypt, cookieParser, logger, express-session, connect-mongo, dotenv, bodyParser, validator, and helmet

### Data Capacity and Memory Requirements: (Web Application which will primarily be used for REST APIs)
    -> The project will rely on the free tiers of MongoDB Atlas, which has a db limit of 512mb, and Heroku, which has 512MB limit for RAM utilization.
    -> The approximate size of the web application would be for core functionality and basic web components ~50-100mb. As of iteration 2, the size of the server logic is ~117mb.
(This requirement is not a hard requirement as testers and users will not need a local copy of this running on their computer.)

### (Mobile Application)
    -> We will primarily rely on REST APIs of the web application for db functionalities and authorizations. (So the limitations will be similar to web application in terms of db limitations)
    -> The total mobile app should be around ~80mb. (This could be larger/smaller depending on feature set that is able to be implemented and the final compile size of the app via Expo compiler)


### User Requirements
    -> Will require a device that can run the latest version of Expo. As of writing Expo supports targeting iOS 10.0 and Android 5 or newer, but for the scope of testing we will require a device that is running the most recent version of iOS and Android. (This is to ensure functionality. The application could perform as expect on an earlier version of iOS or Android) 
    -> Disk space availability of ~80mb. (Subject to change)
    -> We will also need the user to be able to connect to the internet in order for the app to function as expected and communicate with Web Application. 


### To Run:
#### Get Started with Expo: https://docs.expo.io/get-started/installation/
#### install yarn: https://classic.yarnpkg.com/en/docs/install/#mac-stable
#### run the command "yarn install"
#### run the command "yarn start" 
#### can view the app on device by installing Expo Client 
    -> Open the app after you run yarn start then select tunnel option on the browser.
    -> Scan the barcode on device. The app should render on device after a couple of minutes
#### kitten resources
    ->https://docs.expo.io/tutorial/configuration/
    ->https://akveo.github.io/react-native-ui-kitten/docs/components/modal/overview#modal
    ->https://reactnativeelements.com/docs/card
#### For tests run yarn jest --coverage

#### For UI tests, checkout this repo https://github.com/eestevez123/workout-routine-builder-ui-testing.git
#### This repo runs tests using Espresso on Android Studio
#### Video of tests running: https://drive.google.com/file/d/1wamFwY21aGm3vTzVA5DtFVREkQ8BsSZh/view?usp=sharing 
