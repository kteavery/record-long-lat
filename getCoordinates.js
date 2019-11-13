function mark(event) {
  //get the position
  pos_x = event.offsetX ? (event.offsetX) : event.pageX ;
  pos_y = event.offsetY ? (event.offsetY) : event.pageY ;
  event.pageX.value = pos_x;
  event.pageY.value = pos_y;

  //create and add a new marker
  let marker = document.createElement('div');
  marker.setAttribute('class', 'marker');
  marker.style.top = event.pageY-5 + 'px';
  marker.style.left = event.pageX-5 + 'px';

  document.pointform.append(marker);
  
  //const fs = require('fs') 
  //let data = [event.pageX, event.pageY];

  // fs.appendFile('output.csv', data, (err) => { 
  //   if (err) throw err; 
  // })

  
  //write to csv
  let data = [[event.pageX, event.pageY]];
  console.log(data);

  var csv = 'x,y\n';
  data.forEach(function(row) {
          csv += row.join(',');
          csv += "\n";
  });

  var hiddenElement = document.getElementById("hidden");
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'data.csv';
  hiddenElement.click();

  return event.pageX, event.pageY
}

function clear_marks(){
  //remove previous markers
  let prev_markers = document.getElementsByClassName("marker");
  while(prev_markers.length > 0){
    prev_markers[0].parentNode.removeChild(prev_markers[0]);
  }
}

function refresh_page(imgs){
  // var imgs = ["url('data/01KEAX20150801_112031_V06_Reflectivity.png')",
  //             "url('data/01KAKQ20150801_101421_V06_Rho_HV.png')"];
  
  let prev_markers = document.getElementsByClassName("marker");
  while(prev_markers.length > 0){
    prev_markers[0].parentNode.removeChild(prev_markers[0]);
  }
  let prev_images = document.getElementsByClassName("image");
  while(prev_images.length > 0){
    prev_images[0].parentNode.removeChild(prev_images[0]);
  }

  generate_images(imgs);
}

function generate_images(imgs){

  // let data = "x,y\n";
  // fs.writeFile('output.csv', data, (err) => {
  //   if (err) throw err; 
  // }) 

  // loop through the images 
  if(imgs != undefined){
    for (j = 0; j < imgs.length; j++) {
      // and create a new image on the page for each one
      let image = document.createElement('div');
      image.setAttribute('class', 'image');
      image.setAttribute('onclick', 'mark(event)');
      image.style.backgroundImage = imgs[j];
      //console.log(imgs[i])
      image.style.backgroundRepeat = 'no-repeat';
      image.style.width = '250px';
      image.style.height = '250px';
      image.style.marginRight = '20px';

      document.getElementById("images").append(image);
    }
  }
}