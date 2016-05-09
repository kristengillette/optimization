         $(document).foundation();
         var photoNum = "";
         var photoHTML = "";
         var modalId = "";
         var largePhoto = true;

         $(".image a").click(function() {
             if (largePhoto === false) {
                 $(".big-image").remove();
             };
             largePhoto = true;
             if (largePhoto === true) {
                 photoNum = $(this).attr("data-reveal-id");
                 photoHTML = '<img class="big-image" src="img/photos/';
                 photoHTML += photoNum;
                 photoHTML += '.jpg" alt="' + photoNum + '" >';
                 console.log(photoHTML);
                 $(photoHTML).insertAfter(".modalTitle");
                 modalId = '#' + photoNum;
             }
         });

         $(document).on('close.fndtn.reveal', modalId, function() {
             largePhoto = false;
         });
