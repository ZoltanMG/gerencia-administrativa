async function fetchSheet(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return csvText;
};

export async function setContratos(gid) {
    let areas = {}
    const contratosUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSG7P1tkuzB5lwh3ea0M7k3XQlcHLMSvOKNIODmWBQ_0s3xzzEWSnnpND467kse-EUSXkuS3JvFKZXQ/pub?gid=${gid}&output=csv`
    const contratosSheet = await fetchSheet(contratosUrl)
    const columns = contratosSheet.split('\n').slice(1)
    const rows = columns.map((column) => column.split(','))
    rows.forEach(row => {
        areas[row[0]] = {
            path: row[0].replace('\r', ''),
            areaName: row[1].replace('\r', ''),
        }
    })
    return areas
}

function setCategories(configSheetTest) {
    let categories = {}
    const columns = configSheetTest.split('\n').slice(1)
    const rows = columns.map((column) => column.split(','))
    rows.forEach(row => {
        categories[row[0]] = {
            path: row[0].replace('\r', ''),
            categoryName: row[1].replace('\r', ''),
            gid: row[2].replace('\r', ''),
            subLevel: false
        }
    });
    return categories
}

export async function getConfigSheet() {
    let config = {
        categories: {},
        routerFiles: {}
    }
    const configSheetMainUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSG7P1tkuzB5lwh3ea0M7k3XQlcHLMSvOKNIODmWBQ_0s3xzzEWSnnpND467kse-EUSXkuS3JvFKZXQ/pub?output=csv'
    const configSheetMain = await fetchSheet(configSheetMainUrl)
    config.categories = setCategories(configSheetMain)
    const gidRouter = 1172688490
    const configSheetRouterUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSG7P1tkuzB5lwh3ea0M7k3XQlcHLMSvOKNIODmWBQ_0s3xzzEWSnnpND467kse-EUSXkuS3JvFKZXQ/pub?gid=${gidRouter}&output=csv`
    const configSheetRouter = await fetchSheet(configSheetRouterUrl)
    // Falta agregar el tema de rutas formateada
    return config
}
