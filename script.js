'use strict'

class Plan {
    constructor() {
        this.wrapper = document.querySelector('section');
        this.divToList = this.wrapper.querySelector('.to_list');
        this.divDoList = this.wrapper.querySelector('.do_list');
        this.divToValue; // содержимое атрибута value в теге input
        this.idDiv = 0; // id блоков div .to и div .do
        this.saveToDo; //pfgbcsdftv информацию из localStorage для восстановления обьекта
        this.objToDo = {}; // заносим обьекты div .to div .do для отправки в localStorage
    }

    inputVid() {
        this.divToList.oninput = (e) => {
            this.divToValue = e.target.value    
            this.saveProject()
        }
    }

    clickVid() {
        this.wrapper.addEventListener('click', (e) => {
            // добавляем поле события при нажатии на +
            if (e.target.className === 'btn icon-plus') {
                this.creatDivTo(++this.idDiv)
            }
            // помечаем событие выполненым нажатием на пустой круг
            if (e.target.className === 'btn' && e.target.parentElement.children[1].value) {
                this.creatDivDo(e.target.parentElement.id, e.target.parentElement.children[1].value)
                this.deleteDiv(e)

                //если все события выполнены добавляем пустое поле событий в "Задачи"
                let marker = this.divToList.querySelector('.to')
                if (!marker) {
                    this.creatDivTo(++this.idDiv)
                }
            }
            // удаляем элемент из поля "Выполненные задачи"
            if (e.target.className === 'btn icon-down') {
                this.deleteDiv(e);
            }
            // сохраняем данные в localStorage
            this.saveProject()
        })
    }


    creatDivTo(divId) {

        this.divElement = document.createElement('div')
        this.divElement.classList.add('to');
        this.divElement.setAttribute('id', divId)
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

    creatDivDo(divId, divValue) {
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

        // переносим value из  div to поля "Задачи"
        input.setAttribute('value', divValue)
        // переносим id
        divElement.setAttribute('id', divId)

    }

    // удаляем элемент div to после пререноса в выполненные
    deleteDiv(e) {
        let elementDelete = e.target.parentElement
        localStorage.clear(e.target.parentElement.id)
        elementDelete.remove()

    }
    // собираем информацию про обьекты div to и div do и сохраняем в localStorage
    saveProject() {
        this.objToDo = {};
        // запись в localStorage информации id div, value, isDone (какой блок div to или div do/true-false)
        let divTo = this.divToList.querySelectorAll('.to');
        divTo.forEach((item) => {
            if (item.children[1].value && item.className === "to") {
                this.objToDo[item.id] = { value: item.children[1].value, isDone: false };
            }
        })
        let divDo = this.divDoList.querySelectorAll('.do');
        divDo.forEach((item) => {
            if (item.children[1].value && item.className === "do") {

                this.objToDo[item.id] = { value: item.children[1].value, isDone: true };
            }
        })
        let objToJSON = JSON.stringify(this.objToDo);
        localStorage.setItem('todo', objToJSON);
    }

    // считываем информацию из localStorage и выстраиваем обьект
    inputProject() {
        // вывод из localStorage
        this.saveToDo = localStorage.getItem('todo');
        this.saveToDo = JSON.parse(this.saveToDo);
        // исключения если localStorage пустой или обьект не содержит инф о div to div do
        if (!this.saveToDo || Object.keys(this.saveToDo).length === 0) { this.creatDivTo(0) }

        for (let key in this.saveToDo) {
            if (this.idDiv < key) this.idDiv = key;
            if (!this.saveToDo[key].isDone) {
                this.creatDivTo(key)
                // добавили id
                let targetDiv = document.getElementById(key)
                let targitInput = targetDiv.children[1];
                // добавили текст задачи
                targitInput.setAttribute('value', this.saveToDo[key].value)
            }
            if (this.saveToDo[key].isDone) {
                this.creatDivDo(key, this.saveToDo[key].value)
            }
        }
        let serchDivTo = this.divToList.querySelector('.to');
        if (!serchDivTo) this.creatDivTo(++this.idDiv)
    }


    init() {
        console.dir(localStorage)
        this.inputProject()
        this.clickVid()
        this.inputVid()


    }
}



