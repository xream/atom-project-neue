'use babel'

import path from 'path'
import fs from 'fs-plus'
import View from './project-neue-view'
import { CompositeDisposable, Directory } from 'atom'

export default {
  view: null,
  subscriptions: null,

  activate() {
    this.view = new View()
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'project-neue:toggle': () => this.toggle(),
      'project-neue:last': () => this.last(),
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  last() {
    this.view.confirmed({ paths: atom.history.projects[1]._paths })
  },

  toggle() {
    if (this.view.isVisible()) {
      this.view.hide()
    } else {
      this.view.show(atom.history.projects.map(({ _paths: paths }) => ({
        paths,
        name: paths.map(i => path.basename(i)).join(', '),
        info: paths.map(fs.tildify).join(', '),
      })))
    }
  }
}
