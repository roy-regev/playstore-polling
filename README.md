# playstore-polling

## How to use the API:

Hi. this is my Play Store App-listing-tracking API.
You can clone it to your PC, and then run the following commands:

* npm install
* npm run start

After you run these commands, the API will run on port 5000 (access it via localhost:5000).

You can go to localhost:5000/swagger and use some of the routes, but I didn't fully implement the Swagger usage.
Instead, you should use Postman or something similar in order to use most of the requests.

The API is split to several routes, including:

* localhost:5000/storePolling/manageStoreUrls - here, you can PUT the store URL you'd like to track in the body, for instance:
{
"url": "https://play.google.com/store/apps/details?id=com.kabam.bullseye"
}

You can also call it with DELETE and delete a tracked app.

* localhost:5000/storePolling/trackedUrls - GET request to receive data about all the tracked apps.
* localhost:5000/storePolling/appData : GET request that returns data about all the tracked apps (name and how many images were taken)
* localhost:5000/storePolling/appImages : POST that receives an App ID and returns all its images, sorted in a descending order with the capture date (local time zone):
{
"app_name": "com.kabam.bullseye"
}

**Tip**: You can get all the tracked apps with the trackedUrls route, and then take from that one an ID of an app you want to check.

* localhost:5000/storePolling/settings - This app allows you to change any setting in theory, but right now it's not smart. It only allows to change the Cron expression for how frequently screenshots are taken:
{
"cron_expression": */2 * * * *
}

---

**TODO**: Implement 100% of Swagger, some validations for each route (what happens if I send a badly formatted URL?), a smarter configuration system (using maybe default.json/per environement setting JSON and the ability to edit any key).
