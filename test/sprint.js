
var Estimator = function() {
    this.estimated = { hours :0, days:0 }; 
}

Estimator.prototype.addHours = (n) => {
    this.estimated.hours += n;
}

Estimator.prototype.addDays = (n) => {
    this.estimated.days += n;
}

Estimator.prototype.getTotal = () => {
    return this.estimated;
}



describe('sprint APR 17', () => {
    describe('UMB 606 - Product List', () => {
        var umb606 = new Estimator();
        
        umb606.addHours(2).bind(umb606);
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

        umb606.addDays(1).bind(umb606);
        describe('CRUDP', () => {
            it('should have CRUD BO');
            it('should have Publish')
        });

        umb606.addDays(0.5).bind(umb606);
        describe('RT', () => {
            it('should connect to Omri\'s RT component'); // Omri
        });
        
        console.log('UMB 606 - Product List', umb606.getTotal());
    });    

    describe('UMB 121 - Features & Product_Features', () => {
        var umb121 = new Estimator();
        
        describe('BO', () => {
            umb121.addHours(2).bind(umb121);
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
            
            umb121.addHours(5).bind(umb121);
            describe('CRUD', () => {
                it('should have CRUD');
            });

            umb121.addHours(5).bind(umb121);
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
        
        umb121.addHours(2).bind(umb121);
        describe('Admin', () => {
            it('should have admin');
        });
        
        umb121.addDays(3).bind(umb121);
        describe('RT', () => {
            it('should have RT component');
        });
        
        console.log('UMB 121 - Product_Features', umb121.getTotal());
    });

    describe('UMB XXX - Refactor Admin', () => {
        var umb_xxx_admin = new Estimator();
        umb_xxx_admin.addDays(1).bind(umb_xxx_admin);
        describe('Tests', () => {
            it('should have all relevant tests')
        });
        umb_xxx_admin.addHours(1).bind(umb_xxx_admin);
        describe('Folder Structure', () => {
            it('should have easy to use folder structure');
        });
        
        console.log('UMB XXX - Admin', umb_xxx_admin.getTotal());
    });
});

