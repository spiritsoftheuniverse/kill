var shopcreated=false;
var shopdata;
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
              shopdata = dataObject;
              writeShopData(shopdata);
              resolve(); // Mark this file as successfully parsed
            },
            error: function (error) {
              console.error("Error parsing CSV:", error);
              reject(error); // Mark this file as failed
            }
          });
        });
}
function writeShopData(data)
{
        console.log(data);
        var html = '';
        const count = Object.keys(data).length;
        for(let i = 0; i < count; i++) {
            if(i != 0)
            {
                var d = data[i];
                console.log(d);
                var category = d[1];
                var status;
                var thumbstyle = '';
                var clickable="1"
                switch (d[7]) {
                        case 'a':
                                status = '<span style="color:#0F0;">Available</span>';
                        break;
                        case 'cs':	
                                status = '<span style="color:#0CF;">Coming Soon!</span>';
                                thumbstyle = 'style="cursor:default"';
                                clickable="0";
                        break;
                        case 'so':
                                status = '<span style="color:#FC0;">Sold Out</span>';
                        break;
                }
                
                html += `<div class="shopthumbflex">
                                <img class="shopthumb" `+thumbstyle+` data-clickable="`+clickable+`" data-index="`+i+`" src="images/shop/`+category+`/t/`+d[8]+`">
                        <div class="shopthumbtitle"><div>`+d[0]+`</div><div class="shopstatus">`+status+`</div></div>
                </div>`;
            }
        }
        $('#shopitems').html(html);
}