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
              dataObject[`Row${index}`] = row;
            });
      
            console.log(dataObject); // Log the final object
          },
          error: function(error) {
            console.error("Error parsing CSV:", error);
          }
        });
      }