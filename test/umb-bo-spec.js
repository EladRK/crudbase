/**
 * Created by elad.katz on 15/04/2016.
 */
'use strict';
const chai = require('chai');
const expect = chai.expect;


describe('umb-backoffice', () => {

    describe('app', () => {
        describe('e2e - health check', () => {
            it('should pass a dummy true-test', () => {
                expect(1).to.eql(1);
            });
            it('should run', () => {
                let app = require('../app');
                app.run.bind(app);
            });
            it('should stop', () => {
                let app = require('../app');
                app.run.bind(app);
                app.stop.bind(app);
            });
            it('should accept REST');
            it('requiring app.js should not have side effects', () => {
                let app1 = require('../app');
                let app2 = require('../app');

                expect(app1).to.be.eql(app2);
            });
            it('requiring any file should not have side effects');
         });
    });

    describe('model', () => {
        it('should be clean');
        it('should have validations');

        describe('model plugins', () => {
            describe('history', () => {});
            describe('publish', () => {});
            describe('clone', () => {});
        });

    });

    describe('entity-loader', () => {
        it('should load all entities');
        it('should make sure to initialize only once');
        it('should not take too long');
        it('should work with dependency-container')
    });

    describe('dependency-container', () => {});

    describe('schema-to-routes creator', () => {
        it('should expose routes for all entities');
    });

    describe('crud-controller', () => {
        it('should expose CRUD behavior');
        it('should expose Publish behavior');
    });



    describe('features', () => {
         describe('feature list', () => {});
         describe('file upload', () => {});
         describe('product list', () => {});
         describe('wysiwyg', () => {
            describe('link button/popup', () => {});
            describe('markdown language', () => {});
        });
    })
});
