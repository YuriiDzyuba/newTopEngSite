class modal {
    constructor(sSelector) {
        this.form = document.querySelector(sSelector)
        this.createEvents()
    }

    action(event) {
        event.preventDefault()
        let name = event.target.elements["modalName"].value
        let phone = event.target.elements["modalPhone"].value
        let comment = event.target.elements["modalComment"].value
        let formName = event.target.getAttribute("name")
        let isNameTrue = this.validName(name)
        let isPhoneTrue = this.validPhone(phone)
        let isCommentTrue = this.validComment(comment)
        let inputName = this.form.elements["modalName"]
        let inputPhone = this.form.elements["modalPhone"]
        let inputComment = this.form.elements["modalComment"]

       if (isNameTrue && isPhoneTrue && isCommentTrue) {
           $.ajax({
               'url': 'http://top-english.com.ua/mail.php?t='/*что то уникальное после ? t=*/ + new Date().getTime()/*дата или время что то что не повторяеться чтобы небыло кеша*/
               , 'method': 'POST'// метод
               , 'dataType': 'json'
               , 'timeout': 5000                                                           //время через сколько времени должен прийти ответ от сервера
               , 'data': {
                   'formHeader': formName,
                   'name': name,
                   'phone': phone,
                   'comment': comment
               }                                                                           //данные которые мы отправляем
               , 'complete': function (oAjax) {
                   console.log('oAjax response:', oAjax.responseText);
               }.bind(this)
           });

           this.form.elements["myModalButton"].classList.add("d-none")
           this.form.elements["myModalButton"].classList.remove("d-block")
           this.form.elements["myModalButtonInfo"].style.setProperty('--animate-duration', '2s');
           this.form.elements["myModalButtonInfo"].classList.remove("d-none")
           this.form.elements["myModalButtonInfo"].classList.add("d-block")
           let changeButtons = () =>{
               this.form.elements["myModalButtonInfo"].click()
               setTimeout( ()=>{
                   this.form.elements["myModalButtonInfo"].classList.add("d-none")
                   this.form.elements["myModalButtonInfo"].classList.remove("d-block")
                   this.form.elements["myModalButton"].classList.remove("d-none")
                   this.form.elements["myModalButton"].classList.add("d-block")
               }, 500)
           }
           setTimeout( changeButtons, 2000)
           inputName.value = ""
           inputName.labels[0].style.color = "black"
           inputName.style.borderBottom = "2px solid black"
           inputPhone.value = ""
           inputPhone.labels[0].style.color = "black"
           inputPhone.style.borderBottom = "2px solid black"
           inputComment.value = ""
           inputComment.labels[0].style.color = "black"
           inputComment.style.borderBottom = "2px solid black"

       }  else if (!isNameTrue) {
           // console.log("wrong name ")
           inputName.value = ""
           inputName.style.borderBottom = "2px solid red"
           inputName.labels[0].style.color = "red"

       } else if (!isPhoneTrue) {
           // console.log("wrong phone ")
           inputPhone.value = ""
           inputPhone.style.borderBottom = "2px solid red"
           inputPhone.labels[0].style.color = "red"
       }else if (!isCommentTrue) {
           // console.log("wrong Comment ")
           inputComment.value = ""
           inputComment.style.borderBottom = "2px solid red"
           inputComment.labels[0].style.color = "red"
       }

    }

    validName(name) {
        let regExp = /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ-]{6,245}$/g;
        let valid = regExp.test(name);
        if (valid) {
            // console.log("name valid")
        } else {
            // console.log("name invalid")
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
        this.form.addEventListener('submit', this.action.bind(this));


    }
}

