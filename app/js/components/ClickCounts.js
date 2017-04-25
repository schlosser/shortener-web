
import React from 'react';
import PropTypes from 'prop-types';

class ClickCount extends React.Component {
  static get propTypes() {
    return {
      count: PropTypes.number,
      label: PropTypes.string,
    };
  }

  render() {
    return (
      <div className={'click-count last-' + this.props.count}>
        <h3>{this.props.label}</h3>
        <h2>{this.props.count}</h2>
      </div>
    );
  }
}

class ClickCounts extends React.Component {
  static get propTypes() {
    return {
      clicks: PropTypes.object,
    };
  }

  getTotalClickCount() {
    return this.props.clicks ? (
      Object.keys(this.props.clicks).length
    ) : 0;
  }

  getClickCountForDays(numDays) {
    console.log(Date.now() - 1000 * 60 * 60 * 24 * numDays);
    return this.props.clicks ? (
      Object.values(this.props.clicks).filter(click => {
        console.log(click.t);
        return click.t > (Date.now() - 1000 * 60 * 60 * 24 * numDays);
      }).length
    ) : 0;
  }

  countToString(count) {
    if (count === 0) {
      return 'No clicks yet...';
    }
    return `${ count } click${ count === 1 ? '' : 's'}`;
  }

  render() {
    const totalClickCount = this.getTotalClickCount();

    return (
      <div>
        <section>
          <h1>{this.countToString(totalClickCount)}</h1>
        </section>
        {totalClickCount > 0 && (
          <section>
            <div className="click-counts">
              <ClickCount label="Today"        count={this.getClickCountForDays(1)}/>
              <ClickCount label="Last 7 Days"  count={this.getClickCountForDays(7)}/>
              <ClickCount label="Last 28 Days" count={this.getClickCountForDays(28)}/>
              <ClickCount label="Last 3 Months" count={this.getClickCountForDays(28*3)}/>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default ClickCounts;
