var pages = ['home','art','wpaper','shop','support', 'credit'];
var currentpage=  'home';

$(document).ready(function(){
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
        parseCSV('data/patreon.csv');
        parseCSV('data/supporters.csv');
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
        Papa.parse('https://spiritsoftheuniverse.github.io/kill/' + file, {
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
                case 'data/patreon.csv':	
                        writePatreonList(dataObject);
                break;
                case 'data/supporters.csv':	
                        writeSupportersList(dataObject);
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
function writePatreonList(data)
{
        var html = `<table cellpadding="4">
                                <tr style="text-decoration:underline">
                                        <td><em>Member</em></td>
                                        <td><em>Tier</em></td>
                                </tr>
                               
                        `;
        const count = Object.keys(data).length;
        for(let i = 0; i < count; i++) {
                if(i != 0)
                {
                        var patron = data[i];
                        if(patron[3] == "Active patron")
                        {
                                var member = patron[0];
                                var tier = patron[10];
                                html += `
                                        <tr>
                                                <td class="patronShine">`+member+`</td>
                                                <td>`+tier+`</td>
                                        </tr>
                                `;
                        }
                }
        }
        html += `</table>`;
        $('#activePatrons').html(html);
}
function writeSupportersList(data)
{
        const count = Object.keys(data).length;
        for(let i = 0; i < count; i++) {
                if(i != 0)
                {
                        console.log(data[i]);
                }
        }
}