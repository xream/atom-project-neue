'use babel'

import path from 'path'
import fs from 'fs-plus'
import _ from 'lodash'
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
      'project-neue:cleanup': () => this.cleanup(),
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  async cleanup() {
    atom.history.projects.forEach(({ _paths }) => {
      const paths = _paths.filter(fs.existsSync)
      if (_.isEmpty(paths)) {
        atom.history.removeProject(_paths)
      } else if (!_.isEqual(paths, _paths)) {
        atom.history.removeProject(_paths)
        atom.history.addProject(paths)
      }
    })
    atom.notifications.addSuccess(`Reload Project History`)
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
