import React from 'react';
import PropTypes from 'prop-types';

export const BoolToTextCell = props => {
    return (
        <td>
            <span className={props.dataItem[props.field] ? 'color-if-true' : ''}>{(props.dataItem[props.field] && 'YES') || 'NO'}</span>
        </td>
    );
};

BoolToTextCell.propTypes = {
    field: PropTypes.string,
    dataItem: PropTypes.arrayOf(PropTypes.string)
};
