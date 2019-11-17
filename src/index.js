import { fs } from './system/fs'

const path = require('path')

let flag_bool = false

fs.writeFile('output.csv', 'x,y\n', err => {
  if (err) throw err
})

let next = document.getElementById('next-button')
next.onclick = next_refresh

let prev = document.getElementById('prev-button')
prev.onclick = prev_refresh

let clear = document.getElementById('clear-button')
clear.onclick = clear_marks

let flag = document.getElementById('flag-button')
flag.onclick = flag_image

var pics = []
let i = -1

let aws_names = []
fs.readFile('/Users/Kate/workspace/record-long-lat/aws_names.csv').then(
  result => aws_names.push(result),
)
console.log('AWS')
console.log(aws_names)

for (let k = 0; k < aws_names.length; k++) {
  let fields = []
  fs.readFile(
    '/Users/Kate/workspace/record-long-lat/data/Roost_Reflectivity/' +
      aws_names[k] +
      '_Reflectivity.png',
  ).then(result => fields.push(result))
  fs.readFile(
    '/Users/Kate/workspace/record-long-lat/data/Roost_Velocity/' +
      aws_names[k] +
      '_Velocity.png',
  ).then(result => fields.push(result))
  fs.readFile(
    '/Users/Kate/workspace/record-long-lat/data/Roost_Rho_HV/' +
      aws_names[k] +
      '_Rho_HV',
  ).then(result => fields.push(result))
  fs.readFile(
    '/Users/Kate/workspace/record-long-lat/data/Roost_Zdr/' +
      aws_names[k] +
      '_Zdr',
  ).then(result => fields.push(result))
  pics.push(fields)
}

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

function read_directories() {}

function flag_image() {
  if (flag_bool == false) {
    flag_bool = true
  } else {
    flag_bool = false
  }
}

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

function mark(event) {
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

function retrieve_images() {
  let image_list = []
  //get file list
  filestems.forEach(function(filestem) {
    filestem + ''
  })
  return image_list
}
