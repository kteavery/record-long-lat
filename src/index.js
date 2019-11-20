import { fs } from './system/fs'
import { clear_marks, refresh_page, flag_image } from './record_long_lat'
import names from './aws_names.json'

import 'regenerator-runtime'

export let image_path = ''

const pics = []
let i = -1

tab()
open_directory()

let next = document.getElementById('next-button')
next.onclick = next_refresh

let prev = document.getElementById('prev-button')
prev.onclick = prev_refresh

let clear = document.getElementById('clear-button')
clear.onclick = function() {
  if (i >= 0) {
    var delete_name = pics[i][0]
      .substring(pics[i][0].lastIndexOf('/') + 1)
      .slice(2, 25)
    clear_marks(delete_name)
  }
}

let flag = document.getElementById('flag-button')
flag.onclick = flag_image

async function read_aws_files() {
  const aws_names = names

  for (let k = 0; k < aws_names.length; k++) {
    const fields = []

    await add_file_name('Reflectivity', aws_names, k, fields)
    await add_file_name('Velocity', aws_names, k, fields)
    await add_file_name('Rho_HV', aws_names, k, fields)
    await add_file_name('Zdr', aws_names, k, fields)

    if (fields.length > 0) {
      pics.push(fields)
    }
  }
}

async function add_file_name(fieldname, aws_names, k, fields) {
  let day = aws_names[k].substring(10, 12)
  let k_name =
    image_path +
    '/Roost_' +
    fieldname +
    '/' +
    day +
    aws_names[k] +
    '_' +
    fieldname +
    '.png'

  try {
    await fs.access(k_name)
    fields.push(k_name)
  } catch (e) {
    if (e.code != 'ENOENT') {
      throw e
    }
  }
}

function next_refresh() {
  if (i < pics.length) {
    i++
  }
  console.log('NEXT: page')
  console.log(i)
  refresh_page(pics[i])
}

function prev_refresh() {
  if (i > 0) {
    i--
  }
  console.log('PREVIOUS: page')
  console.log(i)
  refresh_page(pics[i])
}

function tab() {
  document.onkeyup = function(e) {
    if (e.which == 9) {
      next_refresh()
    }
  }
}

function open_directory() {
  document.getElementById('open-button').addEventListener('click', _ => {
    let dir = document.getElementById('choose-directory')
    dir.click()
    dir.onchange = select_folder
  })
}

function select_folder(e) {
  var theFiles = e.target.files
  image_path = theFiles[0].path
  read_aws_files()
}
