import React from "react";
import {ExtensionData} from "../../models/dataExt";
import { Grid, GridColumn as Column, GridDataStateChangeEvent } from "@progress/kendo-react-grid";
import { DataResult, process, State } from "@progress/kendo-data-query";
import { SortDescriptor  } from "@progress/kendo-data-query";
import products from "../../products.json";
import { BoolToTextCell } from "../../helper/GridCell";
import { ColumnMenu  } from "../../helper/columnMenu";


const createDataState = (dataState: State) => {
  return {
    result: process<ExtensionData>(products.slice(0), dataState),
    dataState: dataState,
  };
};

const ExstensionGrid = () => {
  
  const [sort] = React.useState<Array<SortDescriptor>>([
    { field: "networkId", dir: "asc" },
    { field: "extensionName", dir: "asc" }
  ]);

  const initialState = createDataState({
    take: 5,
    skip: 0,
    sort: sort,
  });

  const [result, setResult] = React.useState<DataResult>(initialState.result);
  const [dataState, setDataState] = React.useState<State>(
    initialState.dataState
  );

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    const updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
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
                    height: "450px",
                    fontFamily: "Roboto",
                    fontSize: "16px"
                }}
                data={result}
                {...dataState}
                onDataStateChange={dataStateChange}
                sortable={true}
                pageable={true}
                pageSize={5}
                >
                    <Column field="networkId" title="NID" filter={"numeric"} columnMenu={ColumnMenu} />
                    <Column field="extensionName" title="Extension" width="350px" filter={"text"} columnMenu={ColumnMenu} />
                    <Column field="version" title="Version" filter={"text"} columnMenu={ColumnMenu} />
                    <Column field="latest" title="Latest" cell={BoolToTextCell} filter={"boolean"} columnMenu={ColumnMenu}/>
                    <Column field="status" title="Status" filter={"text"} columnMenu={ColumnMenu} />
                    <Column field="mgyGateWay" title="Gateway" cell={BoolToTextCell} filter={"boolean"} columnMenu={ColumnMenu} />
                </Grid>
            </div>
        </div>
      </div>
    );
  };
  
  export default ExstensionGrid;