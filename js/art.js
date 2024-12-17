$(document).ready(function(){
        parseArtCSV('categories');
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
                        console.log(dataObject);
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