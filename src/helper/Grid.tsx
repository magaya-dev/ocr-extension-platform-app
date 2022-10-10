import React from 'react';
import * as PropTypes from 'prop-types';

import {
    Grid as KendoGrid,
    GridColumn,
    GridColumnMenuSort,
    GridColumnMenuFilter,
    GridNoRecords as KendoGridNoRecords
} from '@progress/kendo-react-grid';

import { process } from '@progress/kendo-data-query';

export const Column = GridColumn;

export const ColumnMenu = props => {
    return (
        <div>
            <GridColumnMenuSort {...props} />
            <GridColumnMenuFilter {...props} />
        </div>
    );
};

export const GridNoRecords = KendoGridNoRecords;

export const Grid = props => {
    const { data, onDataChange, ...others } = props;

    const [take, setTake] = React.useState(10);
    const [skip, setSkip] = React.useState(0);
    const [sort, setSort] = React.useState([]);
    const [group, setGroup] = React.useState([]);
    const [filter, setFilter] = React.useState(null);
    const [allColumnFilter] = React.useState('');

    const dataState = {
        take,
        skip,
        sort,
        group,
        filter
    };

    const onDataStateChange = React.useCallback(
        event => {
            setTake(event.dataState.take);
            setSkip(event.dataState.skip);
            setSort(event.dataState.sort);
            setGroup(event.dataState.group);
            setFilter(event.dataState.filter);
        },
        [setTake, setSkip, setSort, setGroup]
    );

    const onSelectionChange = React.useCallback(
        event => {
            const checked = event.syntheticEvent.target.checked;
            const updatedData = data.map(dataItem => {
                if (dataItem === event.dataItem) {
                    return { ...dataItem, selected: checked };
                }
                return { ...dataItem };
            });

            onDataChange(updatedData);
        },
        [data, onDataChange]
    );

    const onHeaderSelectionChange = React.useCallback(
        event => {
            const checked = event.syntheticEvent.target.checked;
            const updatedData = data.map(item => {
                return {
                    ...item,
                    selected: checked
                };
            });

            onDataChange(updatedData);
        },
        [data, onDataChange]
    );

    const textColumns = ((Array.isArray(props.children) && props.children) || [props.children])
        .map(col => {
            if (col.props.children && Array.isArray(col.props.children)) {
                return col.props.children.map(child => {
                    if (!child.props.filter || child.props.filter === 'text') {
                        return child.props.field;
                    }
                });
            } else if (col.props.field) {
                if (!col.props.filter || col.props.filter === 'text') {
                    return col.props.field;
                }
            }
        })
        .flat()
        .filter(field => field);

    const allColumnsFilters = textColumns.map(column => ({
        field: column,
        operator: 'contains',
        value: allColumnFilter
    }));

    const allColumnFilteredData = allColumnFilter
        ? process(data, { filter: { logic: 'or', filters: allColumnsFilters } }).data
        : data;

    const processedData = process(allColumnFilteredData, dataState);

    React.useEffect(() => {
        if (!processedData.data.length) {
            setSkip(0);
        }
    }, [processedData]);

    const GridElement = (
        <KendoGrid
            {...dataState}
            {...others}
            rowHeight={40}
            pageable
            sortable
            selectedField={'selected'}
            data={processedData || []}
            onDataStateChange={onDataStateChange}
            onSelectionChange={onSelectionChange}
            onHeaderSelectionChange={onHeaderSelectionChange}
        >
            <Column
                field={'selected'}
                filterable={false}
                width={50}
                title={' '}
                headerSelectionValue={!data.find(dataItem => !dataItem.selected) && data.length > 0}
                className="cy-test-grid-checkbox"
            />
            {props.children}
        </KendoGrid>
    );

    return <>{GridElement}</>;
};

Grid.displayName = 'Grid';
Grid.propTypes = {
    data: PropTypes.array,
    onDataChange: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.elementType)
};
