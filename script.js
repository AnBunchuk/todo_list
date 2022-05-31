'use strict'

class Plan {
    constructor() {
        this.wrapper = document.querySelector('section');
        this.divToList = this.wrapper.querySelector('.to_list');
        this.divDoList = this.wrapper.querySelector('.do_list');

        this.divToValue;

    }
    inputVid() {
        this.divToList.oninput = (e) => {
            this.divToValue = e.target.value
            console.log(this.divToValue)
        }
    }

    clickVid() {
        this.wrapper.addEventListener('click', (e) => {
            console.dir(e)
            if (e.target.className === 'btn icon-plus') {
                this.creatDivTo()
            }
            if (e.target.className === 'btn' && this.divToValue) {
                // console.log(this.divToValue)
                this.creatDivDo(e)
               let marker = this.divToList.querySelector('.to')
                if (!marker) {
                    this.creatDivTo()
                }
            }


        })
    }


    creatDivTo() {
        this.divElement = document.createElement('div')
        this.divElement.classList.add('to');
        // console.log(divElement)
        // console.log(this.divToList)
        this.divToList.append(this.divElement);

        let span1 = document.createElement('span');
        span1.classList.add('btn');
        this.divElement.append(span1);

        let input = document.createElement('input');
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'введите задачу')
        this.divElement.append(input);

        let span2 = document.createElement('span')
        span2.classList.add('btn');
        span2.classList.add('icon-plus');
        this.divElement.append(span2);

    }

    creatDivDo(e) {
        let divElement = document.createElement('div');
        divElement.classList.add('do');

        this.divDoList.append(divElement);

        let span1 = document.createElement('span');
        span1.classList.add('btn');
        span1.classList.add('icon-check');
        divElement.append(span1);

        let input = document.createElement('input');
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'введите задачу')
        divElement.append(input);

        let span2 = document.createElement('span')
        span2.classList.add('btn');
        span2.classList.add('icon-down');
        divElement.append(span2);



        let divToValu = e.target.parentElement.children[1].value
        input.setAttribute('value', divToValu)

        let elementDelete = e.target.parentElement
        elementDelete.remove()
    }

    init() {
        // console.dir( this.wrapper);

        this.clickVid()
        this.inputVid()
        this.creatDivTo()

    }
}



