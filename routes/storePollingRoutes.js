import express from 'express'

const router = express.Router();
import * as controller from '../controllers/storePollingController.js'

router.route('/manageStoreUrls')
    .put(controller.add_page_to_track)
    .delete(controller.remove_page_from_tracking);

/**
 * @swagger
 * /trackedUrls:
 *   get:
 *     description: Get Urls that are already tracked
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Failure
 *
 */
router.route('/trackedUrls')
    .get(controller.get_tracked_urls)


/**
 * @swagger
 * /appData:
 *   get:
 *     description: Get data for all Apps
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Failure
 *
 */
router.route('/appData')
    .get(controller.get_data_for_apps)


router.route('/appImages')
    .post(controller.get_images_for_app)

router.route('/settings')
    .put(controller.configurePollingRate)

export {router}