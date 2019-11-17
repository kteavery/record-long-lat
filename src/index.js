import { fs } from './system/fs'
import { clear_marks, refresh_page, tab, flag_image } from './record_long_lat'

const path = require('path')

tab()

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

function retrieve_images() {
  let image_list = []
  //get file list
  filestems.forEach(function(filestem) {
    filestem + ''
  })
  return image_list
}
