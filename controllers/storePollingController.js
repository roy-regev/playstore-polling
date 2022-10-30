const appArray = []
const playStoreUrl = 'https://play.google.com/store/apps/details?id='
import * as fetcher from '../screenshot-manager/src/fetcher.js'
import cron  from 'node-cron'
import * as cache from '../screenshot-manager/src/imageCache.js'
import * as imageParser from '../screenshot-manager/src/fileParser.js'
let cronExpression = '*/1 * * * *'

//TODO: implement update mechanism for all the currently tracked apps,
// so that their scheduler will work according to the new cron expression.
export function configurePollingRate (req, res) {
    cronExpression = req.body['cron_expression']

    return res.status(200).json({
            message: `Successfully changed cron expression to: ${cronExpression}`
        }
    )
}


export function get_tracked_urls (req, res) {
    return res.status(200).json({
       appArray
    });
}

export function get_data_for_apps (req, res) {
    let allApps = cache.get_data_from_cache()

    return res.status(200).json({
        AppImageCount: allApps
    });
}

export function get_images_for_app (req, res) {
    let serverUrl = req.protocol + '://' + req.get('host') + '/'
    let data = imageParser.fetchScreenshots(serverUrl, req.body['app_name'])

    return res.status(200).json({
        data
        }
    )
}

export function add_page_to_track  (req, res) {
    let receivedUrl = req.body['url']
    if (!receivedUrl.startsWith(playStoreUrl)) {
        receivedUrl.concat(playStoreUrl)
    }

    if (appArray.includes(receivedUrl)) {
        return res.status(500).json(
            {
                message: "App is already tracked!"
            })
    } else {
        appArray.push(req.body['url'])

        cron.schedule(cronExpression, async () => {
            await fetcher.capture_screenshot(receivedUrl)
        })

        return res.status(200).json({
            message: `Added URL to tracking list`
        });
    }
}

export function remove_page_from_tracking  (req, res) {
    let receivedUrl = req.body['url']
    if (!receivedUrl.startsWith(playStoreUrl)) {
        receivedUrl.concat(playStoreUrl)
    }

    if (!appArray.includes(receivedUrl)) {
        return res.status(500).json(
            {
                message: "App is not tracked!"
            })
    } else {
        const elementIndex = appArray.indexOf(req.body['url'])
        appArray.splice(elementIndex, 1)

        return res.status(200).json({
            message: `Removed URL from tracking list`
        });
    }
}


