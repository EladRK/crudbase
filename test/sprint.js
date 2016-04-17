
var estimated = {
    hours :0, days:0
};

describe('sprint APR 17', () => {
    describe('UMB 606 - Product List', () => {
        
        estimated.hours += 2;
        describe('Model', () => {
            it('ProductList Model', () => {
                var model = {
                    site_id : '',
                    vertical_id : '',
                    segment_id : '',
                    biz_product_id : '',
                    biz_link_id : '',
                    price : '',
                    order : ''
                }
                
            });
            
            it('should have the right validations', () => {
                var validation = {
                    order : () => { 'two products can\'t have the same order' },
                    mandatory : 'all'
                };
            });
        });

        estimated.hours += 5;
        describe('CRUDP', () => {
            it('should have CRUDP BO');
        });

        estimated.days += 3;
        describe('RT', () => {
            it('should have RT component'); // Omri
        });
    });    

    describe('UMB 121 - Features & Product_Features', () => {
        describe('BO', () => {
            estimated.hours += 2;
            describe('Features Model', () => {
                it('should be ', () => {
                    var model = {
                        tag_or_group : '', // Ask moran about tag/group behavior
                        vertical_id : '', 
                        segment_id : '',
                        name : '',
                        feature_type : {
                            //spec[#, %, string, bool, etc..], 
                            //scoring_scheme[score(1-10)], 
                            //selling_points[bullets]
                        },
                        value : '', 
                        possibleValues : ''
                    };
                    
                });
                it('Relations', () => {
                    // var relation = {
                    //     product,feature, value
                    // }
                });
            });
            
          estimated.hours += 5;
            describe('CRUD', () => {
                it('should have CRUD');
            });
            
            estimated.days += 1;
            describe('Variants', () => {
                it('should support Variants');
                // Gilad says it might not have to support variants
            });

            estimated.hours += 5;
            describe('Publish', () => {
                it('should publish only with relevant tree-model', () => {
                    var publish_tree = {
                        feature : '' , 
                        product_feature : '',
                        product : ''
                    };
                });
                // Gilad says:
                // - publishing is regular, just that product without valid values can't be published so it's product validation actually.
                // - product cannot be published if it has no features.
            });
        });
        
        estimated.hours += 2;
        describe('Admin', () => {
            it('should have admin');
        });
        
        estimated.days += 1;
        describe('RT', () => {
            it('should have RT component');
        });
        
    });

    estimated.hours += 2;
    describe('UMB XXX - Refactor Admin', () => {
        describe('Tests', () => {
            it('should have all relevant tests')
        });
        describe('Folder Structure', () => {
            it('should have easy to use folder structure');
        });
    });
});

console.log('TOTAL ESTIMATED', estimated);
