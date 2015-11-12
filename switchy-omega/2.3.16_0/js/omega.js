(function() {
  var attachedPrefix, charCodeUnderscore, colors, profileColorPalette, profileColors;

  angular.module('omega').constant('builtinProfiles', OmegaPac.Profiles.builtinProfiles);

  profileColors = ['#9ce', '#9d9', '#fa8', '#fe9', '#d497ee', '#47b', '#5b5', '#d63', '#ca0'];

  colors = [].concat(profileColors);

  profileColorPalette = ((function() {
    var _results;
    _results = [];
    while (colors.length) {
      _results.push(colors.splice(0, 3));
    }
    return _results;
  })());

  angular.module('omega').constant('profileColors', profileColors);

  angular.module('omega').constant('profileColorPalette', profileColorPalette);

  attachedPrefix = '__ruleListOf_';

  angular.module('omega').constant('getAttachedName', function(name) {
    return attachedPrefix + name;
  });

  angular.module('omega').constant('getParentName', function(name) {
    if (name.indexOf(attachedPrefix) === 0) {
      return name.substr(attachedPrefix.length);
    } else {
      return void 0;
    }
  });

  charCodeUnderscore = '_'.charCodeAt(0);

  angular.module('omega').constant('charCodeUnderscore', charCodeUnderscore);

  angular.module('omega').constant('isProfileNameHidden', function(name) {
    return name.charCodeAt(0) === charCodeUnderscore;
  });

  angular.module('omega').constant('isProfileNameReserved', function(name) {
    return name.charCodeAt(0) === charCodeUnderscore && name.charCodeAt(1) === charCodeUnderscore;
  });

  angular.module('omega').config(function($stateProvider, $urlRouterProvider, $httpProvider, $animateProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    $animateProvider.classNameFilter(/angular-animate/);
    $urlRouterProvider.otherwise('/ui');
    $urlRouterProvider.otherwise(function($injector, $location) {
      if ($location.path() === '') {
        return $injector.get('omegaTarget').lastUrl() || '/ui';
      } else {
        return '/ui';
      }
    });
    return $stateProvider.state('ui', {
      url: '/ui',
      templateUrl: 'partials/ui.html'
    }).state('general', {
      url: '/general',
      templateUrl: 'partials/general.html'
    }).state('io', {
      url: '/io',
      templateUrl: 'partials/io.html',
      controller: 'IoCtrl'
    }).state('profile', {
      url: '/profile/*name',
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl'
    }).state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    });
  });

}).call(this);

(function() {
  angular.module('omega').controller('FixedProfileCtrl', function($scope, $modal) {
    var defaultPort, onBypassListChange, onProxyChange, proxyProperties, scheme, _fn, _i, _len, _ref;
    $scope.urlSchemes = ['', 'http', 'https', 'ftp'];
    $scope.urlSchemeDefault = 'fallbackProxy';
    proxyProperties = {
      '': 'fallbackProxy',
      'http': 'proxyForHttp',
      'https': 'proxyForHttps',
      'ftp': 'proxyForFtp'
    };
    $scope.schemeDisp = {
      '': null,
      'http': 'http://',
      'https': 'https://',
      'ftp': 'ftp://'
    };
    defaultPort = {
      'http': 80,
      'https': 443,
      'socks4': 1080,
      'socks5': 1080
    };
    $scope.showAdvanced = false;
    $scope.proxyEditors = {};
    $scope.authSupported = {
      "http": true,
      "https": true
    };
    $scope.isProxyAuthActive = function(scheme) {
      var _ref;
      return ((_ref = $scope.profile.auth) != null ? _ref[proxyProperties[scheme]] : void 0) != null;
    };
    $scope.editProxyAuth = function(scheme) {
    	console.log('FixedProfileCtrl0 >>> ' + scheme);
      var auth, prop, proxy, scope, _ref;
      prop = proxyProperties[scheme];
      proxy = $scope.profile[prop];
      scope = $scope.$new('isolate');
      scope.proxy = proxy;
      auth = (_ref = $scope.profile.auth) != null ? _ref[prop] : void 0;
      scope.auth = auth && angular.copy(auth);
      console.log(auth);
      return $modal.open({
        templateUrl: 'partials/fixed_auth_edit.html',
        scope: scope,
        size: 'sm'
      }).result.then(function(auth) {
        var _base;
        if (!(auth != null ? auth.username : void 0)) {
          if ($scope.profile.auth) {
            return $scope.profile.auth[prop] = void 0;
          }
        } else {
          if ((_base = $scope.profile).auth == null) {
            _base.auth = {};
          }
          return $scope.profile.auth[prop] = auth;
        }
      });
    };
    onProxyChange = function(proxyEditors, oldProxyEditors) {
      var proxy, scheme, _base, _i, _len, _name, _ref, _ref1, _results;
      if (!proxyEditors) {
        return;
      }
      _ref = $scope.urlSchemes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        scheme = _ref[_i];
        proxy = proxyEditors[scheme];
        if ($scope.profile.auth && !$scope.authSupported[proxy.scheme]) {
          delete $scope.profile.auth[proxyProperties[scheme]];
        }
        if (!proxy.scheme) {
          if (!scheme) {
            proxyEditors[scheme] = {};
          }
          delete $scope.profile[proxyProperties[scheme]];
          continue;
        } else if (!oldProxyEditors[scheme].scheme) {
          if (proxy.scheme === proxyEditors[''].scheme) {
            if (proxy.port == null) {
              proxy.port = proxyEditors[''].port;
            }
          }
          if (proxy.port == null) {
            proxy.port = defaultPort[proxy.scheme];
          }
          if (proxy.host == null) {
            proxy.host = (_ref1 = proxyEditors[''].host) != null ? _ref1 : 'example.com';
          }
        }
        _results.push((_base = $scope.profile)[_name = proxyProperties[scheme]] != null ? _base[_name] : _base[_name] = proxy);
      }
      return _results;
    };
    _ref = $scope.urlSchemes;
    _fn = function(scheme) {
      return $scope.$watch((function() {
        return $scope.profile[proxyProperties[scheme]];
      }), function(proxy) {
        if (scheme && proxy) {
          $scope.showAdvanced = true;
        }
        return $scope.proxyEditors[scheme] = proxy != null ? proxy : {};
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scheme = _ref[_i];
      _fn(scheme);
    }
    $scope.$watch('proxyEditors', onProxyChange, true);
    onBypassListChange = function(list) {
      var item;
      return $scope.bypassList = ((function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = list.length; _j < _len1; _j++) {
          item = list[_j];
          _results.push(item.pattern);
        }
        return _results;
      })()).join('\n');
    };
    $scope.$watch('profile.bypassList', onBypassListChange, true);
    return $scope.$watch('bypassList', function(bypassList, oldList) {
      var entry;
      if ((bypassList == null) || bypassList === oldList) {
        return;
      }
      return $scope.profile.bypassList = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = bypassList.split(/\r?\n/);
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          entry = _ref1[_j];
          if (entry) {
            _results.push({
              conditionType: "BypassCondition",
              pattern: entry
            });
          }
        }
        return _results;
      })();
    });
  });

}).call(this);

(function() {
  angular.module('omega').controller('IoCtrl', function($scope, $rootScope, $window, $http, omegaTarget) {
    omegaTarget.state('web.restoreOnlineUrl').then(function(url) {
      if (url) {
        return $scope.restoreOnlineUrl = url;
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
    $scope.restoreLocal = function(content) {
      $scope.restoringLocal = true;
      return $rootScope.resetOptions(content).then((function() {
        return $scope.importSuccess();
      }), function() {
        return $scope.restoreLocalError();
      })["finally"](function() {
        return $scope.restoringLocal = false;
      });
    };
    $scope.restoreLocalError = function() {
      return $rootScope.showAlert({
        type: 'error',
        i18n: 'options_importFormatError',
        message: 'Invalid backup file!'
      });
    };
    $scope.downloadError = function() {
      return $rootScope.showAlert({
        type: 'error',
        i18n: 'options_importDownloadError',
        message: 'Error downloading backup file!'
      });
    };
    $scope.triggerFileInput = function() {
      angular.element('#restore-local-file').click();
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

(function() {
  var __hasProp = {}.hasOwnProperty;

  angular.module('omega').controller('MasterCtrl', function($scope, $rootScope, $window, $q, $modal, $state, profileColors, profileIcons, omegaTarget, $timeout, $location, $filter, getAttachedName, isProfileNameReserved, isProfileNameHidden, dispNameFilter) {
    var checkFormValid, diff, onOptionChange, tr, type, _ref;
    tr = $filter('tr');
    $rootScope.options = null;
    omegaTarget.addOptionsChangeCallback(function(newOptions) {
      $rootScope.options = angular.copy(newOptions);
      $rootScope.optionsOld = angular.copy(newOptions);
      omegaTarget.state('syncOptions').then(function(syncOptions) {
        return $scope.syncOptions = syncOptions;
      });
      return $timeout(function() {
        return $rootScope.optionsDirty = false;
      });
    });
    $rootScope.revertOptions = function() {
    	console.log($scope.profile.name);
    	console.log(localStorage[$scope.profile.name + "_proxy_login"] + ' ' + localStorage[$scope.profile.name + "_proxy_password"]);
    	// reset profile username/password 
    	localStorage[$scope.profile.name + "_proxy_login"] = localStorage[$scope.profile.name + "_proxy_login_old"];
        localStorage[$scope.profile.name + "_proxy_password"] = localStorage[$scope.profile.name + "_proxy_password_old"];
        localStorage[$scope.profile.name + "_proxy_login_old"] = null;
        localStorage[$scope.profile.name + "_proxy_password_old"] = null;
        console.log('revert!');
        console.log(localStorage[$scope.profile.name + "_proxy_login"] + ' ' + localStorage[$scope.profile.name + "_proxy_password"]);
      return $window.location.reload();
    };
    $rootScope.exportScript = function(name) {
      var getProfileName;
      getProfileName = name ? $q.when(name) : omegaTarget.state('currentProfileName');
      return getProfileName.then(function(profileName) {
        var ast, blob, fileName, missingProfile, pac, profile, profileNotFound, _ref;
        if (!profileName) {
          return;
        }
        profile = $rootScope.profileByName(profileName);
        if ((_ref = profile.profileType) === 'DirectProfile' || _ref === 'SystemProfile') {
          return;
        }
        missingProfile = null;
        profileNotFound = function(name) {
          missingProfile = name;
          return 'dumb';
        };
        ast = OmegaPac.PacGenerator.script($rootScope.options, profileName, {
          profileNotFound: profileNotFound
        });
        pac = ast.print_to_string({
          beautify: true,
          comments: true
        });
        pac = OmegaPac.PacGenerator.ascii(pac);
        blob = new Blob([pac], {
          type: "text/plain;charset=utf-8"
        });
        fileName = profileName.replace(/\W+/g, '_');
        saveAs(blob, "OmegaProfile_" + fileName + ".pac");
        if (missingProfile) {
          return $timeout(function() {
            return $rootScope.showAlert({
              type: 'error',
              message: tr('options_profileNotFound', [missingProfile])
            });
          });
        }
      });
    };
    diff = jsondiffpatch.create({
      objectHash: function(obj) {
        return JSON.stringify(obj);
      },
      textDiff: {
        minLength: 1 / 0
      }
    });
    $rootScope.showAlert = function(alert) {
      return $timeout(function() {
        $scope.alert = alert;
        $scope.alertShown = true;
        $scope.alertShownAt = Date.now();
        $timeout($rootScope.hideAlert, 3000);
      });
    };
    $rootScope.hideAlert = function() {
      return $timeout(function() {
        if (Date.now() - $scope.alertShownAt >= 1000) {
          return $scope.alertShown = false;
        }
      });
    };
    checkFormValid = function() {
      var fields;
      fields = angular.element('.ng-invalid');
      if (fields.length > 0) {
        fields[0].focus();
        $rootScope.showAlert({
          type: 'error',
          i18n: 'options_formInvalid'
        });
        return false;
      }
      return true;
    };
    $rootScope.applyOptions = function() {
    	console.log('apply!');
      var patch, plainOptions;
      if (!checkFormValid()) {
        return;
      }
      if ($rootScope.$broadcast('omegaApplyOptions').defaultPrevented) {
        return;
      }
      plainOptions = angular.fromJson(angular.toJson($rootScope.options));
      patch = diff.diff($rootScope.optionsOld, plainOptions);
      return omegaTarget.optionsPatch(patch).then(function() {
        return $rootScope.showAlert({
          type: 'success',
          i18n: 'options_saveSuccess'
        });
      });
    };
    $rootScope.resetOptions = function(options) {
      return omegaTarget.resetOptions(options).then(function() {
        return $rootScope.showAlert({
          type: 'success',
          i18n: 'options_resetSuccess'
        });
      })["catch"](function(err) {
        $rootScope.showAlert({
          type: 'error',
          message: err
        });
        return $q.reject(err);
      });
    };
    $rootScope.profileByName = function(name) {
      return OmegaPac.Profiles.byName(name, $rootScope.options);
    };
    $rootScope.applyOptionsConfirm = function() {
      if (!checkFormValid()) {
        return $q.reject('form_invalid');
      }
      if (!$rootScope.optionsDirty) {
        return $q.when(true);
      }
      return $modal.open({
        templateUrl: 'partials/apply_options_confirm.html'
      }).result.then(function() {
        return $rootScope.applyOptions();
      });
    };
    $rootScope.newProfile = function() {
      var scope;
      scope = $rootScope.$new('isolate');
      scope.options = $rootScope.options;
      scope.isProfileNameReserved = isProfileNameReserved;
      scope.isProfileNameHidden = isProfileNameHidden;
      scope.profileByName = $rootScope.profileByName;
      scope.validateProfileName = {
        conflict: '!$value || !profileByName($value)',
        reserved: '!$value || !isProfileNameReserved($value)'
      };
      scope.profileIcons = profileIcons;
      scope.dispNameFilter = dispNameFilter;
      scope.options = $scope.options;
      return $modal.open({
        templateUrl: 'partials/new_profile.html',
        scope: scope
      }).result.then(function(profile) {
        var choice;
        profile = OmegaPac.Profiles.create(profile);
        choice = Math.floor(Math.random() * profileColors.length);
        if (profile.color == null) {
          profile.color = profileColors[choice];
        }
        OmegaPac.Profiles.updateRevision(profile);
        $rootScope.options[OmegaPac.Profiles.nameAsKey(profile)] = profile;
        return $state.go('profile', {
          name: profile.name
        });
      });
    };
    $rootScope.replaceProfile = function(fromName, toName) {
      return $rootScope.applyOptionsConfirm().then(function() {
        var scope;
        scope = $rootScope.$new('isolate');
        scope.options = $rootScope.options;
        scope.fromName = fromName;
        scope.toName = toName;
        scope.profileByName = $rootScope.profileByName;
        scope.dispNameFilter = dispNameFilter;
        scope.options = $scope.options;
        scope.profileSelect = function(model) {
          return "<div omega-profile-select=\"options | profiles:profile\"\n  ng-model=\"" + model + "\" options=\"options\"\n  disp-name=\"dispNameFilter\" style=\"display: inline-block;\">\n</div>";
        };
        return $modal.open({
          templateUrl: 'partials/replace_profile.html',
          scope: scope
        }).result.then(function(_arg) {
          var fromName, toName;
          fromName = _arg.fromName, toName = _arg.toName;
          return omegaTarget.replaceRef(fromName, toName).then(function() {
            return $rootScope.showAlert({
              type: 'success',
              i18n: 'options_replaceProfileSuccess'
            });
          })["catch"](function(err) {
            return $rootScope.showAlert({
              type: 'error',
              message: err
            });
          });
        });
      });
    };
    $rootScope.renameProfile = function(fromName) {
      return $rootScope.applyOptionsConfirm().then(function() {
        var profile, scope;
        profile = $rootScope.profileByName(fromName);
        scope = $rootScope.$new('isolate');
        scope.options = $rootScope.options;
        scope.fromName = fromName;
        scope.isProfileNameReserved = isProfileNameReserved;
        scope.isProfileNameHidden = isProfileNameHidden;
        scope.profileByName = $rootScope.profileByName;
        scope.validateProfileName = {
          conflict: '!$value || $value == fromName || !profileByName($value)',
          reserved: '!$value || !isProfileNameReserved($value)'
        };
        scope.dispNameFilter = $scope.dispNameFilter;
        scope.options = $scope.options;
        return $modal.open({
          templateUrl: 'partials/rename_profile.html',
          scope: scope
        }).result.then(function(toName) {
          var attachedName, defaultProfileName, rename, toAttachedName;
          if (toName !== fromName) {
            rename = omegaTarget.renameProfile(fromName, toName);
            attachedName = getAttachedName(fromName);
            if ($rootScope.profileByName(attachedName)) {
              toAttachedName = getAttachedName(toName);
              defaultProfileName = void 0;
              if ($rootScope.profileByName(toAttachedName)) {
                defaultProfileName = profile.defaultProfileName;
                rename = rename.then(function() {
                  var toAttachedKey;
                  toAttachedKey = OmegaPac.Profiles.nameAsKey(toAttachedName);
                  profile = $rootScope.profileByName(toName);
                  profile.defaultProfileName = 'direct';
                  OmegaPac.Profiles.updateRevision(profile);
                  delete $rootScope.options[toAttachedKey];
                  return $rootScope.applyOptions();
                });
              }
              rename = rename.then(function() {
                return omegaTarget.renameProfile(attachedName, toAttachedName);
              });
              if (defaultProfileName) {
                rename = rename.then(function() {
                  profile = $rootScope.profileByName(toName);
                  profile.defaultProfileName = defaultProfileName;
                  return $rootScope.applyOptions();
                });
              }
            }
            return rename.then(function() {
              return $state.go('profile', {
                name: toName
              });
            })["catch"](function(err) {
              return $rootScope.showAlert({
                type: 'error',
                message: err
              });
            });
          }
        });
      });
    };
    $scope.updatingProfile = {};
    $rootScope.updateProfile = function(name) {
      return $rootScope.applyOptionsConfirm().then(function() {
        if (name != null) {
          $scope.updatingProfile[name] = true;
        } else {
          OmegaPac.Profiles.each($scope.options, function(key, profile) {
            if (!profile.builtin) {
              return $scope.updatingProfile[profile.name] = true;
            }
          });
        }
        return omegaTarget.updateProfile(name).then(function(results) {
          var error, profileName, result, success;
          success = 0;
          error = 0;
          for (profileName in results) {
            if (!__hasProp.call(results, profileName)) continue;
            result = results[profileName];
            if (result instanceof Error) {
              error++;
            } else {
              success++;
            }
          }
          if (error === 0) {
            return $rootScope.showAlert({
              type: 'success',
              i18n: 'options_profileDownloadSuccess'
            });
          } else {
            return $q.reject(results);
          }
        })["catch"](function(err) {
          return $rootScope.showAlert({
            type: 'error',
            i18n: 'options_profileDownloadError'
          });
        })["finally"](function() {
          if (name != null) {
            return $scope.updatingProfile[name] = false;
          } else {
            return $scope.updatingProfile = {};
          }
        });
      });
    };
    onOptionChange = function(options, oldOptions) {
      if (options === oldOptions || (oldOptions == null)) {
        return;
      }
      return $rootScope.optionsDirty = true;
    };
    $rootScope.$watch('options', onOptionChange, true);
    $rootScope.$on('$stateChangeStart', function(event, _, __, fromState) {
      if (!checkFormValid()) {
        return event.preventDefault();
      }
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      return omegaTarget.lastUrl($location.url());
    });
    $window.onbeforeunload = function() {
      if ($rootScope.optionsDirty) {
        return tr('options_optionsNotSaved');
      } else {
        return null;
      }
    };
    document.addEventListener('click', (function() {
      return $rootScope.hideAlert();
    }), false);
    $scope.profileIcons = profileIcons;
    $scope.dispNameFilter = dispNameFilter;
    _ref = OmegaPac.Profiles.formatByType;
    for (type in _ref) {
      if (!__hasProp.call(_ref, type)) continue;
      $scope.profileIcons[type] = $scope.profileIcons['RuleListProfile'];
    }
    $scope.alertIcons = {
      'success': 'glyphicon-ok',
      'warning': 'glyphicon-warning-sign',
      'error': 'glyphicon-remove',
      'danger': 'glyphicon-danger'
    };
    $scope.alertClassForType = function(type) {
      if (!type) {
        return '';
      }
      if (type === 'error') {
        type = 'danger';
      }
      return 'alert-' + type;
    };
    $scope.downloadIntervals = [15, 60, 180, 360, 720, 1440, -1];
    $scope.downloadIntervalI18n = function(interval) {
      return "options_downloadInterval_" + (interval < 0 ? "never" : interval);
    };
    $scope.openShortcutConfig = omegaTarget.openShortcutConfig.bind(omegaTarget);
    omegaTarget.refresh();
    return omegaTarget.state('firstRun').then(function(firstRun) {
      var scope;
      if (!firstRun) {
        return;
      }
      scope = $rootScope.$new('isolate');
      scope.upgrade = firstRun === 'upgrade';
      omegaTarget.state('firstRun', '');
      return $modal.open({
        templateUrl: 'partials/options_welcome.html',
        keyboard: false,
        scope: scope,
        backdrop: 'static',
        backdropClass: 'opacity-half'
      }).result.then(function(r) {
        switch (r) {
          case 'later':
            break;
          case 'show':
            return $script('js/options_guide.js');
        }
      });
    });
  });

}).call(this);

(function() {
  angular.module('omega').controller('PacProfileCtrl', function($scope, $modal) {
    var oldLastUpdate, oldPacScript, oldPacUrl, onProfileChange, set;
    $scope.urlRegex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    $scope.urlWithFile = /^(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
    $scope.isFileUrl = OmegaPac.Profiles.isFileUrl;
    $scope.pacUrlCtrl = {
      ctrl: null
    };
    set = OmegaPac.Profiles.referencedBySet($scope.profile, $scope.options);
    $scope.referenced = Object.keys(set).length > 0;
    oldPacUrl = null;
    oldLastUpdate = null;
    oldPacScript = null;
    onProfileChange = function(profile, oldProfile) {
      if (!(profile && oldProfile)) {
        return;
      }
      if (profile.pacUrl !== oldProfile.pacUrl) {
        if (profile.lastUpdate) {
          oldPacUrl = oldProfile.pacUrl;
          oldLastUpdate = profile.lastUpdate;
          oldPacScript = oldProfile.pacScript;
          profile.lastUpdate = null;
        } else if (oldPacUrl && profile.pacUrl === oldPacUrl) {
          profile.lastUpdate = oldLastUpdate;
          profile.pacScript = oldPacScript;
        }
      }
      return $scope.pacUrlIsFile = $scope.isFileUrl(profile.pacUrl);
    };
    $scope.$watch('profile', onProfileChange, true);
    return $scope.editProxyAuth = function(scheme) {
    	console.log('PacProfileCtrl');
      var auth, prop, scope, _ref;
      prop = 'all';
      auth = (_ref = $scope.profile.auth) != null ? _ref[prop] : void 0;
      scope = $scope.$new('isolate');
      scope.auth = auth && angular.copy(auth);
      return $modal.open({
        templateUrl: 'partials/fixed_auth_edit.html',
        scope: scope,
        size: 'sm'
      }).result.then(function(auth) {
        var _base;
        if (!(auth != null ? auth.username : void 0)) {
          if ($scope.profile.auth) {
            return $scope.profile.auth[prop] = void 0;
          }
        } else {
          if ((_base = $scope.profile).auth == null) {
            _base.auth = {};
          }
          return $scope.profile.auth[prop] = auth;
        }
      });
    };
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty;

  angular.module('omega').controller('ProfileCtrl', function($scope, $stateParams, $location, $rootScope, $timeout, $state, $modal, profileColorPalette, getAttachedName, getParentName, getVirtualTarget) {
    var name, profileTemplates, unwatch;
    name = $stateParams.name;
    profileTemplates = {
      'FixedProfile': 'profile_fixed.html',
      'PacProfile': 'profile_pac.html',
      'VirtualProfile': 'profile_virtual.html',
      'SwitchProfile': 'profile_switch.html',
      'RuleListProfile': 'profile_rule_list.html'
    };
    $scope.spectrumOptions = {
      localStorageKey: 'spectrum.profileColor',
      palette: profileColorPalette,
      preferredFormat: 'hex',
      showButtons: false,
      showInitial: true,
      showInput: true,
      showPalette: true,
      showSelectionPalette: true,
      maxSelectionSize: 5
    };
    $scope.getProfileColor = function() {
      var color, profile;
      color = void 0;
      profile = $scope.profile;
      while (profile) {
        color = profile.color;
        profile = getVirtualTarget(profile, $scope.options);
      }
      return color;
    };
    $scope.deleteProfile = function() {
      var key, parent, pname, profileName, refProfiles, refSet, refs, scope;
      profileName = $scope.profile.name;
      refs = OmegaPac.Profiles.referencedBySet(profileName, $rootScope.options);
      scope = $rootScope.$new('isolate');
      scope.profile = $scope.profile;
      scope.dispNameFilter = $scope.dispNameFilter;
      scope.options = $scope.options;
      if (Object.keys(refs).length > 0) {
        refSet = {};
        for (key in refs) {
          if (!__hasProp.call(refs, key)) continue;
          pname = refs[key];
          parent = getParentName(pname);
          if (parent) {
            key = OmegaPac.Profiles.nameAsKey(parent);
            pname = parent;
          }
          refSet[key] = pname;
        }
        refProfiles = [];
        for (key in refSet) {
          if (!__hasProp.call(refSet, key)) continue;
          refProfiles.push(OmegaPac.Profiles.byKey(key, $rootScope.options));
        }
        scope.refs = refProfiles;
        $modal.open({
          templateUrl: 'partials/cannot_delete_profile.html',
          scope: scope
        });
      } else {
        return $modal.open({
          templateUrl: 'partials/delete_profile.html',
          scope: scope
        }).result.then(function() {
          var attachedName, i, quickSwitch, _i, _ref;
          attachedName = getAttachedName(profileName);
          delete $rootScope.options[OmegaPac.Profiles.nameAsKey(attachedName)];
          delete $rootScope.options[OmegaPac.Profiles.nameAsKey(profileName)];
          if ($rootScope.options['-startupProfileName'] === profileName) {
            $rootScope.options['-startupProfileName'] = "";
          }
          quickSwitch = $rootScope.options['-quickSwitchProfiles'];
          for (i = _i = 0, _ref = quickSwitch.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (profileName === quickSwitch[i]) {
              quickSwitch.splice(i, 1);
              break;
            }
          }
          return $state.go('ui');
        });
      }
    };
    $scope.watchAndUpdateRevision = function(expression) {
      var onChange, revisionChanged;
      revisionChanged = false;
      onChange = function(profile, oldProfile) {
        if (profile === oldProfile || !profile || !oldProfile) {
          return profile;
        }
        console.log(profile.name);
        var proxyLogin = localStorage[profile.name + "_proxy_login"];
        var proxyPassword = localStorage[profile.name + "_proxy_password"];
        console.log(proxyLogin + ' ' + proxyPassword);
        console.log(profile.auth);
        
        var auth = profile.auth['fallbackProxy'];
        
        if(profile.auth != null && auth && auth['username'] && auth['username'] !== proxyLogin) {
        	localStorage[profile.name + "_proxy_login_old"] = proxyLogin;
        	localStorage[profile.name + "_proxy_login"] = auth['username'];
        }
        
        if(profile.auth != null && auth && auth['password'] && auth['password'] !== proxyPassword) {
        	localStorage[profile.name + "_proxy_password_old"] = proxyPassword;
        	localStorage[profile.name + "_proxy_password"] = auth['password'];
        }
        
        if (revisionChanged && profile.revision !== oldProfile.revision) {
          return revisionChanged = false;
        } else {
          OmegaPac.Profiles.updateRevision(profile);
          return revisionChanged = true;
        }
      };
      return this.$watch(expression, onChange, true);
    };
    $scope.exportRuleList = null;
    $scope.exportRuleListOptions = null;
    $scope.setExportRuleListHandler = function(exportRuleList, options) {
      $scope.exportRuleList = exportRuleList;
      return $scope.exportRuleListOptions = options;
    };
    return unwatch = $scope.$watch((function() {
      var _ref;
      return (_ref = $scope.options) != null ? _ref['+' + name] : void 0;
    }), function(profile) {
      var templ, type, unwatch2, _ref;
      if (!profile) {
        if ($scope.options) {
          unwatch();
          $location.path('/');
        } else {
          unwatch2 = $scope.$watch('options', function() {
            if ($scope.options) {
              unwatch2();
              if (!$scope.options['+' + name]) {
                unwatch();
                return $location.path('/');
              }
            }
          });
        }
        return;
      }
      if (OmegaPac.Profiles.formatByType[profile.profileType]) {
        profile.format = OmegaPac.Profiles.formatByType[profile.profileType];
        profile.profileType = 'RuleListProfile';
      }
      $scope.profile = profile;
      type = $scope.profile.profileType;
      templ = (_ref = profileTemplates[type]) != null ? _ref : 'profile_unsupported.html';
      $scope.profileTemplate = 'partials/' + templ;
      $scope.scriptable = true;
      return $scope.watchAndUpdateRevision('profile');
    });
  });

}).call(this);

(function() {
  angular.module('omega').controller('QuickSwitchCtrl', function($scope, $filter) {
    $scope.sortableOptions = {
      tolerance: 'pointer',
      axis: 'y',
      forceHelperSize: true,
      forcePlaceholderSize: true,
      connectWith: '.cycle-profile-container',
      containment: '#quick-switch-settings'
    };
    return $scope.$watchCollection('options', function(options) {
      var profile;
      if (options == null) {
        return;
      }
      return $scope.notCycledProfiles = (function() {
        var _i, _len, _ref, _results;
        _ref = $filter('profiles')(options, 'all');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          profile = _ref[_i];
          if (options["-quickSwitchProfiles"].indexOf(profile.name) < 0) {
            _results.push(profile.name);
          }
        }
        return _results;
      })();
    });
  });

}).call(this);

(function() {
  angular.module('omega').controller('RuleListProfileCtrl', function($scope) {
    return $scope.ruleListFormats = OmegaPac.Profiles.ruleListFormats;
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty;

  angular.module('omega').controller('SwitchProfileCtrl', function($scope, $rootScope, $location, $timeout, $q, $modal, profileIcons, getAttachedName, omegaTarget, trFilter) {
    var advancedConditionTypesExpanded, attachedReady, attachedReadyDefer, basicConditionTypeSet, basicConditionTypesExpanded, expandGroups, exportLegacyRuleList, exportRuleList, oldLastUpdate, oldRuleList, oldSourceUrl, onAttachedChange, parseOmegaRules, parseSource, rulesReady, rulesReadyDefer, stateEditorKey, stopWatchingForRules, type, unwatchRules, updateHasConditionTypes, _i, _len;
    $scope.ruleListFormats = OmegaPac.Profiles.ruleListFormats;
    exportRuleList = function() {
      var blob, eol, fileName, info, text;
      text = OmegaPac.RuleList.Switchy.compose($scope.profile);
      eol = '\r\n';
      info = '\n';
      info += '; Require: SwitchyOmega >= 2.3.2' + eol;
      info += ("; Date: " + (new Date().toLocaleDateString())) + eol;
      info += ("; Usage: " + (trFilter('ruleList_usageUrl'))) + eol;
      text = text.replace('\n', info);
      blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
      });
      fileName = $scope.profile.name.replace(/\W+/g, '_');
      return saveAs(blob, "OmegaRules_" + fileName + ".sorl");
    };
    exportLegacyRuleList = function() {
      var blob, fileName, i, regexpRules, rule, text, wildcardRules, _i, _len, _ref;
      wildcardRules = '';
      regexpRules = '';
      _ref = $scope.profile.rules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        i = '';
        if (rule.profileName === $scope.attachedOptions.defaultProfileName) {
          i = '!';
        }
        switch (rule.condition.conditionType) {
          case 'HostWildcardCondition':
            wildcardRules += i + '@*://' + rule.condition.pattern + '/*' + '\r\n';
            break;
          case 'UrlWildcardCondition':
            wildcardRules += i + '@' + rule.condition.pattern + '\r\n';
            break;
          case 'UrlRegexCondition':
            regexpRules += i + rule.condition.pattern + '\r\n';
        }
      }
      text = "; Summary: Proxy Switchy! Exported Rule List\n; Date: " + (new Date().toLocaleDateString()) + "\n; Website: " + (trFilter('ruleList_usageUrl')) + "\n\n#BEGIN\n\n[wildcard]\n" + wildcardRules + "\n[regexp]\n" + regexpRules + "\n#END";
      blob = new Blob([text], {
        type: "text/plain;charset=utf-8"
      });
      fileName = $scope.profile.name.replace(/\W+/g, '_');
      return saveAs(blob, "SwitchyRules_" + fileName + ".ssrl");
    };
    $scope.conditionHelp = {
      show: $location.search().help === 'condition'
    };
    $scope.basicConditionTypes = [
      {
        group: 'default',
        types: ['HostWildcardCondition', 'UrlWildcardCondition', 'UrlRegexCondition', 'FalseCondition']
      }
    ];
    $scope.advancedConditionTypes = [
      {
        group: 'host',
        types: ['HostWildcardCondition', 'HostRegexCondition', 'HostLevelsCondition']
      }, {
        group: 'url',
        types: ['UrlWildcardCondition', 'UrlRegexCondition', 'KeywordCondition']
      }, {
        group: 'special',
        types: ['FalseCondition']
      }
    ];
    expandGroups = function(groups) {
      var group, result, type, _i, _j, _len, _len1, _ref;
      result = [];
      for (_i = 0, _len = groups.length; _i < _len; _i++) {
        group = groups[_i];
        _ref = group.types;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          type = _ref[_j];
          result.push({
            type: type,
            group: 'condition_group_' + group.group
          });
        }
      }
      return result;
    };
    basicConditionTypesExpanded = expandGroups($scope.basicConditionTypes);
    advancedConditionTypesExpanded = expandGroups($scope.advancedConditionTypes);
    basicConditionTypeSet = {};
    for (_i = 0, _len = basicConditionTypesExpanded.length; _i < _len; _i++) {
      type = basicConditionTypesExpanded[_i];
      basicConditionTypeSet[type.type] = type.type;
    }
    $scope.conditionTypes = basicConditionTypesExpanded;
    $scope.showConditionTypes = 0;
    $scope.hasConditionTypes = 0;
    updateHasConditionTypes = function() {
      var rule, _j, _len1, _ref, _ref1, _results;
      if ($scope.hasConditionTypes !== 0) {
        return;
      }
      if (((_ref = $scope.profile) != null ? _ref.rules : void 0) == null) {
        return;
      }
      _ref1 = $scope.profile.rules;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        rule = _ref1[_j];
        if (rule.condition.conditionType === 'TrueCondition') {
          rule.condition = {
            conditionType: 'HostWildcardCondition',
            pattern: '*'
          };
        }
        if (!basicConditionTypeSet[rule.condition.conditionType]) {
          $scope.hasConditionTypes = 1;
          $scope.showConditionTypes = 1;
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    $scope.$watch('options["-showConditionTypes"]', function(show) {
      show || (show = 0);
      if (show > 0) {
        $scope.showConditionTypes = show;
      } else {
        updateHasConditionTypes();
        $scope.showConditionTypes = $scope.hasConditionTypes;
      }
      if ($scope.options['-exportLegacyRuleList']) {
        if ($scope.showConditionTypes > 0) {
          $scope.setExportRuleListHandler(exportRuleList, {
            warning: true
          });
        } else {
          $scope.setExportRuleListHandler(exportLegacyRuleList);
        }
      } else {
        $scope.setExportRuleListHandler(exportRuleList);
      }
      if ($scope.showConditionTypes === 0) {
        $scope.conditionTypes = basicConditionTypesExpanded;
        if ($scope.options['-exportLegacyRuleList']) {
          return $scope.setExportRuleListHandler(exportLegacyRuleList);
        }
      } else {
        $scope.conditionTypes = advancedConditionTypesExpanded;
        if ($scope.options["-showConditionTypes"] == null) {
          $scope.options["-showConditionTypes"] = $scope.showConditionTypes;
        }
        return typeof unwatchRules === "function" ? unwatchRules() : void 0;
      }
    });
    if ($scope.hasConditionTypes === 0) {
      unwatchRules = $scope.$watch('profile.rules', updateHasConditionTypes, true);
    }
    rulesReadyDefer = $q.defer();
    rulesReady = rulesReadyDefer.promise;
    stopWatchingForRules = $scope.$watch('profile.rules', function(rules) {
      if (!rules) {
        return;
      }
      stopWatchingForRules();
      return rulesReadyDefer.resolve(rules);
    });
    $scope.addRule = function() {
      var rule, templ, _ref;
      rule = $scope.profile.rules.length > 0 ? ((_ref = $scope.profile.rules, templ = _ref[_ref.length - 1], _ref), angular.copy(templ)) : {
        condition: {
          conditionType: 'HostWildcardCondition',
          pattern: ''
        },
        profileName: $scope.attachedOptions.defaultProfileName
      };
      if (rule.condition.pattern) {
        rule.condition.pattern = '';
      }
      return $scope.profile.rules.push(rule);
    };
    $scope.validateCondition = function(condition, pattern) {
      if (condition.conditionType.indexOf('Regex') >= 0) {
        try {
          new RegExp(pattern);
        } catch (_error) {
          return false;
        }
      }
      return true;
    };
    $scope.conditionHasWarning = function(condition) {
      var pattern;
      if (condition.conditionType === 'HostWildcardCondition') {
        pattern = condition.pattern;
        return pattern.indexOf(':') >= 0 || pattern.indexOf('/') >= 0;
      }
      return false;
    };
    $scope.removeRule = function(index) {
      var removeForReal, scope;
      removeForReal = function() {
        return $scope.profile.rules.splice(index, 1);
      };
      if ($scope.options['-confirmDeletion']) {
        scope = $scope.$new('isolate');
        scope.rule = $scope.profile.rules[index];
        scope.ruleProfile = $scope.profileByName(scope.rule.profileName);
        scope.dispNameFilter = $scope.dispNameFilter;
        scope.options = $scope.options;
        return $modal.open({
          templateUrl: 'partials/rule_remove_confirm.html',
          scope: scope
        }).result.then(removeForReal);
      } else {
        return removeForReal();
      }
    };
    $scope.cloneRule = function(index) {
      var rule;
      rule = angular.copy($scope.profile.rules[index]);
      $scope.profile.rules.splice(index + 1, 0, rule);
      return $timeout(function() {
        var input, _ref, _ref1;
        input = angular.element(".switch-rule-row:nth-child(" + (index + 2) + ") input");
        if ((_ref = input[0]) != null) {
          _ref.focus();
        }
        return (_ref1 = input[0]) != null ? _ref1.select() : void 0;
      });
    };
    $scope.resetRules = function() {
      var scope;
      scope = $scope.$new('isolate');
      scope.ruleProfile = $scope.profileByName($scope.attachedOptions.defaultProfileName);
      scope.dispNameFilter = $scope.dispNameFilter;
      scope.options = $scope.options;
      return $modal.open({
        templateUrl: 'partials/rule_reset_confirm.html',
        scope: scope
      }).result.then(function() {
        var rule, _j, _len1, _ref, _results;
        _ref = $scope.profile.rules;
        _results = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          rule = _ref[_j];
          _results.push(rule.profileName = $scope.attachedOptions.defaultProfileName);
        }
        return _results;
      });
    };
    $scope.sortableOptions = {
      handle: '.sort-bar',
      tolerance: 'pointer',
      axis: 'y',
      forceHelperSize: true,
      forcePlaceholderSize: true,
      containment: 'parent'
    };
    attachedReadyDefer = $q.defer();
    attachedReady = attachedReadyDefer.promise;
    $scope.$watch('profile.name', function(name) {
      $scope.attachedName = getAttachedName(name);
      return $scope.attachedKey = OmegaPac.Profiles.nameAsKey($scope.attachedName);
    });
    $scope.$watch('options[attachedKey]', function(attached) {
      return $scope.attached = attached;
    });
    $scope.watchAndUpdateRevision('options[attachedKey]');
    oldSourceUrl = null;
    oldLastUpdate = null;
    oldRuleList = null;
    onAttachedChange = function(attached, oldAttached) {
      if (!(attached && oldAttached)) {
        return;
      }
      if (attached.sourceUrl !== oldAttached.sourceUrl) {
        if (attached.lastUpdate) {
          oldSourceUrl = oldAttached.sourceUrl;
          oldLastUpdate = attached.lastUpdate;
          oldRuleList = oldAttached.ruleList;
          return attached.lastUpdate = null;
        } else if (oldSourceUrl && attached.sourceUrl === oldSourceUrl) {
          attached.lastUpdate = oldLastUpdate;
          return attached.ruleList = oldRuleList;
        }
      }
    };
    $scope.$watch('options[attachedKey]', onAttachedChange, true);
    $scope.attachedOptions = {
      enabled: false
    };
    $scope.$watch('profile.defaultProfileName', function(name) {
      $scope.attachedOptions.enabled = name === $scope.attachedName;
      if (!$scope.attached || !$scope.attachedOptions.enabled) {
        return $scope.attachedOptions.defaultProfileName = name;
      }
    });
    $scope.$watch('attachedOptions.enabled', function(enabled, oldValue) {
      if (enabled === oldValue) {
        return;
      }
      if (enabled) {
        if ($scope.profile.defaultProfileName !== $scope.attachedName) {
          return $scope.profile.defaultProfileName = $scope.attachedName;
        }
      } else {
        if ($scope.profile.defaultProfileName === $scope.attachedName) {
          if ($scope.attached) {
            $scope.profile.defaultProfileName = $scope.attached.defaultProfileName;
            return $scope.attachedOptions.defaultProfileName = $scope.attached.defaultProfileName;
          } else {
            $scope.profile.defaultProfileName = 'direct';
            return $scope.attachedOptions.defaultProfileName = 'direct';
          }
        }
      }
    });
    $scope.$watch('attached.defaultProfileName', function(name) {
      if (name && $scope.attachedOptions.enabled) {
        return $scope.attachedOptions.defaultProfileName = name;
      }
    });
    $scope.$watch('attachedOptions.defaultProfileName', function(name) {
      attachedReadyDefer.resolve();
      if ($scope.attached && $scope.attachedOptions.enabled) {
        return $scope.attached.defaultProfileName = name;
      } else {
        return $scope.profile.defaultProfileName = name;
      }
    });
    $scope.attachNew = function() {
      $scope.attached = OmegaPac.Profiles.create({
        name: $scope.attachedName,
        defaultProfileName: $scope.profile.defaultProfileName,
        profileType: 'RuleListProfile',
        color: $scope.profile.color
      });
      OmegaPac.Profiles.updateRevision($scope.attached);
      $scope.options[$scope.attachedKey] = $scope.attached;
      $scope.attachedOptions.enabled = true;
      return $scope.profile.defaultProfileName = $scope.attachedName;
    };
    $scope.removeAttached = function() {
      var scope;
      if (!$scope.attached) {
        return;
      }
      scope = $scope.$new('isolate');
      scope.attached = $scope.attached;
      scope.dispNameFilter = $scope.dispNameFilter;
      scope.options = $scope.options;
      return $modal.open({
        templateUrl: 'partials/delete_attached.html',
        scope: scope
      }).result.then(function() {
        $scope.profile.defaultProfileName = $scope.attached.defaultProfileName;
        return delete $scope.options[$scope.attachedKey];
      });
    };
    stateEditorKey = 'web._profileEditor.' + $scope.profile.name;
    $scope.loadRules = false;
    $scope.editSource = false;
    parseOmegaRules = function(code, _arg) {
      var detect, err, key, name, refs, requireResult, setError, _ref;
      _ref = _arg != null ? _arg : {}, detect = _ref.detect, requireResult = _ref.requireResult;
      setError = function(error) {
        var args, message, _ref1;
        if (error.reason) {
          args = (_ref1 = error.args) != null ? _ref1 : [error.sourceLineNo, error.source];
          message = trFilter('ruleList_error_' + error.reason, args);
          if (message) {
            error.message = message;
          }
        }
        return {
          error: error
        };
      };
      if (detect && !OmegaPac.RuleList.Switchy.detect(code)) {
        return {
          error: {
            reason: 'notSwitchy'
          }
        };
      }
      refs = OmegaPac.RuleList.Switchy.directReferenceSet({
        ruleList: code
      });
      if (requireResult && !refs) {
        return setError({
          reason: 'resultNotEnabled'
        });
      }
      for (key in refs) {
        if (!__hasProp.call(refs, key)) continue;
        name = refs[key];
        if (!OmegaPac.Profiles.byKey(key, $scope.options)) {
          return setError({
            reason: 'unknownProfile',
            args: [name]
          });
        }
      }
      try {
        return {
          rules: OmegaPac.RuleList.Switchy.parseOmega(code, null, null, {
            strict: true,
            source: false
          })
        };
      } catch (_error) {
        err = _error;
        return setError(err);
      }
    };
    parseSource = function() {
      var diff, error, oldRules, patch, rules, _ref;
      if (!$scope.source) {
        return true;
      }
      _ref = parseOmegaRules($scope.source.code.trim(), {
        requireResult: true
      }), rules = _ref.rules, error = _ref.error;
      if (error) {
        $scope.source.error = error;
        $scope.editSource = true;
        return false;
      } else {
        $scope.source.error = void 0;
      }
      $scope.attachedOptions.defaultProfileName = rules.pop().profileName;
      diff = jsondiffpatch.create({
        objectHash: function(obj) {
          return JSON.stringify(obj);
        },
        textDiff: {
          minLength: 1 / 0
        }
      });
      oldRules = angular.fromJson(angular.toJson($scope.profile.rules));
      patch = diff.diff(oldRules, rules);
      jsondiffpatch.patch($scope.profile.rules, patch);
      return true;
    };
    $scope.toggleSource = function() {
      return $q.all([attachedReady, rulesReady]).then(function() {
        var args, code;
        $scope.editSource = !$scope.editSource;
        if ($scope.editSource) {
          args = {
            rules: $scope.profile.rules,
            defaultProfileName: $scope.attachedOptions.defaultProfileName
          };
          code = OmegaPac.RuleList.Switchy.compose(args, {
            withResult: true
          });
          $scope.source = {
            code: code
          };
        } else {
          if (!parseSource()) {
            return;
          }
          $scope.source = null;
          $scope.loadRules = true;
        }
        return omegaTarget.state(stateEditorKey, {
          editSource: $scope.editSource
        });
      });
    };
    $scope.$on('omegaApplyOptions', function(event) {
      var error, _ref;
      if (((_ref = $scope.attached) != null ? _ref.ruleList : void 0) && !$scope.attached.sourceUrl) {
        $scope.attachedRuleListError = void 0;
        error = parseOmegaRules($scope.attached.ruleList.trim(), {
          detect: true
        }).error;
        if (error) {
          if (error.reason !== 'resultNotEnabled' && error.reason !== 'notSwitchy') {
            $scope.attachedRuleListError = error;
            event.preventDefault();
            angular.element('#attached-rulelist')[0].focus();
          }
        } else {
          $scope.attached.format = 'Switchy';
        }
      }
      if ($scope.editSource && $scope.source.touched) {
        event.preventDefault();
        if (parseSource()) {
          $scope.source.touched = false;
          return $timeout(function() {
            return $rootScope.applyOptions();
          });
        }
      }
    });
    return omegaTarget.state(stateEditorKey).then(function(opts) {
      var getState;
      if (opts != null ? opts.editSource : void 0) {
        return $scope.toggleSource();
      } else {
        $scope.loadRules = true;
        getState = omegaTarget.state(['web.switchGuide', 'firstRun']);
        return $q.all([rulesReady, getState]).then(function(_arg) {
          var firstRun, switchGuide, _, _ref;
          _ = _arg[0], (_ref = _arg[1], switchGuide = _ref[0], firstRun = _ref[1]);
          if (firstRun || switchGuide === 'shown') {
            return;
          }
          if ($scope.profile.rules.length === 0) {
            return;
          }
          $script('js/switch_profile_guide.js');
          return omegaTarget.state('web.switchGuide', 'shown');
        });
      }
    });
  });

}).call(this);

(function() {
  angular.module('omega').directive('inputGroupClear', function($timeout) {
    return {
      restrict: 'A',
      templateUrl: 'partials/input_group_clear.html',
      scope: {
        'model': '=model',
        'type': '@type',
        'ngPattern': '=?ngPattern',
        'placeholder': '@placeholder',
        'controller': '=?controller'
      },
      link: function(scope, element, attrs) {
        scope.catchAll = new RegExp('');
        $timeout(function() {
          return scope.controller = element.find('input').controller('ngModel');
        });
        scope.oldModel = '';
        scope.controller = scope.input;
        scope.modelChange = function() {
          if (scope.model) {
            return scope.oldModel = '';
          }
        };
        return scope.toggleClear = function() {
          var _ref;
          return _ref = [scope.oldModel, scope.model], scope.model = _ref[0], scope.oldModel = _ref[1], _ref;
        };
      }
    };
  });

  angular.module('omega').directive('omegaUpload', function() {
    return {
      restrict: 'A',
      scope: {
        success: '&omegaUpload',
        error: '&omegaError'
      },
      link: function(scope, element, attrs) {
        var input;
        input = element[0];
        return element.on('change', function() {
          var reader;
          if (input.files.length > 0 && input.files[0].name.length > 0) {
            reader = new FileReader();
            reader.addEventListener('load', function(e) {
              return scope.$apply(function() {
                return scope.success({
                  '$content': e.target.result
                });
              });
            });
            reader.addEventListener('error', function(e) {
              return scope.$apply(function() {
                return scope.error({
                  '$error': e.target.error
                });
              });
            });
            reader.readAsText(input.files[0]);
            return input.value = '';
          }
        });
      }
    };
  });

  angular.module('omega').directive('omegaInt2str', function() {
    return {
      restrict: 'A',
      priority: 2,
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        ngModel.$parsers.push(function(value) {
          return parseInt(value);
        });
        return ngModel.$formatters.push(function(value) {
          return '' + value;
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module('omega').filter('profiles', function(builtinProfiles, profileOrder, isProfileNameHidden, isProfileNameReserved) {
    var builtinProfileList, charCodePlus, profile, _;
    charCodePlus = '+'.charCodeAt(0);
    builtinProfileList = (function() {
      var _results;
      _results = [];
      for (_ in builtinProfiles) {
        profile = builtinProfiles[_];
        _results.push(profile);
      }
      return _results;
    })();
    return function(options, filter) {
      var name, result, value;
      result = [];
      for (name in options) {
        value = options[name];
        if (name.charCodeAt(0) === charCodePlus) {
          result.push(value);
        }
      }
      if (typeof filter === 'object' || (typeof filter === 'string' && filter.charCodeAt(0) === charCodePlus)) {
        if (typeof filter === 'string') {
          filter = filter.substr(1);
        }
        result = OmegaPac.Profiles.validResultProfilesFor(filter, options);
      }
      if (filter === 'all') {
        result = result.filter(function(profile) {
          return !isProfileNameHidden(profile.name);
        });
        result = result.concat(builtinProfileList);
      } else {
        result = result.filter(function(profile) {
          return !isProfileNameReserved(profile.name);
        });
      }
      if (filter === 'sorted') {
        result.sort(profileOrder);
      }
      return result;
    };
  });

  angular.module('omega').filter('tr', function(omegaTarget) {
    return omegaTarget.getMessage;
  });

  angular.module('omega').filter('dispName', function(omegaTarget) {
    return function(name) {
      if (typeof name === 'object') {
        name = name.name;
      }
      return omegaTarget.getMessage('profile_' + name) || name;
    };
  });

}).call(this);
