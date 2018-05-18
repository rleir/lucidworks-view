(function () {
  'use strict';

  angular
    .module('lucidworksView.components.searchbox')
    .factory('SearchBoxDataService', SearchBoxDataService);

  function SearchBoxDataService($http, $q, ConfigService, ApiBase, QueryBuilder, QueryDataService){
    'ngInject';

    return {
      getTypeaheadResults: getTypeaheadResults
    };

    ////////////

    function getTypeaheadResults(query){
      var deferred = $q.defer();

      var queryString = QueryBuilder.objectToURLString(query);
      var fullUrl = getQueryUrl() + '?' + queryString;

      $http
        .get(fullUrl)
        .then(success)
        .catch(failure);

      function success(response) {
        deferred.resolve(response.data);
      }

      function failure(err) {
        deferred.reject(err.data);
      }

      return deferred.promise;
    }

    /**
     * Private function
     */
    function getQueryUrl(){
      var requestHandler = ConfigService.getTypeaheadRequestHandler();

      var solrUrl = QueryDataService.getSolrEndpoint( requestHandler);
      return solrUrl; // RWL
    }

  }
})();
