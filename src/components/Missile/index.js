import React from 'react';
import {size} from '../../Config';

require('./style.less');

export default React.createClass({

    getDefaultProps: function () {
        return {
            position: {
                x: 0,
                y: 0
            },
            direction: 'east'
        }
    },

    _getClasses: function() {
        return 'missile missile--' + this.props.direction + '--' + this.props.transition;
    },

    _getDynamicStyling: function () {
        return {
            width: size/2,
            height: size/2,
            top: this.props.position.y * size + size/4,
            left: this.props.position.x * size + size/4
        };
    },

    render: function () {
        return (
            <div className={this._getClasses()} style={this._getDynamicStyling()}></div>
        )
    }
});
