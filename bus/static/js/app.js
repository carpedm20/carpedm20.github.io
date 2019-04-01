'use strict';

var busApp = angular.module('busApp', ['ngRoute']);
var x2js = new X2JS();

busApp.config(function($routeProvider) {
  $routeProvider
    // route for the home page
    .when('/', {
      templateUrl : '/html/templates/main.html',
      controller  : 'busController'
    })
});

busApp.controller('busController', function($scope, $http) {
  $scope.model = { selectedIndex: 0,
                   includeFromDirection: true,
                   includeToDirection: true };
  $scope.refreshBusSTop = function (option) {
  	if (option === 0) {
  		$scope.model.includeFromDirection = !$scope.model.includeFromDirection;
  	}
  	else if (option === 1)
  		$scope.model.includeToDirection = !$scope.model.includeToDirection;

  	$scope.selectBusStop($scope.model.selectedIndex);
  }

  $scope.selectBusStop = function (index) {
    $scope.model.selectedIndex = index;

    for (var i in $scope.busStops[index]["stopid"]) {
      var url = "http://apis.its.ulsan.kr:8088/Service4.svc/AllBusArrivalInfo.xo?stopid=" + $scope.busStops[index]["stopid"][i];

      $http.get(url).then(function(response) {
        var xml = x2js.xml_str2json(response.data);
        var busInfo = xml.RouteArrivalInfoResponse.AllBusArrivalInfoResult.AllBusArrivalInfo.MsgBody.BUSINFO.CurrentAllBusArrivalInfo.AllBusArrivalInfoTable;

        for (var j in busInfo) {
          var currentData = busInfo[j];
          var currentBus = $scope.busStops[index]['buses'][currentData.ROUTEID];

          if (currentBus) {
            currentBus["remainTime"] = ((currentData.REMAINTIME/60) | 0) + "분 후 도착";
            currentBus["fStopName"] = currentData.FSTOPNAME;
            currentBus["tStopName"] = currentData.TSTOPNAME;

            if (currentBus["direction"]) {
            	//currentBus["tStopName"] += "귀향";
            } else {
            	//currentBus["tStopName"] += "외출";
            }
          }
        }
      });
    }
  }

  $http.get('/buses/bus_stops.json').success(function(data) {
    $scope.busStops = data;
    $scope.selectBusStop($scope.model.selectedIndex);
  });

  $http.get('/buses/buses.json').success(function(data) {
    $scope.buses = data;
  });

  $scope.directionFilter = function(buses) {
  	var result = {};

    angular.forEach(buses, function(data, no) {
        if ($scope.buses[no]["direction"] === 1 && $scope.model.includeFromDirection) {
            result[no] = data;
        } else if ($scope.buses[no]["direction"] === 0 && $scope.model.includeToDirection) {
        	result[no] = data;
        }
    });
    return result;
  };
});

busApp.directive('busMenu', function() {
  return {
    restrict: 'E',
    templateUrl: '/html/templates/menu.html'
  };
});