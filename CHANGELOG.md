###v1.0.0

* First stable release
* Started using [ng-packagr](https://github.com/dherges/ng-packagr) and [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview)
* Added support for SystemJS
* Added unit tests and test coverage information

###v0.6.0

* Switched from OpaqueToken to InjectionToken
* Dropped support for Angular 2, consider using 0.5.1 if it's needed
* Added support for Angular 5 for users who didn't migrate to HttpClient yet

###v0.5.1

* [#17](https://github.com/DarkXaHTeP/angular-progress-http/issues/17) fixed
* Example project with custom http implementation added

###v0.5.0

* JavaScript files are included back into library after removing in 0.3.0
* *.metadata.json files added to support Angular CLI
* *.ts files are available from "angular-progress-http/ts" if needed

###v0.4.1

* TypeScript warning fixed by PR [#4](https://github.com/DarkXaHTeP/angular-progress-http/pull/4)

###v0.4.0

* Angular Http can now be replaced with custom Http implementation (see [Using custom HTTP implementations](https://github.com/DarkXaHTeP/angular-progress-http/blob/master/README.md#using-custom-http-implementations))
* Test environment is set up
* Examples are now compiled with AOT (Angular CLI app)
* Angular 4.x.x allowed as peerDependency

###v0.3.0
* Replaced .js files with .ts (resolves [#1](https://github.com/DarkXaHTeP/angular-progress-http/issues/1))

###v0.2.2

* Added Travis CI for build and publishing to npm
* Updated examples build

###v0.2.1

* Readme updated with API description and examples

###v0.2.0

* First public release
* Contains service and ngModule for it
* Example in "examples" folder
