/**
 * Created by elad.katz on 15/04/2016.
 */
'use strict';
const chai = require('chai');
const expect = chai.expect;


describe('umb-backoffice', () => {

    describe('general app requirements', () => {
        describe('should have working test environment', () => {
            it('should pass a dummy true-test', () => {
                expect(1).to.eql(1);
            });
        });
        describe('index.js bootstrapper', () => {
            it('should be small & simple');
            it('it should bootstrap application');
        })
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
        it('should make sure to initialize only once', () => {
            expect(false).to.be.true;
        });
    });

    describe('entity-crud-routes-creator', () => {
        it('should expose routes for all entities');
    });

    describe('crud-controller', () => {
        it('should expose CRUD behavior');
        it('should expose Publish behavior');
    });

});
