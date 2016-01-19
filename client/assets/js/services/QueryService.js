angular.module('fusionSeedApp.services.query', ['fusionSeedApp.services.config'])
  .service('QueryService', function($q, $http, ConfigService){

    return {
      getQuery: getQuery
    };

    /**
     * Make a query to the query profiles endpoint
     * @param  {object} query  Should have all the query params
     * @return {Promise}       Promise that resolve with a Fusion response coming from Solr
     */
    function getQuery(query){
      var deffered = $q.defer();

      queryObject = query.q;

      var queryObject = angular.copy(query);

      $http.get(
        ConfigService.getFusionUrl() +
        '/api/apollo/collections/' +
        ConfigService.getCollectionName() +
        '/query-profiles/' +
        ConfigService.getQueryProfile() +
        '/select?q=' +
        queryObject.q)
        .then(function(response){
          deffered.resolve(response);
        })
        .catch(function(err){
          deffered.reject(err);
        });

      return deffered.promise;
    }
  });
