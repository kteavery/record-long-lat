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

export function clear_marks(name) {
  //remove previous markers
  let prev_markers = document.getElementsByClassName('marker')
  while (prev_markers.length > 0) {
    prev_markers[0].parentNode.removeChild(prev_markers[0])
  }

  fs.readFile(image_path + '/output.csv', 'utf8', function(err, data) {
    if (err) throw err
    // Get array of comma separated lines
    let lines = data.split('\n')
    // Turn that into a data structure we can parse (array of arrays)
    let linesArr = lines.map(line => line.split(','))
    // Use filter to find the name then return only those that don't match
    // Join then into a string with new lines
    let output = linesArr.filter(line => line[0] !== name).join('\n')
    fs.writeFile(image_path + '/output.csv', output)
  })
}

export function mark(event, name) {
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
  let data = [
    name.substring(name.lastIndexOf('/') + 1).slice(2, 25),
    pos_x,
    pos_y,
    flag_bool,
  ]

  fs.appendFile(image_path + '/output.csv', data + '\n', err => {
    if (err) throw err
  })
  console.log(data)

  return data
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
      image.onclick = function(e) {
        mark(e, `file://${imgs[j]}`)
      }
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
