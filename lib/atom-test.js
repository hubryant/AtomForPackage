'use babel';

import AtomTestView from './atom-test-view';
import { CompositeDisposable } from 'atom';

export default {

  atomTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomTestView = new AtomTestView(state.atomTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomTestView.destroy();
  },

  serialize() {
    return {
      atomTestViewState: this.atomTestView.serialize()
    };
  },

  toggle() {
    console.log('AtomTest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
