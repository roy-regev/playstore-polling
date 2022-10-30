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
**Tip**: You can get all the trackewd apps with the tracedUrls route, and then take from that one an ID of an app you want to check.

* localhost:5000/settings - This app allows you to change any setting in theory, but right now it's not smart. It only allow sto change the Cron expression for how frequently screenshots are taken:
{
"cron_expression": */2 * * * *
}

TODO: Implement 100% of Swagger, some validations for each route (what happens if I send a badly formatted URL?).

How would I deploy this on the cloud? I would create a Docker image, including the relevant dependency which is really just NodeJS. Then, I would deploy the image on some cloud based platform, like Kubernetes, and I guess that is the general idea. I also like the idea, because right now I'm using node-cache for my cache, but what if I decide to use Redis? What if I want to save my images in some DB? Adding those dependencies would be very easy to maintain and deploy with Docker!
