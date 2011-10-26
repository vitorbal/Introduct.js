(function( $ ) {

  var settings = {
    // Target container where the overlay will be applied
    overlayTarget: document,
    color: 'white',
    opacity: 0.5,
    zIndex: 9998,
    addShadow: false
  },

  // The overlay object is static between all calls to the plugin
  overlay = undefined,

  obj = {
    init: function( options ) {

      if ( ! this.length  || this.hasClass( 'introduct-target' )) {
        return this;
      }

      // Extending plugin settings with user options without overriding
      // the original settings object
      var o = $.extend( {}, settings, options );

      // Create the overlay, if necessary
      if ( !overlay ) {
        overlay = $('<div/>')
          .css({
            zIndex: o.zIndex,
            opacity: o.opacity,
            position: 'absolute',
            top: 0,
            left: 0,
            width: $(o.overlayTarget).width(),
            height: $(o.overlayTarget).height(),
            backgroundColor: o.color
          })
          .addClass( 'introduct-overlay' )
          .appendTo( 'body' );

        // Attach handler to resize event so we can recalculate position and
        // size of the overlay box when the size of the browser window changes
        // FIXME: doesnt work right...
        //$(window).resize(function() {
        //  _resizeOverlay( o.overlayTarget );
        //});
      }

      return this.each(function() {
        
        var target = $(this);

          target.css({
            zIndex: 9999,
            opacity: 1,
            position: 'relative'
          })
          .addClass( 'introduct-target' );
          if ( o.addShadow ) {
            target.addClass( 'introduct-box-shadow' );
          }

      });
    },

    destroy: function() {

      return this.each(function() {

        // Destroy method here

      });

    }
  },

  /**
   * Private methods
   */

  // Recalculate size of the overlay box
  _resizeOverlay = function( overlayTarget ) {

    if (overlay) {
      var $overlayTarget = $(overlayTarget),
          overlayWidth = $overlayTarget.width() > $(window).width() ?
            $(window).width() : $overlayTarget.width(),
          overlayHeight = $overlayTarget.height() > $(window).height() ?
            $(window).height() : $overlayTarget.height();
          
      overlay.width( overlayWidth );
      overlay.height( overlayHeight );
    }

  };


  $.fn.introduct = function( method ) {

    // Method calling logic
    // Calling introduct with no parameters or with just the options object
    // calls the init method, otherwise we attempt to route the call to
    // the method specified by the string passed in as the first argument
    if ( obj[method] ) {
      return obj[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
    } else if ( typeof method === 'object' ||  !method ) {
      return obj.init.apply( this, arguments );
    } else {
      $.error( 'Method ' + method + ' does not exist on jQuery.introduct' );
    }

  };

})( jQuery );
