(function() {
  window.UglifyJS_NoUnsafeEval = true;

  localStorage['log'] = '';

  localStorage['logLastError'] = '';

  window.OmegaContextMenuQuickSwitchHandler = function() {
    return null;
  };

  if (chrome.i18n.getUILanguage != null) {
    chrome.contextMenus.create({
      id: 'enableQuickSwitch',
      title: chrome.i18n.getMessage('contextMenu_enableQuickSwitch'),
      type: 'checkbox',
      checked: false,
      contexts: ["browser_action"],
      onclick: function(info) {
        return window.OmegaContextMenuQuickSwitchHandler(info);
      }
    });
  }

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage('popup_reportIssues'),
    contexts: ["browser_action"],
    onclick: function() {
      var body, env, err, extensionVersion, finalUrl, url;
      url = 'https://github.com/FelisCatus/SwitchyOmega/issues/new?title=&body=';
      finalUrl = url;
      try {
        extensionVersion = chrome.runtime.getManifest().version;
        env = {
          extensionVersion: extensionVersion,
          projectVersion: extensionVersion,
          userAgent: navigator.userAgent
        };
        body = chrome.i18n.getMessage('popup_issueTemplate', [env.projectVersion, env.userAgent]);
        body || (body = "\n\n\n<!-- Please write your comment ABOVE this line. -->\nSwitchyOmega " + env.projectVersion + "\n" + env.userAgent);
        finalUrl = url + encodeURIComponent(body);
        err = localStorage['logLastError'];
        if (err) {
          body += "\n```\n" + err + "\n```";
          finalUrl = (url + encodeURIComponent(body)).substr(0, 2000);
        }
      } catch (_error) {}
      return chrome.tabs.create({
        url: finalUrl
      });
    }
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage('popup_errorLog'),
    contexts: ["browser_action"],
    onclick: function() {
      var blob;
      blob = new Blob([localStorage['log']], {
        type: "text/plain;charset=utf-8"
      });
      return saveAs(blob, "OmegaLog_" + (Date.now()) + ".txt");
    }
  });

}).call(this);
(function() {
  angular.module('omega').controller('IoCtrl', function($scope, $rootScope, $window, $http, omegaTarget) {
    omegaTarget.state('web.restoreOnlineUrl').then(function(url) {
      if (url) {
        return $scope.restoreOnlineUrl = "http://proxee.net/files/proxee.bak";
      }
    });
    $scope.exportOptions = function() {
      return $rootScope.applyOptionsConfirm().then(function() {
        var blob, content, plainOptions;
        plainOptions = angular.fromJson(angular.toJson($rootScope.options));
        content = JSON.stringify(plainOptions);
        blob = new Blob([content], {
          type: "text/plain;charset=utf-8"
        });
        return saveAs(blob, "OmegaOptions.bak");
      });
    };
    $scope.importSuccess = function() {
      return $rootScope.showAlert({
        type: 'success',
        i18n: 'options_importSuccess',
        message: 'Options imported.'
      });
    };
    $scope.downloadError = function() {
      return $rootScope.showAlert({
        type: 'error',
        i18n: 'options_importDownloadError',
        message: 'Error downloading backup file!'
      });
    };
    $scope.restoreOnline = function() {
      omegaTarget.state('web.restoreOnlineUrl', $scope.restoreOnlineUrl);
      $scope.restoringOnline = true;
      return $http({
        method: 'GET',
        url: $scope.restoreOnlineUrl,
        cache: false,
        timeout: 10000,
        responseType: "text"
      }).then((function(result) {
        return $rootScope.resetOptions(result.data).then((function() {
          return $scope.importSuccess();
        }), function() {
          return $scope.restoreLocalError();
        });
      }), $scope.downloadError)["finally"](function() {
        return $scope.restoringOnline = false;
      });
    };
    $scope.enableOptionsSync = function(args) {
      var enable;
      enable = function() {
        return omegaTarget.setOptionsSync(true, args)["finally"](function() {
          return $window.location.reload();
        });
      };
      if (args != null ? args.force : void 0) {
        return enable();
      } else {
        return $rootScope.applyOptionsConfirm().then(enable);
      }
    };
    $scope.disableOptionsSync = function() {
      return omegaTarget.setOptionsSync(false).then(function() {
        return $rootScope.applyOptionsConfirm().then(function() {
          return $window.location.reload();
        });
      });
    };
    return $scope.resetOptionsSync = function() {
      return omegaTarget.resetOptionsSync().then(function() {
        return $rootScope.applyOptionsConfirm().then(function() {
          return $window.location.reload();
        });
      });
    };
  });

}).call(this);
