var shopcreated=false;
var shopdata;
$(document).ready(function(){
        $('.returnshopbutton').click(function(){
                $('#shopitemview').css('display', 'none');
                $('#shopfaqview').css('display', 'none');
                $('#shoppage').css({'display' : 'block', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
        })
        $('#shopfaqbutton').click(function(){showshopfaq()})
})
function showshopfaq()
{
        $('#shoppage').css('display', 'none');
        $('#shopfaqview').css({'display' : 'block', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
}
async function createShopPage()
{
        if(shopcreated)
        {
                return;
        }
        shopcreated=true;
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
function setshopthumbindex(index)
{
        if (thumbindex == index)
        {
                return;
        }
        thumbindex = index;
        for(let i = 1; i < 4; i++) {
                $('#shopitemthumb'+i).css('border', '1px solid rgba(200,200,200,0.5)');
                $('#shopitemimage'+i).css('display', 'none');
        }
        $('#shopitemthumb'+index).css('border', '1px solid #FFF');
        $('#shopitemimage'+index).css('display', 'inline');
}
var thumbindex = 1;
function showShopItem(index)
{
        setshopthumbindex(1)
        index = parseInt(index);
        var data = shopdata[index];
        var category = data[1];
        console.log(shopdata[index]);
        $('#shoppage').css('display', 'none');
        $('#shopitemview').css({'display' : 'block', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
        $('#shopitemtitle').html(data[0]);
        $('#shopitemimagelink1').attr('href', 'images/shop/'+category+'/'+data[9]);
        $('#shopitemimage1').attr('src', 'images/shop/'+category+'/'+data[9]);
        $('#shopitemthumb1').attr('src', 'images/shop/'+category+'/t/'+data[9]).css({'border' : '1px solid #FFF',}).off('click').click(function(){
                setshopthumbindex(1);
        });
        var sthumb2=true, sthumb3=true;
        if(data[10] != '')
        {
                $('#shopitemimagelink2').attr('href', 'images/shop/'+category+'/'+data[10]);
                $('#shopitemimage2').attr('src', 'images/shop/'+category+'/'+data[10]);
                $('#shopitemthumb2').attr('src', 'images/shop/'+category+'/t/'+data[10]).css('display', 'block').off('click').click(function(){
                        setshopthumbindex(2);
                });
        }
        else
        {
                $('#shopitemimagelink2').removeAttr('data-lightbox'); 
                $('#shopitemthumb2').css('display', 'none');
                sthumb2=false
        }
        if(data[11] != '')
        {
                $('#shopitemimagelink3').attr('href', 'images/shop/'+category+'/'+data[11]);
                $('#shopitemimage3').attr('src', 'images/shop/'+category+'/'+data[11]);
                $('#shopitemthumb3').attr('src', 'images/shop/'+category+'/t/'+data[11]).css('display', 'block').off('click').click(function(){
                        setshopthumbindex(3);
                });
        }
        else
        {
                $('#shopitemimagelink3').removeAttr('data-lightbox');
                $('#shopitemthumb3').css('display', 'none');
                sthumb3=false; 
        }
        if(!sthumb2 && !sthumb3)
        {
                $('#shopitemthumb1').css('display', 'none');
        }
        else
        {
                $('#shopitemthumb1').css('display', 'block');
        }


        $('#shopitemdescription').html(data[15]);
        var shoptable = '';
        shoptable += `<tr>
                <td class="tdr">Category:</td>
                <td>`+capitalize(category)+`</td>
        </tr>`;
        if(data[7] != '')
        {
                shoptable += `<tr>
                        <td class="tdr">Size:</td>
                        <td>`+data[7]+`</td>
                </tr>`;
        }
        if(data[2] != '')
        {
                shoptable += `<tr>
                        <td class="tdr">Edition:</td>
                        <td>`+data[2]+`</td>
                </tr>`;
        }
        var status = '';
        switch (data[8]) {
                case 'a':
                        status = '<span style="color:#0F0;">Available</span>';
                        $('#purchasetable').css('display', 'block');
                break;
                case 'so':
                        status = '<span style="color:#FAC;">Sold Out</span>';
                        $('#purchasetable').css('display', 'none');
                break;
        }
        shoptable += `<tr>
                        <td class="tdr">Availability:</td>
                        <td>`+status+`</td>
                </tr>`;
        $('#shopdatatable').html(shoptable);
        $('.purchasePrice').html('$'+parseFloat(data[3]).toFixed(2));
        var purchasetable = '';
        var total;
        var shipinfo = [
                {
                        'index' : 4,
                        'region' : 'U.S.',
                },
                {
                        'index' : 5,
                        'region' : 'CAN',
                },
                {
                        'index' : 6,
                        'region' : 'INT',
                }
        ];
        for(let i = 0; i < shipinfo.length; i++) {
                var x = shipinfo[i];
                if(data[x['index']] != '')
                        {
                                total = (parseFloat(data[x['index']]) + parseFloat(data[3])).toFixed(2);
                                purchasetable += `<tr>
                                        <td class="shippingtd">`+x['region']+`</td>
                                        <td class="shippingtd" style="text-align:right;">$`+parseInt(data[x['index']]).toFixed(2)+` &rarr;</td>
                                        <td class="totaltd">$`+total+`</td>
                                        <td><div class="purchaseButton">Purchase</div></td>
                                </tr>`;
                        }
        }
        if(purchasetable != '')
        {
                purchasetable = `
                        '<tr>
                                <td>Region</td>
                                <td>Shipping</td>
                                <td>Total</td>
                                <td></td>
                        </tr>'
                ` +purchasetable;
        }
        $('#purchasetable').html(purchasetable);
        var pb = 0;
        for(let i = 12; i < 15; i++) {
                if(data[i] != '')
                {
                        $('.purchaseButton:eq('+pb+')').click(function(){
                                window.open(data[i], "_blank");
                        })
                        pb++;
                }
        }
}