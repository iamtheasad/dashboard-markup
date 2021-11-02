/* ********************************** */
/* Custom Scripts */
/* ********************************** */




(function ($) {
   "use strict";

   /*==========================================================================
       :: All Essential Functions
   ==========================================================================*/

   /* Looping Data Table Id */
   function dataTable(element) {
      var element = $(element);
      if (element.length) {
         $(element).DataTable({
            "paging": false,
            "searching": false,
            "info": false,
         });
      }
   }

   /* Influencer Looping Data Table Id */
   function dataTable2() {

      var wrapper = $('.datatableMultiple');
      if(wrapper.length){
         wrapper.each(function() {
            var paginationIconLeft = `<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.76724 7.77552C4.91632 7.63333 5 7.44099 5 7.2405C5 7.04001 4.91632 6.84766 4.76724 6.70547L1.93369 3.98103L4.76724 1.29453C4.91632 1.15234 5 0.959994 5 0.759504C5 0.559014 4.91632 0.36667 4.76724 0.224481C4.69283 0.15335 4.6043 0.0968926 4.50676 0.0583643C4.40922 0.0198361 4.3046 0 4.19893 0C4.09326 0 3.98864 0.0198361 3.8911 0.0583643C3.79356 0.0968926 3.70503 0.15335 3.63062 0.224481L0.236768 3.44221C0.161744 3.51276 0.102197 3.59669 0.0615597 3.68917C0.0209222 3.78165 0 3.88084 0 3.98103C0 4.08121 0.0209222 4.1804 0.0615597 4.27288C0.102197 4.36536 0.161744 4.4493 0.236768 4.51985L3.63062 7.77552C3.70503 7.84665 3.79356 7.90311 3.8911 7.94163C3.98864 7.98016 4.09326 8 4.19893 8C4.3046 8 4.40922 7.98016 4.50676 7.94163C4.6043 7.90311 4.69283 7.84665 4.76724 7.77552Z" fill="#475364"/>
              </svg>`;
      
            var paginationIconRight = `<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.232761 0.224482C0.0836789 0.366671 0 0.559015 0 0.759505C0 0.959995 0.0836789 1.15234 0.232761 1.29453L3.06631 4.01897L0.232761 6.70547C0.0836789 6.84766 0 7.04001 0 7.2405C0 7.44099 0.0836789 7.63333 0.232761 7.77552C0.307172 7.84665 0.395701 7.90311 0.493242 7.94164C0.590782 7.98016 0.695404 8 0.801071 8C0.906738 8 1.01136 7.98016 1.1089 7.94164C1.20644 7.90311 1.29497 7.84665 1.36938 7.77552L4.76323 4.55779C4.83826 4.48724 4.8978 4.40331 4.93844 4.31083C4.97908 4.21835 5 4.11916 5 4.01897C5 3.91879 4.97908 3.8196 4.93844 3.72712C4.8978 3.63464 4.83826 3.5507 4.76323 3.48015L1.36938 0.224482C1.29497 0.153351 1.20644 0.0968938 1.1089 0.0583653C1.01136 0.0198374 0.906738 0 0.801071 0C0.695404 0 0.590782 0.0198374 0.493242 0.0583653C0.395701 0.0968938 0.307172 0.153351 0.232761 0.224482Z" fill="#475364"/>
              </svg>`;
      
            var iTable2 = $(this).find(".datatableActivator-2").DataTable({
               "paging": true,
               "info": true,
               "searching": true,
               "pagingType": "simple",
               "pageLength": 2,
               "lengthMenu": [[2, 25, 50, -1], [2, 25, 50, "All"]],
               "infoCallback": function (settings, start, end, max, total, pre) {
                  return start + " - " + end + " of " + total;
               },
               "dom": "<'row'<'col-sm-12 d-flex justify-content-end align-items-center'ip>>" +
                  "<'row'<'col-sm-12'>>" +
                  "<'row'<'col-sm-4'><'col-sm-4 text-center'><'col-sm-4'>>",
               "language": {
                  "paginate": {
                     "previous": paginationIconLeft,
                     "next": paginationIconRight
                  }
               },
               "scrollY": "200px"
            });
            
            // For Search
            $(this).find(".dataTable-search-activator").keyup(function () {
               iTable2.search($(this).val()).draw();
            });
      
            // For Table column filter
            $(this).find('.toggle-vis').on('click', function (e) {
               $(this).toggleClass("active")
               e.preventDefault();
      
               // Get the column API object
               var column = iTable2.column($(this).attr('data-column'));
      
               // Toggle the visibility
               column.visible(!column.visible());
            });
         })
      }
   }


   dataTable2();

   dataTable('#propertyDataTable');
   dataTable('#propertyDetailsDataTable');
   dataTable('#blocAddDataTable');
   dataTable('#placesDataTable');
   dataTable('#estimatedRevenueDataTable');
   dataTable('#finalizedPaymentMonthlyInfoDataTable');
   dataTable('#publisherInvoicePaymentProcessAdvertiserDataTable');
   dataTable('#publisherInvoicePaymentProcessPropertiesDataTable');
   dataTable('#overviewDatesDataTable');
   dataTable('#overviewPropertyDataTable');
   dataTable('#overviewAdPlaceDataTable');
   dataTable('#browserDataTable');
   dataTable('#devicesDataTable');
   dataTable('#operatingSystemDataTable');
   dataTable('#countriesDataTable');
   dataTable('#citiesDataTable');
   dataTable('#networkDataTable');
   dataTable('#advertiserDataTable');
   dataTable('#adSizeDataTable');
   dataTable('#positionDataTable');
   dataTable('#countriesDetailDataTable');
   dataTable('#influencerDataTable');
   dataTable('#influencerPlatformDataTable');
   dataTable('#influencerPostDatatable');


   /*==========================================================================
       WHEN DOCUMENT LOADING
   ==========================================================================*/
   $(window).on('load', function () {

   });

})(window.jQuery);

