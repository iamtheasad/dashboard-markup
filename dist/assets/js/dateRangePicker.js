
function multiDateRangePicker() {
   if (window.daterangepicker) {

      var nowDate = new Date();
      var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
      var maxLimitDate = new Date(nowDate.getFullYear() + 1, nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);

      $('.date-range-activator').daterangepicker({
         opens: 'left',
         "autoApply": true,
         parentEl: "body",
         "minDate": today,
         "maxDate": maxLimitDate,
         "locale": {
            format: 'DD MMMM, YYYY'
         }
      }, function (start, end) {
         $(".date-range-activator").val(start.format('DD MMMM, YYYY'));
         $('.date-range-activator').parent().parent().removeClass('has-error');
      });

      /*   function (start, end, label) {
           console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }); */

      $('.date-range').on('show.daterangepicker', function (ev, picker) {
         $(this).parents(".multi-date-range").addClass("focus")
      });

      $('.date-range').on('hide.daterangepicker', function (ev, picker) {
         $(this).parents(".multi-date-range").removeClass("focus")
      });
   }
}

multiDateRangePicker();


// Date Picker
function datePicker() {
   if (window.daterangepicker) {

      /* var nowDate = new Date();
      var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);

      $('.single-date-activator').daterangepicker({
          opens: 'right',
          "autoApply": true,
          "singleDatePicker": true,
          locale: {
              format: 'DD MMMM, YYYY',
          },
          "startDate": today,
          // "endDate": "12/20/2021",
          parentEl: ".campaign-wrapper",
      },
          // function (start, end, label) {
          //     console.log('New date range selected: ' + start.format('DD MMMM, YYYY') + ' to ' + end.format('DD MMMM, YYYY') + ' (predefined range: ' + label + ')');
          // }
      ); */

      var nowDate = new Date();
      var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
      var maxLimitDate = new Date(nowDate.getFullYear() + 1, nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);

      $('.single-date-activator').daterangepicker({
         "autoApply": true,
         // "autoUpdateInput": false,
         "singleDatePicker": true,
         "minDate": today,
         "maxDate": maxLimitDate,
         "opens": "left",
         "locale": {
            format: 'DD MMMM, YYYY'
         },
         parentEl: ".campaign-wrapper",
      }, function (start, end) {
         $(".single-date-activator").val(start.format('DD MMMM, YYYY'));
         $('.single-date-activator').parent().parent().removeClass('has-error');
         console.log($(".single-date-activator").val());
      });
   };


   if (window.daterangepicker) {
      var nowDate = new Date();
      var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
      var maxLimitDate = new Date(nowDate.getFullYear() + 1, nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);

      $('.duration-date-activator-start').daterangepicker({
         "autoApply": true,
         // "autoUpdateInput": false,
         "singleDatePicker": true,
         "minDate": today,
         "maxDate": maxLimitDate,
         "opens": "left",
         "locale": {
            format: 'DD MMMM, YYYY'
         },
         parentEl: ".campaign-wrapper",
      }, function (start, end) {
         $(".duration-date-activator-start").val(start.format('DD MMMM, YYYY'));
         $('.duration-date-activator-start').parent().parent().removeClass('has-error');
         console.log($(".duration-date-activator-start").val());

         var aMinDate = new Date(Date.parse(start));

         $('.duration-date-activator-end').daterangepicker({
            "autoApply": true,
            // "autoUpdateInput": false,
            "singleDatePicker": true,
            "minDate": aMinDate,
            "maxDate": maxLimitDate,
            "opens": "left",
            "locale": {
               format: 'DD MMMM, YYYY'
            },
            parentEl: ".campaign-wrapper",
         }, function (start, end) {
            $(".duration-date-activator-end").val(start.format('DD MMMM, YYYY'));
            $('.duration-date-activator-end').parent().parent().removeClass('has-error');
         });
      });
   }
}

datePicker();

// Time Picker
function timePicker() {
   if (window.daterangepicker) {
      $('.duration-time-activator').daterangepicker({
         timePicker: true,
         singleDatePicker: true,
         timePickerIncrement: 1,
         timePickerSeconds: true,
         parentEl: ".campaign-wrapper",
         locale: {
            format: "hh:mm:ss A"
         },
         "autoApply": true,
      }).on('show.daterangepicker', function (ev, picker) {
         picker.container.find(".calendar-table").hide();
      });
   }
}

timePicker();