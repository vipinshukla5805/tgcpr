export function ImportDataValidation(data, existingTableData) {
    var counter = 0;

    if (data[0][0] === '' || data[0][1] === '' || data[0][2] === '' ||  data[0][3] === ''  || data[0][4] === '' || data[0][5] === '') {
        return { isValid : false, reason : "Header titles are not defined" };
    }

    if (data[0][0].toLowerCase().replace(/ /g,'') !== 'barcode' || 
          data[0][1].toLowerCase().replace(/ /g,'') !== 'sampletype' ||
          data[0][2].toLowerCase().replace(/ /g,'') !== 'volume' ||
           data[0][3].toLowerCase().replace(/ /g,'') !== 'uom' || 
             data[0][4].toLowerCase().replace(/ /g,'') !== 'sponser' ||
               data[0][5].toLowerCase().replace(/ /g,'') !== 'study'
             ) {
          return { isValid : false, reason : "Header titles are not correct. Please Update." };
     }
      
     for(let i=1;i< data.length;i++) {
        if(data[i][0] === '' || data[i][0] === undefined) {
            return { isValid : false, reason : 'Barcode is empty in ' + (i+1) +  ' row of excel' };
        }
      }
     

      for(let i=1;i< data.length;i++) {
         for(let j=1;j<data.length;j++) {
            if (data[i][0] === data[j][0]) {
                    if (counter > 1) {
                         return { isValid : false, reason : "Duplicate Barcodes on " + (j+1) + " and " + (i+1) + " rows"};
                      }
                      counter++;
            }
         }
      }

    for(let i=0; i< existingTableData.length; i++) {
        for(let j=0; j< data.length; j++) {
                if(existingTableData[i].barcode === data[j][0]) {
                   return { isValid : false, reason : "Duplicate Barcodes on " + (i+1) + " row of table and " + (j+1) + " row of sheet"};
                }
        }
     }  

      return { isValid : true, reason : "Data is as expected." };
 } 