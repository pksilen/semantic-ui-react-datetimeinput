# semantic-ui-react-datetimeinput
Under construction

<!--- # semantic-ui-react-numberinput
Numeric input control with step buttons for [Semantic UI React]

[![version][version-badge]][package]
[![MIT License][license-badge]][license]

![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/number_input_with_border_radius.png)

![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/right_buttons_number_input_with_border_radius.png)

## Prerequisites
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "semantic-ui-react": "^0.87.0"

## Installation
    npm install --save semantic-ui-react-numberinput
    
## Demo
   TimeInput [demo]
    
    
## Example usage
    import React from 'react';
    import TimeInput from 'semantic-ui-react-numberinput';
    
    class NumberInputExample extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                value: '0'
            };
        }
        
        changeValue = (newValue) => {
            this.setState({ value: newValue });
        }
       
        render() => {(
            <TimeInput value={this.state.value} onChange={this.changeValue} />
        )};
    }
    
   Render TimeInput with step buttons on left and right side of the input (this is default behavior, if buttonPlacement is not specified)
             
    <TimeInput buttonPlacement="leftAndRight" value={this.state.value} onChange={this.changeValue} />
         
   Render TimeInput with step buttons on the right side of the input
                      
    <TimeInput buttonPlacement="right" value={this.state.value} onChange={this.changeValue} />
    
   Specify allowed number range to be between 0 and 100
         
    <TimeInput minValue={0} maxValue={100} value={this.state.value} onChange={this.changeValue} />
         
   Specify buttons to increment/decrement by 5 
                  
    <TimeInput stepAmount={5} value={this.state.value} onChange={this.changeValue} />
         
   Specify decimal TimeInput with increment/decrement step of 0.25 and default precision of 2 
                   
    <TimeInput valueType="decimal" stepAmount={0.25} value={this.state.value} onChange={this.changeValue} />
          
   Specify decimal TimeInput with increment/decrement step of 0.1 and precision of 1 
                     
    <TimeInput valueType="decimal" stepAmount={0.1} precision={1} value={this.state.value} onChange={this.changeValue} />

## Mandatory TimeInput properties      
    value: string, // must be parseable to integer or decimal number depending on valueType
    onChange: (newValue: string) => void,
         
## Optional TimeInput properties
| property             | description                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------|
| allowEmptyValue      | Specifies if value can be empty                                                                                                |    
| buttonPlacement      | Specifies how step buttons are placed                                                                                          |
| id                   | id for HTML outer div element                                                                                                  |
| className            | class name(s) for HTML outer div element                                                                                       |
| defaultValue         | Specifies default value to be used when value is empty (must be integer or decimal number depending on valueType)              |
| minValue             | Minimum value accepted for TimeInput (must be integer or decimal number depending on valueType)                              |                                                                           |
| maxValue             | Maximum value accepted for TimeInput (must be integer or decimal number depending on valueType)                              |
| maxLength            | Maximum length of HTML input value (must be a positive integer)                                                                |
| placeholder          | Placeholder text for input element when value is empty, applicable only when allowEmptyValue is true                           |
| precision            | Decimal number precision when valueType is 'decimal'                                                                           |
| showError            | Specifies if HTML input element should show error style                                                                        |
| size                 | Specifies the size of the control                                                                                              |
| stepAmount           | Specifies how much buttons increment/decrement the value (must be a positive integer or decimal number depending on valueType) |
| valueType            | Specifies if value is integer or decimal number                                                                                |

    
## Optional TimeInput property types
    allowEmptyValue: boolean,
    buttonPlacement: 'right' | 'leftAndRight'  
    id: string,
    className: string,
    defaultValue: number,
    minValue: number, 
    maxValue: number,   
    maxLength: number,
    placeholder: string,
    precision: number,
    showError: boolean,
    size: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive',
    stepAmount: number,
    valueType: 'integer' | 'decimal'
        
## Default values for optional properties
    allowEmptyValue: false,
    buttonPlacement: 'leftAndRight',
    id: undefined,
    className: undefined,
    defaultValue: undefined,
    minValue: 0,
    maxValue: 9999999999,
    maxLength: 10,
    placeholder: 'Enter a value',
    precision: 2,
    showError: false,
    size: 'small',
    stepAmount: 1,
    valueType: 'integer'
        
## Styling example
![Example image of numberInput](https://raw.githubusercontent.com/pksilen/semantic-ui-react-numberinput/master/example/styled_number_input.png)

   styles.css
   
    .numberInput .ui.button {
      background-color: red;
      border-radius: 0 !important;
      color: white;
    }
    
    .numberInput .ui.input > input {
      border-color: red;
      color: red;
      font-weight: bold;
      width: 50px;
    }
    
   Applying CSS using className
   
    <TimeInput className="numberInput" value={this.state.value} onChange={this.changeValue} />
    
## License
MIT License

[license-badge]: https://img.shields.io/badge/license-MIT-green
[license]: https://github.com/pksilen/semantic-ui-react-numberinput/blob/master/LICENSE
[version-badge]: https://img.shields.io/npm/v/semantic-ui-react-numberinput.svg?style=flat-square
[package]: https://www.npmjs.com/package/semantic-ui-react-numberinput
[demo]: https://pksilen.github.io/semantic-ui-react-numberinput/
[Semantic UI React]: https://react.semantic-ui.com/
-->
