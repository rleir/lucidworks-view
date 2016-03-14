(function() {
  'use strict';

  angular
    .module('fusionSeedApp.components.document_web', ['fusionSeedApp.services.signals'])
    .directive('documentWeb', documentWeb);

  /* @ngInject */
  function documentWeb() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'assets/components/document/document_web/document_web.html',
      scope: true,
      controller: Controller,
      controllerAs: 'vm',
      bindToController: {
        doc: '='
      }
    };

    return directive;

  }

  function Controller(SignalsService) {
    'ngInject';
    var vm = this;

    activate();

    /////////

    function activate() {
      vm.postSignal = SignalsService.postSignal;
    }
  }
})();