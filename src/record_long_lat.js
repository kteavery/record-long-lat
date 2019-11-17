import { fs } from './system/fs'
import { image_path } from './index'

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
  let data = [pos_x, pos_y, flag_bool]

  fs.appendFile(image_path + '/output.csv', data + '\n', err => {
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
      image.src = `file://${imgs[j]}`
      image.style.backgroundRepeat = 'no-repeat'
      image.style.minWidth = '450px'
      image.style.minHeight = '450px'
      image.style.maxWidth = '450px'
      image.style.maxHeight = '450px'
      image.style.objectFit = 'cover'

      document.getElementById('images').append(image)
    }
  }
}
