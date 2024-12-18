var pages = ['home','art','wpaper','shop','support', 'credit'];
var currentpage=  'home';

$(document).ready(async function(){
        const currentYear = new Date().getFullYear();
        $('.footerdate').html(currentYear);

        for(let i = 0; i < pages.length; i++) {
            $('#'+pages[i]+'button').click(function(){
                showPage($(this).attr('data'));
            });
        }
        $('#artclick').click(function(){
                if(currentpage != 'art')
                {
                        $('#artbutton').click();
                }
        })
        $('#whitepaperclick').click(function(){
                if(currentpage != 'wpaper')
                {
                        $('#wpaperbutton').click();
                }
        }) 
        $('#shopclick').click(function(){
                if(currentpage != 'shop')
                {
                        $('#shopbutton').click();
                }
        })
        $('#shopclick2').click(function(){
                if(currentpage != 'shop')
                {
                        $('#shopbutton').click();
                }
        })
        
        $('#shopclick3').click(function(){
                if(currentpage != 'shop')
                {
                        $('#shopbutton').click();
                }
        })
        $('#supportclick').click(function(){
                if(currentpage != 'support')
                {
                        $('#supportbutton').click();
                }
        })
        
        $('#creditclick').click(function(){
                if(currentpage != 'credit')
                {
                        $('#creditbutton').click();
                }
        })
        $('#patreonBox').click(function(){
                location.href="https://patreon.com/michaelsartwork";
        })
        $('#thgptslogo').mouseenter(function(){
                $(this).stop().animate({'opacity': 1}, 500);
        }).mouseleave(function(){
                $(this).stop().animate({'opacity': 0.5}, 500);
        })

        const files = ['data/patreon.csv', 'data/supporters.csv'];

        for (const file of files) {
                try {
                        await parseCSV(file); // Wait for each file to finish processing
                } catch (error) {
                console.error(`Failed to process file: ${file}`, error);
                }
        }
});
function showPage(page)
{
        for(let i = 0; i < pages.length; i++) {
            $('#'+pages[i]+'page').css(
                {
                        'display' : 'none',
                });
                $('#'+pages[i]+'button').css(
                {
                        'cursor' : 'pointer',
                        'pointer-events' : 'auto',
                        'color' : 'inherit',
                });
        }
        $('#'+page+'page').css('display', 'block');
        $('#'+page+'button').css({
                'cursor' : 'default',
                'pointer-events' : 'none',
                'color' : '#F00',
        });
        switch (page) {
                case 'art':
                        createArtPage()	
                break;
                case 'shop' : 
                        createShopPage();
                break;
                default:
                break;
        }
        currentpage = page;
        stopAllAudio()
}
function stopAllAudio() {
        // Select all audio elements on the page
        const audioElements = document.querySelectorAll('audio');
        
        // Loop through and stop each one
        audioElements.forEach(audio => {
          audio.pause(); // Pause the audio
          audio.currentTime = 0; // Reset to the beginning
        });
}
function parseCSV(file) {
        return new Promise((resolve, reject) => {
          Papa.parse('https://spiritsoftheuniverse.github.io/kill/' + file, {
            download: true, // Enables downloading from the given URL
            skipEmptyLines: true, // Skip empty rows
            complete: function (results) {
              const dataObject = {};
      
              // Build the data object
              results.data.forEach((row, index) => {
                // Use the row index (or any custom logic) as the key
                dataObject[index] = row;
              });
      
              // Perform actions based on the file
              switch (file) {
                case 'data/patreon.csv':	
                  writePatreonList(dataObject);
                  break;
                case 'data/supporters.csv':	
                  writeSupportersList(dataObject);
                  break;
                default:
                  break;
              }
      
              resolve(); // Signal that the file was successfully processed
            },
            error: function (error) {
              console.error("Error parsing CSV:", error);
              reject(error); // Signal a failure to process the file
            }
          });
        });
      }
function writePatreonList(data)
{
        var html = `<table cellpadding="4" cellspacing="4">
                                <tr style="text-decoration:underline">
                                        <td><em>Member</em></td>
                                        <td><em>Tier</em></td>
                                </tr>
                               
                        `;
                        var formerhtml = `<table cellpadding="4" cellspacing="4">
                        <tr style="text-decoration:underline">
                                <td><em>Member</em></td>
                                <td><em>Tier</em></td>
                        </tr>
                       
                `;
        const count = Object.keys(data).length;
        var patroncount = 0;
        for(let i = 0; i < count; i++) {
                if(i != 0)
                {
                        var patron = data[i];
                        if(patron[3] == "Active patron")
                        {
                                patroncount++;
                                var member = patron[0];
                                var tier = patron[10];
                                html += `
                                        <tr>
                                                <td class="patronShine">`+member+`</td>
                                                <td>`+tier+`</td>
                                        </tr>
                                `;
                        }
                        if(patron[3] == "Former patron")
                        {
                                var member = patron[0];
                                var tier = patron[10];
                                formerhtml += `
                                        <tr>
                                                <td>`+member+`</td>
                                                <td>`+tier+`</td>
                                        </tr>
                                `;
                        }
                }
        }
        if(patroncount == 0)
        {
                html += `
                <tr>
                        <td >-</td>
                        <td>-</td>
                </tr>
        `;
        }
        html += `</table>`;
        formerhtml += `</table>`;
        $('#activePatrons').html(html);
        $('#formerPatrons').html(formerhtml);
}
function writeSupportersList(data)
{
        var html = `<table cellpadding="4" cellspacing="4">
        <tr style="text-decoration:underline">
                <td><em>Member</em></td>
                <td><em>Date</em></td>
        </tr>
       
        `;
        const count = Object.keys(data).length;
        for(let i = 0; i < count; i++) {
                if(i != 0)
                {
                        html += `
                        <tr>
                        <td>`+data[i][0]+`</td>
                        <td>`+data[i][1]+`</td>
                        </tr>`;
                }
        }
        html += `</table>`;
        $('#supporters').html(html);
}