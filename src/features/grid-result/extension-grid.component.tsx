import React, { useState }  from "react";
import * as ReactDOM from "react-dom";
import {ExtensionData} from "../../models/dataExt";
import { Grid, GridColumn as Column, GridSortChangeEvent } from "@progress/kendo-react-grid";
import { orderBy, SortDescriptor  } from "@progress/kendo-data-query";
import products from "../../products.json";


const ExstensionGrid = () => {
    const [data, setData] = React.useState<ExtensionData[]>(products);
    const [sort, setSort] = React.useState<Array<SortDescriptor>>([
        { field: "networkId", dir: "asc" },
        { field: "extensionName", dir: "asc" }
      ]);
      const [allowUnsort, setAllowUnsort] = React.useState<boolean>(true);
      const sortChange = (event: GridSortChangeEvent) => {
        setData(getProducts(event.sort));
        setSort(event.sort);
      };
    
      const getProducts = (sort: SortDescriptor[]): ExtensionData[] => {
        return orderBy(products, sort);
      };
  
    return (
      <div>
        <div className="row">
            <div className="col-12">
                <h1>Entension Dashboard</h1>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 result-content">
                <Grid
                style={{
                    height: "400px",
                }}
                data={data}
                sortable={{
                    allowUnsort: allowUnsort
                }}
                sort={sort}
                onSortChange={sortChange}
                >
                    <Column field="networkId" title="NID" />
                    <Column field="extensionName" title="Extension" width="250px" />
                    <Column field="version" title="Version" />
                    <Column field="latest" title="Latest" />
                    <Column field="status" title="Status" />
                    <Column field="mgyGateWay" title="Gateway" />
                </Grid>
            </div>
        </div>
      </div>
    );
  };
  
  export default ExstensionGrid;