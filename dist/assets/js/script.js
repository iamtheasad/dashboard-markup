/* ********************************** */
/* Custom Scripts */
/* ********************************** */

// Multi Select With Search
function dropdownWithSearch(){
      
    for (var i = 1; i <= 100; i++) {
        $('.dropdownWithSearchActivator').append('<option value="' + i + '">' + i + '</option>');
    }

    $('.dropdownWithSearchActivator').multiselect({
        enableHTML:false,
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        buttonWidth: '100%',
        maxHeight: 150,
        allSelectedText: 'All selected',
        dropUp:false
    });
}

dropdownWithSearch();

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

// Date Picker
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


$(document).ajaxSuccess(function () {
    rangeSlider();
    inputAnimate();
    dropzoneFiles();
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

// Range Slider 2
if ($('#slider_element').length) {
    const spent = 12000, remaining = 3000, avaliable = 10000, unallocated = 5000;
    const max = avaliable + unallocated;
    function calculateValues() {
        var value = $("#slider_element").slider("value");
        let unallocatedPercentage = 0,
            allocatedPercentage = 0;

        unallocatedPercentage = (value / max) * 100;
        console.log('unallocatedPercentage:', unallocatedPercentage)

        if (unallocatedPercentage < 15) {
            unallocatedPercentage = 15;
        }
        if (unallocatedPercentage > 85) {
            unallocatedPercentage = 85;
        }

        $(".ui-slider-handle").html(`<span class="my_range_tooltip">${spent + remaining + value}</span>`);
        $(".amount_wrapper .left_amount").html(`${value}`);
        $(".amount_wrapper .left_amount").css("min-width", `${unallocatedPercentage}%`);
        $(".amount_wrapper .right_amount").html(`${max - value}`);
    }

    $("#slider_element").slider({
        orientation: "horizontal",
        range: "min",
        max: max,
        value: unallocated,
        slide: calculateValues,
        change: calculateValues
    });

    $("#slider_element").slider("value", unallocated);
}

function bottomToTop() {
    if ($(".btn-bottom-top").length) {
        $(".btn-bottom-top").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 1000);
        });
    }
}

// submit
$('.registration-form').on('submit', function (e) {

    $(this).find('input[type="text"],input[type="email"]').each(function () {
        if ($(this).val() == "") {
            e.preventDefault();
            $(this).addClass('input-error');
        } else {
            $(this).removeClass('input-error');
        }
    });
});



(function ($) {
    "use strict";

    /*==========================================================================
        :: All Essential Functions
    ==========================================================================*/
    function dashSectionShowHide() {
        $(".remove-section").click(function () {
            let id = $(this).data("section-id");

            let display = $(id).css("display");

            if (display === "block") {
                $(this).addClass("active")
                $(id).attr("style", "display: none!important");

            } else {
                $(this).removeClass("active")
                $(id).attr("style", "display: block!important");
            }
        });
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

    function animateSearch() {
        if ($(".animate-search").length) {
            $(document).on('click', ".hidden-search-icon", function () {
                $(this).parent('.animate-search').toggleClass('show');
            })

            $(document).click(function (e) {
                $(".animate-search")
                    .not($(".animate-search").has($(e.target)))
                    .removeClass('show');
            });
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

    // For Sidebar Dropdown
    function sidebarDropdown() {
        let btn = $('.sideBar .dropdown .menu-item');
        btn.on('click', function () {
            $(this).parent('.dropdown').toggleClass('open');
            $(this).siblings('.dropdown-menus').slideToggle(200);
        })
    }

    function sidebarPopup() {
        let btn = $('.sideBar .actionBar .actionIcon');
        btn.on('click', function () {
            $(this).siblings('.action-popup').slideToggle(200);
        })
        $(document).click(function (e) {
            $('.actionBar')
                .not($('.actionBar').has($(e.target)))
                .children('.action-popup')
                .slideUp(200);
        });
    }

    /* Dropzone All Kind of File Ulploader For Banner */
    function dropzoneFiles() {
        if ($(".all-files-uploder").length) {

            // Get the dropzone-template HTML and remove it from the doumenthe dropzone-template HTML and remove it from the doument
            var previewNode = document.querySelector(".dropzone-template");
            previewNode.id = "";
            var previewTemplate = previewNode.parentNode.innerHTML;
            previewNode.parentNode.removeChild(previewNode);

            var myDropzone = new Dropzone(".all-files-uploder", { // Make the whole body a dropzone
                url: "/upload", // Set the url
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                parallelUploads: 20,
                previewTemplate: previewTemplate,
                autoQueue: false, // Make sure the files aren't queued until manually added
                previewsContainer: ".previews", // Define the all-files-uploder to display the previews
                clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
            });

            myDropzone.on("addedfile", function (file) {
                // Hookup the start button
                file.previewElement.querySelector(".start").onclick = function () { myDropzone.enqueueFile(file); };
            });

            // Update the total progress bar
            myDropzone.on("totaluploadprogress", function (progress) {
                document.querySelector(".total-progress .progress-bar").style.width = progress + "%";
            });

            myDropzone.on("sending", function (file) {
                // Show the total progress bar when upload starts
                document.querySelector(".total-progress").style.opacity = "1";
                // And disable the start button
                file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
            });

            // Hide the total progress bar when nothing's uploading anymore
            myDropzone.on("queuecomplete", function (progress) {
                document.querySelector(".total-progress").style.opacity = "0";
            });

            // Setup the buttons for all transfers
            // The "add files" button doesn't need to be setup because the config
            // `clickable` has already been specified.
            document.querySelector(".dropzone-actions .start").onclick = function () {
                myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
            };
            document.querySelector(".dropzone-actions .cancel").onclick = function () {
                myDropzone.removeAllFiles(true);
            };
        }
    }

    /* Dropzone All Kind of File Ulploader for Draft */
    function dropzoneFiles2() {
        if ($(".all-files-uploder-2").length) {

            // Get the dropzone-template HTML and remove it from the doumenthe dropzone-template HTML and remove it from the doument
            var previewNode = document.querySelector(".dropzone-template");
            previewNode.id = "";
            var previewTemplate = previewNode.parentNode.innerHTML;
            previewNode.parentNode.removeChild(previewNode);

            var myDropzone = new Dropzone(".all-files-uploder-2", { // Make the whole body a dropzone
                url: "/upload", // Set the url
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                parallelUploads: 20,
                previewTemplate: previewTemplate,
                autoQueue: false, // Make sure the files aren't queued until manually added
                previewsContainer: ".previews2", // Define the all-files-uploder to display the previews
                clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
            });

            myDropzone.on("addedfile", function (file) {
                // Hookup the start button
                file.previewElement.querySelector(".start").onclick = function () { myDropzone.enqueueFile(file); };
            });

            // Update the total progress bar
            myDropzone.on("totaluploadprogress", function (progress) {
                document.querySelector(".total-progress2 .progress-bar").style.width = progress + "%";
            });

            myDropzone.on("sending", function (file) {
                // Show the total progress bar when upload starts
                document.querySelector(".total-progress2").style.opacity = "1";
                // And disable the start button
                file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
            });

            // Hide the total progress bar when nothing's uploading anymore
            myDropzone.on("queuecomplete", function (progress) {
                document.querySelector(".total-progress2").style.opacity = "0";
            });

            // Setup the buttons for all transfers
            // The "add files" button doesn't need to be setup because the config
            // `clickable` has already been specified.
            document.querySelector(".dropzone-actions2 .start").onclick = function () {
                myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
            };
            document.querySelector(".dropzone-actions2 .cancel").onclick = function () {
                myDropzone.removeAllFiles(true);
            };
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
        animateSearch();
        redialProgressBar();
        sidebarDropdown();
        sidebarPopup();
        bottomToTop();
        dropzoneFiles2();
        dropzoneFiles();

        influencerStepForm();

        // will load on end
        pageLoader();

        dashSectionShowHide();

    });

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.btn-bottom-top').fadeIn();
        } else {
            $('.btn-bottom-top').fadeOut();
        }
    });

    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function () {
        //
    });

})(window.jQuery);

