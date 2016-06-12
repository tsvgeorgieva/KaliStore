System.register(['./tokenizers'], function (_export) {
  'use strict';

  var Tokenizers, Datum;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_tokenizers) {
      Tokenizers = _tokenizers.Tokenizers;
    }],
    execute: function () {
      Datum = (function () {
        function Datum(item, index, opts, queryTokens) {
          var _this = this;

          _classCallCheck(this, Datum);

          this.highlightTag = 'strong';

          this.item = item;
          this.index = index;
          this.queryTokens = queryTokens;

          this.opts = opts;

          this.tokens = this._datumTokenizer(item);
          this.highlightedName = '';

          this._splitOriginalItemNameToParts();

          this.queryTokensMatches = this.tokens.map(function (token) {
            var tokenLower = token.value.toLowerCase();
            var matchedQueryTokens = _this.queryTokens.filter(function (queryToken) {
              return tokenLower.startsWith(queryToken.value);
            }).sort(function (a, b) {
              return a.value.length > b.value.length ? -1 : a.value.length < b.value.length ? 1 : 0;
            });

            var matchedQueryTokenIndex = matchedQueryTokens.length > 0 ? _this.queryTokens.indexOf(matchedQueryTokens[0]) : -1;
            if (matchedQueryTokenIndex > -1) {
              var matchedQueryToken = matchedQueryTokens[0];

              var partForHighlighting = token.value.substring(0, matchedQueryToken.value.length);
              var highlightedPart = '<' + _this.highlightTag + '>' + partForHighlighting + '</' + _this.highlightTag + '>';
              var nonHighlightedPart = token.value.substring(matchedQueryToken.value.length);
              _this.highlightedNameParts[token.position] = highlightedPart + nonHighlightedPart;
            }

            return matchedQueryTokenIndex;
          });

          this._setHighlightedName();
        }

        _createClass(Datum, [{
          key: '_splitOriginalItemNameToParts',
          value: function _splitOriginalItemNameToParts() {
            var _this2 = this;

            this.originalName = this.item._escapedName;
            this.highlightedNameParts = {};
            var currentIndex = 0;
            this.tokens.forEach(function (token) {
              if (currentIndex < token.position) {
                _this2.highlightedNameParts[currentIndex] = _this2.originalName.substring(currentIndex, token.position);
              }

              _this2.highlightedNameParts[token.position] = token.value;
              currentIndex = token.position + token.value.length;
            });
            if (currentIndex < this.originalName.length - 1) {
              this.highlightedNameParts[currentIndex] = this.originalName.substring(currentIndex);
            }
          }
        }, {
          key: '_setHighlightedName',
          value: function _setHighlightedName() {
            var _this3 = this;

            this.highlightedName = '';
            var keys = Object.keys(this.highlightedNameParts).sort(function (a, b) {
              return a - b;
            });
            keys.forEach(function (position) {
              _this3.highlightedName = _this3.highlightedName + _this3.highlightedNameParts[position];
            });
          }
        }, {
          key: '_datumTokenizer',
          value: function _datumTokenizer(item) {
            return Tokenizers.nonword(item._escapedName);
          }
        }], [{
          key: 'compare',
          value: function compare(a, b) {
            var aQtm = a.queryTokensMatches;
            var bQtm = b.queryTokensMatches;
            var length = Math.min(aQtm.length, bQtm.length);
            for (var i = 0; i < length; i++) {
              var ai = aQtm[i];
              var bi = bQtm[i];
              if (ai !== bi) {
                if (ai === -1) {
                  return 1;
                }

                if (bi === -1) {
                  return -1;
                }

                return ai > bi ? 1 : -1;
              }
            }

            return 0;
          }
        }]);

        return Datum;
      })();

      _export('Datum', Datum);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NlbGVjdDMvZGF0dW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQUVhLEtBQUs7Ozs7Ozs7OytCQUZWLFVBQVU7OztBQUVMLFdBQUs7QUFDTCxpQkFEQSxLQUFLLENBQ0osSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOzs7Z0NBRGpDLEtBQUs7O0FBRWQsY0FBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7O0FBRTdCLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGNBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUUvQixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsY0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLGNBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDOztBQUUxQixjQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQzs7QUFLckMsY0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ2pELGdCQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNDLGdCQUFJLGtCQUFrQixHQUFHLE1BQUssV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVUsRUFBSTtBQUU3RCxxQkFBTyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBSztBQUNoQixxQkFBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENB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QUFFO0FBRXBCLG1CQUE2QixVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztXQUNwRTs7O2lCQXZFYSxpQkFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBR25CLGdCQUFJLElBQUksR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUM7QUFDaEMsZ0JBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztBQUNoQyxnQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixrQkFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLGtCQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsa0JBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtBQUNiLG9CQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNiLHlCQUFPLENBQUMsQ0FBQztpQkFDVjs7QUFFRCxvQkFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDYix5QkFBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDs7QUFrQkQsdUJBQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7ZUFDekI7YUFDRjs7QUFFRCxtQkFBTyxDQUFDLENBQUM7V0FDVjs7O2VBL0ZVLEtBQUsiLCJmaWxlIjoiZmVhdHVyZXMvZWxlbWVudHMvc2VsZWN0My9kYXR1bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VG9rZW5pemVyc30gZnJvbSAnLi90b2tlbml6ZXJzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXR1bSB7XHJcbiAgY29uc3RydWN0b3IoaXRlbSwgaW5kZXgsIG9wdHMsIHF1ZXJ5VG9rZW5zKSB7XHJcbiAgICB0aGlzLmhpZ2hsaWdodFRhZyA9ICdzdHJvbmcnO1xyXG5cclxuICAgIHRoaXMuaXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLnF1ZXJ5VG9rZW5zID0gcXVlcnlUb2tlbnM7XHJcblxyXG4gICAgdGhpcy5vcHRzID0gb3B0cztcclxuXHJcbiAgICB0aGlzLnRva2VucyA9IHRoaXMuX2RhdHVtVG9rZW5pemVyKGl0ZW0pO1xyXG4gICAgdGhpcy5oaWdobGlnaHRlZE5hbWUgPSAnJztcclxuXHJcbiAgICB0aGlzLl9zcGxpdE9yaWdpbmFsSXRlbU5hbWVUb1BhcnRzKCk7XHJcblxyXG4gICAgLy9xdWVyeVRva2VucyA9IHRoaXMucXVlcnlUb2tlbnMuZmlsdGVyKHggPT4gdHJ1ZSk7IC8vIG1ha2UgY29weSBmb3IgcmVtb3ZpbmcgaXRlbXNcclxuXHJcbiAgICAvLyBxdWVyeVRva2Vuc01hdGNoZXNbaV0gPT0gdGhlIGluZGV4IG9mIHF1ZXJ5IHRva2VuIHRoYXQgdGhlIGktdGggZGF0YSB0b2tlbiBtYXRjaGVzXHJcbiAgICB0aGlzLnF1ZXJ5VG9rZW5zTWF0Y2hlcyA9IHRoaXMudG9rZW5zLm1hcCh0b2tlbiA9PiB7XHJcbiAgICAgIGxldCB0b2tlbkxvd2VyID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgbGV0IG1hdGNoZWRRdWVyeVRva2VucyA9IHRoaXMucXVlcnlUb2tlbnMuZmlsdGVyKHF1ZXJ5VG9rZW4gPT4ge1xyXG4gICAgICAgIC8vbGV0IHF1ZXJ5VG9rZW5Mb3dlciA9IHF1ZXJ5VG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gdG9rZW5Mb3dlci5zdGFydHNXaXRoKHF1ZXJ5VG9rZW4udmFsdWUpO1xyXG4gICAgICB9KS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGEudmFsdWUubGVuZ3RoID4gYi52YWx1ZS5sZW5ndGggPyAtMSA6IGEudmFsdWUubGVuZ3RoIDwgYi52YWx1ZS5sZW5ndGggPyAxIDogMDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBsZXQgbWF0Y2hlZFF1ZXJ5VG9rZW5JbmRleCA9IG1hdGNoZWRRdWVyeVRva2Vucy5sZW5ndGggPiAwID8gdGhpcy5xdWVyeVRva2Vucy5pbmRleE9mKG1hdGNoZWRRdWVyeVRva2Vuc1swXSkgOiAtMTtcclxuICAgICAgaWYgKG1hdGNoZWRRdWVyeVRva2VuSW5kZXggPiAtMSkge1xyXG4gICAgICAgIGxldCBtYXRjaGVkUXVlcnlUb2tlbiA9IG1hdGNoZWRRdWVyeVRva2Vuc1swXTtcclxuICAgICAgICAvLyBzdWJzdGl0dXRlIG5hbWUgcGFydCB3aXRoIGhpZ2hsaWdodGVkXHJcbiAgICAgICAgbGV0IHBhcnRGb3JIaWdobGlnaHRpbmcgPSB0b2tlbi52YWx1ZS5zdWJzdHJpbmcoMCwgbWF0Y2hlZFF1ZXJ5VG9rZW4udmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBsZXQgaGlnaGxpZ2h0ZWRQYXJ0ID0gJzwnICsgdGhpcy5oaWdobGlnaHRUYWcgKyAnPicgKyBwYXJ0Rm9ySGlnaGxpZ2h0aW5nICsgJzwvJyArIHRoaXMuaGlnaGxpZ2h0VGFnICsgJz4nO1xyXG4gICAgICAgIGxldCBub25IaWdobGlnaHRlZFBhcnQgPSB0b2tlbi52YWx1ZS5zdWJzdHJpbmcobWF0Y2hlZFF1ZXJ5VG9rZW4udmFsdWUubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkTmFtZVBhcnRzW3Rva2VuLnBvc2l0aW9uXSA9IGhpZ2hsaWdodGVkUGFydCArIG5vbkhpZ2hsaWdodGVkUGFydDtcclxuXHJcbiAgICAgICAgLy8gZG8gd2Ugd2FudCB0aGlzPz9cclxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbWF0Y2gsIHJlbW92ZSB0b2tlbiBmcm9tIHF1ZXJ5VG9rZW5zLCBzbyB3ZSBkb24ndCBtYXRjaCBhZ2FpblxyXG4gICAgICAgIC8vcXVlcnlUb2tlbnMuc3BsaWNlKG1hdGNoZWRRdWVyeVRva2VuSW5kZXgsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbWF0Y2hlZFF1ZXJ5VG9rZW5JbmRleDtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vbGV0IHVzZWRUb2tlbnMgPSBbXTtcclxuICAgIC8vdGhpcy5xdWVyeVRva2Vuc01hdGNoZXNVbmlxdWUgPSB0aGlzLnF1ZXJ5VG9rZW5zTWF0Y2hlcy5tYXAoKHF1ZXJ5SW5kZXgsIGRhdHVtSW5kZXgpID0+IHtcclxuICAgIC8vICBpZiAodXNlZFRva2Vucy5pbmRleE9mKHF1ZXJ5SW5kZXgpID4gLTEpIHtcclxuICAgIC8vICAgIHJldHVybiAtcXVlcnlJbmRleCAtIDI7XHJcbiAgICAvLyAgfVxyXG4gICAgLy8gIHVzZWRUb2tlbnMucHVzaChxdWVyeUluZGV4KTtcclxuICAgIC8vICByZXR1cm4gcXVlcnlJbmRleDtcclxuICAgIC8vfSk7XHJcblxyXG4gICAgdGhpcy5fc2V0SGlnaGxpZ2h0ZWROYW1lKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcGFyZShhLCBiKSB7XHJcbiAgICAvL2xldCBhUXRtID0gYS5xdWVyeVRva2Vuc01hdGNoZXNVbmlxdWU7XHJcbiAgICAvL2xldCBiUXRtID0gYi5xdWVyeVRva2Vuc01hdGNoZXNVbmlxdWU7XHJcbiAgICBsZXQgYVF0bSA9IGEucXVlcnlUb2tlbnNNYXRjaGVzO1xyXG4gICAgbGV0IGJRdG0gPSBiLnF1ZXJ5VG9rZW5zTWF0Y2hlcztcclxuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWluKGFRdG0ubGVuZ3RoLCBiUXRtLmxlbmd0aCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGFpID0gYVF0bVtpXTtcclxuICAgICAgY29uc3QgYmkgPSBiUXRtW2ldO1xyXG4gICAgICBpZiAoYWkgIT09IGJpKSB7XHJcbiAgICAgICAgaWYgKGFpID09PSAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYmkgPT09IC0xKSB7XHJcbiAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2lmKGFpID4gLTEgJiYgYmkgPiAtMSl7XHJcbiAgICAgICAgLy8gIHJldHVybiBhaSA+IGJpID8gMSA6IC0xO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy9pZihhaSA8IC0xICYmIGJpIDwgLTEpe1xyXG4gICAgICAgIC8vICByZXR1cm4gIGFpIDwgYmkgPyAxIDogLTE7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL2lmKGFpID4gLTEgJiYgYmkgPCAtMSl7XHJcbiAgICAgICAgLy8gIHJldHVybiAtMTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vaWYoYWkgPCAtMSAmJiBiaSA+IC0xKXtcclxuICAgICAgICAvLyAgcmV0dXJuIDE7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHJldHVybiBhaSA+IGJpID8gMSA6IC0xO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBfc3BsaXRPcmlnaW5hbEl0ZW1OYW1lVG9QYXJ0cygpIHtcclxuICAgIHRoaXMub3JpZ2luYWxOYW1lID0gdGhpcy5pdGVtLl9lc2NhcGVkTmFtZTtcclxuICAgIHRoaXMuaGlnaGxpZ2h0ZWROYW1lUGFydHMgPSB7fTtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSAwO1xyXG4gICAgdGhpcy50b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XHJcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPCB0b2tlbi5wb3NpdGlvbikge1xyXG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWROYW1lUGFydHNbY3VycmVudEluZGV4XSA9IHRoaXMub3JpZ2luYWxOYW1lLnN1YnN0cmluZyhjdXJyZW50SW5kZXgsIHRva2VuLnBvc2l0aW9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5oaWdobGlnaHRlZE5hbWVQYXJ0c1t0b2tlbi5wb3NpdGlvbl0gPSB0b2tlbi52YWx1ZTtcclxuICAgICAgY3VycmVudEluZGV4ID0gdG9rZW4ucG9zaXRpb24gKyB0b2tlbi52YWx1ZS5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIGlmIChjdXJyZW50SW5kZXggPCB0aGlzLm9yaWdpbmFsTmFtZS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWROYW1lUGFydHNbY3VycmVudEluZGV4XSA9IHRoaXMub3JpZ2luYWxOYW1lLnN1YnN0cmluZyhjdXJyZW50SW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3NldEhpZ2hsaWdodGVkTmFtZSgpIHtcclxuICAgIHRoaXMuaGlnaGxpZ2h0ZWROYW1lID0gJyc7XHJcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaGlnaGxpZ2h0ZWROYW1lUGFydHMpLnNvcnQoKGEsIGIpPT4ge1xyXG4gICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9KTtcclxuICAgIGtleXMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWROYW1lID0gdGhpcy5oaWdobGlnaHRlZE5hbWUgKyB0aGlzLmhpZ2hsaWdodGVkTmFtZVBhcnRzW3Bvc2l0aW9uXTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2RhdHVtVG9rZW5pemVyKGl0ZW0pIHtcclxuICAgIC8vIGFkZCBoZXJlIGlmIHdlIHdhbnQgbWF0Y2hpbmcgYnkgbW9yZSBmaWVsZHNcclxuICAgIHJldHVybiAvKmxldCBuYW1lVG9rZW5zID0gKi8gVG9rZW5pemVycy5ub253b3JkKGl0ZW0uX2VzY2FwZWROYW1lKTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
