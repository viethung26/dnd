class TodoList {
    constructor(id) {
        this.el = document.getElementById(id)
        this.handleDrag = this.handleDrag.bind(this)
        this.el.addEventListener('dragstart', this.handleDrag)
        this.el.addEventListener('dragover', this.handleDragOver.bind(this))
        this.el.addEventListener('dragend', this.handleEnd.bind(this))
        this.placeholder = document.createElement('div')
        this.placeholder.classList.add('placeholder')
        this.placeholder.innerText = 'place here...'
        this.el.appendChild(this.placeholder)
    }
    handleDrag(e) {
        let target = e.target
        if (target.draggable) {
            target.classList.add('drag')
        }
    }
    handleDragOver(e) {
        let target = e.target
        e.preventDefault()
        let $dragEl = document.querySelector('.drag')
        if(target.classList.contains('card')) {
            let compareKey = $dragEl.compareDocumentPosition(target)
            if(compareKey===2) {
                target.parentNode.insertBefore($dragEl, target)            
            } else if(compareKey === 4) {
                if(!target.parentNode.isEqualNode($dragEl.parentNode)) target.parentNode.insertBefore($dragEl, target)            
                target.parentNode.insertBefore(target, $dragEl)            
            }
        } else if(target.classList.contains('list')) {
            target.appendChild($dragEl)
        }
            this.placeholder.style.top = $dragEl.getBoundingClientRect().top + 'px'
            this.placeholder.style.left = $dragEl.getBoundingClientRect().left + 'px'
            this.placeholder.style.display = 'block'
        
    }
    handleEnd(e) {
        e.target.classList.remove('drag')
        this.placeholder.style.display = 'none'
    }
}

let newEl = new TodoList('root')