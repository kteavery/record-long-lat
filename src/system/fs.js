import { remote } from './remote'

export const fs_unsafe = remote.require('fs')

export const fs = fs_unsafe.promises
