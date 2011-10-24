(function( $ ) {

  var settings = {
    // Target container where the overlay will be applied
    overlayTarget: document,
    color: 'white',
    opacity: 0.5,
    zIndex: 9998
  },

  // The overlay object is static between all calls to the plugin
  overlay = undefined,

  obj = {
    init: function( options ) {

      // Extending plugin settings with user options without overriding
      // the original settings object
      var o = $.extend( {}, settings, options );

      // Create the overlay, if necessary
      if ( !overlay ) {
        overlay = $('<div/>')
          .css({
            width: $(o.overlayTarget).width(),
            height: $(o.overlayTarget).height(),
            opacity: o.opacity,
            backgroundColor: o.color,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: o.zIndex
          })
          .addClass( 'introduct-overlay' )
          .appendTo( 'body' );

        // Attach handler to resize event so we can recalculate position and
        // size of the overlay box when the size of the browser window changes
        $(window).resize(function() {
          _resizeOverlay( o.overlayTarget );
        });
      }

      return this.each(function() {
        
        // Plugin code here
        var target = $(this),
            placeholder = $('<' + target[0].tagName + '/>'),
            posTop = target.position().top,
            posLeft = target.position().left;

        placeholder.css( _cloneShape( target ))
          .css({
            width: target.outerWidth(),
            height: target.outerHeight(),
            backgroundColor: 'black'
          })
          .attr( 'id', 'introduct-placeholder-' + target.attr( 'id' ))
          .insertAfter( target );

        target.css({
          position: 'absolute',
          top: posTop,
          left: posLeft,
          zIndex: 9999,
          opacity: 1
        })
        .addClass('introduct-shadow')
        .animate({
          top: '-=7',
          left: '-=7',
        }, 480);

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
  },

  // Get all css properties of the element that could influence it's shape.
  // This method is used by the placeholder element to imitate the shape of
  // it's target element
  _cloneShape = function( target ) {
      var attr = [
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'display', 'float', 'clear', 'border-top-left-radius',
        'border-top-right-radius', 'border-bottom-left-radius',
        'border-bottom-right-radius'],
        len = attr.length, obj = {};
      for (var i = 0; i < len; i++) {
        var targetCss = target.css(attr[i]);
        if (targetCss && targetCss !== 'none') {
          obj[attr[i]] = targetCss;
        }
      }
      return obj;

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
