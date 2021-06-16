class Spinner {
    constructor({selector, hidden = false}) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.spinner = document.querySelector('.spinner-border');

        return refs;
    }
    show() {
        this.refs.spinner.style.display = 'inline-block';
    }
    hide() {
        this.refs.spinner.style.display = 'none';
    }
}

export default new Spinner({
  selector: '.spinner-border',
  hidden: true,
});

