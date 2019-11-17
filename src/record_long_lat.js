let flag_bool = false

export function flag_image() {
  if (flag_bool == false) {
    flag_bool = true
  } else {
    flag_bool = false
  }
}

export function clear_marks() {
  //remove previous markers
  let prev_markers = document.getElementsByClassName('marker')
  while (prev_markers.length > 0) {
    prev_markers[0].parentNode.removeChild(prev_markers[0])
  }
}

export function mark(event) {
  //get the position
  let pos_x = event.offsetX ? event.offsetX : event.pageX
  let pos_y = event.offsetY ? event.offsetY : event.pageY

  //create and add a new marker
  let marker = document.createElement('li')
  marker.setAttribute('class', 'marker')
  let text = document.createTextNode(pos_x + ', ' + pos_y + ', ' + flag_bool)
  marker.appendChild(text)
  document.getElementById('mark-list').appendChild(marker)

  // write to csv
  let data = [pos_x, pos_y]

  fs.appendFile('output.csv', data + '\n', err => {
    if (err) throw err
  })
  console.log(data)

  return [pos_x, pos_y]
}

export function refresh_page(imgs) {
  let prev_markers = document.getElementsByClassName('marker')
  while (prev_markers.length > 0) {
    prev_markers[0].parentNode.removeChild(prev_markers[0])
  }
  let prev_images = document.getElementsByClassName('image')
  while (prev_images.length > 0) {
    prev_images[0].parentNode.removeChild(prev_images[0])
  }

  generate_images(imgs)
}

export function generate_images(imgs) {
  // loop through the images
  if (imgs != undefined) {
    for (let j = 0; j < imgs.length; j++) {
      // and create a new image on the page for each one
      let image = document.createElement('img')
      image.setAttribute('class', 'image')
      image.onclick = mark
      image.src = imgs[j]
      //image.style.backgroundImage = imgs[j]
      image.style.backgroundRepeat = 'no-repeat'
      image.style.width = '250px'
      image.style.height = '250px'
      image.style.marginRight = '20px'

      document.getElementById('images').append(image)
    }
  }
}

export function tab() {
  document.onkeyup = function(e) {
    if (e.which == 9) {
      next_refresh()
    }
  }
}
