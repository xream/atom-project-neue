# atom-project-neue

Atom project manager for 1.17.0+


Default keymap:

```cson
'atom-workspace':
  'alt-p': 'project-neue:toggle' # open the project finder
  'alt-tab': 'project-neue:last' # switch to the previous recently used project

'.project-neue input':
  'enter': 'core:confirm' # open the project in the current window

'.project-neue atom-text-editor[mini]':
  'shift-enter': 'project-neue:alt-confirm' # open the project in a new window
```
