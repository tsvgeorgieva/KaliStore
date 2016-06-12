System.register(['aurelia-framework', './tokenizers', './datum', './keys', 'utils'], function (_export) {
  'use strict';

  var inject, customElement, bindable, bindingMode, BindingEngine, TaskQueue, Tokenizers, Datum, KEYS, customElementHelper, Select3;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      BindingEngine = _aureliaFramework.BindingEngine;
      TaskQueue = _aureliaFramework.TaskQueue;
    }, function (_tokenizers) {
      Tokenizers = _tokenizers.Tokenizers;
    }, function (_datum) {
      Datum = _datum.Datum;
    }, function (_keys) {
      KEYS = _keys.KEYS;
    }, function (_utils) {
      customElementHelper = _utils.customElementHelper;
    }],
    execute: function () {
      Select3 = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Select3, [{
          key: 'items',
          decorators: [bindable],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }, {
          key: 'value',
          decorators: [bindable({ defaultBindingMode: bindingMode.twoWay })],
          initializer: function initializer() {
            return null;
          },
          enumerable: true
        }, {
          key: 'disabled',
          decorators: [bindable],
          initializer: function initializer() {
            return false;
          },
          enumerable: true
        }, {
          key: 'options',
          decorators: [bindable],
          initializer: function initializer() {
            return {};
          },
          enumerable: true
        }, {
          key: 'searchedItem',
          decorators: [bindable],
          initializer: function initializer() {
            return '';
          },
          enumerable: true
        }, {
          key: 'filteredData',
          decorators: [bindable],
          initializer: function initializer() {
            return [];
          },
          enumerable: true
        }], null, _instanceInitializers);

        function Select3(element, bindingEngine, taskQueue) {
          _classCallCheck(this, _Select3);

          _defineDecoratedPropertyDescriptor(this, 'items', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'value', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'disabled', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'options', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'searchedItem', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'filteredData', _instanceInitializers);

          this.isDropdownOpen = false;
          this.selectedItemName = '';
          this.hoveredDatum = null;
          this.filteredDataShort = [];
          this.filteredDataShortStartIndex = 0;
          this.filteredDataShortEndIndex = 0;
          this.draggerTop = 0;
          this.draggerHeight = 0;
          this.isScrollbarDragging = false;
          this.previousMouseEvent = undefined;
          this.scrollUpIntervalId = null;
          this.scrollDownIntervalId = null;
          this.opts = {
            id: 'id',
            name: 'name',
            modelValueBind: false,
            caption: 'Изберете',
            noResultsMessage: 'Няма намерени резултати',
            sort: false,
            sortField: '',

            disableClear: false,
            emptyValue: null,
            selectHoveredOnCloseDropdown: false,
            debounceSearch: 150,
            visibleItemsCount: 11,
            scrollStep: 1,
            scrollInterval: 30,
            scrollTimeout: 300
          };

          this.element = element;
          this.bindingEngine = bindingEngine;
          this.taskQueue = taskQueue;

          this.parseInt = parseInt;
        }

        _createDecoratedClass(Select3, [{
          key: 'bind',
          value: function bind() {
            this.opts = Object.assign(this.opts, this.options);
            this.filteredDataShortStartIndex = 0;
            this.filteredDataShortEndIndex = this.opts.visibleItemsCount - 1;
            this.itemsChanged();
          }
        }, {
          key: 'unbind',
          value: function unbind() {
            if (this.itemsCollectionSubscription !== undefined) {
              this.itemsCollectionSubscription.dispose();
            }
          }
        }, {
          key: 'attached',
          value: function attached() {
            this.documentMousemoveHandler = this.onScrollbarDragging.bind(this);
            this.documentMouseupHandler = this.stopScrollbarDragging.bind(this);

            document.addEventListener('mousemove', this.documentMousemoveHandler);
            document.addEventListener('mouseup', this.documentMouseupHandler);

            this.scrollbar = this.element.querySelector('.select3-scrollbar');
            this.draggerContainer = this.element.querySelector('.select3-scrollbar-dragger-container');
            this.dragger = this.element.querySelector('.select3-scrollbar-dragger');
            this.searchInput = this.element.querySelector('.select3-search-box');
            this.valueInput = this.element.querySelector('.select3-value-box');
            this.dropdown = this.element.querySelector('.select3-dropdown');

            if (this.opts.hasFocus && this.items.length > 0) {
              this.openDropdown();
            }
          }
        }, {
          key: 'detached',
          value: function detached() {
            document.removeEventListener('mousemove', this.documentMousemoveHandler);
            document.removeEventListener('mouseup', this.documentMouseupHandler);
          }
        }, {
          key: 'valueChanged',
          value: function valueChanged(newValue, oldValue) {
            var _this = this;

            if (this.value === undefined || this.value === this.opts.emptyValue) {
              this.selectedItemName = null;
            } else {
              (function () {
                var valueId = _this.opts.modelValueBind ? _this.value[_this.opts.id] : _this.value;

                if (isNaN(valueId) === false && _this.filteredData.every(function (x) {
                  return Number.isInteger(x.item[_this.opts.id]);
                })) {
                  valueId = parseInt(valueId, 10);
                }

                var selectedDatum = _this.filteredData.find(function (datum) {
                  return datum.item[_this.opts.id] === valueId;
                });

                if (selectedDatum) {
                  _this.selectedItemName = selectedDatum.item[_this.opts.name];
                } else {
                  _this.selectedItemName = null;
                  _this.value = _this.opts.emptyValue;
                }
              })();
            }

            this.taskQueue.queueMicroTask(function () {
              customElementHelper.dispatchEvent(_this.element, 'change', {
                value: newValue,
                oldValue: oldValue
              });
            });
          }
        }, {
          key: 'itemsChanged',
          value: function itemsChanged() {
            this._subscribeToItemsCollectionChanges();
            this._reconstructItems();
            this.valueChanged();
          }
        }, {
          key: 'searchedItemChanged',
          value: function searchedItemChanged() {
            var _this2 = this;

            if (!this.debounceSearch) {
              this.debounceSearch = customElementHelper.debounce(function () {
                _this2.search(_this2.searchedItem);
              }, this.opts.debounceSearch);
            }

            this.debounceSearch();
          }
        }, {
          key: 'filteredDataChanged',
          value: function filteredDataChanged() {
            this.scrollToHoveredDatum();
          }
        }, {
          key: '_subscribeToItemsCollectionChanges',
          value: function _subscribeToItemsCollectionChanges() {
            var _this3 = this;

            if (this.itemsCollectionSubscription !== undefined) {
              this.itemsCollectionSubscription.dispose();
            }

            this.itemsCollectionSubscription = this.bindingEngine.collectionObserver(this.items).subscribe(function (items) {
              _this3._reconstructItems();
            });
          }
        }, {
          key: '_reconstructItems',
          value: function _reconstructItems() {
            var _this4 = this;

            this.items.forEach(function (i) {
              i._escapedName = _this4._escapeHtml(i[_this4.opts.name]);
            });
            this.search(this.searchedItem);
          }
        }, {
          key: 'scrollDropdown',
          value: function scrollDropdown(e) {
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

            if (delta < 0) {
              this.scrollDown();
            } else {
              this.scrollUp();
            }
          }
        }, {
          key: 'scrollUp',
          value: function scrollUp(count) {
            if (count === undefined) {
              count = this.opts.scrollStep;
            }

            if (this.filteredDataShortStartIndex > 0) {
              if (this.filteredDataShortStartIndex - count >= 0) {
                this.filteredDataShortStartIndex -= count;
                this.filteredDataShortEndIndex -= count;
                this._refillFilteredDataShort();
              } else {
                count = this.filteredDataShortStartIndex;
                if (count > 0) {
                  this.scrollUp(count);
                } else {
                  this.stopScrollUp();
                }
              }
            } else {
              this.stopScrollUp();
            }
          }
        }, {
          key: 'scrollDown',
          value: function scrollDown(count) {
            if (count === undefined) {
              count = this.opts.scrollStep;
            }

            if (this.filteredDataShortEndIndex < this.filteredData.length - 1) {
              if (this.filteredDataShortEndIndex + count < this.filteredData.length) {
                this.filteredDataShortStartIndex += count;
                this.filteredDataShortEndIndex += count;
                this._refillFilteredDataShort();
              } else {
                count = this.filteredData.length - 1 - this.filteredDataShortEndIndex;
                if (count > 0) {
                  this.scrollDown(count);
                } else {
                  this.stopScrollDown();
                }
              }
            } else {
              this.stopScrollDown();
            }
          }
        }, {
          key: 'scrollToHoveredDatum',
          value: function scrollToHoveredDatum() {
            var halfCount = Math.floor(this.opts.visibleItemsCount / 2);
            var fullCount = this.opts.visibleItemsCount;
            var hoveredDatumIndex = this.filteredData.indexOf(this.hoveredDatum);
            var isInFirstHalfCount = hoveredDatumIndex < halfCount;
            var isInLastHalfCount = hoveredDatumIndex > this.filteredData.length - 1 - halfCount;

            var start = undefined,
                end = undefined;
            if (this.filteredData.length <= this.opts.visibleItemsCount) {
              start = 0;
              end = this.filteredData.length - 1;
            } else if (isInFirstHalfCount && !isInLastHalfCount) {
              start = 0;
              end = fullCount - 1;
            } else if (!isInFirstHalfCount && isInLastHalfCount) {
              end = this.filteredData.length - 1;
              start = end - (fullCount - 1);
            } else {
              start = hoveredDatumIndex - halfCount;
              end = hoveredDatumIndex + halfCount;
            }

            this.filteredDataShortStartIndex = start;
            this.filteredDataShortEndIndex = end;

            this._refillFilteredDataShort();
          }
        }, {
          key: '_refillFilteredDataShort',
          value: function _refillFilteredDataShort() {
            var _this5 = this;

            this.filteredDataShort = this.filteredData.slice(this.filteredDataShortStartIndex, this.filteredDataShortEndIndex + 1);

            this.taskQueue.queueTask(function () {
              _this5._calculateDraggerPosition();
            });
          }
        }, {
          key: '_calculateDraggerPosition',
          value: function _calculateDraggerPosition() {
            if (this.filteredDataShort.length === this.filteredData.length) {
              this.scrollbar.style.display = 'none';
            } else {
              this.scrollbar.style.display = '';
              var minDraggerHeight = 15;
              var availableHeight = this.draggerContainer.offsetHeight;
              var draggerHeight = availableHeight * (this.opts.visibleItemsCount / this.filteredData.length);
              var draggerTop = availableHeight * (this.filteredDataShortStartIndex / this.filteredData.length);

              var isDraggerHeightInsufficient = draggerHeight < minDraggerHeight;
              if (isDraggerHeightInsufficient) {
                draggerHeight = minDraggerHeight;

                var isDraggerOnTop = draggerTop - minDraggerHeight / 2 < 0;
                var isDraggerOnBottom = draggerTop + minDraggerHeight / 2 > availableHeight;

                if (isDraggerOnTop) {
                  draggerTop = 0;
                } else if (isDraggerOnBottom) {
                  draggerTop = availableHeight - minDraggerHeight;
                } else {
                  draggerTop -= minDraggerHeight / 2;
                }
              }

              this.draggerHeight = draggerHeight;
              this.draggerTop = draggerTop;
            }
          }
        }, {
          key: '_calculateVisibleItemsPosition',
          value: function _calculateVisibleItemsPosition() {
            var availableHeight = this.draggerContainer.offsetHeight;

            var itemsByPixel = (this.filteredData.length - this.opts.visibleItemsCount) / (availableHeight - this.draggerHeight);
            var newStartIndex = Math.round(itemsByPixel * this.draggerTop);

            var diff = newStartIndex - this.filteredDataShortStartIndex;
            var newEndIndex = this.filteredDataShortEndIndex + diff;

            if (newStartIndex < 0) {
              newEndIndex = newEndIndex + (0 - newStartIndex);
              newStartIndex = 0;
            }

            if (newEndIndex > this.filteredData.length - 1) {
              newStartIndex = newStartIndex + (this.filteredData.length - 1 - newEndIndex);
              newEndIndex = this.filteredData.length - 1;
            }

            this.filteredDataShortStartIndex = newStartIndex;
            this.filteredDataShortEndIndex = newEndIndex;
            this.filteredDataShort = this.filteredData.slice(this.filteredDataShortStartIndex, this.filteredDataShortEndIndex + 1);
          }
        }, {
          key: 'startScrollbarDragging',
          value: function startScrollbarDragging() {
            this.isScrollbarDragging = true;
          }
        }, {
          key: 'stopScrollbarDragging',
          value: function stopScrollbarDragging() {
            this.isScrollbarDragging = false;
            this.previousMouseEvent = undefined;
          }
        }, {
          key: 'onScrollbarDragging',
          value: function onScrollbarDragging(event) {
            if (this.isScrollbarDragging) {
              var movementY = event.movementY || (this.previousMouseEvent !== undefined ? event.screenY - this.previousMouseEvent.screenY : 0);

              var newDraggerTop = this.draggerTop + movementY;

              var availableHeight = this.draggerContainer.offsetHeight;
              var minDraggerTop = 0;
              var maxDraggerTop = availableHeight - this.draggerHeight;

              newDraggerTop = Math.min(maxDraggerTop, Math.max(minDraggerTop, newDraggerTop));

              this.draggerTop = newDraggerTop;
              this._calculateVisibleItemsPosition();

              this.previousMouseEvent = event;
            }
          }
        }, {
          key: 'onDraggerContainerClick',
          value: function onDraggerContainerClick(event) {
            if (event.target === this.dragger) {
              return;
            }

            var availableHeight = this.draggerContainer.offsetHeight;
            var draggerPosition = this.dragger.getBoundingClientRect();
            var diff = event.clientY - (draggerPosition.top + draggerPosition.height / 2);
            var minDraggerTop = 0;
            var maxDraggerTop = availableHeight - this.draggerHeight;
            var newDraggerTop = this.draggerTop + diff;
            newDraggerTop = Math.min(maxDraggerTop, Math.max(minDraggerTop, newDraggerTop));
            this.draggerTop = newDraggerTop;
            this._calculateVisibleItemsPosition();
          }
        }, {
          key: 'startScrollUp',
          value: function startScrollUp() {
            var _this6 = this;

            this.stopScrollDown();
            this.stopScrollUp();
            if (this.filteredDataShortStartIndex > 0) {
              this.scrollUp();

              this.scrollUpIntervalId = window.setTimeout(function () {
                _this6.stopScrollUp();
                _this6.scrollUpIntervalId = window.setInterval(function () {
                  _this6.scrollUp();
                }, _this6.opts.scrollInterval);
              }, this.opts.scrollTimeout);
            }
          }
        }, {
          key: 'stopScrollUp',
          value: function stopScrollUp() {
            this.scrollUpIntervalId = window.clearTimeout(this.scrollUpIntervalId);
            this.scrollUpIntervalId = window.clearInterval(this.scrollUpIntervalId);
          }
        }, {
          key: 'startScrollDown',
          value: function startScrollDown() {
            var _this7 = this;

            this.stopScrollUp();
            this.stopScrollDown();
            if (this.filteredDataShortStartIndex < this.filteredData.length - 1) {
              this.scrollDown();

              this.scrollDownIntervalId = window.setTimeout(function () {
                _this7.stopScrollDown();
                _this7.scrollDownIntervalId = window.setInterval(function () {
                  _this7.scrollDown();
                }, _this7.opts.scrollInterval);
              }, this.opts.scrollTimeout);
            }
          }
        }, {
          key: 'stopScrollDown',
          value: function stopScrollDown() {
            this.scrollDownIntervalId = window.clearTimeout(this.scrollDownIntervalId);
            this.scrollDownIntervalId = window.clearInterval(this.scrollDownIntervalId);
          }
        }, {
          key: 'moveSelectionUp',
          value: function moveSelectionUp() {
            if (this.filteredData.length === 0) {
              return;
            }

            var hoveredIndex = this.filteredData.indexOf(this.hoveredDatum);
            if (hoveredIndex === -1) {
              this.hoveredDatum = this.filteredData[this.filteredData.length - 1];
              this.scrollToHoveredDatum();
            } else if (hoveredIndex === 0) {
              this.hoveredDatum = this.filteredData[this.filteredData.length - 1];
              this.scrollToHoveredDatum();
            } else {
              this.hoveredDatum = this.filteredData[hoveredIndex - 1];
              if (hoveredIndex - 1 < this.filteredDataShortStartIndex) {
                this.scrollUp(1);
              }
            }
          }
        }, {
          key: 'moveSelectionDown',
          value: function moveSelectionDown() {
            if (this.filteredData.length === 0) {
              return;
            }

            var hoveredIndex = this.filteredData.indexOf(this.hoveredDatum);
            if (hoveredIndex === -1) {
              this.hoveredDatum = this.filteredData[0];
              this.scrollToHoveredDatum();
            } else if (hoveredIndex === this.filteredData.length - 1) {
              this.hoveredDatum = this.filteredData[0];
              this.scrollToHoveredDatum();
            } else {
              this.hoveredDatum = this.filteredData[hoveredIndex + 1];
              if (hoveredIndex + 1 > this.filteredDataShortEndIndex) {
                this.scrollDown(1);
              }
            }
          }
        }, {
          key: 'setHover',
          value: function setHover(datum) {
            this.hoveredDatum = datum;
          }
        }, {
          key: 'selectItem',
          value: function selectItem(datum) {
            if (datum === null || datum === undefined) {
              return;
            }

            this.value = this.opts.modelValueBind ? datum.item : datum.item[this.opts.id];
            if (this.isDropdownOpen === true) {
              this.closeDropdown();
            }
          }
        }, {
          key: 'selectHoveredItem',
          value: function selectHoveredItem() {
            this.selectItem(this.hoveredDatum);
          }
        }, {
          key: 'clearValue',
          value: function clearValue() {
            if (!this.opts.disableClear) {
              this.value = this.opts.emptyValue;
            }
          }
        }, {
          key: 'openDropdown',
          value: function openDropdown() {
            var _this8 = this;

            this.isDropdownOpen = true;

            this.taskQueue.queueTask(function () {
              _this8._reorientDropdownIfNeeded();
              _this8._calculateDraggerPosition();
              _this8.searchInput.focus();
              _this8.searchInput.select();
            });
          }
        }, {
          key: 'closeDropdown',
          value: function closeDropdown() {
            var _this9 = this;

            var focusOnValue = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            this.isDropdownOpen = false;

            if (this.opts.selectHoveredOnCloseDropdown === true) {
              this.selectHoveredItem();
            }

            if (focusOnValue && this.value !== this.opts.emptyValue) {
              this.taskQueue.queueTask(function () {
                _this9.valueInput.focus();
              });
            }
          }
        }, {
          key: 'toggleDropdown',
          value: function toggleDropdown() {
            if (!this.disabled) {
              if (this.isDropdownOpen) {
                this.closeDropdown();
              } else {
                this.openDropdown();
              }
            }
          }
        }, {
          key: '_reorientDropdownIfNeeded',
          value: function _reorientDropdownIfNeeded() {
            var currentBottomStyle = this.dropdown.style.bottom;
            var rect = this.dropdown.getBoundingClientRect();
            if (currentBottomStyle == 'auto' || !currentBottomStyle) {
              var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
              var enoughRoomBelow = viewportHeight >= this.dropdown.clientHeight + rect.top;
              if (!enoughRoomBelow) {
                this.dropdown.style.bottom = '25px';
              }
            } else {
              var enoughRoomAbove = rect.bottom - this.dropdown.clientHeight >= 0;
              if (!enoughRoomAbove) {
                this.dropdown.style.bottom = 'auto';
              }
            }
          }
        }, {
          key: 'onValueInputFocus',
          value: function onValueInputFocus() {
            if (this.value === this.opts.emptyValue) {
              this.openDropdown();
            } else {
              if (this.isDropdownOpen) {
                this.closeDropdown();
              }
            }
          }
        }, {
          key: 'onValueInputKeyPressed',
          value: function onValueInputKeyPressed(event) {
            event = window.event ? window.event : event;
            var keyCode = event.keyCode ? event.keyCode : event.which;
            switch (keyCode) {
              case KEYS.ENTER:
                this.openDropdown();
                break;
              default:
                return true;
            }
          }
        }, {
          key: 'onSearchInputKeyPressed',
          value: function onSearchInputKeyPressed(event) {
            event = window.event ? window.event : event;
            var keyCode = event.keyCode ? event.keyCode : event.which;
            switch (keyCode) {
              case KEYS.UP:
                this.moveSelectionUp();
                break;
              case KEYS.DOWN:
                this.moveSelectionDown();
                break;
              case KEYS.ENTER:
                this.selectHoveredItem();
                break;
              case KEYS.ESC:
                this.closeDropdown();
                break;
              default:
                return true;
            }
          }
        }, {
          key: 'search',
          value: function search(query) {
            var _this10 = this;

            if (this.items === undefined) {
              this.filteredData = [];
              return;
            }

            var queryTokens = this._queryTokenizer(query).filter(function (qt) {
              return qt.value.length > 0;
            });
            queryTokens.forEach(function (qt) {
              qt.value = qt.value.toLowerCase();
            });

            var queryTokensGroupedByValue = this._getTokensGroupedByValue(queryTokens);

            var data = this.items.map(function (item, index) {
              return new Datum(item, index, _this10.opts, queryTokens);
            });

            var filteredData = data.filter(function (datum) {
              var matchingQueryTokens = datum.queryTokensMatches.filter(function (queryTokenIndex) {
                return queryTokenIndex > -1;
              }).map(function (queryTokenIndex) {
                return queryTokens[queryTokenIndex];
              });

              var matchingQueryTokensGroupedByValue = _this10._getTokensGroupedByValue(matchingQueryTokens);
              return queryTokensGroupedByValue.every(function (queryTokenGroup) {
                var matchingQueryTokenGroup = matchingQueryTokensGroupedByValue.find(function (x) {
                  return x.value === queryTokenGroup.value;
                });

                return matchingQueryTokenGroup && matchingQueryTokenGroup.indexes.length >= queryTokenGroup.indexes.length;
              });
            });

            filteredData.sort(this._sortData.bind(this));

            this.hoveredDatum = filteredData.length > 0 ? filteredData[0] : null;

            this.filteredData = filteredData;
          }
        }, {
          key: '_queryTokenizer',
          value: function _queryTokenizer(query) {
            return Tokenizers.nonword(query);
          }
        }, {
          key: '_getTokensGroupedByValue',
          value: function _getTokensGroupedByValue(tokensArray) {
            var uniqueTokens = this._arrayUniqueByField(tokensArray, 'value');
            return uniqueTokens.map(function (uniqueToken) {
              var tokensWithSameValue = tokensArray.filter(function (token) {
                return token.value === uniqueToken.value;
              });
              var indexesOfTokensWithSameValue = tokensWithSameValue.map(function (token) {
                return tokensArray.indexOf(token);
              });
              return {
                indexes: indexesOfTokensWithSameValue,
                value: uniqueToken.value
              };
            });
          }
        }, {
          key: '_sortData',
          value: function _sortData(a, b) {
            var result = Datum.compare(a, b);
            if (result !== 0) {
              return result;
            }

            if (this.opts.sort) {
              var sortField = this.opts.sortField || this.opts.name;
              if (a.item[sortField] > b.item[sortField]) {
                return 1;
              }
              if (a.item[sortField] < b.item[sortField]) {
                return -1;
              }

              return 0;
            }

            return a.index > b.index ? 1 : a.index < b.index ? -1 : 0;
          }
        }, {
          key: '_arrayUniqueByField',
          value: function _arrayUniqueByField(a, field) {
            return a.reduce(function (p, c) {
              if (p.every(function (x) {
                return x[field] !== c[field];
              })) p.push(c);
              return p;
            }, []);
          }
        }, {
          key: '_escapeHtml',
          value: function _escapeHtml(text) {
            var map = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#039;'
            };

            return text.toString().replace(/[&<>"']/g, function (m) {
              return map[m];
            });
          }
        }], null, _instanceInitializers);

        var _Select3 = Select3;
        Select3 = inject(Element, BindingEngine, TaskQueue)(Select3) || Select3;
        Select3 = customElement('select3')(Select3) || Select3;
        return Select3;
      })();

      _export('Select3', Select3);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL3NlbGVjdDMvc2VsZWN0My5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NEhBUWEsT0FBTzs7Ozs7Ozs7OztpQ0FSWixNQUFNO3dDQUFFLGFBQWE7bUNBQUUsUUFBUTtzQ0FBRSxXQUFXO3dDQUFFLGFBQWE7b0NBQUUsU0FBUzs7K0JBQ3RFLFVBQVU7O3FCQUNWLEtBQUs7O21CQUNMLElBQUk7O21DQUNKLG1CQUFtQjs7O0FBSWQsYUFBTzs7Ozs4QkFBUCxPQUFPOzt1QkFDakIsUUFBUTs7bUJBQVMsRUFBRTs7Ozs7dUJBQ25CLFFBQVEsQ0FBQyxFQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUMsQ0FBQzs7bUJBQVMsSUFBSTs7Ozs7dUJBQy9ELFFBQVE7O21CQUFZLEtBQUs7Ozs7O3VCQUN6QixRQUFROzttQkFBVyxFQUFFOzs7Ozt1QkFFckIsUUFBUTs7bUJBQWdCLEVBQUU7Ozs7O3VCQUMxQixRQUFROzttQkFBZ0IsRUFBRTs7Ozs7QUFpQ2hCLGlCQXhDQSxPQUFPLENBd0NOLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7ZUFoQy9DLGNBQWMsR0FBRyxLQUFLO2VBQ3RCLGdCQUFnQixHQUFHLEVBQUU7ZUFDckIsWUFBWSxHQUFHLElBQUk7ZUFDbkIsaUJBQWlCLEdBQUcsRUFBRTtlQUN0QiwyQkFBMkIsR0FBRyxDQUFDO2VBQy9CLHlCQUF5QixHQUFHLENBQUM7ZUFDN0IsVUFBVSxHQUFHLENBQUM7ZUFDZCxhQUFhLEdBQUcsQ0FBQztlQUNqQixtQkFBbUIsR0FBRyxLQUFLO2VBQzNCLGtCQUFrQixHQUFHLFNBQVM7ZUFDOUIsa0JBQWtCLEdBQUcsSUFBSTtlQUN6QixvQkFBb0IsR0FBRyxJQUFJO2VBRTNCLElBQUksR0FBRztBQUNMLGNBQUUsRUFBRSxJQUFJO0FBQ1IsZ0JBQUksRUFBRSxNQUFNO0FBQ1osMEJBQWMsRUFBRSxLQUFLO0FBQ3JCLG1CQUFPLEVB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QUUsS0FBSyxFQUFFO0FBQzVCLG1CQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzlCLGtCQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDO3VCQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO2VBQUEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQscUJBQU8sQ0FBQyxDQUFDO2FBQ1YsRUFBRSxFQUFFLENBQUMsQ0FBQztXQUNSOzs7aUJBRVUscUJBQUMsSUFBSSxFQUFFO0FBQ2hCLGdCQUFJLEdBQUcsR0FBRztBQUNSLGlCQUFHLEVBQUUsT0FBTztBQUNaLGlCQUFHLEVBQUUsTUFBTTtBQUNYLGlCQUFHLEVBQUUsTUFBTTtBQUNYLGlCQUFHLEVBQUUsUUFBUTtBQUNiLGlCQUFHLEVBQUUsUUFBUTthQUNkLENBQUM7O0FBRUYsbUJBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDO3FCQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQUM7V0FDekQ7Ozt1QkF6cUJVLE9BQU87QUFBUCxlQUFPLEdBRG5CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUM3QixPQUFPLEtBQVAsT0FBTztBQUFQLGVBQU8sR0FGbkIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUVaLE9BQU8sS0FBUCxPQUFPO2VBQVAsT0FBTyIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9zZWxlY3QzL3NlbGVjdDMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBCaW5kaW5nRW5naW5lLCBUYXNrUXVldWV9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtUb2tlbml6ZXJzfSBmcm9tICcuL3Rva2VuaXplcnMnO1xyXG5pbXBvcnQge0RhdHVtfSBmcm9tICcuL2RhdHVtJztcclxuaW1wb3J0IHtLRVlTfSBmcm9tICcuL2tleXMnO1xyXG5pbXBvcnQge2N1c3RvbUVsZW1lbnRIZWxwZXJ9IGZyb20gJ3V0aWxzJztcclxuXHJcbkBjdXN0b21FbGVtZW50KCdzZWxlY3QzJylcclxuQGluamVjdChFbGVtZW50LCBCaW5kaW5nRW5naW5lLCBUYXNrUXVldWUpXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3QzIHtcclxuICBAYmluZGFibGUgaXRlbXMgPSBbXTtcclxuICBAYmluZGFibGUoe2RlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5fSkgdmFsdWUgPSBudWxsO1xyXG4gIEBiaW5kYWJsZSBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBiaW5kYWJsZSBvcHRpb25zID0ge307XHJcblxyXG4gIEBiaW5kYWJsZSBzZWFyY2hlZEl0ZW0gPSAnJztcclxuICBAYmluZGFibGUgZmlsdGVyZWREYXRhID0gW107XHJcbiAgaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuICBzZWxlY3RlZEl0ZW1OYW1lID0gJyc7XHJcbiAgaG92ZXJlZERhdHVtID0gbnVsbDtcclxuICBmaWx0ZXJlZERhdGFTaG9ydCA9IFtdO1xyXG4gIGZpbHRlcmVkRGF0YVNob3J0U3RhcnRJbmRleCA9IDA7XHJcbiAgZmlsdGVyZWREYXRhU2hvcnRFbmRJbmRleCA9IDA7XHJcbiAgZHJhZ2dlclRvcCA9IDA7XHJcbiAgZHJhZ2dlckhlaWdodCA9IDA7XHJcbiAgaXNTY3JvbGxiYXJEcmFnZ2luZyA9IGZhbHNlO1xyXG4gIHByZXZpb3VzTW91c2VFdmVudCA9IHVuZGVmaW5lZDtcclxuICBzY3JvbGxVcEludGVydmFsSWQgPSBudWxsO1xyXG4gIHNjcm9sbERvd25JbnRlcnZhbElkID0gbnVsbDtcclxuXHJcbiAgb3B0cyA9IHtcclxuICAgIGlkOiAnaWQnLFxyXG4gICAgbmFtZTogJ25hbWUnLFxyXG4gICAgbW9kZWxWYWx1ZUJpbmQ6IGZhbHNlLFxyXG4gICAgY2FwdGlvbjogJ9CY0LfQsdC10YDQtdGC0LUnLFxyXG4gICAgbm9SZXN1bHRzTWVzc2FnZTogJ9Cd0Y/QvNCwINC90LDQvNC10YDQtdC90Lgg0YDQtdC30YPQu9GC0LDRgtC4JyxcclxuICAgIHNvcnQ6IGZhbHNlLFxyXG4gICAgc29ydEZpZWxkOiAnJyxcclxuICAgIC8vc29ydERpcmVjdGlvbjogJ2FzYycsIC8vIHRvZG86IGltcGxlbWVudFxyXG4gICAgZGlzYWJsZUNsZWFyOiBmYWxzZSxcclxuICAgIGVtcHR5VmFsdWU6IG51bGwsIC8vID8/PyBvciB1bmRlZmluZWQ/Pz9cclxuICAgIHNlbGVjdEhvdmVyZWRPbkNsb3NlRHJvcGRvd246IGZhbHNlLFxyXG4gICAgZGVib3VuY2VTZWFyY2g6IDE1MCxcclxuICAgIHZpc2libGVJdGVtc0NvdW50OiAxMSwgLy8gYmV0dGVyIGlmIG9kZCBudW1iZXJcclxuICAgIHNjcm9sbFN0ZXA6IDEsXHJcbiAgICBzY3JvbGxJbnRlcnZhbDogMzAsXHJcbiAgICBzY3JvbGxUaW1lb3V0OiAzMDBcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBiaW5kaW5nRW5naW5lLCB0YXNrUXVldWUpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLmJpbmRpbmdFbmdpbmUgPSBiaW5kaW5nRW5naW5lO1xyXG4gICAgdGhpcy50YXNrUXVldWUgPSB0YXNrUXVldWU7XHJcblxyXG4gICAgdGhpcy5wYXJzZUludCA9IHBhcnNlSW50O1xyXG4gIH1cclxuXHJcbiAgYmluZCgpIHtcclxuICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTaG9ydFN0YXJ0SW5kZXggPSAwO1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTaG9ydEVuZEluZGV4ID0gdGhpcy5vcHRzLnZpc2libGVJdGVtc0NvdW50IC0gMTtcclxuICAgIHRoaXMuaXRlbXNDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICB1bmJpbmQoKSB7XHJcbiAgICBpZiAodGhpcy5pdGVtc0NvbGxlY3Rpb25TdWJzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLml0ZW1zQ29sbGVjdGlvblN1YnNjcmlwdGlvbi5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hlZCgpIHtcclxuICAgIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVIYW5kbGVyID0gdGhpcy5vblNjcm9sbGJhckRyYWdnaW5nLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRvY3VtZW50TW91c2V1cEhhbmRsZXIgPSB0aGlzLnN0b3BTY3JvbGxiYXJEcmFnZ2luZy5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVIYW5kbGVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2V1cEhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsYmFyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QzLXNjcm9sbGJhcicpO1xyXG4gICAgdGhpcy5kcmFnZ2VyQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QzLXNjcm9sbGJhci1kcmFnZ2VyLWNvbnRhaW5lcicpO1xyXG4gICAgdGhpcy5kcmFnZ2VyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QzLXNjcm9sbGJhci1kcmFnZ2VyJyk7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QzLXNlYXJjaC1ib3gnKTtcclxuICAgIHRoaXMudmFsdWVJbnB1dCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0My12YWx1ZS1ib3gnKTtcclxuICAgIHRoaXMuZHJvcGRvd24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdDMtZHJvcGRvd24nKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRzLmhhc0ZvY3VzICYmIHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGV0YWNoZWQoKSB7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50TW91c2Vtb3ZlSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudE1vdXNldXBIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGhpcy52YWx1ZSA9PT0gdGhpcy5vcHRzLmVtcHR5VmFsdWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1OYW1lID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB2YWx1ZUlkID0gdGhpcy5vcHRzLm1vZGVsVmFsdWVCaW5kID8gdGhpcy52YWx1ZVt0aGlzLm9wdHMuaWRdIDogdGhpcy52YWx1ZTtcclxuXHJcbiAgICAgIC8vdG9kbzogb3B0aW1pemUgY2hlY2sgZm9yIFwiYXJlIGFsbCBpZHMgbnVtYmVycz9cIlxyXG4gICAgICBpZiAoaXNOYU4odmFsdWVJZCkgPT09IGZhbHNlICYmIHRoaXMuZmlsdGVyZWREYXRhLmV2ZXJ5KHggPT4gTnVtYmVyLmlzSW50ZWdlcih4Lml0ZW1bdGhpcy5vcHRzLmlkXSkpKSB7XHJcbiAgICAgICAgdmFsdWVJZCA9IHBhcnNlSW50KHZhbHVlSWQsIDEwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHNlbGVjdGVkRGF0dW0gPSB0aGlzLmZpbHRlcmVkRGF0YS5maW5kKGRhdHVtID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0dW0uaXRlbVt0aGlzLm9wdHMuaWRdID09PSB2YWx1ZUlkO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZERhdHVtKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1OYW1lID0gc2VsZWN0ZWREYXR1bS5pdGVtW3RoaXMub3B0cy5uYW1lXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wdHMuZW1wdHlWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGFza1F1ZXVlLnF1ZXVlTWljcm9UYXNrKCgpPT4ge1xyXG4gICAgICBjdXN0b21FbGVtZW50SGVscGVyLmRpc3BhdGNoRXZlbnQodGhpcy5lbGVtZW50LCAnY2hhbmdlJywge1xyXG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGl0ZW1zQ2hhbmdlZCgpIHtcclxuICAgIHRoaXMuX3N1YnNjcmliZVRvSXRlbXNDb2xsZWN0aW9uQ2hhbmdlcygpO1xyXG4gICAgdGhpcy5fcmVjb25zdHJ1Y3RJdGVtcygpO1xyXG4gICAgdGhpcy52YWx1ZUNoYW5nZWQoKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaGVkSXRlbUNoYW5nZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGVib3VuY2VTZWFyY2gpIHtcclxuICAgICAgdGhpcy5kZWJvdW5jZVNlYXJjaCA9IGN1c3RvbUVsZW1lbnRIZWxwZXIuZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoKHRoaXMuc2VhcmNoZWRJdGVtKTtcclxuICAgICAgfSwgdGhpcy5vcHRzLmRlYm91bmNlU2VhcmNoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYm91bmNlU2VhcmNoKCk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJlZERhdGFDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy5zY3JvbGxUb0hvdmVyZWREYXR1bSgpO1xyXG4gIH1cclxuXHJcbiAgX3N1YnNjcmliZVRvSXRlbXNDb2xsZWN0aW9uQ2hhbmdlcygpIHtcclxuICAgIGlmICh0aGlzLml0ZW1zQ29sbGVjdGlvblN1YnNjcmlwdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaXRlbXNDb2xsZWN0aW9uU3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLml0ZW1zQ29sbGVjdGlvblN1YnNjcmlwdGlvbiA9IHRoaXMuYmluZGluZ0VuZ2luZVxyXG4gICAgICAuY29sbGVjdGlvbk9ic2VydmVyKHRoaXMuaXRlbXMpXHJcbiAgICAgIC5zdWJzY3JpYmUoaXRlbXMgPT4ge1xyXG4gICAgICAgIHRoaXMuX3JlY29uc3RydWN0SXRlbXMoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBfcmVjb25zdHJ1Y3RJdGVtcygpIHtcclxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpID0+IHtcclxuICAgICAgaS5fZXNjYXBlZE5hbWUgPSB0aGlzLl9lc2NhcGVIdG1sKGlbdGhpcy5vcHRzLm5hbWVdKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWFyY2godGhpcy5zZWFyY2hlZEl0ZW0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIHNjcm9sbGluZ1xyXG5cclxuICBzY3JvbGxEcm9wZG93bihlKSB7XHJcbiAgICBsZXQgZGVsdGEgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgKGUud2hlZWxEZWx0YSB8fCAtZS5kZXRhaWwpKSk7XHJcblxyXG4gICAgaWYgKGRlbHRhIDwgMCkge1xyXG4gICAgICB0aGlzLnNjcm9sbERvd24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVXAoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjcm9sbFVwKGNvdW50KSB7XHJcbiAgICBpZiAoY291bnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb3VudCA9IHRoaXMub3B0cy5zY3JvbGxTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNhbiBzY3JvbGwgYXQgbGVhc3Qgb25jZVxyXG4gICAgaWYgKHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4ID4gMCkge1xyXG4gICAgICAvLyBjYW4gc2Nyb2xsIGRlc2lyZWQgdGltZXNcclxuICAgICAgaWYgKHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4IC0gY291bnQgPj0gMCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4IC09IGNvdW50O1xyXG4gICAgICAgIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRFbmRJbmRleCAtPSBjb3VudDtcclxuICAgICAgICB0aGlzLl9yZWZpbGxGaWx0ZXJlZERhdGFTaG9ydCgpO1xyXG4gICAgICB9IGVsc2UgeyAvLyBzY3JvbGwgYXMgbWFueSB0aW1lcyBhcyBwb3NzaWJsZVxyXG4gICAgICAgIGNvdW50ID0gdGhpcy5maWx0ZXJlZERhdGFTaG9ydFN0YXJ0SW5kZXg7XHJcbiAgICAgICAgaWYgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5zY3JvbGxVcChjb3VudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3RvcFNjcm9sbFVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0b3BTY3JvbGxVcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsRG93bihjb3VudCkge1xyXG4gICAgaWYgKGNvdW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY291bnQgPSB0aGlzLm9wdHMuc2Nyb2xsU3RlcDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjYW4gc2Nyb2xsIGF0IGxlYXN0IG9uY2VcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YVNob3J0RW5kSW5kZXggPCB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIC8vIGNhbiBzY3JvbGwgZGVzaXJlZCB0aW1lc1xyXG4gICAgICBpZiAodGhpcy5maWx0ZXJlZERhdGFTaG9ydEVuZEluZGV4ICsgY291bnQgPCB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmZpbHRlcmVkRGF0YVNob3J0U3RhcnRJbmRleCArPSBjb3VudDtcclxuICAgICAgICB0aGlzLmZpbHRlcmVkRGF0YVNob3J0RW5kSW5kZXggKz0gY291bnQ7XHJcbiAgICAgICAgdGhpcy5fcmVmaWxsRmlsdGVyZWREYXRhU2hvcnQoKTtcclxuICAgICAgfSBlbHNlIHsgLy8gc2Nyb2xsIGFzIG1hbnkgdGltZXMgYXMgcG9zc2libGVcclxuICAgICAgICBjb3VudCA9IHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIDEgLSB0aGlzLmZpbHRlcmVkRGF0YVNob3J0RW5kSW5kZXg7XHJcbiAgICAgICAgaWYgKGNvdW50ID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5zY3JvbGxEb3duKGNvdW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdG9wU2Nyb2xsRG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zdG9wU2Nyb2xsRG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9Ib3ZlcmVkRGF0dW0oKSB7XHJcbiAgICBjb25zdCBoYWxmQ291bnQgPSBNYXRoLmZsb29yKHRoaXMub3B0cy52aXNpYmxlSXRlbXNDb3VudCAvIDIpO1xyXG4gICAgY29uc3QgZnVsbENvdW50ID0gdGhpcy5vcHRzLnZpc2libGVJdGVtc0NvdW50O1xyXG4gICAgbGV0IGhvdmVyZWREYXR1bUluZGV4ID0gdGhpcy5maWx0ZXJlZERhdGEuaW5kZXhPZih0aGlzLmhvdmVyZWREYXR1bSk7XHJcbiAgICBsZXQgaXNJbkZpcnN0SGFsZkNvdW50ID0gaG92ZXJlZERhdHVtSW5kZXggPCBoYWxmQ291bnQ7XHJcbiAgICBsZXQgaXNJbkxhc3RIYWxmQ291bnQgPSBob3ZlcmVkRGF0dW1JbmRleCA+IHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIDEgLSBoYWxmQ291bnQ7XHJcblxyXG4gICAgbGV0IHN0YXJ0LCBlbmQ7XHJcbiAgICBpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIDw9IHRoaXMub3B0cy52aXNpYmxlSXRlbXNDb3VudCkge1xyXG4gICAgICAvLyB0YWtlIGFsbFxyXG4gICAgICBzdGFydCA9IDA7XHJcbiAgICAgIGVuZCA9IHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIDE7XHJcbiAgICB9IGVsc2UgaWYgKGlzSW5GaXJzdEhhbGZDb3VudCAmJiAhaXNJbkxhc3RIYWxmQ291bnQpIHtcclxuICAgICAgLy8gdGFrZSBmaXJzdCBmdWxsQ291bnRcclxuICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICBlbmQgPSBmdWxsQ291bnQgLSAxO1xyXG4gICAgfSBlbHNlIGlmICghaXNJbkZpcnN0SGFsZkNvdW50ICYmIGlzSW5MYXN0SGFsZkNvdW50KSB7XHJcbiAgICAgIC8vIHRha2UgbGFzdCBmdWxsQ291bnRcclxuICAgICAgZW5kID0gdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgc3RhcnQgPSBlbmQgLSAoZnVsbENvdW50IC0gMSk7XHJcbiAgICB9IGVsc2Ugey8vICFpc0luRmlyc3RIYWxmQ291bnQgJiYgIWlzSW5MYXN0SGFsZkNvdW50XHJcbiAgICAgIC8vdGFrZSBoYWxmQ291bnQgYmVmb3JlIGFuZCBoYWxmQ291bnQgYWZ0ZXJcclxuICAgICAgc3RhcnQgPSBob3ZlcmVkRGF0dW1JbmRleCAtIGhhbGZDb3VudDtcclxuICAgICAgZW5kID0gaG92ZXJlZERhdHVtSW5kZXggKyBoYWxmQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTaG9ydFN0YXJ0SW5kZXggPSBzdGFydDtcclxuICAgIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRFbmRJbmRleCA9IGVuZDtcclxuXHJcbiAgICB0aGlzLl9yZWZpbGxGaWx0ZXJlZERhdGFTaG9ydCgpO1xyXG4gIH1cclxuXHJcbiAgX3JlZmlsbEZpbHRlcmVkRGF0YVNob3J0KCkge1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTaG9ydCA9IHRoaXMuZmlsdGVyZWREYXRhLnNsaWNlKHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4LCB0aGlzLmZpbHRlcmVkRGF0YVNob3J0RW5kSW5kZXggKyAxKTtcclxuXHJcbiAgICB0aGlzLnRhc2tRdWV1ZS5xdWV1ZVRhc2soKCkgPT4ge1xyXG4gICAgICB0aGlzLl9jYWxjdWxhdGVEcmFnZ2VyUG9zaXRpb24oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2NhbGN1bGF0ZURyYWdnZXJQb3NpdGlvbigpIHtcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YVNob3J0Lmxlbmd0aCA9PT0gdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsYmFyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNjcm9sbGJhci5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgIGNvbnN0IG1pbkRyYWdnZXJIZWlnaHQgPSAxNTtcclxuICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodCA9IHRoaXMuZHJhZ2dlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIGxldCBkcmFnZ2VySGVpZ2h0ID0gYXZhaWxhYmxlSGVpZ2h0ICogKHRoaXMub3B0cy52aXNpYmxlSXRlbXNDb3VudCAvIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCk7XHJcbiAgICAgIGxldCBkcmFnZ2VyVG9wID0gYXZhaWxhYmxlSGVpZ2h0ICogKHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4IC8gdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzRHJhZ2dlckhlaWdodEluc3VmZmljaWVudCA9IGRyYWdnZXJIZWlnaHQgPCBtaW5EcmFnZ2VySGVpZ2h0O1xyXG4gICAgICBpZiAoaXNEcmFnZ2VySGVpZ2h0SW5zdWZmaWNpZW50KSB7XHJcbiAgICAgICAgZHJhZ2dlckhlaWdodCA9IG1pbkRyYWdnZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzRHJhZ2dlck9uVG9wID0gZHJhZ2dlclRvcCAtIG1pbkRyYWdnZXJIZWlnaHQgLyAyIDwgMDtcclxuICAgICAgICBjb25zdCBpc0RyYWdnZXJPbkJvdHRvbSA9IGRyYWdnZXJUb3AgKyBtaW5EcmFnZ2VySGVpZ2h0IC8gMiA+IGF2YWlsYWJsZUhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGlzRHJhZ2dlck9uVG9wKSB7XHJcbiAgICAgICAgICBkcmFnZ2VyVG9wID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzRHJhZ2dlck9uQm90dG9tKSB7XHJcbiAgICAgICAgICBkcmFnZ2VyVG9wID0gYXZhaWxhYmxlSGVpZ2h0IC0gbWluRHJhZ2dlckhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZHJhZ2dlclRvcCAtPSBtaW5EcmFnZ2VySGVpZ2h0IC8gMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZHJhZ2dlckhlaWdodCA9IGRyYWdnZXJIZWlnaHQ7XHJcbiAgICAgIHRoaXMuZHJhZ2dlclRvcCA9IGRyYWdnZXJUb3A7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY2FsY3VsYXRlVmlzaWJsZUl0ZW1zUG9zaXRpb24oKSB7XHJcbiAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5kcmFnZ2VyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICBsZXQgaXRlbXNCeVBpeGVsID0gKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIHRoaXMub3B0cy52aXNpYmxlSXRlbXNDb3VudCkgLyAoYXZhaWxhYmxlSGVpZ2h0IC0gdGhpcy5kcmFnZ2VySGVpZ2h0KTtcclxuICAgIGxldCBuZXdTdGFydEluZGV4ID0gTWF0aC5yb3VuZChpdGVtc0J5UGl4ZWwgKiB0aGlzLmRyYWdnZXJUb3ApO1xyXG5cclxuICAgIGxldCBkaWZmID0gbmV3U3RhcnRJbmRleCAtIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4O1xyXG4gICAgbGV0IG5ld0VuZEluZGV4ID0gdGhpcy5maWx0ZXJlZERhdGFTaG9ydEVuZEluZGV4ICsgZGlmZjtcclxuXHJcbiAgICBpZiAobmV3U3RhcnRJbmRleCA8IDApIHtcclxuICAgICAgbmV3RW5kSW5kZXggPSBuZXdFbmRJbmRleCArICgwIC0gbmV3U3RhcnRJbmRleCk7XHJcbiAgICAgIG5ld1N0YXJ0SW5kZXggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdFbmRJbmRleCA+IHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIDEpIHtcclxuICAgICAgbmV3U3RhcnRJbmRleCA9IG5ld1N0YXJ0SW5kZXggKyAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIC0gMSAtIG5ld0VuZEluZGV4KTtcclxuICAgICAgbmV3RW5kSW5kZXggPSB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4ID0gbmV3U3RhcnRJbmRleDtcclxuICAgIHRoaXMuZmlsdGVyZWREYXRhU2hvcnRFbmRJbmRleCA9IG5ld0VuZEluZGV4O1xyXG4gICAgdGhpcy5maWx0ZXJlZERhdGFTaG9ydCA9IHRoaXMuZmlsdGVyZWREYXRhLnNsaWNlKHRoaXMuZmlsdGVyZWREYXRhU2hvcnRTdGFydEluZGV4LCB0aGlzLmZpbHRlcmVkRGF0YVNob3J0RW5kSW5kZXggKyAxKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0U2Nyb2xsYmFyRHJhZ2dpbmcoKSB7XHJcbiAgICB0aGlzLmlzU2Nyb2xsYmFyRHJhZ2dpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgc3RvcFNjcm9sbGJhckRyYWdnaW5nKCkge1xyXG4gICAgdGhpcy5pc1Njcm9sbGJhckRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLnByZXZpb3VzTW91c2VFdmVudCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG9uU2Nyb2xsYmFyRHJhZ2dpbmcoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzU2Nyb2xsYmFyRHJhZ2dpbmcpIHtcclxuICAgICAgY29uc3QgbW92ZW1lbnRZID0gZXZlbnQubW92ZW1lbnRZIHx8ICh0aGlzLnByZXZpb3VzTW91c2VFdmVudCAhPT0gdW5kZWZpbmVkID8gZXZlbnQuc2NyZWVuWSAtIHRoaXMucHJldmlvdXNNb3VzZUV2ZW50LnNjcmVlblkgOiAwKTtcclxuXHJcbiAgICAgIGxldCBuZXdEcmFnZ2VyVG9wID0gdGhpcy5kcmFnZ2VyVG9wICsgbW92ZW1lbnRZO1xyXG5cclxuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5kcmFnZ2VyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgY29uc3QgbWluRHJhZ2dlclRvcCA9IDA7XHJcbiAgICAgIGNvbnN0IG1heERyYWdnZXJUb3AgPSBhdmFpbGFibGVIZWlnaHQgLSB0aGlzLmRyYWdnZXJIZWlnaHQ7XHJcblxyXG4gICAgICBuZXdEcmFnZ2VyVG9wID0gTWF0aC5taW4obWF4RHJhZ2dlclRvcCwgTWF0aC5tYXgobWluRHJhZ2dlclRvcCwgbmV3RHJhZ2dlclRvcCkpO1xyXG5cclxuICAgICAgdGhpcy5kcmFnZ2VyVG9wID0gbmV3RHJhZ2dlclRvcDtcclxuICAgICAgdGhpcy5fY2FsY3VsYXRlVmlzaWJsZUl0ZW1zUG9zaXRpb24oKTtcclxuXHJcbiAgICAgIHRoaXMucHJldmlvdXNNb3VzZUV2ZW50ID0gZXZlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkRyYWdnZXJDb250YWluZXJDbGljayhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5kcmFnZ2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmRyYWdnZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xyXG4gICAgdmFyIGRyYWdnZXJQb3NpdGlvbiA9IHRoaXMuZHJhZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCBkaWZmID0gZXZlbnQuY2xpZW50WSAtIChkcmFnZ2VyUG9zaXRpb24udG9wICsgKGRyYWdnZXJQb3NpdGlvbi5oZWlnaHQgLyAyKSk7XHJcbiAgICBjb25zdCBtaW5EcmFnZ2VyVG9wID0gMDtcclxuICAgIGNvbnN0IG1heERyYWdnZXJUb3AgPSBhdmFpbGFibGVIZWlnaHQgLSB0aGlzLmRyYWdnZXJIZWlnaHQ7XHJcbiAgICBsZXQgbmV3RHJhZ2dlclRvcCA9IHRoaXMuZHJhZ2dlclRvcCArIGRpZmY7XHJcbiAgICBuZXdEcmFnZ2VyVG9wID0gTWF0aC5taW4obWF4RHJhZ2dlclRvcCwgTWF0aC5tYXgobWluRHJhZ2dlclRvcCwgbmV3RHJhZ2dlclRvcCkpO1xyXG4gICAgdGhpcy5kcmFnZ2VyVG9wID0gbmV3RHJhZ2dlclRvcDtcclxuICAgIHRoaXMuX2NhbGN1bGF0ZVZpc2libGVJdGVtc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBzdGFydFNjcm9sbFVwKCkge1xyXG4gICAgdGhpcy5zdG9wU2Nyb2xsRG93bigpO1xyXG4gICAgdGhpcy5zdG9wU2Nyb2xsVXAoKTtcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YVNob3J0U3RhcnRJbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5zY3JvbGxVcCgpO1xyXG5cclxuICAgICAgdGhpcy5zY3JvbGxVcEludGVydmFsSWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdG9wU2Nyb2xsVXAoKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFVwSW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNjcm9sbFVwKCk7XHJcbiAgICAgICAgfSwgdGhpcy5vcHRzLnNjcm9sbEludGVydmFsKTtcclxuICAgICAgfSwgdGhpcy5vcHRzLnNjcm9sbFRpbWVvdXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcFNjcm9sbFVwKCkge1xyXG4gICAgdGhpcy5zY3JvbGxVcEludGVydmFsSWQgPSB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsVXBJbnRlcnZhbElkKTtcclxuICAgIHRoaXMuc2Nyb2xsVXBJbnRlcnZhbElkID0gd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5zY3JvbGxVcEludGVydmFsSWQpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRTY3JvbGxEb3duKCkge1xyXG4gICAgdGhpcy5zdG9wU2Nyb2xsVXAoKTtcclxuICAgIHRoaXMuc3RvcFNjcm9sbERvd24oKTtcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YVNob3J0U3RhcnRJbmRleCA8IHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5zY3JvbGxEb3duKCk7XHJcblxyXG4gICAgICB0aGlzLnNjcm9sbERvd25JbnRlcnZhbElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RvcFNjcm9sbERvd24oKTtcclxuICAgICAgICB0aGlzLnNjcm9sbERvd25JbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsRG93bigpO1xyXG4gICAgICAgIH0sIHRoaXMub3B0cy5zY3JvbGxJbnRlcnZhbCk7XHJcbiAgICAgIH0sIHRoaXMub3B0cy5zY3JvbGxUaW1lb3V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3BTY3JvbGxEb3duKCkge1xyXG4gICAgdGhpcy5zY3JvbGxEb3duSW50ZXJ2YWxJZCA9IHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5zY3JvbGxEb3duSW50ZXJ2YWxJZCk7XHJcbiAgICB0aGlzLnNjcm9sbERvd25JbnRlcnZhbElkID0gd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5zY3JvbGxEb3duSW50ZXJ2YWxJZCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gaG92ZXJpbmdcclxuXHJcbiAgbW92ZVNlbGVjdGlvblVwKCkge1xyXG4gICAgaWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhvdmVyZWRJbmRleCA9IHRoaXMuZmlsdGVyZWREYXRhLmluZGV4T2YodGhpcy5ob3ZlcmVkRGF0dW0pO1xyXG4gICAgaWYgKGhvdmVyZWRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgLy8gbm90aGluZyBpcyBob3ZlcmVkIC0+IGhvdmVyIGxhc3RcclxuICAgICAgdGhpcy5ob3ZlcmVkRGF0dW0gPSB0aGlzLmZpbHRlcmVkRGF0YVt0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggLSAxXTtcclxuICAgICAgdGhpcy5zY3JvbGxUb0hvdmVyZWREYXR1bSgpO1xyXG4gICAgfSBlbHNlIGlmIChob3ZlcmVkSW5kZXggPT09IDApIHtcclxuICAgICAgLy8gZmlyc3QgaXMgaG92ZXJlZCAtPiBob3ZlciBsYXN0XHJcbiAgICAgIHRoaXMuaG92ZXJlZERhdHVtID0gdGhpcy5maWx0ZXJlZERhdGFbdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIC0gMV07XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9Ib3ZlcmVkRGF0dW0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGhvdmVyIHByZXZpb3VzXHJcbiAgICAgIHRoaXMuaG92ZXJlZERhdHVtID0gdGhpcy5maWx0ZXJlZERhdGFbaG92ZXJlZEluZGV4IC0gMV07XHJcbiAgICAgIGlmIChob3ZlcmVkSW5kZXggLSAxIDwgdGhpcy5maWx0ZXJlZERhdGFTaG9ydFN0YXJ0SW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFVwKDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtb3ZlU2VsZWN0aW9uRG93bigpIHtcclxuICAgIGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBob3ZlcmVkSW5kZXggPSB0aGlzLmZpbHRlcmVkRGF0YS5pbmRleE9mKHRoaXMuaG92ZXJlZERhdHVtKTtcclxuICAgIGlmIChob3ZlcmVkSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIC8vIG5vdGhpbmcgaXMgaG92ZXJlZCAtPiBob3ZlciBmaXJzdFxyXG4gICAgICB0aGlzLmhvdmVyZWREYXR1bSA9IHRoaXMuZmlsdGVyZWREYXRhWzBdO1xyXG4gICAgICB0aGlzLnNjcm9sbFRvSG92ZXJlZERhdHVtKCk7XHJcbiAgICB9IGVsc2UgaWYgKGhvdmVyZWRJbmRleCA9PT0gdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAvLyBsYXN0IGlzIGhvdmVyZWQgLT4gaG92ZXIgZmlyc3RcclxuICAgICAgdGhpcy5ob3ZlcmVkRGF0dW0gPSB0aGlzLmZpbHRlcmVkRGF0YVswXTtcclxuICAgICAgdGhpcy5zY3JvbGxUb0hvdmVyZWREYXR1bSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gaG92ZXIgbmV4dFxyXG4gICAgICB0aGlzLmhvdmVyZWREYXR1bSA9IHRoaXMuZmlsdGVyZWREYXRhW2hvdmVyZWRJbmRleCArIDFdO1xyXG4gICAgICBpZiAoaG92ZXJlZEluZGV4ICsgMSA+IHRoaXMuZmlsdGVyZWREYXRhU2hvcnRFbmRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsRG93bigxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0SG92ZXIoZGF0dW0pIHtcclxuICAgIHRoaXMuaG92ZXJlZERhdHVtID0gZGF0dW07XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gc2VsZWN0aW5nXHJcblxyXG4gIHNlbGVjdEl0ZW0oZGF0dW0pIHtcclxuICAgIGlmIChkYXR1bSA9PT0gbnVsbCB8fCBkYXR1bSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRzLm1vZGVsVmFsdWVCaW5kID8gZGF0dW0uaXRlbSA6IGRhdHVtLml0ZW1bdGhpcy5vcHRzLmlkXTtcclxuICAgIGlmICh0aGlzLmlzRHJvcGRvd25PcGVuID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0SG92ZXJlZEl0ZW0oKSB7XHJcbiAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5ob3ZlcmVkRGF0dW0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJWYWx1ZSgpIHtcclxuICAgIGlmICghdGhpcy5vcHRzLmRpc2FibGVDbGVhcikge1xyXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRzLmVtcHR5VmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gY29udHJvbCBkcm9wZG93blxyXG5cclxuICBvcGVuRHJvcGRvd24oKSB7XHJcbiAgICB0aGlzLmlzRHJvcGRvd25PcGVuID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnRhc2tRdWV1ZS5xdWV1ZVRhc2soKCk9PiB7XHJcbiAgICAgIHRoaXMuX3Jlb3JpZW50RHJvcGRvd25JZk5lZWRlZCgpO1xyXG4gICAgICB0aGlzLl9jYWxjdWxhdGVEcmFnZ2VyUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xyXG4gICAgICB0aGlzLnNlYXJjaElucHV0LnNlbGVjdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZURyb3Bkb3duKGZvY3VzT25WYWx1ZSA9IHRydWUpIHtcclxuICAgIHRoaXMuaXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRzLnNlbGVjdEhvdmVyZWRPbkNsb3NlRHJvcGRvd24gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RIb3ZlcmVkSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmb2N1c09uVmFsdWUgJiYgdGhpcy52YWx1ZSAhPT0gdGhpcy5vcHRzLmVtcHR5VmFsdWUpIHtcclxuICAgICAgdGhpcy50YXNrUXVldWUucXVldWVUYXNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlSW5wdXQuZm9jdXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEcm9wZG93bigpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICBpZiAodGhpcy5pc0Ryb3Bkb3duT3Blbikge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9yZW9yaWVudERyb3Bkb3duSWZOZWVkZWQoKSB7XHJcbiAgICBsZXQgY3VycmVudEJvdHRvbVN0eWxlID0gdGhpcy5kcm9wZG93bi5zdHlsZS5ib3R0b207XHJcbiAgICBsZXQgcmVjdCA9IHRoaXMuZHJvcGRvd24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBpZiAoY3VycmVudEJvdHRvbVN0eWxlID09ICdhdXRvJyB8fCAhY3VycmVudEJvdHRvbVN0eWxlKSB7XHJcbiAgICAgIGxldCB2aWV3cG9ydEhlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcclxuICAgICAgbGV0IGVub3VnaFJvb21CZWxvdyA9IHZpZXdwb3J0SGVpZ2h0ID49IHRoaXMuZHJvcGRvd24uY2xpZW50SGVpZ2h0ICsgcmVjdC50b3A7XHJcbiAgICAgIGlmICghZW5vdWdoUm9vbUJlbG93KSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zdHlsZS5ib3R0b20gPSAnMjVweCc7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBlbm91Z2hSb29tQWJvdmUgPSByZWN0LmJvdHRvbSAtIHRoaXMuZHJvcGRvd24uY2xpZW50SGVpZ2h0ID49IDA7XHJcbiAgICAgIGlmICghZW5vdWdoUm9vbUFib3ZlKSB7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zdHlsZS5ib3R0b20gPSAnYXV0byc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uVmFsdWVJbnB1dEZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMudmFsdWUgPT09IHRoaXMub3B0cy5lbXB0eVZhbHVlKSB7XHJcbiAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5pc0Ryb3Bkb3duT3Blbikge1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblZhbHVlSW5wdXRLZXlQcmVzc2VkKGV2ZW50KSB7XHJcbiAgICBldmVudCA9IHdpbmRvdy5ldmVudCA/IHdpbmRvdy5ldmVudCA6IGV2ZW50O1xyXG4gICAgbGV0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlID8gZXZlbnQua2V5Q29kZSA6IGV2ZW50LndoaWNoO1xyXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XHJcbiAgICBjYXNlIEtFWVMuRU5URVI6XHJcbiAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gYnViYmxlIHVwXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25TZWFyY2hJbnB1dEtleVByZXNzZWQoZXZlbnQpIHtcclxuICAgIGV2ZW50ID0gd2luZG93LmV2ZW50ID8gd2luZG93LmV2ZW50IDogZXZlbnQ7XHJcbiAgICBsZXQga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgPyBldmVudC5rZXlDb2RlIDogZXZlbnQud2hpY2g7XHJcbiAgICBzd2l0Y2ggKGtleUNvZGUpIHtcclxuICAgIGNhc2UgS0VZUy5VUDpcclxuICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uVXAoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEtFWVMuRE9XTjpcclxuICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uRG93bigpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgS0VZUy5FTlRFUjpcclxuICAgICAgdGhpcy5zZWxlY3RIb3ZlcmVkSXRlbSgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgS0VZUy5FU0M6XHJcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIGJ1YmJsZSB1cFxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBzZWFyY2hcclxuXHJcbiAgLy8gdG9kbzogY2hlY2sgaWYgcXVlcnkuc3RhcnRzV2l0aChwcmV2aW91c1F1ZXJ5KSBhbmQgbWF0Y2ggb25seSB0aGUgYWxyZWFkeSBtYXRjaGVkIGVsZW1lbnRzXHJcbiAgc2VhcmNoKHF1ZXJ5KSB7XHJcbiAgICAvLyB0b2RvOiBjaGVjayBmb3IgZW1wdHkgb3IgbnVsbCBvciBub3QgYW4gYXJyYXk/IG1heWJlIGluIGl0ZW1zIGNoYW5nZWQgYW5kIHRocm93IGVycm9yP1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0IG9ubHkgbm9uLWVtcHR5IHRva2Vuc1xyXG4gICAgbGV0IHF1ZXJ5VG9rZW5zID0gdGhpcy5fcXVlcnlUb2tlbml6ZXIocXVlcnkpLmZpbHRlcihxdCA9PiBxdC52YWx1ZS5sZW5ndGggPiAwKTtcclxuICAgIHF1ZXJ5VG9rZW5zLmZvckVhY2gocXQgPT4ge1xyXG4gICAgICBxdC52YWx1ZSA9IHF0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGdyb3VwIHRva2VucyBieSB2YWx1ZSAtPiB0byBrbm93IGhvdyBtYW55IG1hdGNoZXMgb2YgZWFjaCB0b2tlbiB3ZSBuZWVkXHJcbiAgICBsZXQgcXVlcnlUb2tlbnNHcm91cGVkQnlWYWx1ZSA9IHRoaXMuX2dldFRva2Vuc0dyb3VwZWRCeVZhbHVlKHF1ZXJ5VG9rZW5zKTtcclxuXHJcbiAgICAvLyBtYXAgZXZlcnkgaXRlbSB0byBEYXR1bSBvYmplY3RcclxuICAgIC8vIHRvZG86IGNyZWF0ZSBvbmx5IG9uY2UgZm9yIGV2ZXJ5IGl0ZW0gYW5kIGNhbGwgbWV0aG9kIHRvIG1hdGNoIGN1cnJlbnQgcXVlcnlcclxuICAgIGxldCBkYXRhID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiBuZXcgRGF0dW0oaXRlbSwgaW5kZXgsIHRoaXMub3B0cywgcXVlcnlUb2tlbnMpKTtcclxuXHJcbiAgICAvLyBmaWx0ZXIgb25seSBkYXR1bXMgdGhhdCBtYXRjaCBxdWVyeVxyXG4gICAgbGV0IGZpbHRlcmVkRGF0YSA9IGRhdGEuZmlsdGVyKGRhdHVtID0+IHtcclxuICAgICAgLy9nZXQgcXVlcnkgdG9rZW5zIHRoYXQgbWF0Y2hcclxuICAgICAgbGV0IG1hdGNoaW5nUXVlcnlUb2tlbnMgPSBkYXR1bS5xdWVyeVRva2Vuc01hdGNoZXNcclxuICAgICAgICAuZmlsdGVyKHF1ZXJ5VG9rZW5JbmRleCA9PiBxdWVyeVRva2VuSW5kZXggPiAtMSlcclxuICAgICAgICAubWFwKHF1ZXJ5VG9rZW5JbmRleCA9PiBxdWVyeVRva2Vuc1txdWVyeVRva2VuSW5kZXhdKTtcclxuICAgICAgLy8gZ3JvdXAgcXVlcnkgdG9rZW5zIChpbiBjYXNlIHdlIGhhdmUgbWF0Y2hlZCBhIHRva2VuIG1vcmUgdGhhbiBvbmNlKVxyXG4gICAgICBsZXQgbWF0Y2hpbmdRdWVyeVRva2Vuc0dyb3VwZWRCeVZhbHVlID0gdGhpcy5fZ2V0VG9rZW5zR3JvdXBlZEJ5VmFsdWUobWF0Y2hpbmdRdWVyeVRva2Vucyk7XHJcbiAgICAgIHJldHVybiAvKmxldCBpc01hdGNoaW5nUXVlcnkgPSAqL3F1ZXJ5VG9rZW5zR3JvdXBlZEJ5VmFsdWUuZXZlcnkocXVlcnlUb2tlbkdyb3VwID0+IHtcclxuICAgICAgICAvLyBmaW5kIHRva2VuIHRoYXQgY29ycmVzcG9uZHMgdG8gY3VycmVudCBxdWVyeSB0b2tlblxyXG4gICAgICAgIGxldCBtYXRjaGluZ1F1ZXJ5VG9rZW5Hcm91cCA9IG1hdGNoaW5nUXVlcnlUb2tlbnNHcm91cGVkQnlWYWx1ZS5maW5kKHggPT4geC52YWx1ZSA9PT0gcXVlcnlUb2tlbkdyb3VwLnZhbHVlKTtcclxuICAgICAgICAvLyBldmFsdWF0ZSBpZiB3ZSBoYXZlIG1vcmUgbWF0Y2hlcyB0aGFuIG5lZWRlZCBmb3IgY3VycmVudCBxdWVyeSB0b2tlblxyXG4gICAgICAgIHJldHVybiBtYXRjaGluZ1F1ZXJ5VG9rZW5Hcm91cCAmJiAobWF0Y2hpbmdRdWVyeVRva2VuR3JvdXAuaW5kZXhlcy5sZW5ndGggPj0gcXVlcnlUb2tlbkdyb3VwLmluZGV4ZXMubGVuZ3RoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBzb3J0IGRhdHVtcyBieSBtYXRjaGluZyBxdWVyeVxyXG4gICAgZmlsdGVyZWREYXRhLnNvcnQodGhpcy5fc29ydERhdGEuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gaG92ZXIgZmlyc3QgZGF0dW1cclxuICAgIHRoaXMuaG92ZXJlZERhdHVtID0gZmlsdGVyZWREYXRhLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZERhdGFbMF0gOiBudWxsO1xyXG5cclxuICAgIHRoaXMuZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhO1xyXG4gIH1cclxuXHJcbiAgX3F1ZXJ5VG9rZW5pemVyKHF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gVG9rZW5pemVycy5ub253b3JkKHF1ZXJ5KTtcclxuICB9XHJcblxyXG4gIF9nZXRUb2tlbnNHcm91cGVkQnlWYWx1ZSh0b2tlbnNBcnJheSkge1xyXG4gICAgbGV0IHVuaXF1ZVRva2VucyA9IHRoaXMuX2FycmF5VW5pcXVlQnlGaWVsZCh0b2tlbnNBcnJheSwgJ3ZhbHVlJyk7XHJcbiAgICByZXR1cm4gLypsZXQgdG9rZW5zR3JvdXBlZEJ5VmFsdWUgPSAqLyB1bmlxdWVUb2tlbnMubWFwKHVuaXF1ZVRva2VuID0+IHtcclxuICAgICAgbGV0IHRva2Vuc1dpdGhTYW1lVmFsdWUgPSB0b2tlbnNBcnJheS5maWx0ZXIodG9rZW4gPT4gdG9rZW4udmFsdWUgPT09IHVuaXF1ZVRva2VuLnZhbHVlKTtcclxuICAgICAgbGV0IGluZGV4ZXNPZlRva2Vuc1dpdGhTYW1lVmFsdWUgPSB0b2tlbnNXaXRoU2FtZVZhbHVlLm1hcCh0b2tlbiA9PiB0b2tlbnNBcnJheS5pbmRleE9mKHRva2VuKSk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5kZXhlczogaW5kZXhlc09mVG9rZW5zV2l0aFNhbWVWYWx1ZSxcclxuICAgICAgICB2YWx1ZTogdW5pcXVlVG9rZW4udmFsdWVcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX3NvcnREYXRhKGEsIGIpIHtcclxuICAgIC8vZmlyc3RseSBjb21wYXJlIGJ5IHF1ZXJ5IG1hdGNoaW5nXHJcbiAgICBsZXQgcmVzdWx0ID0gRGF0dW0uY29tcGFyZShhLCBiKTtcclxuICAgIGlmIChyZXN1bHQgIT09IDApIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvL3NlY29uZGx5IGNvbXBhcmUgdHJhZGl0aW9uYWwgaWYgcmVxdWVzdGVkXHJcbiAgICBpZiAodGhpcy5vcHRzLnNvcnQpIHtcclxuICAgICAgbGV0IHNvcnRGaWVsZCA9IHRoaXMub3B0cy5zb3J0RmllbGQgfHwgdGhpcy5vcHRzLm5hbWU7XHJcbiAgICAgIGlmIChhLml0ZW1bc29ydEZpZWxkXSA+IGIuaXRlbVtzb3J0RmllbGRdKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGEuaXRlbVtzb3J0RmllbGRdIDwgYi5pdGVtW3NvcnRGaWVsZF0pIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhLmluZGV4ID4gYi5pbmRleCA/IDEgOiBhLmluZGV4IDwgYi5pbmRleCA/IC0xIDogMDtcclxuICB9XHJcblxyXG5cclxuICAvLyB1dGlsc1xyXG5cclxuICBfYXJyYXlVbmlxdWVCeUZpZWxkKGEsIGZpZWxkKSB7XHJcbiAgICByZXR1cm4gYS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcclxuICAgICAgaWYgKHAuZXZlcnkoeCA9PiB4W2ZpZWxkXSAhPT0gY1tmaWVsZF0pKSBwLnB1c2goYyk7XHJcbiAgICAgIHJldHVybiBwO1xyXG4gICAgfSwgW10pO1xyXG4gIH1cclxuXHJcbiAgX2VzY2FwZUh0bWwodGV4dCkge1xyXG4gICAgbGV0IG1hcCA9IHtcclxuICAgICAgJyYnOiAnJmFtcDsnLFxyXG4gICAgICAnPCc6ICcmbHQ7JyxcclxuICAgICAgJz4nOiAnJmd0OycsXHJcbiAgICAgICdcIic6ICcmcXVvdDsnLFxyXG4gICAgICBcIidcIjogJyYjMDM5OydcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRleHQudG9TdHJpbmcoKS5yZXBsYWNlKC9bJjw+XCInXS9nLCBtID0+IG1hcFttXSk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
