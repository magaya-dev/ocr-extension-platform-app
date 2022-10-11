import React from "react";
import {ExtensionData} from "../../models/dataExt";
import { Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
  GridFilterCellProps } from "@progress/kendo-react-grid";
import { DataResult,
  process,
  State,
  SortDescriptor } from "@progress/kendo-data-query";
import products from "../../products.json";
import { BoolToTextCell } from "../../helper/kendo-components/GridCell";
import { ColumnMenu  } from "../../helper/kendo-components/columnMenu";
import { DropdownFilterCell } from "../../helper/kendo-components/DropdownFilterCell";




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
    take: 20,
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

  const extensions: string[] = Array.from(
    new Set(
      products.map((p: ExtensionData) =>
        p.extensionName ?? p.extensionName
      )
    )
  );
  
  const CategoryFilterCell: any = (props: GridFilterCellProps) => (
    <DropdownFilterCell
      {...props}
      data={extensions}
      defaultItem={"Show All"}
    />
  );
  
    return (
      <div>
        <div className="row">
            <div className="col-12">
                <h1>Entensions Dashboard</h1>
            </div>
        </div>
        <div className='row'>
            <div className="col-12 result-content">
                <Grid
                style={{
                    height: "800px",
                    fontFamily: "Roboto",
                    fontSize: "16px"
                }}
                data={result}
                {...dataState}
                onDataStateChange={dataStateChange}
                sortable={true}
                pageable={true}
                pageSize={20}
                filterable={true}
                >
                    <Column field="networkId" title="NID" filter={"text"} columnMenu={ColumnMenu} />
                    <Column field="extensionName" title="Extension" width="350px" filterCell={CategoryFilterCell} columnMenu={ColumnMenu} />
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