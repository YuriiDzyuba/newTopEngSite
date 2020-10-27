class formValid {
    constructor(sSelector) {
        this.form = document.querySelector(sSelector)
        this.createEvents()

    }
    action(event) {
        event.preventDefault()
        let name = event.target.elements["name"].value
        let phone = event.target.elements["phone"].value
        let comment = ""
        if (event.target.elements["comment"]) {
            comment = event.target.elements["comment"].value
            let isCommentTrue = this.validComment(comment)
        } else {
            let comment = " "
        }
        let isNameTrue = this.validName(name)
        let isPhoneTrue = this.validPhone(phone)
        let inputName = this.form.elements["name"]
        let inputPhone = this.form.elements["phone"]

       if (isNameTrue && isPhoneTrue) {
           $.ajax({
               'url': 'http://top-english.com.ua/mail.php?t='/*что то уникальное после ? t=*/ + new Date().getTime()/*дата или время что то что не повторяеться чтобы небыло кеша*/
               , 'method': 'POST'// метод
               , 'dataType': 'json'
               , 'timeout': 5000 //время через сколько времени должен прийти ответ от сервера
               , 'data': {
                   'formHeader': " обратная связь",
                   'name': name,
                   'phone': phone,
                   'comment': comment
               } //данные которые мы отправляем
               , 'complete': function (oAjax) {
                   console.log('oAjax response:', oAjax.responseText);
               }.bind(this)
           });

           this.form.elements["contactUsButtonSubmit"].classList.add("d-none")
           this.form.elements["contactUsButtonInfo"].style.setProperty('--animate-duration', '2s');
           this.form.elements["contactUsButtonInfo"].classList.remove("d-none")
           inputName.value = ""
           inputName.placeholder = ""
           inputName.style.borderBottom = "2px solid green"
           inputName.labels[0].style.color = "green"
           inputPhone.value = ""
           inputPhone.placeholder = ""
           inputPhone.style.borderBottom = "2px solid green"
           inputPhone.labels[0].style.color = "green"

       } else if (!isNameTrue && !isPhoneTrue) {
           // console.log("wrong name and phone")
           inputName.value = ""
           inputName.style.borderBottom = "2px solid red"
           inputName.labels[0].style.color = "red"
           inputPhone.value = ""
           inputPhone.style.borderBottom = "2px solid red"
           inputPhone.labels[0].style.color = "red"

       } else if (!isNameTrue && isPhoneTrue) {
           // console.log("wrong name ")
           inputName.value = ""
           inputName.style.borderBottom = "2px solid red"
           inputName.labels[0].style.color = "red"

       } else if (isNameTrue && !isPhoneTrue) {
           // console.log("wrong phone ")
           inputPhone.value = ""
           inputPhone.style.borderBottom = "2px solid red"
           inputPhone.labels[0].style.color = "red"
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

    validComment(comment) {
        let regExp = /^[0-9a-zA-Zа-яА-ЯіІїЇєЄ ёЁ-]{0,245}$/g;
        let valid = regExp.test(comment);
        if (valid) {
            // console.log("comment valid")
        } else {
            // console.log("comment invalid")
        }
        return(valid)
    }




    createEvents() {
        this.form.addEventListener('submit', this.action.bind(this));


    }
}

