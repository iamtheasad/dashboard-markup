/* ********************************** */
/* Custom Scripts */
/* ********************************** */
(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/

    function inputAnimate() {
        if ($('.rs-form').length) {
            // Check if has value
            $('.rs-input').each(function () {
                if ($(this).val()) {
                    $(this).parent(".rs-form").addClass('animate');
                }
            })

            // Events
            $('.rs-input').focus(function () {
                $(this).parent(".rs-form").addClass('animate');
            });

            $('.rs-label').on('click', function () {
                $(this).siblings(".rs-input").focus();
            });

            $(".rs-input").focusout(function () {
                if ($(this).val() == '' || $(this).val() == null) {
                    $(this).parent(".rs-form").removeClass('animate');
                }
                ;
            });

            $(".rs-input").on('change keyup paste', function (e) {
                // alert($(this).val());
                if ($(this).val() == '' || $(this).val() == null) {
                    $(this).parent(".rs-form").addClass('error');
                } else {
                    $(this).parent(".rs-form").removeClass('error');
                    $(this).parent(".rs-form").addClass('animate');
                }
            });

            $('.type-toggle').on('click', function () {
                var input = $(this).siblings('.rs-input');
                if (input.val()) {
                    if (input.attr('type') == 'text') {
                        input.attr('type', 'password');
                        $(this).removeClass('mdi-eye-off');
                        $(this).addClass('mdi-eye');
                    } else {
                        input.attr('type', 'text');
                        $(this).removeClass('mdi-eye');
                        $(this).addClass('mdi-eye-off');
                    }
                }
            })
        }
    }

    function menuHide() {
        $('main').removeClass('overlay');
        $('.sidebar-menu').removeClass('show');
        $('body').css({
            'overflow-y': 'visible'
        })
    }

    function menuShow() {
        $('main').addClass('overlay');
        
        $('.sidebar-menu').addClass('show');
        $('body').css({
            'overflow-y': 'hidden'
        })
    }

    function menuToggler() {
        var btn = $('.menu-toggler');
        if (btn.length) {
            btn.on('click', function () {
                if ( $('.sidebar-menu').hasClass('show')) {
                    menuHide();
                } else {
                    menuShow();
                }

            })

            var specifiedElement = document.querySelector('.sidebar-menu');
            document.addEventListener('click', function (event) {
                if ($('.sidebar-menu').hasClass('show')) {
                    var isClickInside = specifiedElement.contains(event.target);
                    if (!isClickInside) {
                        menuHide();
                    }
                }
            });

        }
    }

    function pageLoader() {
        if ($('.preloader').length) {
            $('.preloader').addClass('visible');
        }
    }

    /* Looping Data Table Id */
    function dataTable(element) {
        var element = $(element);
        if(element.length){
            $(element).DataTable({
                "paging": false,
                "searching": false,
            });
        }
    }

    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        inputAnimate();
        menuToggler();

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

        // will load on end
        pageLoader();

    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        //
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);




