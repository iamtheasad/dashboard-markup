export function isEmail(email) {
   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return regex.test(email);
}

export function isUrl(url) {
   var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
   return regex.test(url);
}

export function isPhone(phone) {
   var regex = /(^(\+8801|8801|01|008801))[1-9]{1}(\d){8}$/;
   return regex.test(phone);
}

export function validateEmail(field) {
   var el = field;
   var value = el.value;
   if (value) {
      if (isEmail(value)) {
         return true
      } else {
         return false;
      }
   } else {
      return false;
   }
}

export function validatePhone(field) {
   var el = field;
   var value = el.value;
   if (value) {
      if (isPhone(value)) {
         return true
      } else {
         return false;
      }
   } else {
      return false;
   }
}

export function validateUrl(field) {
   var el = field;
   var value = el.value;
   if (value) {
      if (isUrl(value)) {
         return true
      } else {
         return false;
      }
   } else {
      return false;
   }
}

// function validateFile(field) {
//    var wrapper = field.closest('.form-group');
//    var file = field.files[0];
//    var fileType = field.getAttribute("data-type");
//    var fileSize = field.getAttribute("data-size");

//    var regex = new RegExp(`(.*?)\.(${fileType})$`);

//    if(file && regex.test(file.name) && file.size < fileSize){
//         return true;
//    }else {
//        var para = document.createElement("p");
//        var t = document.createTextNode(`File must be ${fileType.replaceAll("|", "/")} and max size is ${fileSize/1000000}mb`); 
//        para.classList.add("err-text");
//        para.appendChild(t);
//        wrapper.appendChild(para); 
//        console.log('err') 

//        return false;
//    }
// }

// function fieldValidation(field){
//    if (field.type === 'email' && validateEmail(field)) {
//        return true;
//    } else if(field.type === 'file' && validateFile(field)){
//        return true
//    } else if(field.type === 'url' && validateUrl(field)){
//        return true;
//    } else if(field.type === 'tel' && validatePhone(field)){
//        return true;
//    }else if(field.type === 'text' || field.tagName === "TEXTAREA"){
//        return true;
//    }else {
//        field.closest(".form-group").classList.add("error");
//        return false;
//    }
// }

// function validateInput(field) {
//    if (field.value) {
//        return fieldValidation(field);
//    }else if(!field.value && !field.classList.contains("required")){
//        return true;
//    }else if(!field.value && field.classList.contains("required")){
//        field.closest(".form-group").classList.add("error");
//        return false;
//    }
// }

// function validate(form) {
//    var isValidate = '';
//    var inputs = document.querySelectorAll(`${form} .form-control`);

//    for (var i = inputs.length - 1; i >= 0; i--){
//        var input = inputs[i];

//        if (validateInput(input)){
//            isValidate = isValidate.concat(",", "true");
//        }else {
//            isValidate = isValidate.concat(" ", "false");
//        };
//    }

//    console.log('isValidate:', isValidate)
//    if(isValidate.includes("false")){
//        var element = document.querySelectorAll(`${form} .form-group.error`)[0];
//        var top = window.pageYOffset + element.getBoundingClientRect().top;

//        window.scroll({
//            top: top - 180,
//            left: 0,
//            behavior: 'smooth' 
//        });

//        return false;

//    }else {
//        return true;
//    }
// }

// function checkInput(input){
//    var field = input.target;
//    var wrapper = field.closest('.form-group');
//    if(input.target.value){
//        if(field.type === "file"){
//            var fileName = field.files[0].name;
//            wrapper.querySelector('.filename').innerHTML = fileName;
//            if(wrapper.querySelector('.err-text')){
//                wrapper.querySelector('.err-text').remove()
//            }
//        }
//    }
//    wrapper.classList.remove('error');
// }