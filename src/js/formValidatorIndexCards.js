class formValidCard {
    constructor(sSelector) {
        this.cards = document.querySelectorAll(sSelector)
        this.oCards = [...this.cards]
        this.createEvents()

    }

    showForm (event) {
        let cardItem = event.path[1]
        let tempForm = event.path[2].lastElementChild
        let tempFormHeader = event.path[2].firstElementChild.textContent
        cardItem.classList.add("d-none")
        tempForm.classList.remove("d-none")
        tempForm.style.setProperty('--animate-duration', '1.5s');
        this.createNextEvent(tempForm, cardItem, tempFormHeader)
    }

    createNextEvent(tempForm, cardItem, tempFormHeader) {
        tempForm.addEventListener('submit', this.action.bind(this, tempForm, cardItem, tempFormHeader));
    }

    action(tempForm, cardItem, tempFormHeader, event) {
        event.preventDefault()

        let name = event.target.elements[0].value
        let phone = event.target.elements[1].value
        let isNameTrue = this.validName(name)
        let isPhoneTrue = this.validPhone(phone)
        let inputName = tempForm.elements[0]
        let inputPhone = tempForm.elements[1]
        console.log("header ", tempFormHeader, "name", name, "phone", phone)

       if (isNameTrue && isPhoneTrue) {
           $.ajax({
               'url': 'https://top-english.com.ua/mail.php?t='/*что то уникальное после ? t=*/ + new Date().getTime()/*дата или время что то что не повторяеться чтобы небыло кеша*/
               , 'method': 'POST'// метод
               , 'dataType': 'json'
               , 'timeout': 5000 //время через сколько времени должен прийти ответ от сервера
               , 'data': {
                   'formHeader': tempFormHeader,
                   'name': name,
                   'phone': phone,
                   'comment': " "
               } //данные которые мы отправляем
               , 'complete': function (oAjax) {
                   console.log('oAjax response:', oAjax.responseText);
               }.bind(this)
           });

           tempForm.classList.add("d-none")
           cardItem.classList.remove("d-none")
           cardItem.style.setProperty('--animate-duration', '2s');
           cardItem.children[7].classList.remove("d-block")
           cardItem.children[7].classList.add("d-none")
           cardItem.children[6].classList.remove("d-none")
           cardItem.children[6].classList.add("d-block")

       } else if (!isNameTrue && !isPhoneTrue) {
           // console.log("wrong name and phone")
           inputName.value = ""
           inputName.style.borderBottom = "2px solid red"
           inputPhone.value = ""
           inputPhone.style.borderBottom = "2px solid red"

       } else if (!isNameTrue && isPhoneTrue) {
           // console.log("wrong name ")
           inputName.value = ""
           inputName.style.borderBottom = "2px solid red"

       } else if (isNameTrue && !isPhoneTrue) {
           // console.log("wrong phone ")
           inputPhone.value = ""
           inputPhone.style.borderBottom = "2px solid red"
       }

    }

    validName(name) {
        let regExp = /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ-]{2,29}$/g;
        let valid = regExp.test(name);
        if (valid) {
            // console.log("name valid")
        } else {
            // console.log("name invalid")
        }
        return(valid)
    }

    validPhone(phone) {
        let regExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        let valid = regExp.test(phone);
        if (valid) {
            // console.log("phone valid")
        } else {
            // console.log("phone invalid")
        }
        return(valid)
    }

    createEvents() {
        for (let i=0; i<this.oCards.length; i++) {
            this.oCards[i].lastElementChild.addEventListener('click', this.showForm.bind(this));
        }

    }
}

