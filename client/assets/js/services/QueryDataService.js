(function () {
  angular
    .module('lucidworksView.services.queryData', [
      'lucidworksView.services.config',
      'lucidworksView.services.apiBase',
      'lucidworksView.utils.queryBuilder',
      'ngOrwell'
    ])
    .config(Config)
    .provider('QueryDataService', QueryDataService);


  function Config(OrwellProvider) {
    'ngInject';
    OrwellProvider.createObservable('queryResults', {});
  }

  function QueryDataService() {

    this.$get = $get;

    /////////////

    function $get($q, $http, ConfigService, ApiBase, Orwell, QueryBuilder) {
      'ngInject';
      var queryResultsObservable = Orwell.getObservable('queryResults');
      return {
        getQueryResults: getQueryResults,
        getSolrEndpoint: getSolrEndpoint
      };

      /**
       * Make a query to the query profiles endpoint
       * @param  {object} query  Should have all the query params, like
       *                         For select?q=query&fq=blah you need to pass in an object
       *                         {'q': 'query', 'fq': 'blah'}
       * @return {Promise}       Promise that resolve with a Fusion response coming from Solr
       */
      function getQueryResults(query) {
        var deferred = $q.defer();

        var queryString = QueryBuilder.objectToURLString(query);

        var fullUrl = getQueryUrl() + '?' + queryString;

        $http
          .get(fullUrl)
          .then(success)
          .catch(failure);

        function success(response) {
          // Set the content to populate the rest of the ui.
          queryResultsObservable.setContent(response.data);
          deferred.resolve(response.data);
        }

        function failure(err) {
          queryResultsObservable.setContent({
            numFound: 0
          });
          deferred.reject(err);
        }

        return deferred.promise;
      }

      /**
       * Returns the appropriate base url for an endpoint
       *
       * @return {string}             The URL endpoint for the query without parameters.
       */
      function getQueryUrl() {
        var solrEndpoint = getSolrEndpoint( 'select');
//      $log.log('======' + solrEndpoint);

        return solrEndpoint;
      }

      function getSolrEndpoint( requestHandler){
        var urlPart = ApiBase.getEndpoint() + 'solr/' + // RWL
          ConfigService.getCollectionName() +
          '/' + requestHandler;
        return urlPart;
      }

    }
  }
})();
