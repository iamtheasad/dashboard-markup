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

    function checkbox() {
        $('.rs-checkbox-input').on('change', function () {
            var input = $(this);
            var wrapper = input.parents('.checkbox-group');
            if (wrapper.hasClass('active')) {
                wrapper.removeClass('active')
            } else {
                wrapper.addClass('active')
            }
        })
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
                if ($('.sidebar-menu').hasClass('show')) {
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
        if (element.length) {
            $(element).DataTable({
                "paging": false,
                "searching": false,
            });
        }
    }

    /* Influencer Looping Data Table Id */
    function dataTable2(element) {
        var element = $(element);
        if (element.length) {
            $(element).DataTable({
                "paging": false,
                "searching": false,
            });
        }
    }

    /* Datatable 3 */
    function dataTable3(element) {
        var element = $(element);
        if (element.length) {
            $(element).DataTable({
                "paging": false,
                "searching": false,
            });
        }
    }

    function getFileName() {
        $(document).on('change', '.file-input', function (e) {
            var fileName = e.target.files[0].name;
            $(this).parents('.rs-form').find('.filename').text(fileName);
        })
    }

    function resetSteps() {
        var menus = $('.influencer-step-form .step-menu ul li');
        var steps = $('.influencer-step-form .step-content .step');

        steps.each(function () {
            $(this).removeClass('show');
        })

    }

    function influencerStepForm() {
        var stepTab = $('.influencer-step-form');

        if (stepTab.length) {
            var form_1 = $('#influencer-form-1');
            var form_2 = $('#influencer-form-2');
            var form_3 = $('#influencer-form-3');
            var form_4 = $('#influencer-form-1');

            form_1.on('submit', function (e) {
                e.preventDefault();
                resetSteps();
                $('#influencer-step-2').addClass('show');
                $('[data-ref="influencer-step-2"]').addClass('stepped');
                $('.influencer-step-form .progress-bar>span').css({ "width": 37.5 + "%" });
            })

            form_2.on('submit', function (e) {
                e.preventDefault();
                resetSteps();
                $('#influencer-step-3').addClass('show');
                $('[data-ref="influencer-step-3"]').addClass('stepped');
                $('.influencer-step-form .progress-bar>span').css({ "width": 37.5 * 2 + "%" });
            })

            form_3.on('submit', function (e) {
                e.preventDefault();
                resetSteps();
                $('#influencer-step-4').addClass('show');
                $('[data-ref="influencer-step-4"]').addClass('stepped');
                $('.influencer-step-form .progress-bar>span').css({ "width": 37.5 * 3 + "%" });
            })

            $('.step-back-btn').on('click', function () {
                var href = $(this).attr('data-href');
                var tab = $('#' + href);
                var menu = $(`.step-menu [data-ref=${href}]`);
                resetSteps();
                $('.step-menu .stepped').last().removeClass('stepped');
                var progressBar = $('.influencer-step-form .progress-bar>span');
                progressBar.css({ "width": (progressBar.width() / progressBar.parent().width() * 100 - 37.5) + "%" });
                tab.addClass('show');
            })

        }
    }

    function filePreview() {
        var wrapper = $('.img-video');
        if (wrapper.length) {
            var fileInput = wrapper.find('input.file-input');

            // change inner text
            fileInput.on('change', function () {
                var filesCount = $(this)[0].files.length;
                var $textContainer = wrapper.find('.filename');

                if (filesCount === 1) {
                    // if single file is selected, show file name
                    var fileName = $(this).val().split('\\').pop();
                    $textContainer.text(fileName);
                } else {
                    // otherwise show number of files
                    $textContainer.text(filesCount + ' files selected');
                }
            });
        }

    }

    function dropdown() {
        let wrapper = $('.dropdown.dropdwon-3');
        if (wrapper.length) {
            wrapper.find('[data-toggle="dropdown"]').on('click', function () {
                $(this).siblings('.dropdown-menu').toggleClass('show');
            })
            $(document).click(function (e) {
                wrapper
                    .not($('.dropdown').has($(e.target)))
                    .children('.dropdown-menu')
                    .removeClass('show');
            });
        }
    }

    function multiDateRangePicker() {
        if (window.daterangepicker) {
            $('.date-range').daterangepicker({
                opens: 'left',
                "autoApply": true,
            }, function (start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            });

            $('.date-range').on('show.daterangepicker', function (ev, picker) {
                $(".multi-date-range").addClass("focus")
            });

            $('.date-range').on('hide.daterangepicker', function (ev, picker) {
                $(".multi-date-range").removeClass("focus")
            });
        }
    }

    function rangeSlider(){
        // Range slider
        function collision($div1, $div2) {
            var x1 = $div1.offset().left;
            var w1 = 40;
            var r1 = x1 + w1;
            var x2 = $div2.offset().left;
            var w2 = 40;
            var r2 = x2 + w2;
    
            if (r1 < x2 || x1 > r2) return false;
            return true;
    
        }
    
        // slider call
        let slider = $('.range-slider');
    
        if (slider.length) {
            slider.each(function (index, slide) {
                let sliderEl = slider.eq(index)
                sliderEl.slider({
                    range: true,
                    min: sliderEl.attr('min'),
                    max: sliderEl.attr('max'),
                    step: JSON.parse(sliderEl.attr('step')),
                    values: sliderEl.attr('defaultValue').split(','),
                    slide: function (event, ui) {
                        let thisSlider = $(this);
    
                        $(thisSlider).find('.ui-slider-handle:eq(0) .price-range-min').html(thisSlider.attr('prefix') + ui.values[0]);
                        $(thisSlider).find('.min-value').val(ui.values[0]);
                        $(thisSlider).find('.ui-slider-handle:eq(1) .price-range-max').html(thisSlider.attr('prefix') + ui.values[1]);
                        $(thisSlider).find('.max-value').val(ui.values[1]);
                        $(thisSlider).find('.price-range-both').html('<i>$' + ui.values[0] + ' - </i>' + thisSlider.attr('prefix') + ui.values[1]);
    
                        if (collision($(thisSlider).find('.price-range-min'), $(thisSlider).find('.price-range-max')) == true) {
                            $(thisSlider).find('.price-range-min, .price-range-max').css('opacity', '0');
                            $(thisSlider).find('.price-range-both').css('display', 'block');
                        } else {
                            $(thisSlider).find('.price-range-min, .price-range-max').css('opacity', '1');
                            $(thisSlider).find('.price-range-both').css('display', 'none');
                        }
                    }
                });
    
                sliderEl.find('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + sliderEl.attr('prefix') + sliderEl.slider('values', 0) + '</span>');
                sliderEl.find('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + sliderEl.attr('prefix') + sliderEl.slider('values', 1) + '</span>');
            })
    
        }
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function () {
        inputAnimate();
        checkbox();
        menuToggler();
        getFileName();
        filePreview();
        dropdown();
        multiDateRangePicker();
        rangeSlider();

        dataTable3('#clientDashboardOverviewDataTable');

        dataTable2('#myCampaignDatatTable');
        dataTable2('#ongoingDataTable');
        dataTable2('#completedDataTable');
        dataTable2('#archievedDataTable');
        dataTable2('#connectRequestsDataTable');
        dataTable2('#inProgressDataTable');
        dataTable2('#pendingApproval');
        dataTable2('#myDealsCancelled');
        dataTable2('#createCampaignDataTable');
        dataTable2('#draftTab4ataTable');

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

        influencerStepForm();

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




