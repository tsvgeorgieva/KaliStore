System.register(['../column/date-column', '../column/boolean-column', '../column/input-column', '../column/select-column', '../grid-filter'], function (_export) {
  'use strict';

  var DateColumn, BooleanColumn, InputColumn, SelectColumn, gridFilter, ColumnDefinitionFactory;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_columnDateColumn) {
      DateColumn = _columnDateColumn.DateColumn;
    }, function (_columnBooleanColumn) {
      BooleanColumn = _columnBooleanColumn.BooleanColumn;
    }, function (_columnInputColumn) {
      InputColumn = _columnInputColumn.InputColumn;
    }, function (_columnSelectColumn) {
      SelectColumn = _columnSelectColumn.SelectColumn;
    }, function (_gridFilter) {
      gridFilter = _gridFilter.gridFilter;
    }],
    execute: function () {
      ColumnDefinitionFactory = (function () {
        function ColumnDefinitionFactory(gridDefinition, grid) {
          _classCallCheck(this, ColumnDefinitionFactory);

          this.colDefinitions = gridDefinition.cols;
          this.rowAttrs = gridDefinition.rowAttrs;
          this.grid = grid;
        }

        _createClass(ColumnDefinitionFactory, [{
          key: 'create',
          value: function create(columnsMetadata) {
            this.columnId = 1;
            if (columnsMetadata === undefined) {
              return this._createFromColumnDefintions();
            } else {
              return this._createFromColumnsMetadata(columnsMetadata);
            }
          }
        }, {
          key: '_createFromColumnDefintions',
          value: function _createFromColumnDefintions() {
            var _this = this;

            return this.colDefinitions.map(function (cd) {
              return _this._createColumnDefinition(cd.attr, cd.html);
            });
          }
        }, {
          key: '_createFromColumnsMetadata',
          value: function _createFromColumnsMetadata(columnsMetadata) {
            var _this2 = this;

            return columnsMetadata.map(function (cm) {
              var html = undefined;
              if (cm.html !== undefined) {
                html = cm.html;
                delete cm.html;
              } else {
                html = '${$item["' + cm.field + '"]}';
              }

              return _this2._createColumnDefinition(cm, html);
            });
          }
        }, {
          key: '_createColumnDefinition',
          value: function _createColumnDefinition(attr, html) {
            var col = undefined;
            switch (attr.filter) {
              case gridFilter.input:
                col = new InputColumn(attr, html, this.grid, this.columnId);
                break;
              case gridFilter.dateFromTo:
                col = new DateColumn(attr, html, this.grid, this.columnId);
                break;
              case gridFilter.boolean:
                col = new BooleanColumn(attr, html, this.grid, this.columnId);
                break;
              case gridFilter.select:
                col = new SelectColumn(attr, html, this.grid, this.columnId);
                break;
              case undefined:
                col = new InputColumn(attr, html, this.grid, this.columnId);
                break;
              default:
                throw new Error('No such grid filter defined: ' + attr.filter + '!');
            }

            this.columnId++;
            return col;
          }
        }]);

        return ColumnDefinitionFactory;
      })();

      _export('ColumnDefinitionFactory', ColumnDefinitionFactory);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2VsZW1lbnRzL2dyaWQvY29sdW1uL2NvbHVtbi1kZWZpbml0aW9uLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dFQU1hLHVCQUF1Qjs7Ozs7Ozs7cUNBTjVCLFVBQVU7OzJDQUNWLGFBQWE7O3VDQUNiLFdBQVc7O3lDQUNYLFlBQVk7OytCQUNaLFVBQVU7OztBQUVMLDZCQUF1QjtBQUN2QixpQkFEQSx1QkFBdUIsQ0FDdEIsY0FBYyxFQUFFLElBQUksRUFBRTtnQ0FEdkIsdUJBQXVCOztBQUVoQyxjQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDMUMsY0FBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO0FBQ3hDLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCOztxQkFMVSx1QkFBdUI7O2lCQU81QixnQkFBQyxlQUFlLEVBQUU7QUFDdEIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLGdCQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7QUFDakMscUJBQU8sSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7YUFDM0MsTUFBTTtBQUNMLHFCQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN6RDtXQUNGOzs7aUJBRTBCLHVDQUFHOzs7QUFDNUIsbUJBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFO3FCQUFJLE1BQUssdUJBQXVCLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDO1dBQ3RGOzs7aUJBRXlCLG9DQUFDLGVBQWUsRUFBRTs7O0FBQzFDLG1CQUFPLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLEVBQUk7QUFDL0Isa0JBQUksSUFBSSxZQUFBLENBQUM7QUFDVCxrQkFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN6QixvQkFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDZix1QkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDO2VBQ2hCLE1BQU07QUFDTCxvQkFBSSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztlQUN2Qzs7QUFFRCxxQkFBTyxPQUFLLHVCQUF1QixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMvQyxDQUFDLENBQUM7V0FDSjs7O2lCQUVzQixpQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLGdCQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1Isb0JBQVEsSUFBSSxDQUFDLE1BQU07QUFDbkIsbUJBQUssVUFBVSxDQUFDLEtBQUs7QUFDbkIsbUJBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVELHNCQUFNO0FBQUEsQUFDUixtQkFBSyxVQUFVLENBQUMsVUFBVTtBQUN4QixtQkFBRyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0Qsc0JBQU07QUFBQSxBQUNSLG1CQUFLLFVBQVUsQ0FBQyxPQUFPO0FBQ3JCLG1CQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5RCxzQkFBTTtBQUFBLEFBQ1IsbUJBQUssVUFBVSxDQUFDLE1BQU07QUFDcEIsbUJBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdELHNCQUFNO0FBQUEsQUFDUixtQkFBSyxTQUFTO0FBQ1osbUJBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVELHNCQUFNO0FBQUEsQUFDUjtBQUNFLHNCQUFNLElBQUksS0FBSyxtQ0FBaUMsSUFBSSxDQUFDLE1BQU0sT0FBSSxDQUFDO0FBQUEsYUFDakU7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQixtQkFBTyxHQUFHLENBQUM7V0FDWjs7O2VBMURVLHVCQUF1QiIsImZpbGUiOiJmZWF0dXJlcy9lbGVtZW50cy9ncmlkL2NvbHVtbi9jb2x1bW4tZGVmaW5pdGlvbi1mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEYXRlQ29sdW1ufSBmcm9tICcuLi9jb2x1bW4vZGF0ZS1jb2x1bW4nO1xyXG5pbXBvcnQge0Jvb2xlYW5Db2x1bW59IGZyb20gJy4uL2NvbHVtbi9ib29sZWFuLWNvbHVtbic7XHJcbmltcG9ydCB7SW5wdXRDb2x1bW59IGZyb20gJy4uL2NvbHVtbi9pbnB1dC1jb2x1bW4nO1xyXG5pbXBvcnQge1NlbGVjdENvbHVtbn0gZnJvbSAnLi4vY29sdW1uL3NlbGVjdC1jb2x1bW4nO1xyXG5pbXBvcnQge2dyaWRGaWx0ZXJ9IGZyb20gJy4uL2dyaWQtZmlsdGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW5EZWZpbml0aW9uRmFjdG9yeSB7XHJcbiAgY29uc3RydWN0b3IoZ3JpZERlZmluaXRpb24sIGdyaWQpIHtcclxuICAgIHRoaXMuY29sRGVmaW5pdGlvbnMgPSBncmlkRGVmaW5pdGlvbi5jb2xzO1xyXG4gICAgdGhpcy5yb3dBdHRycyA9IGdyaWREZWZpbml0aW9uLnJvd0F0dHJzO1xyXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShjb2x1bW5zTWV0YWRhdGEpIHtcclxuICAgIHRoaXMuY29sdW1uSWQgPSAxO1xyXG4gICAgaWYgKGNvbHVtbnNNZXRhZGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVGcm9tQ29sdW1uRGVmaW50aW9ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZyb21Db2x1bW5zTWV0YWRhdGEoY29sdW1uc01ldGFkYXRhKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jcmVhdGVGcm9tQ29sdW1uRGVmaW50aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbERlZmluaXRpb25zLm1hcChjZCA9PiB0aGlzLl9jcmVhdGVDb2x1bW5EZWZpbml0aW9uKGNkLmF0dHIsIGNkLmh0bWwpKTtcclxuICB9XHJcblxyXG4gIF9jcmVhdGVGcm9tQ29sdW1uc01ldGFkYXRhKGNvbHVtbnNNZXRhZGF0YSkge1xyXG4gICAgcmV0dXJuIGNvbHVtbnNNZXRhZGF0YS5tYXAoY20gPT4ge1xyXG4gICAgICBsZXQgaHRtbDtcclxuICAgICAgaWYgKGNtLmh0bWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGh0bWwgPSBjbS5odG1sO1xyXG4gICAgICAgIGRlbGV0ZSBjbS5odG1sO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGh0bWwgPSAnJHskaXRlbVtcIicgKyBjbS5maWVsZCArICdcIl19JztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUNvbHVtbkRlZmluaXRpb24oY20sIGh0bWwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfY3JlYXRlQ29sdW1uRGVmaW5pdGlvbihhdHRyLCBodG1sKSB7XHJcbiAgICBsZXQgY29sO1xyXG4gICAgc3dpdGNoIChhdHRyLmZpbHRlcikge1xyXG4gICAgY2FzZSBncmlkRmlsdGVyLmlucHV0OlxyXG4gICAgICBjb2wgPSBuZXcgSW5wdXRDb2x1bW4oYXR0ciwgaHRtbCwgdGhpcy5ncmlkLCB0aGlzLmNvbHVtbklkKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIGdyaWRGaWx0ZXIuZGF0ZUZyb21UbzpcclxuICAgICAgY29sID0gbmV3IERhdGVDb2x1bW4oYXR0ciwgaHRtbCwgdGhpcy5ncmlkLCB0aGlzLmNvbHVtbklkKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIGdyaWRGaWx0ZXIuYm9vbGVhbjpcclxuICAgICAgY29sID0gbmV3IEJvb2xlYW5Db2x1bW4oYXR0ciwgaHRtbCwgdGhpcy5ncmlkLCB0aGlzLmNvbHVtbklkKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIGdyaWRGaWx0ZXIuc2VsZWN0OlxyXG4gICAgICBjb2wgPSBuZXcgU2VsZWN0Q29sdW1uKGF0dHIsIGh0bWwsIHRoaXMuZ3JpZCwgdGhpcy5jb2x1bW5JZCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSB1bmRlZmluZWQ6XHJcbiAgICAgIGNvbCA9IG5ldyBJbnB1dENvbHVtbihhdHRyLCBodG1sLCB0aGlzLmdyaWQsIHRoaXMuY29sdW1uSWQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gc3VjaCBncmlkIGZpbHRlciBkZWZpbmVkOiAke2F0dHIuZmlsdGVyfSFgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbHVtbklkKys7XHJcbiAgICByZXR1cm4gY29sO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
