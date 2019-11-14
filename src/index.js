import { fs } from './system/fs'

fs.writeFile('output.csv', 'x,y\n', err => {
  if (err) throw err
})

let next = document.getElementById('next-button')
next.onclick = next_refresh

let prev = document.getElementById('prev-button')
prev.onclick = prev_refresh

let clear = document.getElementById('clear-button')
clear.onclick = clear_marks

var pics = []
let i = -1

// console.log(fs.readdirSync('Users'))
var path = require('path')
console.log(__dirname)
get_directories('/Users/Kate/workspace/record-long-lat/data', content => {
  console.log(content)
})

// fs.readdirSync(
//   '\\Users\\Kate\\workspace\\record-long-lat\\data',
//   (err, dir) => {
//     console.log(dir)
//     for (let filePath of dir) {
//       console.log(filePath)
//     }
//   },
// )

// fs.readdirSync('file:///Users/Kate/workspace/record-long-lat/data').forEach(
//   file => {
//     console.log(file)
//     pics.append([file])
//   },
// )

// var pics = [
//   [
//     "url('data/01KEAX20150801_112031_V06_Reflectivity.png')",
//     "url('data/01KAKQ20150801_101421_V06_Rho_HV.png')",
//   ],
//   [
//     "url('data/01KEAX20150801_112031_V06_Reflectivity.png')",
//     "url('data/01KEAX20150801_112031_V06_Reflectivity.png')",
//   ],
//   [
//     "url('data/01KAKQ20150801_101421_V06_Rho_HV.png')",
//     "url('data/01KAKQ20150801_101421_V06_Rho_HV.png')",
//   ],
// ]

function next_refresh() {
  if (i < pics.length) {
    i++
  }
  console.log('NEXT:')
  console.log(i)
  refresh_page(pics[i])
}

function prev_refresh() {
  if (i > 0) {
    i--
  }
  console.log('PREVIOUS:')
  console.log(i)
  refresh_page(pics[i])
}

function get_directories(path, callback) {
  fs.readdir(path, function(content) {
    callback(content)
  })
}

function mark(event) {
  //get the position
  let pos_x = event.offsetX ? event.offsetX : event.pageX
  let pos_y = event.offsetY ? event.offsetY : event.pageY

  //create and add a new marker
  let marker = document.createElement('p')
  marker.setAttribute('class', 'marker')
  let text = document.createTextNode(pos_x + ', ' + pos_y)
  marker.appendChild(text)

  document.pointform.append(marker)

  // write to csv
  let data = [pos_x, pos_y]

  fs.appendFile('output.csv', data + '\n', err => {
    if (err) throw err
  })
  console.log(data)

  return [event.pageX, event.pageY]
}

function clear_marks() {
  //remove previous markers
  let prev_markers = document.getElementsByClassName('marker')
  while (prev_markers.length > 0) {
    prev_markers[0].parentNode.removeChild(prev_markers[0])
  }
}

function refresh_page(imgs) {
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

function generate_images(imgs) {
  // loop through the images
  if (imgs != undefined) {
    for (let j = 0; j < imgs.length; j++) {
      // and create a new image on the page for each one
      let image = document.createElement('div')
      image.setAttribute('class', 'image')
      //image.setAttribute('onclick', 'mark(event)')
      image.onclick = mark
      image.style.backgroundImage = imgs[j]
      //console.log(imgs[i])
      image.style.backgroundRepeat = 'no-repeat'
      image.style.width = '250px'
      image.style.height = '250px'
      image.style.marginRight = '20px'

      document.getElementById('images').append(image)
    }
  }
}

function retrieve_images() {
  let image_list = []
  //get file list
  filestems.forEach(function(filestem) {
    filestem + ''
  })
  return image_list
}
