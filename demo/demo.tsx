import * as React from 'react';
import { render } from 'react-dom';
import TimeInput from '../src/timeinput/TimeInput';
import DateInput from '../src/dateinput/DateInput';
import DateTimeInput from '../src/datetimeinput/DateTimeInput';

interface State {
  dateValues: Date[];
}

class DemoApp extends React.Component<{}, State> {
  // noinspection MagicNumberJS
  state: State = {
    dateValues: Array(12).fill(new Date())
  };

  changeDateValue = (newDateValue: Date, componentIndex: number) => {
    this.setState(
      (prevState: State): State => {
        const { dateValues } = prevState;
        dateValues[componentIndex] = newDateValue;

        return {
          dateValues
        };
      }
    );
  };

  render(): React.ReactElement {
    const { dateValues } = this.state;

    // noinspection MagicNumberJS
    return (
      <div style={{ marginLeft: '5px' }}>
        <h1>Demo</h1>
        <h2>TimeInput</h2>
        Default TimeInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <TimeInput
          dateValue={dateValues[0]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 0)}
        />
        <br />
        TimeInput (buttonPlacement=&quot;buttonsInside&quot;)
        <TimeInput
          buttonPlacement="buttonsInside"
          dateValue={dateValues[1]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 1)}
        />
        <br />
        <h2>DateInput</h2>
        Default DateInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <DateInput
          dateValue={dateValues[2]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 2)}
        />
        <br />
        DateInput (buttonPlacement=&quot;buttonsInside&quot;)
        <DateInput
          buttonPlacement="buttonsInside"
          dateValue={dateValues[3]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 3)}
        />
        <br />
        <h2>DateTimeInput</h2>
        Default DateTimeInput (buttonPlacement=&quot;buttonsOutside&quot;)
        <DateTimeInput
          dateValue={dateValues[4]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 4)}
        />
        <br />
        DateTimeInput (buttonPlacement=&quot;buttonsInside&quot;)
        <DateTimeInput
          buttonPlacement="buttonsInside"
          dateValue={dateValues[5]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 5)}
        />
        <br />
        <h2>Sizes</h2>
        Mini
        <TimeInput
          size="mini"
          dateValue={dateValues[6]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 6)}
        />
        <br />
        Small
        <TimeInput
          size="small"
          dateValue={dateValues[7]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 7)}
        />
        <br />
        Large
        <TimeInput
          size="large"
          dateValue={dateValues[8]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 8)}
        />
        <br />
        Big
        <TimeInput
          size="big"
          dateValue={dateValues[9]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 9)}
        />
        <br />
        Huge
        <TimeInput
          size="huge"
          dateValue={dateValues[10]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 10)}
        />
        <br />
        Massive
        <TimeInput
          size="massive"
          dateValue={dateValues[11]}
          onDateValueChange={(newDateValue: Date) => this.changeDateValue(newDateValue, 11)}
        />
        <p>
          <br />
        </p>
        <a href="https://github.com/pksilen/semantic-ui-react-datetimeinput">
          View semantic-ui-react-datetimeinput on GitHub
        </a>
      </div>
    );
  }
}

const rootElement = document.getElementById('app-root');

if (rootElement) {
  render(<DemoApp />, rootElement);
}
