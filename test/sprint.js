

describe('sprint APR 17', () => {
    describe('UMB 606 - Product List', () => {
        describe('CRUDP', () => {});
        describe('RT', () => {});
        describe('Model', () => {
            it('ProductList Model', () => {
                var model = {
                    site_id,
                    vertical_id,
                    segment_id,
                    biz_product_id,
                    biz_link_id,
                    order
                }
                
            });
            
            it('should have the right validations', () => {
                var validation = {
                    order : () => { 'two products can\'t have the same order' }
                };
            });
        });
    });    

    describe('UMB 121 - Features & Product_Features', () => {
        describe('BO', () => {
            describe('CRUD', () => {});
            describe('Variants', () => {});
            describe('Publish', () => {
                it('should publish only with relevant tree-model', () => {
                    var publish_tree = {
                        feature , 
                        product_feature,
                        product
                    };
                });
            });
        });
        describe('Admin', () => {});
        describe('RT', () => {
            
        });
        describe('Features Model', () => {
            it('should be ', () => {
                var model = {
                    group, vertical_id, name, value, defaultValue, possibleValues
                };
            });
            it('Relations', () => {
                var relation = {
                    product,feature, value
                }
            });
        });
        
    });

    describe('UMB XXX - Refactor Admin', () => {
        describe('Tests', () => {});
        describe('Folder Structure', () => {});
    });
});
