import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <Link to="/" className="new-button">
          <span className="text-wrapper">
            <span className="text">Create New Link</span>
          </span>
        </Link>
        {
          this.state.areLoaded ? (
            <ShortlinkList
              items={this.state.items}
              selected={this.state.selected}
              onSelectLink={this.onSelectLink.bind(this)} />
          ) :(
            <div>Spinner...</div>
          )
        }
      </div>
    );
  }
};

export default Sidebar;
