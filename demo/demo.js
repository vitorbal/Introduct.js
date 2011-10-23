(function() {
  // Introduct.js initialization
  //$.introduct([ "#step1", "#step2", "#step3", "#step4", "#step5", ".step6" ]);

  var overlay = $(document),
    target = $('#step2'),
    // includeMargin inside of the target area
    includeMargin = false,
    // Retrieve target dimensions
    height = target.outerHeight(includeMargin),
    width = target.outerWidth(includeMargin),
    // Keep track of target position on the document
    coordinates = includeMargin ? target.position() : target.offset(),
    bottom = coordinates.top + height,
    right = coordinates.left + width,

    /**
    * Helper Functions
    */
    createOverlayBox = function(posTop, posLeft, width, height) {
      $('<div/>').css({
        width: width + 'px',
        height: height + 'px',
        opacity: 0.6,
        background: 'red',
        position: 'absolute',
        top: posTop,
        left: posLeft,
        zIndex: 9998
      })
      .addClass('introductjs')
      .appendTo('body');
    };

  // Create the 4 boxes that compose the overlay
  createOverlayBox(0, 0, coordinates.left, overlay.height());
  createOverlayBox(0, coordinates.left, width, coordinates.top);
  createOverlayBox(0, right, overlay.width() - right, overlay.height());
  createOverlayBox(bottom, coordinates.left, width, overlay.height() - bottom);


  //$('<div/>').css({
  //  position: 'absolute',
  //  width: 115,
  //  height: 25,
  //  background: 'white',
  //  top: 150,
  //  left: 400,
  //  zIndex: 9999
  //}).text("Hello, World!").appendTo('body');

})();
