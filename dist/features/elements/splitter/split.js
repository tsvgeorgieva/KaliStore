System.register(['nathancahill/Split.js', 'utils'], function (_export) {
  'use strict';

  var Split, customElementHelper;

  _export('split', split);

  function split(childs, direction, sizes, minSizes) {
    if (direction === 'horizontal') {
      direction = 'vertical';
    } else if (direction === 'vertical') {
      direction = 'horizontal';
    } else {
      throw new Error('Propertiy "direction" has to be initialized.');
    }

    if (sizes.length === 0) {
      throw new Error('Propertiy "sizes" must contain elements.');
    }

    var items = [];
    for (var i = 0; i < childs.length; i++) {
      var item = childs[i];

      $(item).addClass('split split-' + direction);
      items.push(item);
    }

    Split(items, {
      direction: direction,
      minSize: minSizes,
      sizes: sizes,
      onDragEnd: function onDragEnd() {
        return customElementHelper.dispatchEvent(window, 'resize');
      }
    });
  }

  return {
    setters: [function (_nathancahillSplitJs) {
      Split = _nathancahillSplitJs.Split;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NwbGl0dGVyL3NwbGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHTyxXQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDeEQsUUFBSSxTQUFTLEtBQUssWUFBWSxFQUFFO0FBQzlCLGVBQVMsR0FBRyxVQUFVLENBQUM7S0FDeEIsTUFBTSxJQUFJLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDbkMsZUFBUyxHQUFHLFlBQVksQ0FBQztLQUMxQixNQUFNO0FBQ0wsWUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO0tBQ2pFOztBQUVELFFBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdEIsWUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0tBQzdEOztBQUVELFFBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RDLFVBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckIsT0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDN0MsV0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQjs7QUFFRCxTQUFLLENBQUMsS0FBSyxFQUFFO0FBQ1gsZUFBUyxFQUFFLFNBQVM7QUFDcEIsYUFBTyxFQUFFLFFBQVE7QUFDakIsV0FBSyxFQUFFLEtBQUs7QUFDWixlQUFTLEVBQUU7ZUFBTSxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztPQUFBO0tBQ3JFLENBQUMsQ0FBQztHQUNKOzs7O21DQTlCTyxLQUFLOzttQ0FDTCxtQkFBbUIiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvc3BsaXR0ZXIvc3BsaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NwbGl0fSBmcm9tICduYXRoYW5jYWhpbGwvU3BsaXQuanMnO1xyXG5pbXBvcnQge2N1c3RvbUVsZW1lbnRIZWxwZXJ9IGZyb20gJ3V0aWxzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzcGxpdChjaGlsZHMsIGRpcmVjdGlvbiwgc2l6ZXMsIG1pblNpemVzKSB7XHJcbiAgaWYgKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICBkaXJlY3Rpb24gPSAndmVydGljYWwnO1xyXG4gIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignUHJvcGVydGl5IFwiZGlyZWN0aW9uXCIgaGFzIHRvIGJlIGluaXRpYWxpemVkLicpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNpemVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm9wZXJ0aXkgXCJzaXplc1wiIG11c3QgY29udGFpbiBlbGVtZW50cy4nKTtcclxuICB9XHJcblxyXG4gIGxldCBpdGVtcyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgaXRlbSA9IGNoaWxkc1tpXTtcclxuICAgIC8vIHRvZG86IHJlZmFjdG9yIG91dCBqUXVlcnlcclxuICAgICQoaXRlbSkuYWRkQ2xhc3MoJ3NwbGl0IHNwbGl0LScgKyBkaXJlY3Rpb24pO1xyXG4gICAgaXRlbXMucHVzaChpdGVtKTtcclxuICB9XHJcblxyXG4gIFNwbGl0KGl0ZW1zLCB7XHJcbiAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcclxuICAgIG1pblNpemU6IG1pblNpemVzLFxyXG4gICAgc2l6ZXM6IHNpemVzLFxyXG4gICAgb25EcmFnRW5kOiAoKSA9PiBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQod2luZG93LCAncmVzaXplJylcclxuICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
