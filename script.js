var app = angular.module('articles',['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/home',
      {
        template: `
            <list></list>
        `
      })
      .when('/:id',
      {
        template: `
            <article></article>
        `,
      });
  });

app.component('list', {
    template: `
        <div class="container">
            <ul class="bullet">
                <li ng-repeat="item in list">
                    <a href="#!{{item.id}}" ng-bind-html="item.title.rendered" class="title"></a>
                    <p ng-bind-html="item.excerpt.rendered" class="description"></p>
                </li>
            </ul>
        </div>
    `,
    controller: function($scope, $articleService){
        $articleService.getArticles()
            .then(resp => $scope.list = resp.data);
    }
});

app.component('article',{
    template: `
        <div ng-bind-html="article.content.rendered"></div>
    `,
    controller: function($scope, $articleService, $routeParams){
        $articleService.getArticle($routeParams.id)
            .then(resp => $scope.article = resp.data);
    }
});

app.config(['$provide', function($provide) {
    $provide.factory('$articleService', function($http) {
      return {
          getArticles: () => {
              return $http.get('https://inx.wp-funnel.com/wp-json/wp/v2/posts');
          },
          getArticle: id => {
              return $http.get(`https://inx.wp-funnel.com/wp-json/wp/v2/posts/${id}`);
          }
      };
    });
  }]);