import React, {useEffect} from "react";
import {ExtensionData, ExtStatusEnum, ExtStatusMapping} from "../../models/dataExt";

import { Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
  GridFilterCellProps } from "@progress/kendo-react-grid";

import { DataResult,
  process as processKendo,
  State,
  SortDescriptor } from "@progress/kendo-data-query";

import { BoolToTextCell } from "../../helper/kendo-components/GridCell";
import { StyleToTextCell } from "../../helper/kendo-components/GridCellStyle";
import { ColumnMenu  } from "../../helper/kendo-components/columnMenu";
import { DropdownFilterCell } from "../../helper/kendo-components/DropdownFilterCell";

import { ExtensionsService } from "../../services/ExtensionsService";

// to Enums
let statusValues: any[];
let statusMapping: Map<number, string>;

const ExstensionGrid = () => {
  const [exts, setExtensions] = React.useState<ExtensionData[]>([]);
 
  //const initialDataState: State = { skip: 0, take: 20 };
  useEffect(() => {
		ExtensionsService.getAll()
			.then((data: ExtensionData[]) => {
        
				console.log(data);
        setExtensions(data);
        setResult(processKendo(data, { skip: 0, take: 20 }));
			})
			.catch((err) => {
        console.log(err);
			});
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => {};
	}, []);

  
  const createDataState = (dataState: State) => {
    return {
      result: processKendo<ExtensionData>(exts.slice(0), dataState),
      dataState: dataState,
    };
  };

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
    //setExtensions(updatedState.result.data);
    setDataState(updatedState.dataState);
  };

  // Extension Name filter
  const extensions: string[] = Array.from(
    new Set(
      exts.map((p: ExtensionData) =>
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
  
  //status filter
  const status = Object.values(ExtStatusEnum);
  statusValues = status.slice(status.length / 2);
  statusMapping = ExtStatusMapping;
  const statuList: (string)[] = Array.from(
    new Set(
      exts.map((p: ExtensionData) =>
        p.status.toString() ?? statusMapping.get(p.status).toString()
      )
    )
  );
  const statusFilterCell: any = (props: GridFilterCellProps) => (
    <DropdownFilterCell
      {...props}
      data={statuList}
      defaultItem={"(All)"}
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
                    <Column field="latest" title="Latest" cell={BoolToTextCell} filter={"boolean"} columnMenu={ColumnMenu} />
                    <Column field="status" title="Status" filterCell={statusFilterCell} cell={StyleToTextCell} columnMenu={ColumnMenu} className=""/>
                    <Column field="mgyGateWay" title="Gateway" cell={BoolToTextCell} filter={"boolean"} columnMenu={ColumnMenu} />
                </Grid>
            </div>
        </div>
      </div>
    );
};
  
  export default ExstensionGrid;
