import fs from 'fs'

export function fetchScreenshots(hostUrl, appName)
{
    let screenshot_dict = []
    const screenshotFolder = './screenshot-manager/screenshots/'
    try{
        const files = fs.readdirSync(screenshotFolder);
            files
                .filter(file => file.includes(appName))
                .map(function (file) {
                    return {
                        name: hostUrl+file,
                        time: fs.statSync('./screenshot-manager/screenshots/' + file).mtime.getTime()
                    }
                })
                .sort(function(firstImg, secondImg){return secondImg.time - firstImg.time})
                .map(function (sortedImage) {
                    return {
                        name: sortedImage.name,
                        time: new Date(sortedImage.time).toISOString().replace('T', ' ')
                    }
                })
                .forEach(mappedFile => screenshot_dict.push(mappedFile))
        return screenshot_dict
    }
    catch (e) {
        console.log(e)
        return e;
    }

}