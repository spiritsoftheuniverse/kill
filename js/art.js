var artcreated = false;
async function createArtPage()
{
        if(artcreated)
        {
                return;
        }
        artcreated=true;
        const artcategorylist = [
                'categories', 
                'art_today', 
                'art_college', 
                'art_darkness', 
                'art_dreamstrata', 
                'art_earlyyears', 
                'art_lost'
              ];
            
              for (const file of artcategorylist) {
                try {
                  await parseArtCSV(file); // Wait for each file to parse
                } catch (error) {
                  console.error(`Failed to parse file: ${file}`, error);
                }
              }
}
function parseArtCSV(file) {
        return new Promise((resolve, reject) => {
          Papa.parse(`https://spiritsoftheuniverse.github.io/kill/data/${file}.csv`, {
            download: true,
            skipEmptyLines: true,
            complete: function (results) {
              const dataObject = {};
              
              results.data.forEach((row, index) => {
                dataObject[index] = row;
              });
      
              switch (file) {
                case 'categories':	
                  writeCategories(dataObject);
                  break;
                case 'art_today': 
                  writeArtThumbs('today', dataObject);
                  break;
                case 'art_college': 
                  writeArtThumbs('college', dataObject);
                  break;
                case 'art_darkness': 
                  writeArtThumbs('darkness', dataObject);
                  break;
                case 'art_dreamstrata': 
                  writeArtThumbs('dreamstrata', dataObject);
                  break;
                case 'art_earlyyears': 
                  writeArtThumbs('earlyyears', dataObject);
                  break;
                case 'art_lost': 
                  writeArtThumbs('lost', dataObject);
                  break;
                default:
                  break;
              }
      
              resolve(); // Mark this file as successfully parsed
            },
            error: function (error) {
              console.error("Error parsing CSV:", error);
              reject(error); // Mark this file as failed
            }
          });
        });
      }
function writeArtThumbs(category, data)
{
        const count = Object.keys(data).length;
        var html = '';
        for(let i = 0; i < count; i++) {
                var description  = '';
                if(data[i][2] != '')
                {
                        description  = ' - '+data[i][2]
                }
                html += `<div class="artthumbflex">
                        <a href="images/art/`+category+`/`+data[i][0]+`" data-lightbox="`+category+`" data-title="`+data[i][1]+description+`"><img class="artthumb" src="images/art/`+category+`/t/`+data[i][0]+`"></a>
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
        $('.artthumbbox[data-folder="'+category+'"]').css({'display' : 'block', 'opacity' : '0'}).animate({'opacity' : '1'}, 200);
}
