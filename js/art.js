$(document).ready(function(){
        var artcategorylist = ['categories', 'art_today', 'art_college', 'art_darkness', 'art_dreamstrata', 'art_earlyyears', 'art_lost', ];
        for(let i = 0; i < artcategorylist.length; i++) {
                parseArtCSV(artcategorylist[i]);
        }
})
function parseArtCSV(file) {
        Papa.parse('https://spiritsoftheuniverse.github.io/kill/data/' + file+'.csv', {
          download: true, // Enables downloading from the given URL
          skipEmptyLines: true, // Skip empty rows
          complete: function(results) {
            const dataObject = {};
      
            // Build the data object
            results.data.forEach((row, index) => {
              // Use the row index (or any custom logic) as the key
              dataObject[index] = row;
            });
            switch (file) {
                case 'categories':	
                        writeCategories(dataObject);
                break;
                case 'art_today' : 
                        writeArtThumbs('today', dataObject);
                break;
                case 'art_college' : 
                        writeArtThumbs('college', dataObject);
                break;
                case 'art_darkness' : 
                        writeArtThumbs('darkness', dataObject);
                break;
                default:
                break;
            }
          },
          error: function(error) {
            console.error("Error parsing CSV:", error);
          }
        });
      }
function writeArtThumbs(category, data)
{
        const count = Object.keys(data).length;
        var html = '';
        for(let i = 0; i < count; i++) {
                html += `<div class="artthumbflex">
                        <a href="images/art/`+category+`/`+data[i][0]+`" data-lightbox="`+category+`" data-title="`+data[i][2]+`"><img class="artthumb" src="images/art/`+category+`/t/`+data[i][0]+`"></a>
                        <div class="artthumbtitle">`+data[i][1]+`</div>
                </div>`;
        }
        $('.artthumbbox[data-folder="'+category+'"] .artthumbcontainer').html(html);
}
function writeCategories(data)
{
        const count = Object.keys(data).length;
        var html = '';
        for(let i = 0; i < count; i++) {
                var description = '';
                if(data[i][2] != '')
                {
                        description = `<div style="margin-bottom:8px;">`+data[i][2]+`</div>`;
                }
            html += `<div class="arthead" data-folder="`+data[i][0]+`">`+data[i][1]+`</div>
                
                <div class="artthumbbox" data-folder="`+data[i][0]+`">`+description+`<div class="artthumbcontainer"></div></div>
            `;
        }
        $('#artpage').html(html);

        $('.arthead').click(function(){
                showArtThumbs($(this).attr('data-folder'));
        })
}
function showArtThumbs(category)
{
        $('.artthumbbox').css('display', 'none');
        $('.arthead').css('color', 'inherit');
        $('.arthead[data-folder="'+category+'"]').css('color', '#FA0');
        $('.artthumbbox[data-folder="'+category+'"]').css('display', 'block');
}