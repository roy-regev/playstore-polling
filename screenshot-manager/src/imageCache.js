import NodeCache from "node-cache";
const myCache = new NodeCache()


export function update_cache(app_name)
{
    let data_in_cache = myCache.get(app_name)
    if (data_in_cache!= undefined)
    {
        myCache.set(app_name, data_in_cache + 1)
    }
    else
    {
        myCache.set(app_name, 1);
    }
}

export function get_data_from_cache()
{
    let allData = []
    myCache.keys().forEach(key => {
        let imageData = myCache.get(key)
        allData.push({name: key, totalImages: imageData})
    })

    return allData

}