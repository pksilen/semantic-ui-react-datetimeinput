"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_dom_1 = require("react-dom");
var TimeInput_1 = require("../src/timeinput/TimeInput");
var DateInput_1 = require("../src/dateinput/DateInput");
var DateTimeInput_1 = require("../src/datetimeinput/DateTimeInput");
var DemoApp = /** @class */ (function (_super) {
    __extends(DemoApp, _super);
    function DemoApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // noinspection MagicNumberJS
        _this.state = {
            dateValues: Array(12).fill(new Date())
        };
        _this.changeDateValue = function (newDateValue, componentIndex) {
            _this.setState(function (prevState) {
                var dateValues = prevState.dateValues;
                dateValues[componentIndex] = newDateValue;
                return {
                    dateValues: dateValues
                };
            });
        };
        return _this;
    }
    DemoApp.prototype.render = function () {
        var _this = this;
        var dateValues = this.state.dateValues;
        // noinspection MagicNumberJS
        return (<div style={{ marginLeft: '5px' }}>
        <h1>Demo</h1>
        <h2>TimeInput</h2>
        Default TimeInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <TimeInput_1["default"] dateValue={dateValues[0]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 0); }}/>
        <br />
        TimeInput (buttonPlacement=&quot;buttonsInside&quot;)
        <TimeInput_1["default"] buttonPlacement="buttonsInside" dateValue={dateValues[1]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 1); }}/>
        <br />
        <h2>DateInput</h2>
        Default DateInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <DateInput_1["default"] dateValue={dateValues[2]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 2); }}/>
        <br />
        DateInput (buttonPlacement=&quot;buttonsInside&quot;)
        <DateInput_1["default"] buttonPlacement="buttonsInside" dateValue={dateValues[3]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 3); }}/>
        <br />
        <h2>DateTimeInput</h2>
        Default DateTimeInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <DateTimeInput_1["default"] dateValue={dateValues[4]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 4); }}/>
        <br />
        DateTimeInput (buttonPlacement=&quot;buttonsInside&quot;)
        <DateTimeInput_1["default"] buttonPlacement="buttonsInside" dateValue={dateValues[5]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 5); }}/>
        <br />
        <h2>Sizes</h2>
        Mini
        <TimeInput_1["default"] size="mini" dateValue={dateValues[6]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 6); }}/>
        <br />
        Small
        <TimeInput_1["default"] size="small" dateValue={dateValues[7]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 7); }}/>
        <br />
        Large
        <TimeInput_1["default"] size="large" dateValue={dateValues[8]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 8); }}/>
        <br />
        Big
        <TimeInput_1["default"] size="big" dateValue={dateValues[9]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 9); }}/>
        <br />
        Huge
        <TimeInput_1["default"] size="huge" dateValue={dateValues[10]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 10); }}/>
        <br />
        Massive
        <TimeInput_1["default"] size="massive" dateValue={dateValues[11]} onDateValueChange={function (newDateValue) { return _this.changeDateValue(newDateValue, 11); }}/>
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-datetimeinput">
          View semantic-ui-react-datetimeinput on GitHub
        </a>
      </div>);
    };
    return DemoApp;
}(React.Component));
var rootElement = document.getElementById('app-root');
if (rootElement) {
    react_dom_1.render(<DemoApp />, rootElement);
}
