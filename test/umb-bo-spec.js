/**
 * Created by elad.katz on 15/04/2016.
 */
'use strict';
const chai = require('chai');
const expect = chai.expect;


describe('umb-backoffice', () => {

    describe('app', () => {
        describe('e2e - health check', () => {
            it('should run', () => {
                let app = require('../app');
                app.run();
            });
            it('should stop', () => {
                let app = require('../app');
                app.run.bind(app);
                app.stop.bind(app);
            });
        });
        describe('test environment', () => {
            it('should pass a dummy true-test', () => {
                expect(1).to.eql(1);
            });
        });
        describe('coding standards', () => {
            it('all code files should be less than 100 LOC');
            it('all code files should be require-able without side implications');
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

});
