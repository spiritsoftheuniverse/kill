var shopcreated=false;
async function createShopPage()
{
        if(shopcreated)
        {
                return;
        }
        shopcreated=true;
        console.log('shop page');
        parseShopCSV('shop');
}
function parseShopCSV(file) {
        return new Promise((resolve, reject) => {
          Papa.parse(`https://spiritsoftheuniverse.github.io/kill/data/${file}.csv`, {
            download: true,
            skipEmptyLines: true,
            complete: function (results) {
              const dataObject = {};
              
              results.data.forEach((row, index) => {
                dataObject[index] = row;
              });
              console.log(dataObject);
      
              resolve(); // Mark this file as successfully parsed
            },
            error: function (error) {
              console.error("Error parsing CSV:", error);
              reject(error); // Mark this file as failed
            }
          });
        });
      }