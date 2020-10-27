class emailForm {
    constructor(sSelector) {
        this.form = document.querySelector(sSelector)
        this.createEvents()
    }

    action(event) {
        event.preventDefault()
        let email = event.target.elements["emailFormInput"].value
        let isEmailTrue = this.validEmail(email)
        let inputEmail = this.form.elements["emailFormInput"]
        let inputName = event.target.getAttribute("name")
       if (isEmailTrue) {
           $.ajax({
               'url': 'http://top-english.com.ua/mail.php?t='/*что то уникальное после ? t=*/ + new Date().getTime()/*дата или время что то что не повторяеться чтобы небыло кеша*/
               , 'method': 'POST'// метод
               , 'dataType': 'json'
               , 'timeout': 5000 //время через сколько времени должен прийти ответ от сервера
               , 'data': {
                   'formHeader': "Подписатся на EMAIL рассылку",
                   'name': "undefined",
                   'phone': email,
                   'comment': "undefined"
               } //данные которые мы отправляем
               , 'complete': function (oAjax) {
                   console.log('oAjax response:', oAjax.responseText);
               }.bind(this)
           });

           this.form.elements["emailFormButton"].classList.add("d-none")
           this.form.elements["emailFormButton"].classList.remove("d-block")
           this.form.elements["emailFormButtonOk"].style.setProperty('--animate-duration', '2s');
           this.form.elements["emailFormButtonOk"].classList.remove("d-none")
           this.form.elements["emailFormButtonOk"].classList.add("d-block")
           inputEmail.value = inputName
           inputEmail.placeholder = ""
           inputEmail.style.borderBottom = "2px solid black"
       }  else if (!isEmailTrue) {
           console.log("wrong Email ")
           inputEmail.value = ""
           inputEmail.placeholder = "wrong email :("
           inputEmail.style.borderBottom = "2px solid red"
       }
    }

    validEmail(email) {
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = regExp.test(email);
        if (valid) {
            // console.log("name valid")
        } else {
            // console.log("name invalid")
        }
        return(valid)
    }

    createEvents() {
        this.form.addEventListener('submit', this.action.bind(this));
    }
}

