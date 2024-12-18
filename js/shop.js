var shopcreated=false;
var shopdata;
$(document).ready(function(){
        $('#returnshopbutton').click(function(){
                $('#shopbutton').click();
        })
})
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
                switch (d[8]) {
                        case 'a':
                                status = '<span style="color:#0F0;">Available</span>';
                        break;
                        case 'cs':	
                                status = '<span style="color:#0CF;">Coming Soon!</span>';
                                thumbstyle = 'style="cursor:default"';
                                clickable="0";
                        break;
                        case 'so':
                                status = '<span style="color:#FAC;">Sold Out</span>';
                        break;
                }
                
                html += `<div class="shopthumbflex">
                                <img class="shopthumb" `+thumbstyle+` data-category="`+category+`" data-clickable="`+clickable+`" data-status="`+d[8]+`" data-index="`+i+`" src="images/shop/`+category+`/t/`+d[9]+`">
                        <div class="shopthumbtitle"><div>`+d[0]+`</div><div class="shopstatus">`+capitalize(category)+`</div><div class="shopstatus">`+status+`</div></div>
                </div>`;
            }
        }
        $('#shopitems').html(html);
        $('.shopthumb').each(function(){
                var clickable = $(this).attr('data-clickable');
                if(parseInt(clickable) == 1)
                {
                        $(this).click(function(){
                                showShopItem($(this).attr('data-index'));
                        })
                }
        })
}
function showShopItem(index)
{
        index = parseInt(index);
        var data = shopdata[index];
        var category = data[1];
        console.log(shopdata[index]);
        $('#shoppage').css('display', 'none');
        $('#shopitemview').css({'display' : 'block', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
        $('.shopitemtitle').html(data[0]);
        $('#shopitemimagelink1').attr('href', 'images/shop/'+category+'/'+data[8]);
        $('#shopitemimage1').attr('src', 'images/shop/'+category+'/'+data[8]);
        if(data[10] != '')
        {
                $('#shopitemimagelink2').attr('href', 'images/shop/'+category+'/'+data[10]);
        }
        else
        {
                $('#shopitemimagelink2').removeAttr('data-lightbox'); 
        }
        if(data[11] != '')
        {
                $('#shopitemimagelink2').attr('href', 'images/shop/'+category+'/'+data[11]);
        }
        else
        {
                $('#shopitemimagelink3').removeAttr('data-lightbox');  
        }
        $('.shopitemdescription').html(data[12]);
        var shoptable = '';
        shoptable += `<tr>
                <td class="tdr">Category</td>
                <td>`+capitalize(category)+`</td>
        </tr>`;
        if(data[2] != '')
        {
                shoptable += `<tr>
                        <td class="tdr">Edition</td>
                        <td>`+data[2]+`</td>
                </tr>`;
        }
        $('#shopdatatable').html(shoptable);
}