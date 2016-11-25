import React from 'react';
import cx from 'classnames';

import './style/compose-label.scss';

export default const ComposeLabel ({ label, className, labelClassName, prevIconClassName, postIconClassName }) => {
    const classes = cx('compose-label', className);
    const labelClasses = cx('compose-label__label', labelClassName);
    const prevIconClasses = cx('compose-label__prev-icon', prevIconClassName);
    const postIconClasses = cx('compose-label__post-icon', postIconClassName);
    return (
        <span className={classes}>
            <i onClick={onIconClick} className={prevIconClasses}></i>
            <span className={labelClasses}>{label}</span>
            <i onClick={onIconClick} className={postIconClasses}></i>
        </span>
    );
}

ComposeLabel.propsTypes = {
    onIconClick: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    prevIconClassName: React.PropTypes.string,
    postIconClassName: React.PropTypes.string
}
