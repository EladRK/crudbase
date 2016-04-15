/**
 * Link to show
 *
 * Usage:
 * <ma-show-button entity="entity" entry="entry" size="xs"></ma-show-button>
 */
function publishDirective($state, $http) {
  return {
    restrict: 'E',
    scope: {
      entity: '&',
      entityName: '@',
      entry: '&',
      size: '@',
      label: '@'
    },
    link: function (scope, element, attrs) {

      element.bind('click', function () {

        var entityId = scope.entry()._identifierValue;
        var entityName = scope.entry()._entityName;

        var url = attrs.baseuri + entityName + '/' + entityId + '/publish';

        if (confirm('Publish: Are you sure?')) {

          $http({
            method: 'POST',
            url: url
          }).then(function successCallback(response) {
            console.log(response);
            alert('Publish successful');
          }, function errorCallback(response) {
            console.log(response);
            alert('Publish failed');
          });
        }

      });

    },
    template: '<a class="btn btn-default" ng-class="size ? \'btn-\' + size : \'\'" "><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>&nbsp;<span class="hidden-xs" >Publish</span></a>'
  };
}

publishDirective.$inject = ['$state', '$http'];

var myApp = angular.module('myApp', ['ng-admin']);

myApp.directive('umbPublish', publishDirective);


myApp.config(['NgAdminConfigurationProvider', function (nga) {

  var baseApi = 'http://localhost:6100/api/v1/';


  var admin = nga.application('Umbrela Admin').baseApiUrl(baseApi);

  //var legacyProductUri = "http://admin.qa02.corp.naturalint.com/api/bizms/v1/resources/"
  //var legacyProduct = nga.entity('products').baseApiUrl(legacyProductUri).identifier(nga.field('id'));

  var legacyProduct = nga.entity('legacy_product').url(function (entityName, viewType, identifierValue, identifierName) {
    return "http://admin.qa02.corp.naturalint.com/api/bizms/v1/resources/products";
  });

  legacyProduct.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('id'),
    nga.field('partner_id')
  ]);

  //admin.addEntity(legacyProduct);

  var category = nga.entity('category').identifier(nga.field('_id'));
  var segment = nga.entity('segment').identifier(nga.field('_id'));
  var vertical = nga.entity('vertical').identifier(nga.field('_id'));

  var link = nga.entity('link').identifier(nga.field('_id'));
  var partner = nga.entity('partner').identifier(nga.field('_id'));
  var product = nga.entity('product').identifier(nga.field('_id'));
  var site = nga.entity('site').identifier(nga.field('_id'));

  var article = nga.entity('article').identifier(nga.field('_id'));

  category.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('siteId', 'number'),
    nga.field('displayName'),
    nga.field('parentId', 'reference')
      .targetEntity(category)
      .targetField(nga.field('name'))
      .label('Parent category'),
    nga.field('order', 'number')
  ]);
  category.showView().fields(category.listView().fields());
  category.creationView().fields(category.listView().fields());
  category.editionView().fields(category.listView().fields());
  category.editionView().actions('<umb-publish entry="entry" baseUri="' + category.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(category);

  vertical.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('displayName'),
    nga.field('order', 'number'),
    nga.field('categories', 'reference_many')
      .targetEntity(category)
      .targetField(nga.field('name'))
      .attributes({placeholder: 'Select some categories...'})
      .remoteComplete(true, {
        refreshDelay: 300,
        searchQuery: function (search) {
          return {q: search};
        }
      }),
    nga.field('products'),
    //nga.field('products', 'reference_many')
    //    .targetEntity(nga.entity('products'))
    //    .targetField(nga.field('name'))
    //    .attributes({ placeholder: 'Select some products...' })
    //    .remoteComplete(true, {
    //            refreshDelay: 300 ,
    //            searchQuery: function(search) {return{ q: search };}}),
    nga.field('defaultSegmentId', 'reference')
      .targetEntity(segment)
      .targetField(nga.field('name'))
      .label('Default segment'),
    nga.field('seoData.metaTagsIndex', 'boolean').validation({required: true}),
    nga.field('seoData.metaTagsFollow', 'boolean').validation({required: true}),
    nga.field('seoData.metaTagsTitle').validation({required: true}),
    nga.field('seoData.metaTagsCanonical').validation({required: true}),
    nga.field('seoData.metaTagsDescription').validation({required: true}),
    nga.field('seoData.h1TextInPage').validation({required: true})
  ]);
  vertical.showView().fields(vertical.listView().fields());
  vertical.creationView().fields(vertical.listView().fields());
  vertical.editionView().fields(vertical.listView().fields());
  vertical.editionView().actions('<umb-publish entry="entry" baseUri="' + vertical.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(vertical);

  segment.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('displayName'),
    nga.field('verticalId', 'reference')
      .targetEntity(vertical)
      .targetField(nga.field('name'))
      .label('Vertical'),
    nga.field('seoData.metaTagsIndex', 'boolean').validation({required: true}),
    nga.field('seoData.metaTagsFollow', 'boolean').validation({required: true}),
    nga.field('seoData.metaTagsTitle').validation({required: true}),
    nga.field('seoData.metaTagsCanonical').validation({required: true}),
    nga.field('seoData.metaTagsDescription').validation({required: true}),
    nga.field('seoData.h1TextInPage').validation({required: true}),
    nga.field('pageTypes'),
    nga.field('order', 'number')
  ]);
  segment.showView().fields(segment.listView().fields());
  segment.creationView().fields(segment.listView().fields());
  segment.editionView().fields(segment.listView().fields());
  segment.editionView().actions('<umb-publish entry="entry" baseUri="' + segment.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(segment);


  link.listView().fields([
    nga.field('linkId', 'number').isDetailLink(true),
    nga.field('priceValue', 'number').format('$0,0.00'),
    nga.field('priceCurrency', 'choice')
      .choices([
        {label: 'USD', value: 'USD'},
        {label: 'GBP', value: 'GBP'},
        {label: 'AUD', value: 'AUD'},
        {label: 'EUR', value: 'EUR'}
      ]),
    nga.field('oldPrice', 'number').format('$0,0.00'),
    nga.field('priceText'),
    nga.field('phoneNumber')
  ]);
  link.showView().fields(link.listView().fields());
  link.creationView().fields(link.listView().fields());
  link.editionView().fields(link.listView().fields());
  link.editionView().actions('<umb-publish entry="entry" baseUri="' + link.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(link);


  partner.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('partnerId', 'number'),
    nga.field('email'),
    nga.field('phone'),
    nga.field('address'),
    nga.field('website'),
    nga.field('logoPath')
  ]);
  partner.showView().fields(partner.listView().fields());
  partner.creationView().fields([
    nga.field('name')
      .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
      .validation({required: true, pattern: '[a-z0-9\-]+'}),
    nga.field('partnerId', 'number')
      .validation({required: true, pattern: '[a-z0-9\-]+'}),
    nga.field('email', 'email'),
    nga.field('phone'),
    nga.field('address'),
    nga.field('website'),
    nga.field('logoPath')

  ]);
  partner.editionView().fields(partner.creationView().fields());
  partner.editionView().actions('<umb-publish entry="entry" baseUri="' + partner.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(partner);


  product.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('productId', 'number'),
    nga.field('logoPath'),
    nga.field('bottomLine')
  ]);
  product.creationView().fields([
    nga.field('name')
      .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
      .validation({required: true, pattern: '[a-z0-9\-]+'}),
    //nga.field('productId', 'number')
    //  .validation({required: true, pattern: '[a-z0-9\-]+'}),
    nga.field('productId', 'reference')
      .targetEntity(legacyProduct)
      .targetField(nga.field('name'))
      .label('Product')
      .remoteComplete(true),
    nga.field('logoPath'),
    nga.field('bottomLine')
  ]);
  product.editionView().fields(product.creationView().fields());
  product.showView().fields([
    nga.field('name'),
    nga.field('productId', 'number'),
    nga.field('logoPath'),
    nga.field('bottomLine')
  ]);
  product.editionView().actions('<umb-publish entry="entry" baseUri="' + product.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(product);


  site.listView().fields([
    nga.field('title').isDetailLink(true),
    nga.field('siteId', 'number')
  ]);
  site.creationView().fields([
    nga.field('title')
      .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
      .validation({required: true, pattern: '[a-z0-9\-]+'}),
    nga.field('siteId', 'number')
      .validation({required: true, pattern: '[a-z0-9\-]+'})
  ]);
  site.editionView().fields(site.creationView().fields());
  site.showView().fields([
    nga.field('name'),
    nga.field('siteId', 'number')
  ]);
  site.editionView().actions('<umb-publish entry="entry" baseUri="' + site.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(site);


  article.listView().fields([
    nga.field('title').isDetailLink(true),
    nga.field('segmentId', 'reference')
      .targetEntity(segment)
      .targetField(nga.field('name'))
      .label('Segment'),

    nga.field('seo.title'),
    nga.field('name'),
    nga.field('thumb.title'),
    //nga.field('actions', 'template').template('<umb-publish entry="entry" data="' + article.baseApiUrl() + '"></umb-publish>'),
    nga.field('createDate'),
    nga.field('updateDate')
  ]);
  article.showView().fields(article.listView().fields());
  article.creationView().fields([
    nga.field('title').validation({required: true}),
    nga.field('authorId').defaultValue('570656bd5caab5bf0f8b8fe3').validation({required: true}),
    nga.field('segmentId', 'reference')
      .targetEntity(segment)
      .targetField(nga.field('name'))
      .validation({required: true})
      .label('Segment'),
    nga.field('verticalId', 'reference')
      .targetEntity(vertical)
      .targetField(nga.field('name'))
      .validation({required: true})
      .label('Vertical'),

    nga.field('brief').validation({required: true}),
    nga.field('body', 'wysiwyg').validation({required: true}),
    nga.field('seo.index', 'boolean').validation({required: true}),
    nga.field('seo.follow', 'boolean').validation({required: true}),
    nga.field('seo.title').validation({required: true}),
    nga.field('seo.canonical').validation({required: true}),
    nga.field('seo.description').validation({required: true}),
    nga.field('seo.h1TextInPage').validation({required: true}),
    nga.field('name').validation({required: true}),
    nga.field('tagId').defaultValue('570656bd5caab5bf0f8b8fe3').validation({required: true}),
    nga.field('thumb.url').validation({required: true}),
    nga.field('thumb.title').validation({required: true}),
    nga.field('thumb.alt').validation({required: true})
    //nga.field('createDate', 'date')
  ]);
  article.editionView().fields(article.creationView().fields());

  article.editionView().actions('<umb-publish entry="entry" baseUri="' + article.baseApiUrl() + '"></umb-publish>');

  admin.addEntity(article);


  admin.errorMessage(function (response) {

    //response.data.errors.forEach(function(err) { console.log(err.description); });
    //
    //var errors = response.data.errors
    //    .map(function(err) { return err.description; })
    //    .reduce(function(a,b) { return a + '<br />' + b;});

    var errors = response.data.message;
    console.log(response.data.errors);

    return 'Global error: ' + response.status + ' <br />' + errors;
  });


  // attach the admin application to the DOM and execute it
  nga.configure(admin);
}]);


myApp.config(function (RestangularProvider) {
  //RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
  //
  //
  //  return data;
  //});
  //RestangularProvider.addFullRequestInterceptor(function (element, operation, what, url, headers, params, httpConfig) {
  //
  //
  //  return {params: params, element: element};
  //});

  //RestangularProvider.setDefaultHeaders({'Authorization': 'Token token="zCZS8LgNea70YXdHtJKpw3V0vB6ai9"'});
});
