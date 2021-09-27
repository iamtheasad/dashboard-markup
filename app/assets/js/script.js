/* ********************************** */
/* Custom Scripts */
/* ********************************** */

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

        $(document).on('click', '.rs-label', function () {
            $(this).siblings(".rs-input").focus();
        });

        $(".rs-input").focusout(function () {
            if ($(this).val() == '' || $(this).val() == null) {
                $(this).parent(".rs-form").removeClass('animate');
            }
            ;
        });


        $(document).on('change keyup paste', '.rs-input', function (e) {
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

function rangeSlider() {
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

$(document).ajaxSuccess(function () {
    rangeSlider();
    inputAnimate();
});

function copyAnyText() {
    /* Get the text field */
    var copyText = document.getElementById("tracking-code");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Show the copied text */
    $(".btn-copy").html("Text copied")
}

// Tree Menu Collapse Along Screen Width
function treeMenu() {
    if (screen.width <= 900) {
        $('.collapse').collapse(
            'hide'
        )
    }
}

treeMenu();


// Dropzone All Kind of File Ulploader

if ($("#all-files-uploder").length) {
    Dropzone.autoDiscover = false;
    var dropzone = new Dropzone('#all-files-uploder', {
        previewTemplate: document.querySelector('.preview-template').innerHTML,
        parallelUploads: 2,
        thumbnailHeight: 120,
        thumbnailWidth: 120,
        maxFilesize: 3,
        filesizeBase: 1000,
        thumbnail: function (file, dataUrl) {
            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                for (var i = 0; i < images.length; i++) {
                    var thumbnailElement = images[i];
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
                setTimeout(function () { file.previewElement.classList.add("dz-image-preview"); }, 1);
            }
        }
    });

    var minSteps = 6,
        maxSteps = 60,
        timeBetweenSteps = 100,
        bytesPerStep = 100000;

    dropzone.uploadFiles = function (files) {
        console.log(files);
        var self = this;

        for (var i = 0; i < files.length; i++) {

            var file = files[i];
            totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));

            for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function (file, totalSteps, step) {
                    return function () {
                        file.upload = {
                            progress: 100 * (step + 1) / totalSteps,
                            total: file.size,
                            bytesSent: (step + 1) * file.size / totalSteps
                        };

                        self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                        if (file.upload.progress == 100) {
                            file.status = Dropzone.SUCCESS;
                            self.emit("success", file, 'success', null);
                            self.emit("complete", file);
                            self.processQueue();
                            document.getElementsByClassName("dz-success-mark").style.opacity = "1";
                        }
                    };
                }(file, totalSteps, step), duration);
            }
        }
    }
}



(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/

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
                "info": false,
            });
        }
    }

    /* Influencer Looping Data Table Id */
    function dataTable2() {
        var paginationIconLeft = `<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.76724 7.77552C4.91632 7.63333 5 7.44099 5 7.2405C5 7.04001 4.91632 6.84766 4.76724 6.70547L1.93369 3.98103L4.76724 1.29453C4.91632 1.15234 5 0.959994 5 0.759504C5 0.559014 4.91632 0.36667 4.76724 0.224481C4.69283 0.15335 4.6043 0.0968926 4.50676 0.0583643C4.40922 0.0198361 4.3046 0 4.19893 0C4.09326 0 3.98864 0.0198361 3.8911 0.0583643C3.79356 0.0968926 3.70503 0.15335 3.63062 0.224481L0.236768 3.44221C0.161744 3.51276 0.102197 3.59669 0.0615597 3.68917C0.0209222 3.78165 0 3.88084 0 3.98103C0 4.08121 0.0209222 4.1804 0.0615597 4.27288C0.102197 4.36536 0.161744 4.4493 0.236768 4.51985L3.63062 7.77552C3.70503 7.84665 3.79356 7.90311 3.8911 7.94163C3.98864 7.98016 4.09326 8 4.19893 8C4.3046 8 4.40922 7.98016 4.50676 7.94163C4.6043 7.90311 4.69283 7.84665 4.76724 7.77552Z" fill="#475364"/>
        </svg>`;

        var paginationIconRight = `<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.232761 0.224482C0.0836789 0.366671 0 0.559015 0 0.759505C0 0.959995 0.0836789 1.15234 0.232761 1.29453L3.06631 4.01897L0.232761 6.70547C0.0836789 6.84766 0 7.04001 0 7.2405C0 7.44099 0.0836789 7.63333 0.232761 7.77552C0.307172 7.84665 0.395701 7.90311 0.493242 7.94164C0.590782 7.98016 0.695404 8 0.801071 8C0.906738 8 1.01136 7.98016 1.1089 7.94164C1.20644 7.90311 1.29497 7.84665 1.36938 7.77552L4.76323 4.55779C4.83826 4.48724 4.8978 4.40331 4.93844 4.31083C4.97908 4.21835 5 4.11916 5 4.01897C5 3.91879 4.97908 3.8196 4.93844 3.72712C4.8978 3.63464 4.83826 3.5507 4.76323 3.48015L1.36938 0.224482C1.29497 0.153351 1.20644 0.0968938 1.1089 0.0583653C1.01136 0.0198374 0.906738 0 0.801071 0C0.695404 0 0.590782 0.0198374 0.493242 0.0583653C0.395701 0.0968938 0.307172 0.153351 0.232761 0.224482Z" fill="#475364"/>
        </svg>`;
        var iTable2 = $(".datatableActivator-2").DataTable({
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
            }
        });

        $(".dataTable-search-activator").keyup(function () {
            iTable2.search($(this).val()).draw();
        })
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
                $('.dropdown-menu').removeClass('show');
                $(this).siblings('.dropdown-menu').addClass('show');
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
            $('.date-range-activator').daterangepicker({
                opens: 'left',
                "autoApply": true,
                format: "dd MMMM yyyy",
                parentEl: ".campaign-wrapper",
            }, function (start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
            });

            $('.date-range').on('show.daterangepicker', function (ev, picker) {
                $(this).parents(".multi-date-range").addClass("focus")
            });

            $('.date-range').on('hide.daterangepicker', function (ev, picker) {
                $(this).parents(".multi-date-range").removeClass("focus")
            });
        }
    }

    function datePicker() {
        if (window.daterangepicker) {
            $('.duration-date-activator').daterangepicker({
                opens: 'left',
                "autoApply": true,
                "singleDatePicker": true,
                "startDate": "09/14/2021",
                "endDate": "09/20/2021",
                parentEl: ".campaign-wrapper",
            }, function (start, end, label) {
                console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
            });
        }
    }

    function timePicker() {
        if (window.daterangepicker) {
            $('.duration-time-activator').daterangepicker({
                timePicker: true,
                singleDatePicker: true,
                timePickerIncrement: 1,
                timePickerSeconds: true,
                parentEl: ".campaign-wrapper",
                locale: {
                    format: 'HH:mm:ss A'
                },
                "autoApply": true,
            }).on('show.daterangepicker', function (ev, picker) {
                picker.container.find(".calendar-table").hide();
            });
        }
    }

    function animateSearch() {
        if ($(".animate-search").length) {
            $(document).on('click', ".hidden-search-icon", function () {
                $(this).siblings('.hidden-search').toggleClass('show')
            })
        }
    }

    function redialProgressBar() {
        let elm = '.radialProgress';
        if ($(elm).length) {
            var forEach = function (array, callback, scope) {
                for (var i = 0; i < array.length; i++) {
                    callback.call(scope, i, array[i]);
                }
            };
            var max = -219.99078369140625;
            forEach(document.querySelectorAll(elm), function (index, value) {
                let percent = value.getAttribute('data-progress');
                value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                value.querySelector('.value').innerHTML = percent + '%';
            });
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
        datePicker();
        timePicker();
        rangeSlider();
        animateSearch();
        redialProgressBar();

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

