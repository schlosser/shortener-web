'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class ShortlinkForm extends React.Component {

  static get propTypes() {
    return  {
      slug: PropTypes.string,
      longUrl: PropTypes.string,
      onSubmit: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.prefix = 's7r.io/';
    this.minWidth = 40;
    this.maxWidth = 300;
    this.state = this.getInitialState(props);

    this.handleSlugChange = this.handleSlugChange.bind(this);
    this.handleSlugBlur = this.handleSlugBlur.bind(this);
    this.handleLongUrlChange = this.handleLongUrlChange.bind(this);
    this.handleLongUrlBlur = this.handleLongUrlBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    setTimeout(this.updateSlugInputWidth.bind(this), 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialState(nextProps));
    this.initiateSlugTextWidthMeasurement(nextProps.slug);
  }

  getInitialState(props) {
    return {
      initialSlug: props.slug,
      canSave: !Boolean(props.slug),
      textForWidthCalculation: props.slug,
      slug: {
        value: props.slug || '',
        isValid: Boolean(props.slug),
        shouldValidate: false,
        errorText: 'Please enter a slug.',
        width: this.minWidth,
      },
      longUrl: {
        value: props.longUrl || '',
        isValid: Boolean(props.longUrl),
        shouldValidate: false,
        errorText: 'Please enter a URL.',
      },
    };
  }

  resetForm() {
    this.setState({
      slug: {
        value: '',
        isValid: false,
        shouldValidate: false,
        errorText: 'Please enter a slug.',
        width: this.minWidth,
      },
      longUrl: {
        value: '',
        isValid: false,
        shouldValidate: false,
        errorText: 'Please enter a URL.',
      },
    });
  }

  initiateSlugTextWidthMeasurement(text) {
    this.setState({
      textForWidthCalculation: text
    });
    setTimeout(this.updateSlugInputWidth.bind(this), 10);
  }

  updateSlugInputWidth() {
    let width = parseFloat(getComputedStyle(this.textSizeCalculator, null).width) + 20;
    width = Math.max(this.minWidth, width);
    width = Math.min(this.maxWidth, width);

    this.setState({
      slug: {
        ...this.state.slug,
        width: width,
      }
    });
  }

  handleSlugChange(e) {
    const slug = e.target.value;
    this.initiateSlugTextWidthMeasurement(slug);

    const isValid = /^[a-zA-Z0-9_\\-]{3,}$/.test(slug);
    let errorText = '';
    if (slug.length === 0) {
      errorText = 'Enter a slug.';
    } else if (slug.length < 3) {
      errorText = 'Enter 3+ characters.';
    } else if (!/^[a-zA-Z0-9_\\-]*$/.test(slug)) {
      errorText = 'Invalid characters.';
    }

    this.setState({
      canSave: true,
      slug: {
        ...this.state.slug,
        value: slug,
        isValid: isValid,
        errorText: errorText,
      }
    });
  }

  handleSlugBlur() {
    this.setState({
      slug: {
        ...this.state.slug,
        shouldValidate: (
          this.state.slug.shouldValidate ||
          this.state.slug.value.length > 0
        ),
      }
    });
  }

  handleLongUrlChange(e) {
    const longUrl = e.target.value;
    const isValid = /https?:\/\/.+\..+/.test(longUrl);
    let errorText = '';
    if (longUrl.length === 0) {
      errorText = 'Please enter a URL';
    } else if (!isValid) {
      errorText = 'Enter a valid URL';
    }
    this.setState({
      canSave: true,
      longUrl: {
        ...this.state.longUrl,
        value: longUrl,
        isValid: isValid,
        errorText: errorText,
      }
    });
  }

  handleLongUrlBlur() {
    this.setState({
      longUrl: {
        ...this.state.longUrl,
        shouldValidate: (
          this.state.longUrl.shouldValidate ||
          this.state.longUrl.value.length > 0
        ),
      }
    });
  }

  formIsValid() {
    return (this.state.slug.isValid && this.state.longUrl.isValid);
  }

  handleSubmit(e) {
    const {initialSlug, slug, longUrl} = this.state;
    e.preventDefault();
    if (this.formIsValid()) {
      this.props.onSubmit(
        initialSlug,
        slug.value,
        longUrl.value,
        (failureMessage) => {
          this.setState({
            slug: {
              ...slug,
              isValid: false,
              errorText: failureMessage,
            }
          });
        });
    } else {
      this.handleLongUrlBlur();
      this.handleSlugBlur();
    }
  }

  render() {
    const slugClass = 'form-input form-input-slug' +
      ((this.state.slug.shouldValidate &&
        !this.state.slug.isValid) ? ' has-errors' : '');
    const longUrlClass = 'form-input form-input-longurl' +
      ((this.state.longUrl.shouldValidate &&
        !this.state.longUrl.isValid) ? ' has-errors' : '');
    const formClass = this.state.canSave? 'can-save' : '';
    return (
      <div>
        <form className={formClass}>
          <p className="text-size-calculator" ref={(tag) => { this.textSizeCalculator = tag; }}>
            {this.state.textForWidthCalculation}
          </p>
          <div className={slugClass}>
            <label htmlFor="shortlink-slug" className="input-prefix">{this.prefix}</label>
            <input autoFocus={this.state.canSave}
              name="shortlink-slug"
              id="shortlink-slug"
              value={this.state.slug.value}
              type="text"
              style={{width: this.state.slug.width + 'px'}}
              onChange={this.handleSlugChange}
              onBlur={this.handleSlugBlur}
              placeholder="slug" />
            <h5 className="error-text">{this.state.slug.errorText}</h5>
          </div>
          <span>→</span>
          <div className={longUrlClass}>
            <input
              name="shortlink-longurl"
              id="shortlink-longurl"
              value={this.state.longUrl.value}
              type="text"
              onChange={this.handleLongUrlChange}
              onBlur={this.handleLongUrlBlur}
              placeholder="https://www.mylongurls.com/way/to/long.php"/>
            <h5 className="error-text">{this.state.longUrl.errorText}</h5>
          </div>
          <div className="form-input">
            <input
              type="submit"
              disabled={!this.formIsValid()}
              className="button"
              value="Save"
              onClick={this.handleSubmit}/>
          </div>
        </form>
      </div>
    );
  }
};

export default ShortlinkForm;

