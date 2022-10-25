import React from 'react';
import PropTypes from 'prop-types';

export const StyleToTextCell = props => {
    return (
        <td>
            <span className={props.dataItem[props.field] === 'Online' ? 'color-if-true' : ''}>{(props.dataItem[props.field])}</span>
        </td>
    );
};

StyleToTextCell.propTypes = {
    field: PropTypes.string,
    dataItem: PropTypes.arrayOf(PropTypes.string)
};
