System.register(['./dialog-renderer', './ai-dialog', './ai-dialog-header', './ai-dialog-body', './ai-dialog-footer', './attach-focus', './dialog-service', './dialog-controller'], function (_export) {
  'use strict';

  var globalSettings;

  _export('configure', configure);

  function configure(config, callback) {
    config.globalResources('./ai-dialog', './ai-dialog-header', './ai-dialog-body', './ai-dialog-footer', './attach-focus');

    if (typeof callback === 'function') {
      callback(globalSettings);
    }
  }

  return {
    setters: [function (_dialogRenderer) {
      globalSettings = _dialogRenderer.globalSettings;
    }, function (_aiDialog) {
      _export('AiDialog', _aiDialog.AiDialog);
    }, function (_aiDialogHeader) {
      _export('AiDialogHeader', _aiDialogHeader.AiDialogHeader);
    }, function (_aiDialogBody) {
      _export('AiDialogBody', _aiDialogBody.AiDialogBody);
    }, function (_aiDialogFooter) {
      _export('AiDialogFooter', _aiDialogFooter.AiDialogFooter);
    }, function (_attachFocus) {
      _export('AttachFocus', _attachFocus.AttachFocus);
    }, function (_dialogService) {
      for (var _key in _dialogService) {
        if (_key !== 'default') _export(_key, _dialogService[_key]);
      }
    }, function (_dialogController) {
      for (var _key2 in _dialogController) {
        if (_key2 !== 'default') _export(_key2, _dialogController[_key2]);
      }
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2RpYWxvZy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBT08sV0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUMxQyxVQUFNLENBQUMsZUFBZSxDQUNwQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixvQkFBb0IsRUFDcEIsZ0JBQWdCLENBQ2pCLENBQUM7O0FBRUYsUUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDbEMsY0FBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzFCO0dBQ0Y7Ozs7dUNBbkJPLGNBQWM7O29DQUNkLFFBQVE7O2dEQUNSLGNBQWM7OzRDQUNkLFlBQVk7O2dEQUNaLGNBQWM7OzBDQUNkLFdBQVciLCJmaWxlIjoiZmVhdHVyZXMvZGlhbG9nL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9iYWxTZXR0aW5nc30gZnJvbSAnLi9kaWFsb2ctcmVuZGVyZXInO1xyXG5leHBvcnQge0FpRGlhbG9nfSBmcm9tICcuL2FpLWRpYWxvZyc7XHJcbmV4cG9ydCB7QWlEaWFsb2dIZWFkZXJ9IGZyb20gJy4vYWktZGlhbG9nLWhlYWRlcic7XHJcbmV4cG9ydCB7QWlEaWFsb2dCb2R5fSBmcm9tICcuL2FpLWRpYWxvZy1ib2R5JztcclxuZXhwb3J0IHtBaURpYWxvZ0Zvb3Rlcn0gZnJvbSAnLi9haS1kaWFsb2ctZm9vdGVyJztcclxuZXhwb3J0IHtBdHRhY2hGb2N1c30gZnJvbSAnLi9hdHRhY2gtZm9jdXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShjb25maWcsIGNhbGxiYWNrKSB7XHJcbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhcclxuICAgICcuL2FpLWRpYWxvZycsXHJcbiAgICAnLi9haS1kaWFsb2ctaGVhZGVyJyxcclxuICAgICcuL2FpLWRpYWxvZy1ib2R5JyxcclxuICAgICcuL2FpLWRpYWxvZy1mb290ZXInLFxyXG4gICAgJy4vYXR0YWNoLWZvY3VzJ1xyXG4gICk7XHJcblxyXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGNhbGxiYWNrKGdsb2JhbFNldHRpbmdzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGlhbG9nLXNlcnZpY2UnO1xyXG5leHBvcnQgKiBmcm9tICcuL2RpYWxvZy1jb250cm9sbGVyJztcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
