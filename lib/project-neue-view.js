'use babel'

import { SelectListView } from 'atom-space-pen-views'

export default class View extends SelectListView {
  constructor() {
    super()
  }

  initialize() {
    super.initialize()
    this.addClass('project-neue')

    atom.commands.add(this.element, {
      'project-neue:alt-confirm': event => {
        this.altConfirmed()
        event.stopPropagation()
      },
    })
  }

  show(items) {
    if (!this.panel) {
      this.setItems(items)
      this.panel = atom.workspace.addModalPanel({ item: this })
      this.panel.show()
      this.storeFocusedElement()
      this.focusFilterEditor()
    }
  }

  hide() {
    if (this.panel) {
      this.panel.destroy()
      delete this.panel
    }
  }

  isVisible() {
    return !!this.panel
  }

  confirmed({ paths }) {
    if (!paths || paths.lenght === 0) return this.cancel()
    atom.loadState(atom.getStateKey(paths)).then(state => {
      if (!state) return this.cancel()
      atom.project.getPaths().forEach(path => {
        atom.project.removePath(path)
      })
      atom.restoreStateIntoThisEnvironment(state)
      this.cancel()
    })
  }

  altConfirmed() {
    const item = this.getSelectedItem()
    atom.open({
      pathsToOpen: item.paths,
    })
    this.cancel()
  }

  cancelled() {
    this.hide()
  }

  getFilterKey() {
    return 'name'
  }

  viewForItem({ name, info }) {
    return `<li class="two-lines">
      <div class="primary-line file icon icon-repo">${name}</div>
      <div class="secondary-line">${info}</div>
    </li>`
  }
}
