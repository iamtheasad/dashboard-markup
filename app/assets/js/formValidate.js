function isEmail(email) {
   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return regex.test(email);
}

function isUrl(url) {
   var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
   return regex.test(url);
}

function isPhone(phone) {
   var regex = /(^(\+8801|8801|01|008801))[1-9]{1}(\d){8}$/;
   return regex.test(phone);
}

function validateEmail(field) {
   var el = field;
   var value = el.val();
   if (value) {
      if (isEmail(value)) {
         field.removeClass('error');
         return true
      } else {
         field.addClass('error');
         return false;
      }
   } else {
      field.addClass('error');
      return false;
   }
}

function validatePhone(field) {
   var el = field;
   var value = el.val();
   if (value) {
      if (isPhone(value)) {
         field.removeClass('error');
         return true
      } else {
         field.addClass('error');
         return false;
      }
   } else {
      field.addClass('error');
      return false;
   }
}

function validateUrl(field) {
   var el = field;
   var value = el.val();
   if (value) {
      if (isUrl(value)) {
         field.removeClass('error');
         return true
      } else {
         field.addClass('error');
         return false;
      }
   } else {
      field.addClass('error');
      return false;
   }
}

function validateString(field) {
   var el = field;
   var value = el.val();
   if (value) {
      field.removeClass('error');
      return true;
   } else {
      field.addClass('error');
      return false
   };
}

function submitForm(form) {
   let valid = [];
   $(form).find('[validate]').each(function () {
      let attr = $(this).attr('validate');
      if ($('[name="confirmPassword"]') && attr === 'string' && validateString($(this))) {
         if ($('[name="confirmPassword"]').val() === $('[name="password"]').val()) {
            valid.push('true')
            $('[name="confirmPassword"]').removeClass('error')
         }
         else {
            valid.push('false');
            $('[name="confirmPassword"]').addClass('error')
         }
      }
      else if (attr === 'string' && validateString($(this))) valid.push('true');
      else if (attr === 'email' && validateEmail($(this))) valid.push('true');
      else if (attr === 'phone' && validatePhone($(this))) valid.push('true');
      else valid.push('false')
   })
   if (valid.length && !valid.includes('false')) return true;
   else if (valid.length === 0) return true;
   else return false;
}

function registerClient() {
   if ($('.authentication-card').length) {
      let backBtn = $('.action-button-previous');

      backBtn.on("click", function () {
         let stepCount = $('[data-step]').attr('data-step');
         stepCount = parseInt(stepCount);
         if (stepCount === 1) {
            window.location.href = "/register.html";
         } else {
            $(`#step-${stepCount}`).removeClass('active');
            stepCount = stepCount - 1;
            $('[data-step]').attr('data-step', stepCount);
            $(`#step-${stepCount}`).removeClass('completed').addClass('active');
            $('[data-form]').slideUp();
            $(`[data-form="step-${stepCount}"]`).slideDown();
         }
      })

      $(document).on('click', '[data-form] button.next', function () {
         let stepCount = $('[data-step]').attr('data-step');
         stepCount = parseInt(stepCount);
         let valid = submitForm('[data-form="step-' + stepCount + '"]');
         if (valid) {
            $(`#step-${stepCount}`).addClass('completed').removeClass('active');
            stepCount = stepCount + 1;
            $('[data-step]').attr('data-step', stepCount);
            $(`#step-${stepCount}`).addClass('active');
            $(this).parents('[data-form]').slideUp();
            $(this).parents('[data-form]').next('[data-form]').slideDown();
         }
      })

      $('input[name="company"]').on('change', function () {
         let value = $(this).val();
         if (value === 'true') $('.personalField').slideUp().removeAttr('validate');
         else $('.personalField').slideDown().find('input').attr('validate', "string");
      })
   }
}

registerClient();