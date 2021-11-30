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
      console.log(this);
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

   console.log(valid)
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
         }
         else {
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
         console.log(value);

         if (value === 'true') {
            $('.personalField').slideUp().find('input').removeAttr('validate');
            $('.companyName').slideDown().find('input').attr('validate', "string");
            $('.companyAddress').slideDown().find('input').attr('validate', "string");
         } else {
            $('.personalField').slideDown().find('input').attr('validate', "string");
            $('.companyName').slideUp().find('input').removeAttr('validate');
            $('.companyAddress').slideUp().find('input').removeAttr('validate');
         }
      })
   }
}

function registerInfluencer() {
   if ($('.authentication-card-influ').length) {
      let backBtn = $('.action-button-previous-influ');

      backBtn.on("click", function () {
         let stepCount = $('[influ-data-step]').attr('influ-data-step');
         stepCount = parseInt(stepCount);
         if (stepCount === 1) {
            window.location.href = "/register.html";
         } else {
            $(`#influencer-step-${stepCount}`).removeClass('active');
            stepCount = stepCount - 1;
            $('[influ-data-step]').attr('influ-data-step', stepCount);
            $(`#influencer-step-${stepCount}`).removeClass('completed').addClass('active');
            $('[influ-data-form]').slideUp();
            $(`[influ-data-form="influencer-step-${stepCount}"]`).slideDown();
         }
      })

      $(document).on('click', '[influ-data-form] button.next', function () {
         let stepCount = $('[influ-data-step]').attr('influ-data-step');
         stepCount = parseInt(stepCount);
         let valid = submitForm('[influ-data-form="influencer-step-' + stepCount + '"]');
         if (valid) {
            $(`#influencer-step-${stepCount}`).addClass('completed').removeClass('active');
            stepCount = stepCount + 1;
            $('[influ-data-step]').attr('influ-data-step', stepCount);
            $(`#influencer-step-${stepCount}`).addClass('active');
            $(this).parents('[influ-data-form]').slideUp();
            $(this).parents('[influ-data-form]').next('[influ-data-form]').slideDown();
         }
      })

      $('input[name="company"]').on('change', function () {

         let value = $(this).val();
         console.log(value);

         if (value === 'true') {
            $('.personalField').slideUp().find('input').removeAttr('validate');
            $('.companyName').slideDown().find('input').attr('validate', "string");
            $('.companyAddress').slideDown().find('input').attr('validate', "string");
         } else {
            $('.personalField').slideDown().find('input').attr('validate', "string");
            $('.companyName').slideUp().find('input').removeAttr('validate');
            $('.companyAddress').slideUp().find('input').removeAttr('validate');
         }
      })
   }
}

function loginValidate() {
   let form = $('#loginForm');
   if (form.length) {
      form.find('[type="submit"]').on("click", function (e) {
         e.preventDefault();
         let valid = submitForm('#loginForm');
         if (valid) {
            form.submit();
         }
      })
   }
}

function formShowHide() {
   $('.create-gnr-client-account').on('click', function () {
      $('.register-wrapper').slideUp();
      $('.create-account-for-client').slideDown();
   });

   $('.create-influencer-account').on('click', function () {
      $('.register-wrapper').slideUp();
      $('.create-account-for-influencer').slideDown();
   });
}

formShowHide();
registerClient();
registerInfluencer();
loginValidate();